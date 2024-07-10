import {onMounted, onUnmounted} from "vue";

export default function useInterval(callback: () => void, time: number): {
  start: () => void,
  stop: () => void,
} {
  let timer: NodeJS.Timeout | null = null;

  function start(): void {
    timer = setInterval(callback, time);
  }

  function stop(): void {
    if (timer === null) {
      return;
    }

    clearInterval(timer)
    timer = null;
  }

  onMounted(start);
  onUnmounted(stop);

  return {
    start,
    stop,
  };
}
