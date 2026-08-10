"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import type { ItineraryDay } from "@/lib/schema";

/**
 * Rundown harian dengan garis vertikal yang "tergambar" mengikuti scroll —
 * memberi rasa maju secara berurutan, bukan sekadar hiasan.
 */
export function ItineraryTimeline({ days }: { days: ItineraryDay[] }) {
  const t = useTranslations("PackageDetail");
  const containerRef = useRef<HTMLOListElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.6"],
  });

  const lineScale = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <ol ref={containerRef} className="relative">
      {/* Garis dasar yang selalu tampak, agar strukturnya jelas tanpa JS. */}
      <div
        aria-hidden="true"
        className="absolute top-2 bottom-2 start-[7px] w-px bg-line"
      />

      {shouldReduceMotion ? null : (
        <motion.div
          aria-hidden="true"
          style={{ scaleY: lineScale }}
          className="absolute top-2 bottom-2 start-[7px] w-px origin-top bg-gold-500"
        />
      )}

      {days.map((day) => (
        <li key={day.day} className="relative ps-10 pb-12 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute start-0 top-1.5 size-[15px] border border-gold-500 bg-canvas"
          />

          <p className="eyebrow text-gold-600">{t("day", { day: day.day })}</p>
          <h3 className="mt-2 text-[1.35rem]">{day.title}</h3>

          <ul className="mt-4 space-y-2.5">
            {day.activities.map((activity) => (
              <li
                key={activity}
                className="relative ps-5 text-[0.95rem] leading-[1.75] text-ink-soft before:absolute before:start-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-gold-500"
              >
                {activity}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
