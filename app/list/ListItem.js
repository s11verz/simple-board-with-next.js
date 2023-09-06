"use client";

import Link from "next/link";

export default function ListItem({ result }) {
  return (
    <>
      {result.map((item, i) => {
        return (
          <div className="list-item" key={i}>
            <Link href={`/detail/${item._id}`}>
              <h4>{item.title}</h4>
            </Link>
            <p>{item.date}</p>
            <div className="buttons">
              <Link href={`/edit/${item._id}`} className="edit-button">
                수정
              </Link>
              <div
                className="delete-button"
                onClick={(e) => {
                  fetch("/api/post/delete", {
                    method: "DELETE",
                    body: { _id: item._id },
                  })
                    .then((r) => {
                      r.json();
                    })
                    .then(() => {
                      e.target.parentElement.parentElement.style.opacity = 0;
                      setTimeout(() => {
                        e.target.parentElement.parentElement.style.display =
                          "none";
                      }, 1000);
                    });
                }}
              >
                삭제
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
