export type TService = {
  name: string;
  session: string;
};

export type TBranchItem = {
  id: number;
  name: number;
  location: string;
  open_time: string;
  close_time: string;
  services: TService[];
};

export type TReservatedBy = {
  full_name: string;
  phone_number: string;
};

export type TReservatedIn = {
  name: string;
  location: string;
};

export type TReservation = {
  id: number;
  service: string;
  order_date: string;
  start_time: string;
  end_time: string;
  status: string;
  created_at: Date;
  reservated_by: TReservatedBy;
  reservated_in: TReservatedIn;
};
