import nc from 'next-connect';
import Product from '../../../../models/Product';
import {NextApiRequest, NextApiResponse} from "next";
import {isAuth, rolesCanDelete, rolesCanView} from "../../../../utils/middlewares/auth";
import db from "../../../../utils/db/db";

const handler = nc();
// handler.use(isAuth, rolesCanView);
//
// handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
//   await db.connect();
//   const products = await Product.find({});
//   await db.disconnect();
//   res.send(products);
// });
//
// handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
//   await db.connect();
//
//   if (await Product.findOne({name: req.body.name})) {
//     res.status(409).send({message: `"${req.body.name}" already exists`});
//   }
//
//   const newProduct = new Product({
//     slug: 'sample-slug-' + Math.random(),
//     name: req.body.name,
//     color: req.body.color,
//     // slug: req.body.slug,
//     brand: req.body.brand,
//     // image: req.body.image,
//     price: req.body.price,
//     salePrice: req.body.salePrice,
//     category: req.body.category,
//     tag: req.body.tag,
//     tax: req.body.tax,
//     sku: req.body.sku,
//     quantity: req.body.quantity,
//     description: req.body.description,
//   });
//   await newProduct.save();
//   await db.disconnect();
//   res.status(200).send({message: 'created product success'});
// });


// handler.use(isAuth, rolesCanDelete);
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  // const product = await Product.findById(req.query.id);


  console.log('req-body', req.body)
  // const products = await Product.find({});
  Product.remove({id: {$in: req.body}}, (err) => {
      if (err) return res.send("Error while deleting " + err.message);
      // res.send("Some useful message here...");

      res.send({message: 'Products Deleted'});
    }
  );
  // await products.remove();
  await db.disconnect();

  // if (req.body.idsArray.length > 0) {
  //     Product.remove({ id: { $in: req.body.idsArray } });
  //     // await products.remove();
  //     await db.disconnect();
  //     res.send({message: 'Products Deleted'});
  // } else {
  //     await db.disconnect();
  //     res.status(404).send({message: 'Product Not Found'});
  // }
});

export default handler;