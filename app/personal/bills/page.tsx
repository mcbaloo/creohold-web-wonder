"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BillsRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/bills"); }, [router]);
  return null;
}
