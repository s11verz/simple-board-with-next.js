import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  if (request.method == "DELETE") {
    let session = await getServerSession(request, response, authOptions);
    const db = (await connectDB).db("forum");
    let find = await db
      .collection("post")
      .findOne({ _id: new ObjectId(request.body) });
    if (find.author == session.user.email) {
      let result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(request.body._id) });
      response.status(200).redirect("/list");
    } else {
      return 응답.status(500).json("현재유저와 작성자 불일치");
    }
  }
}
