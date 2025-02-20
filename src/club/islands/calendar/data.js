import datetime from 'shared/libs/datetime';

export const defaultHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

export const defaultWeekDayNames = Array.of(...datetime.weekdaysMin().slice(1), datetime.weekdaysMin()[0]);