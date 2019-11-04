import fs from "fs"
import { promisify } from "util"

export function logDuration<T extends (...args: any[]) => any> (func: T): (...funcArgs: Parameters<T>) => ReturnType<T> {
  const funcName = func.name;

  // Return a new function that tracks how long the original took
  return (...args: Parameters<T>): ReturnType<T> => {
    console.time(funcName);
    const results = func(...args);
		console.timeEnd(funcName);
    return results;
  };
}
