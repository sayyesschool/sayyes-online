import EventEmitter from 'node:events';

import { act, renderHook } from '@testing-library/react-hooks';

import useVideoContext from '../useVideoContext/useVideoContext';

import useIsRecording from './useIsRecording';

jest.mock('../useVideoContext/useVideoContext');

const mockUseVideoContext = useVideoContext;

describe('the useIsRecording hook', () => {
    let mockRoom;

    beforeEach(() => {
        mockRoom = new EventEmitter();
        mockRoom.isRecording = true;
        mockUseVideoContext.mockImplementation(() => ({ room: mockRoom }));
    });

    it('should return true when "room.isRecording" is true', () => {
        const { result } = renderHook(() => useIsRecording());
        expect(result.current).toBe(true);
    });

    it('should return false when "room.isRecording" is false', () => {
        mockRoom.isRecording = false;
        const { result } = renderHook(() => useIsRecording());
        expect(result.current).toBe(false);
    });

    it('should respond to "recordingStopped" events', () => {
        const { result } = renderHook(() => useIsRecording());
        act(() => {
            mockRoom.emit('recordingStopped');
        });
        expect(result.current).toBe(false);
    });

    it('should respond to "recordingStarted" events', () => {
        mockRoom.isRecording = false;
        const { result } = renderHook(() => useIsRecording());
        act(() => {
            mockRoom.emit('recordingStarted');
        });
        expect(result.current).toBe(true);
    });

    it('should clean up listeners on unmount', () => {
        const { unmount } = renderHook(() => useIsRecording());
        unmount();
        expect(mockRoom.listenerCount('recordingStarted')).toBe(0);
        expect(mockRoom.listenerCount('recordingStopped')).toBe(0);
    });
});