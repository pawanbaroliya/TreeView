import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, StoreState } from "../redux/store";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { elementSlice as element } from "../redux/slice/element";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Option } from "../types";

const ColumnLayout = ({ labelText }: { labelText: string }) => {
  const {
    actions: { addOption },
  } = element;
  const [isError, setIsError] = useState({
    isShow: false,
    text: "",
  });
  const elementState = useSelector(
    (state: StoreState) => state.element?.Option
  );
  const [textDescription, setTextDescription] = useState("");
  const [elementOptions, setElementOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [parentElements, setParentElements] = useState<Option[]>();
  console.log("parentElements: ", parentElements);
  const [childElements, setChildElements] = useState<Option[]>();
  console.log("childElements: ", childElements);

  const [selectedOption, setSelectedOption] = useState("");

  const dispatch = useDispatch<StoreDispatch>();

  const handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTextDescription(value);
  };

  const handleOnBlur = () => {
    setIsError({ ...isError, isShow: false });
  };

  const handleOnClick = () => {
    if (!isError.isShow && textDescription.length) {
      setTextDescription("");
    }
    if (textDescription.length && !selectedOption) {
      // Add element without child element
      dispatch(
        addOption({
          label: textDescription,
          isParent: true,
          parentId: "",
        })
      );
    } else {
      // Add element with child
      dispatch(
        addOption({
          label: textDescription,
          parentId: selectedOption,
          isParent: false,
        })
      );
    }
    setTextDescription("");
    setSelectedOption("");
  };

  const handleInputKeyDown = ({
    target,
    key,
  }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      if ((target as HTMLInputElement).value.length > 0) {
        handleOnClick();
      } else {
        // Validation for empty input box
        setIsError({
          isShow: true,
          text: "The input value cannot be empty",
        });
      }
    }
  };

  const handleChangeDropDown = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (elementState?.length) {
      const options: { label: string; value: string }[] = [];
      elementState?.forEach((opt) => {
        options.push({ label: opt.label, value: opt.id });
      });
      const parentElements = elementState.filter(
        (element) => element?.isParent
      );
      const childElement = elementState.filter((element) => !element?.isParent);
      setParentElements(parentElements);
      setChildElements(childElement);
      setElementOptions(options);
    }
  }, [elementState]);

  return (
    <Box borderRadius={1} width="100%" sx={{ boxShadow: 2, p: 3 }}>
      <TextField
        fullWidth
        label={labelText}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onKeyDown={handleInputKeyDown}
        value={textDescription}
        variant="outlined"
        size="small"
      />

      <Collapse in={isError.isShow}>
        <Alert severity="error" sx={{ my: 1 }}>
          {isError.text}
        </Alert>
      </Collapse>

      <Box width="100%" marginBottom={5} marginTop={2}>
        <FormControl fullWidth margin="normal" size="small">
          <InputLabel id="select-element-type">Select Element type</InputLabel>
          <Select
            labelId="select-element-type"
            id="select-element"
            value={selectedOption}
            label="Select Element type"
            placeholder="Select Element type"
            onChange={handleChangeDropDown}
            sx={{
              "& .MuiSelect-iconOutlined": {
                display: selectedOption ? "none" : "",
              },
              "&.Mui-focused .MuiIconButton-root": { color: "primary.main" },
            }}
            endAdornment={
              <IconButton
                sx={{ visibility: selectedOption ? "visible" : "hidden" }}
                onClick={() => setSelectedOption("")}
              >
                <ClearIcon />
              </IconButton>
            }
          >
            {elementOptions?.map((option) => (
              <MenuItem value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box width="100%" display="flex" justifyContent="center">
        <Button
          size="medium"
          sx={{ my: 1, maxWidth: 200 }}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleOnClick}
          onKeyDown={({ key }) => key === "Enter" && handleOnClick()}
          disabled={textDescription.length === 0}
        >
          Add Element
        </Button>
      </Box>
      {/* Displaying only the first layer of parent and child. If we want to do it with more complexity just make separate component of list and call it recursively */}
      <List>
        {elementState?.map((element) => (
          <ListItem>
            {element?.isParent
              ? `Parent ${element?.label}`
              : `Child ${element?.label}`}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ColumnLayout;
