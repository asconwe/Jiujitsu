

const getAllWhere = async function getAllWhere(Model, condition) {
  return new Promise((resolve, reject) => {
    return Model.scan(condition).exec((errA, list) => {
      if (list.lastKey) {
        Model.scan(condition).startAt(list.lastKey).exec((errB) => {
          if (errB) return reject(errB);
          return getAllWhere(Model, condition);
        });
      }
      return resolve(list);
    });
  });
};

module.exports = getAllWhere;
