import { Island } from 'shared/islands';

import Calendar from './Calendar';

export default class CalendarIsland extends Island {
    constructor(selector) {
        super(selector, Calendar);
    }
}