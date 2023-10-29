const mongoose = require('mongoose');
const RoomSchema = require('./Room');

const Room = mongoose.model('Room', RoomSchema);

describe('Room', () => {
    describe('isAvailable', () => {
        it('should return true if the room is available for the requested time slot', () => {
            const room = new Room();
            room.lessons = [
                {
                    startAt: '2022-01-01T10:00:00Z',
                    endAt: '2022-01-01T11:00:00Z'
                },
                {
                    startAt: '2022-01-01T12:00:00Z',
                    endAt: '2022-01-01T13:00:00Z'
                }
            ];
            const from = '2022-01-01T14:00:00Z';
            const duration = 60;

            const result = room.isAvailable(from, duration);

            expect(result).toBe(true);
        });

        it('should return false if the room is not available for the requested time slot', () => {
            const room = new Room();
            room.lessons = [
                {
                    startAt: '2022-01-01T10:00:00Z',
                    endAt: '2022-01-01T11:00:00Z'
                },
                {
                    startAt: '2022-01-01T12:00:00Z',
                    endAt: '2022-01-01T13:00:00Z'
                }
            ];
            const from = '2022-01-01T10:30:00Z';
            const duration = 60;

            const result = room.isAvailable(from, duration);

            expect(result).toBe(false);
        });
    });
});