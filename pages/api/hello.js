// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@/lib/mongodb"
export default async function handler(req, res) {
  const dbClient = await clientPromise;
  const db = dbClient.db('mypoc1');
  //console.log(db)
  res.status(200).json({ name: 'John Doe' })
}
