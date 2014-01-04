﻿module.exports = function(client, callback) {

	client.context.data = { status:0 };

	var path = client.req.fields.source.substring(1).split('/'),
		dbName = path[0],
		url = impress.config.databases[dbName].url,
		schema = url.substr(0, url.indexOf(':')),
		driver = db[dbName],
		data = JSON.parse(client.req.fields.data) || {};
	if (data.index) delete data.index;
	if (path.length == 3) {
		if (schema == 'mysql') {
			var tableName = path[1]+'.'+path[2];
			driver.insert(tableName, data, function(err, recordId, query) {
				if (!err) {
					var sql = query.sql.replace(path[1]+'.', ''); // replace(/`/g, '').
					client.context.data = {
						status: recordId>0 ? 1 : 0,
						sql: sql
					};
					if (recordId) {
						driver.fields(tableName, function(err, fields) {
							if (!err) {
								var uniqueKey = null;
								for (var i in fields) {
									var field = fields[i],
										fieldName = field['Field'];
									if (!uniqueKey && (field['Key']=='PRI' || field['Key']=='UNI')) uniqueKey = fieldName;
								}
								if (uniqueKey) {
									var where = {};
									where[uniqueKey] = recordId;
									where = driver.where(where);
									driver.queryRow('SELECT * FROM '+db.escape(tableName)+' WHERE '+where, [], function(err, data) {
										if (!data) data = [];
										client.context.data.data = data;
										callback();
									});
								} else callback();
							} else callback();
						});
					} else callback();
				} else callback();
			});
		} else if (schema == 'mongodb') {
			var dbClient = db.drivers.mongodb.MongoClient,
				url = 'mongodb://localhost:27017/'+path[1];
			dbClient.connect(url, function(err, connection) {
				connection.createCollection(path[2], function(err, collection) {
					collection.insert(data,  function(err, data) {
						if (!err) client.context.data = { status: 1, data: data[0] };
						callback();
					});
				});
			});
		} else callback();
	} else callback();

}