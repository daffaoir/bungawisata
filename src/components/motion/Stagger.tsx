"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  /** Jarak antar anak, dalam detik. */
  gap?: number;
};

/**
 * Membuat anak-anaknya muncul berurutan. Pasangkan dengan `StaggerItem`
 * untuk tiap anak — biasanya kartu di dalam grid.
 */
export function StaggerGroup({
  children,
  className,
  gap = 0.09,
}: StaggerGroupProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -60px 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
