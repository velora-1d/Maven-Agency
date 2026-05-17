import { pickLocaleText } from "@/lib/i18n";
import type { Locale, TeamMember } from "@/lib/types";
import { AnimatedReveal } from "@/components/animated-reveal";

const MEMBER_STYLES = [
  { bg: "bg-surface-container-lowest", nameBg: "bg-primary-container", nameText: "text-paper-white", roleBg: "bg-true-black" },
  { bg: "bg-surface-container", nameBg: "bg-secondary-container", nameText: "text-true-black", roleBg: "bg-primary-container" },
  { bg: "bg-true-black", nameBg: "bg-paper-white", nameText: "text-true-black", roleBg: "bg-secondary-container" },
  { bg: "bg-primary-container", nameBg: "bg-true-black", nameText: "text-paper-white", roleBg: "bg-secondary-container" },
];

type TeamSectionProps = {
  locale: Locale;
  items: TeamMember[];
};

export function TeamSection({ locale, items }: TeamSectionProps) {
  if (!items.length) return null;

  return (
    <section id="team" className="section-border bg-surface-container py-section-padding">
      <div className="page-container">
        {/* Header */}
        <AnimatedReveal direction="up" className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-display-2xl uppercase leading-none text-true-black">
              THE TEAM.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-body text-body-lg uppercase text-on-surface-variant">
              A COLLECTIVE OF ENGINEERS, DESIGNERS &amp; STRATEGISTS. EACH ONE ELITE.
            </p>
          </div>
        </AnimatedReveal>

        {/* Team grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.slice(0, 4).map((member, i) => {
            const style = MEMBER_STYLES[i % MEMBER_STYLES.length];
            return (
              <AnimatedReveal
                key={member.id}
                direction="up"
                delay={i * 150}
                className={`group relative border-[3px] border-true-black neo-shadow transition-transform duration-300 hover:-translate-y-2 ${style.bg} ${i % 2 === 0 ? "" : "mt-8"}`}
              >
                {/* Avatar */}
                <div className="relative aspect-[4/5] overflow-hidden border-b-[3px] border-true-black bg-surface-container">
                  <img
                    src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=000&color=fff&size=400`}
                    alt={member.name}
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                  {/* Role tag overlay */}
                  <div className={`absolute bottom-0 left-0 border-r-[3px] border-t-[3px] border-true-black px-4 py-2 font-body text-label-mono uppercase text-paper-white ${style.roleBg}`}>
                    {pickLocaleText(locale, member.role)}
                  </div>
                </div>

                {/* Name */}
                <div className={`${style.nameBg} p-4`}>
                  <h3 className={`font-display text-headline-md uppercase ${style.nameText}`}>
                    {member.name}
                  </h3>
                </div>

                {/* Bio */}
                <div className="p-4">
                  <p className={`font-body text-body-md ${i === 2 ? "text-paper-white/80" : i === 3 ? "text-paper-white" : "text-on-surface-variant"}`}>
                    {pickLocaleText(locale, member.bio)}
                  </p>
                </div>

                {/* Socials */}
                {member.socials.length > 0 && (
                  <div className="flex gap-2 border-t-[3px] border-true-black p-4">
                    {member.socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`border-[3px] border-true-black px-3 py-1 font-body text-label-mono uppercase transition-transform hover:translate-x-[2px] hover:translate-y-[2px] neo-shadow-sm ${
                          i === 2 ? "bg-paper-white text-true-black" : i === 3 ? "bg-true-black text-paper-white" : "bg-secondary-container text-true-black"
                        }`}
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                )}
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
