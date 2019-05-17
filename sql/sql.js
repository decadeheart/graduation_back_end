module.exports = {
  queryAll: 'SELECT * FROM ??',
  queryById: 'SELECT * FROM ?? WHERE id=?',
  del: 'DELETE FROM ?? WHERE id=?',
  chooseTen:'SELECT * FROM ?? ORDER BY grade DESC limit 10 ',
  chooseScore:'SELECT * FROM ?? ORDER BY score DESC limit 10 ',
};