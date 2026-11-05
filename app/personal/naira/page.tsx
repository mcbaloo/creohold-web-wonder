"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NairaRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/naira"); }, [router]);
  return null;
}
