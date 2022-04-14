import User from "../../../../../models/User";
import db from "../../../../../utils/db/db";
import {isAdmin, isAuth} from "../../../../../utils/middlewares/auth";
import nc from "next-connect";
import {NextApiRequest, NextApiResponse} from "next";
import Product from "../../../../../models/Product";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();
    const product = await Product.findById(req.query.id);
    await db.disconnect();
    res.send(product);
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();
    const product = await Product.findById(req.query.id);
    if (product) {
        product.name = req.body.name;
        product.category = req.body.category;
        product.price = req.body.price;
        product.salePrice = req.body.salePrice;
        product.brand = req.body.brand;
        product.color = req.body.color;
        product.quantity = req.body.quantity;
        product.description = req.body.description;
        await product.save();
        await db.disconnect();
        res.send({ message: 'Product Updated Successfully' });
    } else {
        await db.disconnect();
        res.status(404).send({ message: 'Product Not Found' });
    }
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();
    const product = await Product.findById(req.query.id);
    if (product) {
        await product.remove();
        await db.disconnect();
        res.send({message: 'Product Deleted'});
    } else {
        await db.disconnect();
        res.status(404).send({message: 'Product Not Found'});
    }
});

export default handler;