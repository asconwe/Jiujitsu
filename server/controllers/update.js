
module.exports = (id, newItem, Model) => new Promise((resolve, reject) => {
  Model.get(id)
    .then((oldItem) => {
      const item = Object.assign({}, oldItem, newItem);
      return item.save((err) => {
        if (err) throw err;
        resolve(id);
      });
    })
    .catch(err => reject(err));
});
