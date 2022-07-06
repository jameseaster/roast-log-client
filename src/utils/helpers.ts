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
  return `${constants.general.months[+month]} ${+day}, ${year}`;
};
