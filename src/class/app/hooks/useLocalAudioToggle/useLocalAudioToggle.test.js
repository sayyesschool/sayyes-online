import { renderHook } from '@testing-library/react-hooks';

import useVideoContext from '../useVideoContext/useVideoContext';

import useLocalAudioToggle from './useLocalAudioToggle';

jest.mock('../useVideoContext/useVideoContext');
const mockUseVideoContext = useVideoContext;

jest.mock('../useIsTrackEnabled/useIsTrackEnabled', () => () => true);

describe('the useLocalAudioToggle hook', () => {
    it('should return the value from the useIsTrackEnabled hook', () => {
        const mockLocalTrack = {
            kind: 'audio',
            isEnabled: true,
            enable: jest.fn(),
            disable: jest.fn()
        };

        mockUseVideoContext.mockImplementation(() => ({
            localTracks: [mockLocalTrack]
        }));

        const { result } = renderHook(useLocalAudioToggle);
        expect(result.current).toEqual([true, expect.any(Function)]);
    });

    describe('toggleAudioEnabled function', () => {
        it('should call track.disable when track is enabled', () => {
            const mockLocalTrack = {
                kind: 'audio',
                isEnabled: true,
                enable: jest.fn(),
                disable: jest.fn()
            };

            mockUseVideoContext.mockImplementation(() => ({
                localTracks: [mockLocalTrack]
            }));

            const { result } = renderHook(useLocalAudioToggle);
            result.current[1]();
            expect(mockLocalTrack.disable).toHaveBeenCalled();
            expect(mockLocalTrack.enable).not.toHaveBeenCalled();
        });

        it('should call track.enable when track is disabled', () => {
            const mockLocalTrack = {
                kind: 'audio',
                isEnabled: false,
                enable: jest.fn(),
                disable: jest.fn()
            };

            mockUseVideoContext.mockImplementation(() => ({
                localTracks: [mockLocalTrack]
            }));

            const { result } = renderHook(useLocalAudioToggle);
            result.current[1]();
            expect(mockLocalTrack.disable).not.toHaveBeenCalled();
            expect(mockLocalTrack.enable).toHaveBeenCalled();
        });

        it('should not throw an error if track is undefined', () => {
            mockUseVideoContext.mockImplementation(() => ({
                localTracks: []
            }));

            const { result } = renderHook(useLocalAudioToggle);
            result.current[1]();
        });
    });
});