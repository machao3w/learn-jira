import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stateName: "idle" | "loading" | "error" | "success"
}

const defaultInitState: State<null> = {
  error: null,
  data: null,
  stateName: "idle",
};

export const useAsync = <D>(initState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitState,
    ...initState,
  });

  const setData = (data: D) => setState({
    error: null,
    data,
    stateName: "success",
  });

  const setError = (error: Error) => setState({
    error,
    data: null,
    stateName: "error",
  });

  // 用来触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }
    setState({ ...state, stateName: "loading" });
    return promise.then(data => {
      setData(data);
      return data;
    }).catch(error => {
      setError(error);
      return error;
    });
  };

  return {
    isIdle: state.stateName === "idle",
    isLoading: state.stateName === "loading",
    isError: state.stateName === "error",
    isSuccess: state.stateName === "success",
    run,
    setData,
    setError,
    ...state,
  };

};