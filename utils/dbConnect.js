
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URL || "";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
   },
});

let db;

const connectToServer = async (callback) => {
   try {
      dbConnection = await client.connect();
      db = dbConnection.db("mvcServerDatabase");
      console.log("database connected Successfully");
      if (db) {
         callback();
      }
   } catch (e) {
      callback(err);
   }
};

const getDb = () => {
   return db;
};

module.exports = { connectToServer, getDb };

