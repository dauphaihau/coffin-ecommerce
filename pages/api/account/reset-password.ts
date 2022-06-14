import {NextApiRequest, NextApiResponse} from 'next';
import nc from 'next-connect';
const bcrypt = require('bcryptjs');

const bcryptSalt = process.env.BCRYPT_SALT;
import Token from '../../../server/models/Token';
import User from '../../../server/models/User';
import {encryptText} from "../../../utils/helpers";
import config from "../../../config.json";

const handler = nc();
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const {userId, token, password} = req.body
  try {
    let tokenUserData = await Token.findOne({userId});
    if (!tokenUserData) {
      res.send({
        status: '401',
        message: 'User does not exists! '
      });
    }
    bcrypt.hash(tokenUserData.token, Number(bcryptSalt), function (err, hash) {
      if (err) throw (err);
      bcrypt.compare(token, hash, function (err, result) {
        if (err) {
          res.status(401);
          res.send({
            status: '401',
            message: 'Invalid or expired password reset token'
          });
        }
        console.log(result);
      });
    });

    // const hash = await bcrypt.hash(password, Number(bcryptSalt));
    const encrypted = encryptText(password, config.cryptoKey)

    await User.updateOne(
      {_id: userId},
      {$set: {password: encrypted}},
      // {$set: {password: hash}},
      {new: true}
    );
    return res.send({
      status: '200',
      message: 'Password has been reseted!'
    });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send('Ooops, something went wrong!');
  }
});

export default handler

