import expect from 'expect';

import { debounce, delay, throttle } from '@/shared/utils/fn';

describe('debounce', () => {
    it('should work', async () => {
        const fn = expect.createSpy();
        const debounced = debounce(fn, 200);

        await delay(debounced, 100);
        await delay(debounced, 100);
        await delay(debounced, 200);
        await delay(debounced, 100);
        await delay(debounced, 100);

        expect(fn.calls.length).toBe(1);
    });
});

describe('throttle', () => {
    it('should work', async () => {
        const fn = expect.createSpy();
        const throttled = throttle(fn, 200);

        await delay(throttled, 100);
        await delay(throttled, 100);
        await delay(throttled, 100);
        await delay(throttled, 100);
        await delay(throttled, 100);

        expect(fn.calls.length).toBe(2);
    });
});