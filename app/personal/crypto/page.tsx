"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CryptoRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/crypto"); }, [router]);
  return null;
}
