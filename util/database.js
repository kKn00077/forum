const { MongoClient } = require("mongodb");

// DB 서버 연결

const url = 'mongodb+srv://kkn00077:knkn8552@atlascluster.dzavznx.mongodb.net/?retryWrites=true&w=majority';
const options = {}; //  useNewUrlParser: true 
let connectDB;

if(process.env.NODE_ENV === 'development') {
    if(!global._mongo) {
        global._mongo = new MongoClient(url, options).connect();
    }
    connectDB = global._mongo;
} else {
    connectDB = new MongoClient(url, options).connect();
}

export { connectDB }