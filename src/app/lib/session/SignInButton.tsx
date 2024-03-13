"use client";
import { signIn } from "next-auth/react";
import { PiSignIn } from "react-icons/pi";

export function SignInButton() {
  return (
    <button
      onClick={() => signIn()}
      className="flex flex-row gap-2 items-center border border-gray-300 px-2 py-1 rounded-md text-sm"
    >
      <PiSignIn />
      <span>Sign In</span>
    </button>
  );
}
