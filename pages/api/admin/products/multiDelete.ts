import nc from 'next-connect';
import Product from '../../../../server/models/Product';
import {NextApiRequest, NextApiResponse} from "next";
import {isAuth, rolesCanDelete, rolesCanView} from "../../../../server/middlewares/auth";
import db from "../../../../server/db/db";

const handler = nc();

// handler.use(isAuth, rolesCanDelete);
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();

  console.log('req-body', req.body)
  Product.deleteMany({_id: {$in: req.body}}, (err) => {
      if (err) return res.send("Error while deleting " + err.message);
      // res.send("Some useful message here...");
      res.send({message: 'Products Deleted'});
    }
  );
  await db.disconnect();
});

export default handler;