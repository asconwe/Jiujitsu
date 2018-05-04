const meetsAllCriteria = (item, criteria) => {
  const validItems = criteria.filter(criterion => criterion(item));
  return validItems.length === criteria.length;
};

const filterList = (list, criteria) => (
  list.filter(item => meetsAllCriteria(item, criteria))
);

export default filterList;
