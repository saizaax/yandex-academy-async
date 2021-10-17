import { IHomework, IAsyncArray } from "./models"

export default function (Homework: IHomework) {
  function getPromise(arr: IAsyncArray, index: number) {
    return new Promise<number>((resolve) => arr.get(index, resolve))
  }

  function lengthPromise(arr: IAsyncArray) {
    return new Promise<number>((resolve) => arr.length(resolve))
  }

  return async (
    array: IAsyncArray,
    fn: (
      acc: number,
      curr: number,
      i: number,
      src: IAsyncArray,
      cb: (arg0: number) => void
    ) => void,
    initialValue: number,
    cb: (arg0: number) => void
  ) => {
    let accumulator = initialValue

    const length: number = await lengthPromise(array)
    const arrayIndexes: number[] = Array.from({ length: length }, (v, k) => k)

    for (let i of arrayIndexes) {
      const current: number = await getPromise(array, i)
      accumulator = await new Promise<number>((resolve) =>
        fn(accumulator, current, i, array, (res) => resolve(res))
      )
    }

    return cb(accumulator)
  }
}
