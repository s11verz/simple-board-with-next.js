import { connectDB } from "@/util/database";

export default async function handler(request, response) {
  if (request.method == "POST") {
    if (request.body.title == "") {
      return;
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
