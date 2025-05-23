import EventEmitter from 'node:events';

import { act, renderHook } from '@testing-library/react-hooks';

import useParticipantNetworkQualityLevel from './useParticipantNetworkQualityLevel';

describe('the useParticipantNetworkQualityLevel hook', () => {
    let mockParticipant;

    beforeEach(() => {
        mockParticipant = new EventEmitter();
    });

    it('should return mockParticipant.networkQualityLevel by default', () => {
        mockParticipant.networkQualityLevel = 4;
        const { result } = renderHook(() => useParticipantNetworkQualityLevel(mockParticipant));
        expect(result.current).toBe(4);
    });

    it('should return respond to "networkQualityLevelChanged" events', async () => {
        mockParticipant.networkQualityLevel = 4;
        const { result } = renderHook(() => useParticipantNetworkQualityLevel(mockParticipant));
        act(() => {
            mockParticipant.emit('networkQualityLevelChanged', 3);
        });
        expect(result.current).toBe(3);
    });

    it('should clean up listeners on unmount', () => {
        mockParticipant.networkQualityLevel = 4;
        const { unmount } = renderHook(() => useParticipantNetworkQualityLevel(mockParticipant));
        unmount();
        expect(mockParticipant.listenerCount('networkQualityLevelChanged')).toBe(0);
    });
});