const { MongoClient } = require('mongodb');

require('dotenv').config()
const { DB_USER, DB_PASS, DB_NAME } = process.env;


const config = {
    url: `mongodb+srv://${DB_USER}:${DB_PASS}@cluster-ds-api.odkrz.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    // url: 'mongodb+srv://user_admin:user_admin@cluster-ds-api.odkrz.mongodb.net/dio-serverless?retryWrites=true&w=majority'
}


module.exports = () => new Promise((resolve, reject) => {
    MongoClient
        .connect(config.url, { useNewUrlParser: true }, (err, mongoConnection) =>
            err
                ? reject(err)
                : resolve({
                    client: mongoConnection.db(config.dbName),
                    closeConnectionFn: () => setTimeout(() => {
                        mongoConnection.close();
                    }, 1000),
                    mongoConnection,
                })
        )
});