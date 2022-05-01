import nc from 'next-connect';
import crypto from 'crypto';
import bcrypt from "bcryptjs";
import {NextApiRequest, NextApiResponse} from "next";
let nodemailer = require('nodemailer')

const bcryptSalt = process.env.BCRYPT_SALT;
import User from '../../../models/User';
import Token from '../../../models/Token';
import db from "../../../utils/db/db";
import fs from "fs";
import path from "path";

const handler = nc();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {

  await db.connect();
  let user = await User.findOne({email: req.body.email});
  // if (!user) throw new Error("User does not exist");
  if (!user) res.status(401).send("User does not exist");

  let token = await Token.findOne({userId: user._id});
  if (token) await token.deleteOne();

  // token will send to the user
  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  await db.disconnect();
  // const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
  const link = `https://coffin-ecommerce.vercel.app/reset-password?token=${resetToken}&id=${user._id}`;

  // await sendEmail(user.email, "Password Reset Request", {
  //   name: user.name,
  //   link: link,
  // }, "./template/requestResetPassword.handlebars");
  // return link;

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: 'mailtestcoffin@gmail.com',
      pass: 'Landmaro12',
    },
    secure: true,
  })

  const mailData = {
    from: 'demo@demo.com',
    to: 'your email',
    subject: `Message From coffin-store@gmail.com`,
    text: `abckabcla`,
    // html: <div>{req.body.message}</div>
  }

  // Send email
  await transporter.sendMail(mailData, (err, info) => {
    if (err)
      console.log(err)
    else
      console.log(info)
  })

  res.status(200)
});

export default handler;
