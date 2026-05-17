import { pickLocaleText } from "@/lib/i18n";
import type { Locale, TeamMember } from "@/lib/types";

export function TeamSection({
  locale,
  items
}: {
  locale: Locale;
  items: TeamMember[];
}) {
  return (
    <section id="team" className="section-shell">
      <div className="mb-8">
        <span className="section-kicker">Team</span>
        <h2 className="mt-5 font-[family:var(--font-display)] text-5xl uppercase leading-none sm:text-6xl">
          Small crew. Sharp hands. Loud taste.
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <article key={item.id} className="brutal-card overflow-hidden bg-white">
            <div
              className="grid h-56 place-items-center border-b-[3px] border-black"
              style={{
                background:
                  index % 3 === 0
                    ? "#CC0000"
                    : index % 3 === 1
                      ? "#A5FF8B"
                      : "#98D8FF"
              }}
            >
              <span className="font-[family:var(--font-display)] text-6xl uppercase">
                {item.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-[family:var(--font-display)] text-3xl uppercase leading-none">
                {item.name}
              </h3>
              <p className="mt-2 text-xs uppercase tracking-[0.25em]">
                {pickLocaleText(locale, item.role)}
              </p>
              <p className="mt-4 text-sm leading-7">{pickLocaleText(locale, item.bio)}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border-[3px] border-black bg-paper px-3 py-2 text-[11px] uppercase tracking-[0.2em]"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
