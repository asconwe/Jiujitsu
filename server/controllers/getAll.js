const getAll = async function getAll(Model) {
  return new Promise((resolve, reject) => (
    Model.scan().exec((errA, list) => {
      if (list.lastKey) {
        Model.scan().startAt(list.lastKey).exec((errB) => {
          if (errB) return reject(errB);
          return getAll(Model);
        });
      }
      return resolve(list);
    })
  ));
};

module.exports = getAll;
