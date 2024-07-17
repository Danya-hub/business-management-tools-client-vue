export type UnitKeyType =
    'setFullYear'
    | 'setMonth'
    | 'setDate'
    | 'setHours'
    | 'setMinutes'
    | 'setSeconds'
    | 'setMilliseconds';

class Time {
    toRadian(units: number, maxUnits: number): number {
        return ((2 * Math.PI) / maxUnits) * units;
    }

    toUnit(radian: number, maxUnits: number): number {
        return radian / ((2 * Math.PI) / maxUnits);
    }

    addUnit(
        time: Date,
        unitKey: UnitKeyType,
        value: (time: Date) => number,
    ): Date {
        return unitKey in time && time[unitKey] as (value: number) => number
            ? new Date(time[unitKey](value(time)))
            : time;
    }

    textTime(time: Date, options: Intl.DateTimeFormatOptions): string {
        return Intl.DateTimeFormat(
            localStorage.getItem('locale') ?? window.navigator.language,
            options
        ).format(time)
    }

    roundByStep(unit: number, step: number): number {
        return Math.round(unit / step) * step;
    }
}

export default new Time();