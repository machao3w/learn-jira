import { useAsync } from "./use-async";
import { Project } from "../screen/project-list/list";
import { useEffect } from "react";
import { useHttp } from "./http";
import { cleanObject } from "./index";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
  }, [param]); // param有变动时 触发

  return result;
};
