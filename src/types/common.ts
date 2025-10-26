export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface TableColumn {
  key: string;
  title: string;
  sortable?: boolean;
  render?: (value: unknown, record: unknown) => React.ReactNode;
}
