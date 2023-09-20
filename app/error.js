"use client";

export default function Error({ error, reset }) {
  return (
    <>
      <h4>에러 ...</h4>
      <p>{error}</p>
      <button
        onClick={() => {
          reset();
        }}
      >
        reset
      </button>
    </>
  );
}
