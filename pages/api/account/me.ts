import {NextApiRequest, NextApiResponse} from "next";
import nc from 'next-connect';
import jwt from "jsonwebtoken";

const handler = nc();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {

  const {authorization} = req.headers;
  if (authorization) {
    // Bearer xxx => xxx
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, decode) => {
      // jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({message: 'Token is not valid'});
      } else res.send({code: '200', data: decode})
    });
  } else {
    res.status(401).send({message: 'Token is not supplied'});
  }
});

export default handler;