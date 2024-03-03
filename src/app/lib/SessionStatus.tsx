"use client";
import { DefaultSession, User, getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { PiSignIn, PiSignOut } from "react-icons/pi";

export function SessionStatus() {
  const session = useSession();

  const user = session?.data?.user;

  function Text() {
    if (user) {
      return "Authenticated";
    }
    return (
      <div className="flex flex-row gap-2 items-center">
        <PiSignIn />
        <span>Sign in</span>
      </div>
    );
  }

  if (user) {
    return (
      <>
        <div className="flex flex-row gap-3 items-center p-3 rounded-md h-12">
          <SignOutButton />
          <UserInfo user={user} />
        </div>
      </>
    );
  }

  function UserInfo({ user }: { user: DefaultSession["user"] }) {
    if (!user) return null;
    return (
      <div className="flex flex-row gap-2 items-center">
        {user.image && (
          <div className="rounded-full overflow-hidden w-8 h-8">
            <Image src={user.image} width={32} height={32} alt="user avatar" />
          </div>
        )}
        <div className="text-sm">{user.name}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-3 items-center p-3 rounded-md">
      <button
        onClick={() => signOut()}
        className="flex flex-row gap-2 items-center border border-gray-300 px-2 py-1 rounded-md"
        type="submit"
      >
        <Text />
      </button>
    </div>
  );
}

function SignOutButton() {
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
