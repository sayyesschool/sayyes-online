import EventEmitter from 'node:events';

import { act, renderHook } from '@testing-library/react-hooks';
import Video from 'twilio-video';

import { mockRoom } from 'class/__mocks__/twilio-video';
import * as utils from 'class/utils';

import useRoom from './useRoom';

const mockVideoConnect = Video.connect;

describe('useRoom', () => {
    beforeEach(jest.clearAllMocks);
    afterEach(() => mockRoom.removeAllListeners());

    it('should return an empty room when no token is provided', () => {
        const { result } = renderHook(() => useRoom([], () => { }, {}));

        expect(result.current.room).toEqual(new EventEmitter());
    });

    it('should set isConnecting to true while connecting to the room ', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useRoom([], () => { }, {}));
        expect(result.current.isConnecting).toBe(false);
        act(() => {
            result.current.connect('token');
        });
        expect(result.current.isConnecting).toBe(true);
        await waitForNextUpdate();
        expect(Video.connect).toHaveBeenCalledTimes(1);
        expect(result.current.room.disconnect).not.toHaveBeenCalled();
        expect(result.current.isConnecting).toBe(false);
    });

    it('should set the priority of video tracks to low', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useRoom([{ kind: 'video' }], () => { }, {}));
        act(() => {
            result.current.connect('token');
        });
        await waitForNextUpdate();
        expect(mockRoom.localParticipant.videoTracks[0].setPriority).toHaveBeenCalledWith('low');
    });

    it('should return a room after connecting to a room', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useRoom([], () => { }, {}));
        act(() => {
            result.current.connect('token');
        });
        await waitForNextUpdate();
        expect(result.current.room.state).toEqual('connected');
    });

    it('should add a listener for the "beforeUnload" event when connected to a room', async () => {
        jest.spyOn(window, 'addEventListener');
        const { result, waitForNextUpdate } = renderHook(() => useRoom([], () => { }, {}));
        act(() => {
            result.current.connect('token');
        });
        await waitForNextUpdate();
        expect(window.addEventListener).toHaveBeenCalledWith('beforeunload', expect.any(Function));
    });

    it('should remove the listener for the "beforeUnload" event when the room is disconnected', async () => {
        jest.spyOn(window, 'removeEventListener');
        const { result, waitForNextUpdate } = renderHook(() => useRoom([], () => { }, {}));
        act(() => {
            result.current.connect('token');
        });
        await waitForNextUpdate();
        result.current.room.emit('disconnected');
        await waitForNextUpdate();
        expect(window.removeEventListener).toHaveBeenCalledWith('beforeunload', expect.any(Function));
    });

    it('should call onError and set isConnecting to false when there is an error', async () => {
        const mockOnError = jest.fn();
        mockVideoConnect.mockImplementationOnce(() => Promise.reject('mockError'));
        const { result } = renderHook(() => useRoom([], mockOnError, {}));
        await act(() => result.current.connect('token'));
        expect(mockOnError).toHaveBeenCalledWith('mockError');
        expect(result.current.isConnecting).toBe(false);
    });

    it('should reset the room object on disconnect', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useRoom([], () => { }, {}));
        act(() => {
            result.current.connect('token');
        });
        await waitForNextUpdate();
        expect(result.current.room.state).toBe('connected');
        result.current.room.emit('disconnected');
        await waitForNextUpdate();
        expect(result.current.room.state).toBe(undefined);
    });

    describe('when isMobile is true', () => {
        // eslint-disable-next-line no-import-assign
        utils.isMobile = true;

        it('should add a listener for the "pagehide" event when connected to a room', async () => {
            jest.spyOn(window, 'addEventListener');
            const { result, waitForNextUpdate } = renderHook(() => useRoom([], () => { }, {}));
            act(() => {
                result.current.connect('token');
            });
            await waitForNextUpdate();
            expect(window.addEventListener).toHaveBeenCalledWith('pagehide', expect.any(Function));
        });

        it('should remove the listener for the "pagehide" event when the room is disconnected', async () => {
            jest.spyOn(window, 'removeEventListener');
            const { result, waitForNextUpdate } = renderHook(() => useRoom([], () => { }, {}));
            act(() => {
                result.current.connect('token');
            });
            await waitForNextUpdate();
            result.current.room.emit('disconnected');
            await waitForNextUpdate();
            expect(window.removeEventListener).toHaveBeenCalledWith('pagehide', expect.any(Function));
        });
    });
});