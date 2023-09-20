"use client";

import { useState } from "react";

export default function Comment(props) {
  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("---");
    console.log(props._id);
    fetch(`/api/comment/list?id=${props._id}`)
      .then((r) => r.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  return (
    <div>
      <hr></hr>
      {data.length > 0
        ? data.map((_data, i) => {
            return <p key={i}>{_data.content}</p>;
          })
        : "댓글 없음"}
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ comment: comment, _id: props._id }),
          });
        }}
      >
        등록
      </button>
    </div>
  );
}
