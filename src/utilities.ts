import moment from "moment";

export const getFullDate = (date: number) => new Date(date * 1000);
export const getFullDateFormat = (date: number) =>
  moment(getFullDate(date)).format("MMM Do YY");
export const getFullDateWithTime = (date: number) =>
  moment(getFullDate(date)).format("MMM Do LT");
export const getHourFormat = (date: number) =>
  moment(getFullDate(date)).format("LT");
