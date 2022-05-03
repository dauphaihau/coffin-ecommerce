import nc from 'next-connect';
// import Product from '../../models/Product';
import data from "../../assets/data/users";
import User from "../../server/models/User";
import db from "../../server/db/db";
import {NextApiRequest, NextApiResponse} from "next";

const handler = nc();

console.log('data', data)

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  // return res.send({message: 'already seeded'});
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  // await Product.deleteMany();
  // await Product.insertMany(data.products);
  await db.disconnect();
  return res.send({message: 'seeded successfully'});
});

export default handler;
