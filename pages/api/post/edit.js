import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request, response) {
  if (request.body.title == "") {
    return response.status(500).json("제목 안씀");
  }

  let requestBody = {
    title: request.body.title,
    content: request.body.content,
  };

  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .updateOne({ _id: new ObjectId(request.body._id) }, { $set: requestBody });
  return response.status(200).redirect("/list");
}
