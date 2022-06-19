import nc from "next-connect";
import {NextApiRequest, NextApiResponse} from "next";
import {IncomingForm} from 'formidable'

import mv from 'mv';

const handler = nc();
export const config = {
  api: {
    bodyParser: false,
  }
};

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {

  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm()

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      console.log(fields, files)
      console.log(files.file.filepath)
      const oldPath = files.file.filepath;
      const newPath = `./public/uploads/${files.file.originalFilename}`;
      mv(oldPath, newPath, function (err) {
      });
      res.status(200).json({fields, files})
    })
  })
});

export default handler;
