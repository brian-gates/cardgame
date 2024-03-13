"use client";
import { Card } from "@prisma/client";
import Link from "next/link";
import { ReactNode } from "react";
import { useQueryString } from "./useQueryString";

export function PlayableCard({
  card,
  children,
}: {
  card: Card;
  children: ReactNode;
}) {
  const queryString = useQueryString();
  return <Link href={"?" + queryString("card", card.id)}>{children}</Link>;
}
