const dbUrl = "mongodb://har_apa:sample@cluster0-shard-00-00.rajgq.mongodb.net:27017,cluster0-shard-00-01.rajgq.mongodb.net:27017,cluster0-shard-00-02.rajgq.mongodb.net:27017/inventory_database?ssl=true&replicaSet=atlas-p5x8uc-shard-0&authSource=admin&retryWrites=true&w=majority";
const port = process.env.PORT||3000;

module.exports = {dbUrl,port};
