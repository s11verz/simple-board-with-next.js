import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Detail(props) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  return (
    <div>
      <h1>상세 페이지</h1>
      <h3>{result.title}</h3>
      <p>{result.date}</p>
      <p>{result.content}</p>
    </div>
  );
}
