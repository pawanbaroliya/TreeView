export interface Option {
  id: string;
  label: string;
  createdAt?: string;
  parentId?: string | null;
  isParent: boolean;
}

export interface AppState {
  options: Option[];
}
