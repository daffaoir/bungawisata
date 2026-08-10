import { SearchX } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="border border-dashed border-line bg-white px-6 py-20 text-center">
      <SearchX
        className="mx-auto size-8 text-gold-600"
        aria-hidden="true"
        strokeWidth={1.25}
      />
      <h3 className="mt-6 text-2xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-md leading-[1.75] text-ink-soft">
        {description}
      </p>
      {action ? <div className="mt-8 flex justify-center">{action}</div> : null}
    </div>
  );
}
