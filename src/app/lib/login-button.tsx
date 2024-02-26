"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export function LoginButton() {
  const session = useSession();

  function Text({ status }: { status: (typeof session)["status"] }) {
    switch (status) {
      case "authenticated":
        return "Authenticated";
      case "loading":
        return "Auth status...";
      case "unauthenticated":
        return "Login";
      default:
        return "Unknown";
    }
  }

  if (session.data) {
    return <button onClick={() => signOut()}>Sign Out</button>;
  }

  return (
    <button onClick={() => signIn()}>
      <Text status={session.status} />
    </button>
  );
}
