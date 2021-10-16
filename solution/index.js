module.exports = function (Homework) {
  function getPromise(arr, index) {
    return new Promise((resolve) => arr.get(index, resolve))
  }

  function lengthPromise(arr) {
    return new Promise((resolve) => arr.length(resolve))
  }

  function equalPromise(a, b) {
    return new Promise((resolve) => Homework.equal(a, b, resolve))
  }

  return async (array, fn, initialValue, cb) => {
    let accumulator = !equalPromise(initialValue, undefined)
      ? initialValue
      : await getPromise(array, 0)

    const length = await lengthPromise(array)
    const arrayIndexes = Array.from({ length: length }, (v, k) => k)

    for (let i in arrayIndexes) {
      const current = await getPromise(array, i)
      accumulator = await new Promise((resolve) =>
        fn(accumulator, current, i, array, (res) => resolve(res))
      )
    }

    return cb(accumulator)
  }
}
