import nc from 'next-connect';
import Product from '../../../../server/models/Product';
import {NextApiRequest, NextApiResponse} from "next";
import {isAuth, rolesCanView} from "../../../../server/middlewares/auth";
import db from "../../../../server/db/db";

const handler = nc();
handler.use(isAuth, rolesCanView);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    searchBy, limit, skip, searchValue,
    sort, by
  } = req.query;

  let query = {};
  let sortQuery = {};
  await db.connect();
  const total = await Product.countDocuments();

  if (by !== '' && sort !== '') {
    sortQuery[sort] = by
  }

  console.log('req-query', req.query)
  if (searchValue && searchValue !== '') {

    // const searchBy = searchBy
    // console.log('search-by', searchBy)

    // query = {
    //   $or: [
    //     // { age: { $gte: 29 } },
    //     {[searchBy]: searchValue}
    //   ]
    //   // $gte: searchValue
    // }

    query[searchBy] = searchValue
    // query['searchBy'] = {$gte: req.query.searchValue}
  }

  console.log('query', query)
  const products = await Product
    .find(query)
    .sort(sortQuery)
    .limit(Number(limit))
    .skip(Number(skip));

  await db.disconnect();
  res.send({
    list: products,
    total
  });
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
    tag: req.body.tag,
    tax: req.body.tax,
    sku: req.body.sku,
    quantity: req.body.quantity,
    description: req.body.description,
  });
  await newProduct.save();
  await db.disconnect();
  res.status(200).send({message: 'created product success'});
});

export default handler;