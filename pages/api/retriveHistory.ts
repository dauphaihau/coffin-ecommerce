import Ably from "ably/promises";

export default async function handler(req, res) {
  // const tokenRequestData = await client.auth.createTokenRequest({ clientId: 'ably-nextjs-demo' });
  // res.status(200).json(tokenRequestData);

  const realtime = new Ably.Realtime(process.env.ABLY_API_KEY);
  realtime.channels.get('coffin', {
    params: {rewind: '3'}
  }).subscribe(msg => console.log("Received message: ", msg));
};
