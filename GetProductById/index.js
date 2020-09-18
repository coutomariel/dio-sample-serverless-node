const createMongoClient = require('../shared/mongoClient');

const { ObjectID } = require('mongodb')

module.exports = async function (context, req) {

    const { id } = req.params;

    if (!id) {
        context.res = {
            status: 400,
            body: 'Provide a product id on params',
        };
        return;
    }

    const { client: MongoClient, closeConnectionFn } = await createMongoClient();
    const Products = MongoClient.collection('products');

    const res = await Products.findOne({ _id: ObjectID(id) });
    closeConnectionFn();

    context.res = {
        status: 200,
        body: res
    }


}