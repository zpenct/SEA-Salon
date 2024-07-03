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

export const generateDisabledHours = (openTime: string, closeTime: string) => {
  const disabledHours = [];

  // Konversi jam buka dan tutup ke format angka (integer)
  const openHour = parseInt(openTime.split(":")[0]);
  const closeHour = parseInt(closeTime.split(":")[0]);

  // Tambahkan jam-jam sebelum jam buka ke `disabledHours`
  for (let i = 0; i < openHour; i++) {
    disabledHours.push(i);
  }

  // Tambahkan jam-jam setelah jam tutup ke `disabledHours`
  for (let i = closeHour + 1; i < 24; i++) {
    disabledHours.push(i);
  }

  return disabledHours;
};
