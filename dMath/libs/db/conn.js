const{MongoClient:MongoClient}=require("mongodb"),client=new MongoClient("mongodb://0.0.0.0:27017",{useNewUrlParser:!0,useUnifiedTopology:!0});var _db;module.exports={connectToServer:function(o){client.connect(function(n,e){return e&&(_db=e.db("weblogs"),console.log("Successfully connected to MongoDB.")),o(n)})},getDb:function(o){return null==_db&&console.log("Database is Null"),_db},testLogs:function(){console.log("logs...")},listDb:async function(){databasesList=await client.db().admin().listDatabases(),console.log("Databases:"),databasesList.databases.forEach(o=>console.log(` - ${o.name}`))},autoListing:async function(o){console.log("autolisting...");const n=await client.db("dogs_api").collection("listingsAndReviews").insertOne(o);console.log(`New listing created with the following id: ${n.insertedId}`)}};