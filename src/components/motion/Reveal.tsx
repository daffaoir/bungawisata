"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Jeda mulai, dalam detik. */
  delay?: number;
  /** Arah masuk elemen. */
  from?: "bottom" | "left" | "right";
};

const OFFSET = {
  bottom: { y: 28, x: 0 },
  left: { y: 0, x: -28 },
  right: { y: 0, x: 28 },
};

/**
 * Muncul perlahan saat elemen masuk viewport. Dipakai ulang di seluruh
 * section supaya ritme animasi situs konsisten.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "bottom",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = OFFSET[from];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
