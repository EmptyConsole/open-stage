"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to signin page on load
    router.push("/signin");
  }, [router]);

  return null; // This component just redirects
}