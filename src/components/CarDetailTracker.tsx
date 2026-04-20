"use client";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function CarDetailTracker({ car }: { car: string }) {
  useEffect(() => {
    trackEvent("car_detail_view", { car });
  }, [car]);

  return null;
}
