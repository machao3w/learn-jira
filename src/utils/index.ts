import { useEffect, useState } from "react";

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(object).forEach(key => {
    const value = result[key];
    if (value === undefined || value === null || value === "") {
      delete result[key];

    }
  });
  return result;
};

// 空数组 组件加载的时候只执行一次
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();

  }, []);
};


// const debounce = (func, delay) => {
//   let timeout;
//   return () => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(function() {
//       func();
//     }, delay);
//   };
// };


export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

// for (var i = 0; i < 5; i++) {
//   (function (i) {
//     setTimeout(function() {
//       console.log(i + '');
//     }, 100);
//   }(i));
//
// }

export const useArray = <T>(initArray: T[]) => {
  const [value, setValue] = useState(initArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      console.log(copy);
      setValue(copy);
    },
  };
};
