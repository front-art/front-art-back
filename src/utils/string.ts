import { toJalaali } from "jalaali-js";

export function convertToJalali(isoDate: string): string {
  const date = new Date(isoDate);
  const jalaaliDate = toJalaali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );

  const pad = (num: number): string => num.toString().padStart(2, "0");

  const jalaliDateStr = `${jalaaliDate.jy}-${pad(jalaaliDate.jm)}-${pad(
    jalaaliDate.jd
  )}`;
  return jalaliDateStr;
}
