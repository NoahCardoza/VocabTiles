module.exports = (array, callback) => Promise.all(array.map(callback));
