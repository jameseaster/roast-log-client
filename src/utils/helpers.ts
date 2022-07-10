// Imports
import constants from "utils/constants";

/**
 * Takes in time "00:00:00" and returns readable format
 */
export const formatTime = (time: string) => {
  let [hours, minutes] = time.split(":");
  const period = +hours > 12 ? "PM" : "AM";
  hours = +hours > 12 ? String(+hours - 12) : hours;
  return `${hours}:${minutes} ${period}`;
};

/**
 * Takes in roast times remaining time from a 30 minute timer and returns readable format
 */
export const formatRoastTimes = (time: number) => {
  const minutes = Math.round(30 - (time - (time % 1)));
  const seconds = Math.round(60 - Math.round(60 * (time % 1)));
  return `${minutes}:${seconds > 10 ? seconds : "0" + seconds}`;
};

/**
 * Takes in time "2022-03-27T06:00:00.000Z" and returns readable format
 */
export const formatDateString = (date: string) => {
  const [year, month, day] = date.slice(0, 10).split("-");
  return `${constants.general.months[+month - 1]} ${+day}, ${year}`;
};

/**
 * Returns date string formatted for database value
 */
export const getDate = (dateTime: Date | null) => {
  if (dateTime === null) return "";
  const yyyy = dateTime.getFullYear();
  let mm = String(dateTime.getMonth() + 1); // Months start at 0
  let dd = String(dateTime.getDate());
  // Add zero if necessary
  if (Number(dd) < 10) dd = "0" + dd;
  if (Number(mm) < 10) mm = "0" + mm;
  return `${yyyy}-${mm}-${dd}`;
};

/**
 * Returns time string formatted for database value
 */
export const getTime = (dateTime: Date | null) => {
  if (dateTime === null) return "";
  let hh = String(dateTime.getHours());
  let mm = String(dateTime.getMinutes());
  let ss = String(dateTime.getSeconds());
  // Add zero if necessary
  if (Number(hh) < 10) hh = "0" + hh;
  if (Number(mm) < 10) mm = "0" + mm;
  if (Number(ss) < 10) ss = "0" + ss;
  return `${hh}:${mm}:${ss}`;
};
