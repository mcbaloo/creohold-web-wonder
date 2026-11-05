"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ConvertRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/convert"); }, [router]);
  return null;
}
