export const debounce = (fn: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout | undefined = undefined;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
