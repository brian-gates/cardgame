"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
