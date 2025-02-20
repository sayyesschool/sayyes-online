import expect from 'expect';
import { model } from 'mongoose';

import { RoomSchema } from 'core/models/room';

import { at } from 'test/helpers';

const Room = model('Room', RoomSchema);

describe('Room model', () => {
    describe('is available', () => {
        it('if the previous lesson ends (11:00) more than 10 minutes before the requested period starts (12:00)', () => {
            available('12:00-13:00', ['10:00-11:00']).toBe(true);
        });

        it('if the previous lesson ends (10:50) 10 minutes before the requested period starts (11:00)', () => {
            available('11:00-12:00', ['10:00-10:50']).toBe(true);
        });

        it('if the next lesson starts (12:00) more than 10 minutes after the requested period ends (11:00)', () => {
            available('10:00-11:00', ['12:00-13:00']).toBe(true);
        });

        it('if the next lesson starts (12:00) 10 minutes after the requested period ends (11:50)', () => {
            available('11:00-11:50', ['12:00-13:00']).toBe(true);
        });

        it('if the previous lesson ends (10:00) more than 10 minutes before the requested period starts (11:00) AND the next lesson starts (12:00) more than 10 minutes after the requested period ends (12:00)', () => {
            available('11:00-12:00', ['09:00-10:00', '13:00-14:00']).toBe(true);
        });

        it('if the previous lesson ends (09:50) 10 minutes before the requested period starts (10:00) AND the next lesson starts (11:30) 10 minutes after the requested period ends (11:20)', () => {
            available('10:00-11:20', ['09:00-09:50', '11:30-12:00']).toBe(true);
        });
    });

    describe('is not available', () => {
        it('if the previous lesson ends (11:00) after the requested period starts (10:30)', () => {
            available('10:30-11:30', ['10:00-11:00']).toBe(false);
        });

        it('if the previous lesson ends (11:00) when the requested period starts (11:00)', () => {
            available('11:00-12:00', ['10:00-11:00']).toBe(false);
        });

        it('if the previous lesson ends (10:55) less then 10 minutes before the requested period starts (11:00)', () => {
            available('11:00-12:00', ['10:00-10:55']).toBe(false);
        });

        it('if the next lesson starts (10:30) before the requested period ends (11:00)', () => {
            available('10:00-11:00', ['10:30-11:30']).toBe(false);
        });

        it('if the next lesson starts (11:00) at the same time the requested period ends (11:00)', () => {
            available('10:00-11:00', ['11:00-12:00']).toBe(false);
        });

        it('if the next lesson starts (11:05) less then 10 minutes after the requested period ends (11:00)', () => {
            available('10:00-11:00', ['11:05-12:00']).toBe(false);
        });
    });
});

function available(time = '00:00', lessonTimes = []) {
    const room = new Room();

    room.lessons = lessonTimes.map(time => {
        const [from, to] = time.split('-');

        return {
            startAt: at(from),
            endAt: at(to)
        };
    });

    const [from, to] = time.split('-');

    return expect(room.isAvailable(at(from), at(to)));
}