db = db.getSiblingDB('userdb');
db.createCollection('usercollection');
db.usercollection.insert({
  username: 'ariya',
  password: 'ariya'
});
