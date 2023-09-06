import { connectDB } from "@/util/database";
import Link from "next/link";

export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();

  return (
    <div className="list-bg">
      {result.map((e, i) => (
        <ListItem id={e._id} title={e.title} date={e.date} key={i} />
      ))}
    </div>
  );
}

const ListItem = (props) => {
  return (
    <div className="list-item">
      <Link href={`/detail/${props.id}`}>
        <h4>{props.title}</h4>
      </Link>
      <p>{props.date}</p>
      <Link href={`/edit/${props.id}`} className="edit-button">
        수정
      </Link>
    </div>
  );
};
