import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  let session = await getServerSession(request, response, authOptions);
  if (session) {
    request.body.author = session.user.email;
  }
  if (request.method == "POST") {
    if (request.body.title == "") {
      return response.status(500).json("제목 안씀");
    }

    let today = new Date();
    let requestBody = {
      title: request.body.title,
      content: request.body.content,
      date: `${today.getMonth() + 1}월 ${today.getDate()}일`,
    };

    const db = (await connectDB).db("forum");
    let result = await db.collection("post").insertOne(requestBody);
    return response.status(200).redirect("/list");
  }
}
