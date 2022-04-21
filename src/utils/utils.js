export const debounce = (callback, wait = 300) => {
  let timer;
  return (...args) => {
    const later = () => {
      clearTimeout(timer);
      callback(...args);
    };
    clearTimeout(timer);
    timer = setTimeout(later, wait);
  };
};
