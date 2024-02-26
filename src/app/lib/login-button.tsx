"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { PiSignIn, PiSignOut } from "react-icons/pi";

export function LoginButton() {
  const session = useSession();

  function Text({ status }: { status: (typeof session)["status"] }) {
    switch (status) {
      case "authenticated":
        return "Authenticated";
      case "loading":
        return "Loading...";
      case "unauthenticated":
        return (
          <div className="flex flex-row gap-2 items-center">
            <PiSignIn />
            <span>Sign in</span>
          </div>
        );
      default:
        return "Unknown";
    }
  }

  if (session.data) {
    return (
      <div className="flex flex-row gap-3 items-center p-3 rounded-md">
        <div className="rounded-full overflow-hidden w-8 h-8">
          <img src={session.data.user?.image ?? ""} alt="user avatar" />
        </div>
        <div className="text-sm">Signed in as {session.data.user?.name}</div>
        <button
          className="flex flex-row gap-2 items-center border border-gray-300 px-2 py-1 rounded-md"
          onClick={() => signOut()}
        >
          <PiSignOut />
          <span>Sign Out</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-3 items-center p-3 rounded-md">
      <button
        className="flex flex-row gap-2 items-center border border-gray-300 px-2 py-1 rounded-md"
        onClick={() => signIn()}
      >
        <Text status={session.status} />
      </button>
    </div>
  );
}
