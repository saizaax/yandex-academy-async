module.exports = function (Homework) {
  const getPromise = (arr, index) =>
    new Promise((resolve) => arr.get(index, (result) => resolve(result)))

  const lengthPromise = (arr) =>
    new Promise((resolve) => arr.length((result) => resolve(result)))

  const lessPromise = (a, b) =>
    new Promise((resolve) => Homework.less(a, b, (result) => resolve(result)))

  const addPromise = (a, b) =>
    new Promise((resolve) => Homework.add(a, b, (result) => resolve(result)))

  const equalPromise = (a, b) =>
    new Promise((resolve) => Homework.equal(a, b, (result) => resolve(result)))

  return async (array, fn, initialValue, cb) => {
    let accumulator = !equalPromise(initialValue, undefined)
      ? initialValue
      : await getPromise(array, 0)

    let i = 0

    const loop = async () => {
      const length = await lengthPromise(array)
      if (!(await lessPromise(i, length))) return

      const current = await getPromise(array, i)
      accumulator = await new Promise((resolve) =>
        fn(accumulator, current, i, array, (res) => resolve(res))
      )

      i = await addPromise(i, 1)

      return loop()
    }
    await loop()

    return await cb(accumulator)
  }
}
