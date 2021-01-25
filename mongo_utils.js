const MongoClient = require('mongodb').MongoClient,
  url = 'mongodb://localhost:27017'

let _db, _collection

module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(
      url,
      {
        useNewUrlParser: true,
        keepAlive: true,
        useUnifiedTopology: true
      },
      (err, client) => {
        console.log('connected db with server')
        _db = client.db('password-manager-1')
        _collection = _db.collection('users')
        return callback(err)
      })
  },
  getCollection: function () {
    return _collection
  }
}

// sklibrary0310