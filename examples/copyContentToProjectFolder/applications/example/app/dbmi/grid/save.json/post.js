﻿module.exports = function(client, callback) {

	client.context.data = { status:0 };

	var path = client.req.fields.source.substring(1).split('/'),
		dbName = path[0],
		url = impress.config.databases[dbName].url,
		schema = url.substr(0, url.indexOf(':')),
		driver = db[dbName],
		data = JSON.parse(client.req.fields.data);
	if (path.length == 3) {
		if (schema == 'mysql') {
			var tableName = path[1]+'.'+path[2];
			driver.update(tableName, data, function(err, affectedRows, query) {
				if (!err) {
					var sql = query.sql.replace(path[1]+'.', ''); // replace(/`/g, '').
					client.context.data = {
						status: affectedRows>0 ? 1 : 0,
						sql: sql
					};
				}
				callback();
			});
		} else if (schema == 'mongodb') {
			var dbClient = db.drivers.mongodb.MongoClient,
				url = 'mongodb://localhost:27017/'+path[1];
			dbClient.connect(url, function(err, connection) {
				connection.createCollection(path[2], function(err, collection) {
					var objectId = db.mongodb.oid(data._id);
					delete data._id;
					collection.update({ _id: objectId }, { $set: data },  function(err) {
						if (!err) client.context.data = { status: 1 };
						callback();
					});
				});
			});
		} else callback();
	} else callback();

}