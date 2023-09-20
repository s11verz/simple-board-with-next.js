import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./comment";
import { notFound } from "next/navigation";

export default async function Detail(props) {
  useEffect(() => {
    console.log(props);
  }, []);

  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params._id) });

  if (result === null) {
    return notFound();
  }

  return (
    <div>
      <h1>상세 페이지</h1>
      <h3>{result.title}</h3>
      <p>{result.date}</p>
      <p>{result.content}</p>
      <Comment _id={result._id.toString()} />
    </div>
  );
}
