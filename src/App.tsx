import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ColumnLayout from "./components/ElementLayout";

function App() {
  return (
    <Container>
      <Typography textAlign="center" variant="h3" mt={3} mb={5}>
        Tree of elements
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item md={6}>
          <ColumnLayout labelText="Type Element Name" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
