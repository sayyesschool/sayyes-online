import { Island } from 'shared/islands';

import Meeting from './Meeting';

export default class MeetingIsland extends Island {
    constructor(selector) {
        super(selector, Meeting);
    }
}