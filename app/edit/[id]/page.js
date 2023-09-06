import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  return (
    <div>
      <h1>글 수정</h1>
      <form action="/api/post/edit" method="POST">
        <input
          name="_id"
          defaultValue={result._id}
          style={{ display: "none" }}
        />
        <input name="title" placeholder="글 제목" defaultValue={result.title} />
        <input
          name="content"
          placeholder="글 내용"
          defaultValue={result.content}
        />
        <button type="submit">저장</button>
      </form>
    </div>
  );
}
