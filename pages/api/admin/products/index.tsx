import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import Product from '../../../../models/Product';
import {NextApiRequest, NextApiResponse} from "next";
import {isAdmin, isAuth} from "../../../../utils/middlewares/auth";
import db from "../../../../utils/db/db";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();
    const users = await Product.find({});
    await db.disconnect();
    res.send(users);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();

    // if (await Product.findOne({email: req.body.email})) {
    //     res.status(409).send({message: `"${req.body.email}" already exists`});
    // }

    const newProduct = new Product({
        name: req.body.name,
        // slug: req.body.slug,
        brand: req.body.brand,
        // image: req.body.image,
        price: req.body.price,
        salePrice: req.body.salePrice,
        category: req.body.category,
        stock: req.body.stock,
        description: req.body.description,
    });
    await newProduct.save();
    await db.disconnect();
    res.status(200).send({message: 'created product success'});
});

export default handler;