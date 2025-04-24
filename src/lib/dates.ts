import { parse } from "date-fns";

export const parseInputDatetime = (input: string) => {
  return parse(input, "d MMMM yyyy - hh:mm a", new Date());
};

export const getCurrentDate = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};
