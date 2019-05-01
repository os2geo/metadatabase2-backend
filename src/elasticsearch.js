const elasticsearch = require('elasticsearch');
module.exports = function (app) {
  const connectionString = app.get('elasticsearch');
  console.log('elasticsearch', connectionString);
  const client = new elasticsearch.Client({
    host: connectionString,
    apiVersion: '6.0'
  });
  app.set('esClient', client);
};
