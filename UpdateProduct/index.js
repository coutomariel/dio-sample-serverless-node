const createMongoClient = require('../shared/mongoClient');

const { ObjectID } = require('mongodb')

module.exports = async function (context, req) {
    const { id } = req.params;
    const product = req.body || {};

    if (!id || !product) {
        context.res = {
            status: 400,
            body: 'Provide a product and product id on params',
        };
        return;
    }

    const { client: MongoClient, closeConnectionFn } = await createMongoClient();
    const Products = MongoClient.collection('products');

    try {
        const updatedProduct = await Products.findOneAndUpdate(
            { _id: ObjectID(id) },
            { $set: product },
        );
        closeConnectionFn();

    } catch (error) {
        context.res = {
            status: 500,
            body: 'Error on insert product',
        };
    }

    context.res = {
        status: 200,
        body: updatedProduct
    };

}