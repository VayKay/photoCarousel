var cassandra = require('cassandra-driver'); 

var client = new cassandra.Client({contactPoints: contactPoints, authProvider: authProvider, keyspace:'grocery'});
 