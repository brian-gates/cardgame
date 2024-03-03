"use client";
import { signOut } from "next-auth/react";
import { PiSignOut } from "react-icons/pi";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="flex flex-row gap-2 items-center border border-gray-300 px-2 py-1 rounded-md text-sm"
    >
      <PiSignOut />
      <span>Sign Out</span>
    </button>
  );
}
