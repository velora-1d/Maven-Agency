import { pickLocaleText } from "@/lib/i18n";
import type { Locale, Testimonial } from "@/lib/types";

export function TestimonialSection({
  locale,
  items
}: {
  locale: Locale;
  items: Testimonial[];
}) {
  return (
    <section id="testimonials" className="section-shell">
      <div className="mb-8">
        <span className="section-kicker">Reviews</span>
        <h2 className="mt-5 font-[family:var(--font-display)] text-5xl uppercase leading-none sm:text-6xl">
          Magazine-style praise from teams we helped move faster.
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="brutal-card bg-white p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em]">{item.company}</p>
                <h3 className="mt-2 font-[family:var(--font-display)] text-3xl uppercase leading-none">
                  {item.clientName}
                </h3>
              </div>
              <p className="rounded-full border-[3px] border-black bg-blaze px-4 py-2 text-xs uppercase tracking-[0.25em]">
                {"★".repeat(item.rating)}
              </p>
            </div>
            <p className="mt-5 text-sm leading-7">
              {pickLocaleText(locale, item.quote)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
