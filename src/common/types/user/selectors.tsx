import { Stop } from "common/types";

export const getStopsPerDay = (stops: Stop[]): Record<string, Stop[]> => {
  return stops.reduce<Record<string, Stop[]>>((acc, curr) => {
    var baseLine = stops[0].time.start;

    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(
      Math.abs((baseLine.getTime() - curr.time.start.getTime()) / oneDay)
    );

    if (!acc[diffDays]) {
      acc[diffDays] = [];
    }

    acc[diffDays].push(curr);
    return acc;
  }, {});
};
