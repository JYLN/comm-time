import { derived, writable } from 'svelte/store';

export enum TIMERSTATE {
  RUNNING,
  PAUSED,
  STOPPED
}

export const timerState = writable(TIMERSTATE.STOPPED as TIMERSTATE);

function createTime() {
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    updateTime: () => update((n) => n + 1),
    reset: () => set(0)
  };
}

export const time = createTime();

function createTimeStops() {
  const { subscribe, set, update } = writable([] as string[]);

  return {
    subscribe,
    updateStops: (newStop: string) => update((stops) => [...stops, newStop]),
    clearStops: () => set([])
  };
}

export const timeStops = createTimeStops();

function calculateElapsedTime(start: string, end: string): number {
  const startTime = new Date(start);
  const endTime = new Date(end);

  return endTime.getTime() - startTime.getTime();
}

export const elaspedTime = derived(timeStops, ($timeStops) =>
  $timeStops.reduce((total, string, index, arr) => {
    if (index === 0) return 0;
    return total + calculateElapsedTime(arr[index - 1], string);
  }, 0)
);

export const timeDisplay = derived(time, ($time) => {
  function formatToString(num: number): string {
    return num.toString().padStart(2, '0');
  }

  const hours = formatToString(Math.floor($time / 3600));
  const minutes = formatToString(Math.floor(($time % 3600) / 60));
  const seconds = formatToString(Math.floor($time % 60));

  return `${hours}:${minutes}:${seconds}`;
});
