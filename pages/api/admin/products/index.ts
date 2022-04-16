import nc from 'next-connect';
import Product from '../../../../models/Product';
import {NextApiRequest, NextApiResponse} from "next";
import {isAuth, rolesCanView} from "../../../../utils/middlewares/auth";
import db from "../../../../utils/db/db";

const handler = nc();
handler.use(isAuth, rolesCanView);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();
    const users = await Product.find({});
    await db.disconnect();
    res.send(users);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();

    if (await Product.findOne({name: req.body.name})) {
        res.status(409).send({message: `"${req.body.name}" already exists`});
    }

    const newProduct = new Product({
        slug: 'sample-slug-' + Math.random(),
        name: req.body.name,
        color: req.body.color,
        // slug: req.body.slug,
        brand: req.body.brand,
        // image: req.body.image,
        price: req.body.price,
        salePrice: req.body.salePrice,
        category: req.body.category,
        sku: req.body.sku,
        quantity: req.body.quantity,
        description: req.body.description,
    });
    await newProduct.save();
    await db.disconnect();
    res.status(200).send({message: 'created product success'});
});

export default handler;