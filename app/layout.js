import "./globals.css";
import { Inter, Signika_Negative } from "next/font/google";
import Link from "next/link";
import LoginButton from "./loginButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LogoutButton from "./logoutButton";
import RegisterButton from "./registerButton";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions);

  let res = cookies().get("mode");

  return (
    <html lang="en">
      <body
        className={res !== undefined && res.value == "dark" ? "dark-mode" : ""}
      >
        <div className="navbar">
          <div>
            <Link href="/" className="logo">
              Appleforum
            </Link>
            <Link href="/list">List</Link>
          </div>
          <div>
            {session == null ? (
              <div className="login-container">
                <LoginButton />
                <div className="divider"></div>
                <RegisterButton />
              </div>
            ) : (
              <>
                <div className="login-container">
                  <div>{session.user.name}님 안녕하세요!</div>
                  <div className="divider"></div>
                  <LogoutButton />
                </div>
              </>
            )}
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
