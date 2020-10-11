module.exports = (iter) => {
  let value = iter.next();
  const arr = [];
  while (!value.done) {
    arr.push(value.value);
    value = iter.next();
  }
  return arr;
};
