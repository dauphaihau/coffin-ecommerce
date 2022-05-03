import {NextApiRequest, NextApiResponse} from "next";
import handler from "./forgot-password";
import bcrypt from "bcryptjs";

const sendEmail = require('../../../server/middlewares/email')
const bcryptSalt = process.env.BCRYPT_SALT;
import Token from "../../../server/models/Token";
import User from "../../../server/models/User";

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const {userId, token, password} = req.body

  let passwordResetToken = await Token.findOne({userId});
  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }
  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }
  const hash = await bcrypt.hash(password, Number(bcryptSalt));
  await User.updateOne(
    {_id: userId},
    {$set: {password: hash}},
    {new: true}
  );
  const user = await User.findById({_id: userId});
  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.name,
    },
    "./layouts/resetPassword.handlebars"
  );
  await passwordResetToken.deleteOne();
  return true;
});

