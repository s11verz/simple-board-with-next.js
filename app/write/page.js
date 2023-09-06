export default function Write() {
  return (
    <div>
      <h1>글 작성</h1>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글 제목" />
        <input name="content" placeholder="글 내용" />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
