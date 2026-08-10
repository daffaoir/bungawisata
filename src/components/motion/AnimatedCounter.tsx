"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/** useLayoutEffect memicu peringatan saat SSR; di server pakai useEffect. */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type AnimatedCounterProps = {
  value: number;
  /** Locale Intl, mis. "id-ID". */
  locale: string;
  suffix?: string;
  className?: string;
  durationSeconds?: number;
};

/**
 * Angka yang menghitung naik saat masuk viewport.
 *
 * HTML awal sengaja berisi angka final supaya nilainya tetap terbaca oleh
 * mesin pencari dan pengguna tanpa JavaScript; nilainya baru direset ke nol
 * di layout effect, sebelum browser sempat melukis.
 */
export function AnimatedCounter({
  value,
  locale,
  suffix = "",
  className,
  durationSeconds = 1.6,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useIsomorphicLayoutEffect(() => {
    if (!shouldReduceMotion) setDisplay(0);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    const controls = animate(0, value, {
      duration: durationSeconds,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, shouldReduceMotion, value, durationSeconds]);

  return (
    <span ref={ref} className={className}>
      {new Intl.NumberFormat(locale).format(display)}
      {suffix}
    </span>
  );
}
