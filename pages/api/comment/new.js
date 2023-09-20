import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);
  if (req.method == "POST") {
    req.body = JSON.pard(req.body);
    let ret = {
      content: req.body.comment,
      parent: new ObjectId(req.body._id),
      author: session.user.email,
    };

    const db = (await connectDB).db("forum");
    let result = await db.collection("comment").insertOne(ret);
    res.status(200).json("저장 완료");
  }
}
