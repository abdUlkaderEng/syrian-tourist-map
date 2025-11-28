"use client";

import { attachTokens } from "@/libs/axios";
import { useEffect } from "react";

export default function TokenProvider() {
  useEffect(() => {
    attachTokens();
  }, []);

  return null;
}
