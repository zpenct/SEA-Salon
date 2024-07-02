import { Grid } from "antd";

export const formatDate = (dateString: Date | string | undefined): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("id-ID", options)?.format(date);
};

export const showNotificationDate = (tanggal: string, locale = "id-ID") => {
  const date = new Date(tanggal);
  const formattedDate = date.toLocaleDateString(locale);
  const jam = date.getHours().toString().padStart(2, "0");
  const menit = date.getMinutes().toString().padStart(2, "0");
  return `${formattedDate} pukul ${jam}.${menit}`;
};

export const useIsMobileScreen = (): boolean => {
  const { md } = Grid.useBreakpoint();
  return !md;
};
