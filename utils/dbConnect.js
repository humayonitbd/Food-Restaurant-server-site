
// const { MongoClient, ServerApiVersion } = require('mongodb');
// // const connectionURL = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.epqkzkd.mongodb.net/?retryWrites=true&w=majority`;
// const uri = process.env.MONGO_URL;
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// let dbConnection;
// module.exports = {
//     connectToServer: function (callback){
//         client.connect(function(err, db){
//             if(err || !db){
//                 return callback(err);
//             }

//             dbConnection = db.db("DBName");
//             console.log("Successfully connected to mongodb");
//             return callback();
//         });
//     },

//     getDb: function(){
//         return dbConnection;
//     },
// }



const { MongoClient, ServerApiVersion } = require("mongodb");

let client = null;

async function connect() {
  if (client) {
    return client; // Return the existing client if it already exists
  }

  const uri = process.env.MONGO_URL;
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    const databaseName = 'mvcDatabase'; // Specify the database name you want to connect to.
//   const client =  connect(databaseName);
    await client.connect(databaseName);
    console.log(`Database Connected successfull name:${databaseName} !`);
    return client;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}


function getClient() {
  if (!client) {
    throw new Error("Database client has not been initialized. Call connect() first.");
  }

  return client;
}

module.exports = {
  connect,
  getClient,
};
