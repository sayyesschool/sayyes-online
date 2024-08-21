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

    it('should call function after specified delay', async () => {
        const fn = expect.createSpy();
        const debounced = debounce(fn, 200);

        debounced();
        await delay(() => { }, 100);
        expect(fn.calls.length).toBe(0);

        await delay(() => { }, 200);
        expect(fn.calls.length).toBe(1);
    });

    it('should not call function if cancel is called', async () => {
        const fn = expect.createSpy();
        const debounced = debounce(fn, 200);

        debounced();
        debounced.cancel();
        await delay(() => { }, 300);

        expect(fn.calls.length).toBe(0);
    });
});

describe('throttle', () => {
    it('should work', async () => {
        const fn = expect.createSpy();
        const throttled = throttle(fn, 200);

        throttled();
        throttled();
        await delay(() => { }, 200);
        throttled();

        expect(fn.calls.length).toBe(1);
    });

    it('should not call function if less than delay time has passed', async () => {
        const fn = expect.createSpy();
        const throttled = throttle(fn, 200);

        throttled();
        throttled();
        await delay(() => { }, 100);
        throttled();

        expect(fn.calls.length).toBe(0);
    });

    it('should call function if more than delay time has passed', async () => {
        const fn = expect.createSpy();
        const throttled = throttle(fn, 200);

        throttled();
        await delay(() => { }, 200);
        throttled();
        await delay(() => { }, 200);
        throttled();

        expect(fn.calls.length).toBe(2);
    });

    it('should not call function if cancel is called', async () => {
        const fn = expect.createSpy();
        const throttled = throttle(fn, 200);

        throttled();
        throttled.cancel();
        await delay(() => { }, 300);

        expect(fn.calls.length).toBe(0);
    });
});