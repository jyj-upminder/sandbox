import * as workerpool from 'workerpool';

const pool = workerpool.pool(__dirname + '/worker.ts');

export function makeBackgroundable<T extends (...args: any[]) => any>(func: T): (...funcArgs: Parameters<T>) => Promise<ReturnType<T>> {
  const funcName = func.name;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return pool.exec(funcName, args) as unknown as Promise<ReturnType<T>>
  };
}

export function createRandomDataFileWorker(numBytes: number): Promise<any> {
  return pool.exec('createRandomDataFile', [numBytes])  
}