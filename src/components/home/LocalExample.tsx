"use client";

import { useLocalMoney } from "@/lib/localMoney";

/** The hero's example sentence, in the visitor's currency: "120 petrol, 60 lunch". */
export default function LocalExample() {
  const { amt, region } = useLocalMoney();
  return (
    <>{`“${amt(120)} ${region.fuel}, ${amt(60)} lunch”`}</>
  );
}
