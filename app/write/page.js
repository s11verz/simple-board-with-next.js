import { useState } from "react";

export default function Write() {
  const [src, setSrc] = useState("");

  return (
    <div>
      <h1>글 작성</h1>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글 제목" />
        <input name="content" placeholder="글 내용" />
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            let file = e.target.files[0];
            let filename = encodeURIComponent(file.name);
            let res = await fetch(`/api/post/image?file=${filename}`);
            res = await res.json();

            const formData = new FormData();
            Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
              formData.append(key, value);
            });
            let result = await fetch(res.url, {
              method: "POST",
              body: formData,
            });
            if (result.ok) {
              setSrc(`${result.url}/${filename}`);
            }
          }}
        />
        <img src={src} />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
