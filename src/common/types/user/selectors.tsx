import { Stop } from './models';

export const DayToStopMap = (stops: Stop[]) =>
    stops.reduce<Record<string, Stop[]>>((acc, curr) => {
        const baseLine = new Date(stops[0].time.start);
        const current = new Date(curr.time.start);

        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round(
            Math.abs((baseLine.getTime() - current.getTime()) / oneDay)
        );

        if (!acc[diffDays]) {
            acc[diffDays] = [];
        }

        acc[diffDays].push(curr);
        return acc;
    }, {});
