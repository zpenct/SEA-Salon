export type ResponseListItem<T> = {
  message: string;
  status: string | number;
  items: T[];
};

export type ResponseDataItem = {
  message: string;
  status: string | number;
  data: any;
};
