import { renderHook, act } from '@testing-library/react-native';
import { useDebounce } from '../use-debounce';

describe('useDebounce', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return the initial value', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce the value change', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    expect(result.current).toBe('initial');

    // Update the value
    rerender({ value: 'updated', delay: 500 });

    // Value should not be updated immediately
    expect(result.current).toBe('initial');

    // Fast-forward time by 250ms (half the delay)
    act(() => {
      jest.advanceTimersByTime(250);
    });

    // Value should still not be updated
    expect(result.current).toBe('initial');

    // Fast-forward time by another 250ms
    act(() => {
      jest.advanceTimersByTime(250);
    });

    // Value should now be updated
    expect(result.current).toBe('updated');
  });

  it('should reset timer if value changes before delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    // Update the value
    rerender({ value: 'updated1', delay: 500 });

    // Fast-forward time by 250ms
    act(() => {
      jest.advanceTimersByTime(250);
    });

    // Update the value again before the previous timer finishes
    rerender({ value: 'updated2', delay: 500 });

    // Fast-forward time by 250ms (which would have finished the first timer)
    act(() => {
      jest.advanceTimersByTime(250);
    });

    // Value should still be 'initial' because the first timer was cancelled
    expect(result.current).toBe('initial');

    // Fast-forward time by another 250ms to finish the second timer
    act(() => {
      jest.advanceTimersByTime(250);
    });

    // Value should now be the latest value
    expect(result.current).toBe('updated2');
  });
});
