"use client";

import { router } from "next/router";

export default function RegisterButton() {
  return (
    <button
      onClick={() => {
        console.log("register");
        router.push("/register");
      }}
    >
      회원가입
    </button>
  );
}
