"use client";

import { useEffect } from "react";
import { attachTokens } from "./libs/axios";

export default function TokenProvider() {
  useEffect(() => {
    attachTokens();
  }, []);

  return null;
}
