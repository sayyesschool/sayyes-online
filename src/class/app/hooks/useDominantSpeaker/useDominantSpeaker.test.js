import EventEmitter from 'node:events';

import { act, renderHook } from '@testing-library/react-hooks';

import useVideoContext from '../useVideoContext/useVideoContext';

import useDominantSpeaker from './useDominantSpeaker';

jest.mock('../useVideoContext/useVideoContext');
const mockUseVideoContext = useVideoContext;

describe('the useDominantSpeaker hook', () => {
    const mockRoom = new EventEmitter();
    mockRoom.dominantSpeaker = 'mockDominantSpeaker';
    mockUseVideoContext.mockImplementation(() => ({ room: mockRoom }));

    it('should return room.dominantSpeaker by default', () => {
        const { result } = renderHook(useDominantSpeaker);
        expect(result.current).toBe('mockDominantSpeaker');
    });

    it('should respond to "dominantSpeakerChanged" events', async () => {
        const { result } = renderHook(useDominantSpeaker);
        act(() => {
            mockRoom.emit('dominantSpeakerChanged', 'newDominantSpeaker');
        });
        expect(result.current).toBe('newDominantSpeaker');
    });

    it('should not set "null" when there is no dominant speaker', () => {
        const { result } = renderHook(useDominantSpeaker);
        expect(result.current).toBe('mockDominantSpeaker');
        act(() => {
            mockRoom.emit('dominantSpeakerChanged', null);
        });
        expect(result.current).toBe('mockDominantSpeaker');
    });

    it('should set "null" as the dominant speaker when the dominant speaker disconnects', () => {
        const { result } = renderHook(useDominantSpeaker);
        expect(result.current).toBe('mockDominantSpeaker');
        act(() => {
            mockRoom.emit('participantDisconnected', 'otherParticipant');
        });
        expect(result.current).toBe('mockDominantSpeaker');
    });

    it('should not set "null" as the dominant speaker when a different participant disconnects', () => {
        const { result } = renderHook(useDominantSpeaker);
        expect(result.current).toBe('mockDominantSpeaker');
        act(() => {
            mockRoom.emit('participantDisconnected', 'mockDominantSpeaker');
        });
        expect(result.current).toBe(null);
    });

    it('should clean up listeners on unmount', () => {
        const { unmount } = renderHook(useDominantSpeaker);
        expect(mockRoom.listenerCount('dominantSpeakerChanged')).toBe(1);
        expect(mockRoom.listenerCount('participantDisconnected')).toBe(1);
        unmount();
        expect(mockRoom.listenerCount('dominantSpeakerChanged')).toBe(0);
        expect(mockRoom.listenerCount('participantDisconnected')).toBe(0);
    });
});