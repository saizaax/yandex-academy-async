export interface IAsyncArray {
  set: (index: number, value: number, cb: (value: any) => void) => void
  push: (value: number, cb: (value: any) => void) => void
  get: (index: number, cb: (value: any) => void) => void
  pop: (cb: (value: any) => void) => void
  length: (cb: (value: number | PromiseLike<number>) => void) => void
  print: () => void
}

export interface IHomework {
  AsyncArray: (initial: number[]) => void
  add: (a: number, b: number, cb: (value: void) => void) => void
  subtract: (a: number, b: number, cb: (value: void) => void) => void
  multiply: (a: number, b: number, cb: (value: void) => void) => void
  divide: (a: number, b: number, cb: (value: void) => void) => void
  less: (a: number, b: number, cb: (value: void) => void) => void
  equal: (a: number, b: number, cb: (value: void) => void) => void
  lessOrEqual: (a: number, b: number, cb: (value: void) => void) => void
}
