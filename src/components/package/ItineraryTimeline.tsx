import { useTranslations } from "next-intl";
import type { ItineraryDay } from "@/lib/schema";

/**
 * Rundown harian dengan garis vertikal yang "tergambar" mengikuti scroll —
 * memberi rasa maju secara berurutan, bukan sekadar hiasan. Animasinya murni
 * CSS (`.timeline-progress` di `globals.css`); tanpa dukungan browser garis
 * emasnya tampil penuh.
 */
export function ItineraryTimeline({ days }: { days: ItineraryDay[] }) {
  const t = useTranslations("PackageDetail");
  return (
    <ol className="relative">
      {/* Garis dasar yang selalu tampak, agar strukturnya jelas tanpa JS. */}
      <div
        aria-hidden="true"
        className="absolute top-5 bottom-5 start-[1.1rem] w-0.5 rounded-full bg-line"
      />

      <div
        aria-hidden="true"
        className="timeline-progress absolute top-5 bottom-5 start-[1.1rem] w-0.5 origin-top rounded-full bg-gold-400"
      />

      {days.map((day) => (
        <li key={day.day} className="relative ps-14 pb-12 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute start-0 top-0 flex size-9 items-center justify-center rounded-full bg-gold-400 font-display text-[1.05rem] font-medium text-ink"
          >
            {day.day}
          </span>

          <p className="pt-1.5 text-[0.95rem] font-medium text-gold-700">
            {t("day", { day: day.day })}
          </p>
          <h3 className="mt-1 text-[1.5rem]">{day.title}</h3>

          <ul className="mt-4 space-y-2.5">
            {day.activities.map((activity) => (
              <li
                key={activity}
                className="relative ps-5 text-[0.95rem] leading-[1.75] text-ink-soft before:absolute before:start-0 before:top-[0.65em] before:size-1.5 before:rounded-full before:bg-gold-400"
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
