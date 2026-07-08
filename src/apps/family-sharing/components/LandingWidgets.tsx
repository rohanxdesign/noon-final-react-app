import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";
import visualTvEn from "../assets/visual-tv-en.png";

/**
 * Landing page widgets — Figma "Landing Page widgets" container (3136:25852),
 * which shows 4 sibling widgets via `property1`: "All benefits" (3136:25848),
 * "how it works" (3136:25851), "share offer" (3136:25849), "faq" (3136:25850).
 * The "faq" variant in that set is visually identical to (and shares the same
 * 4 questions with) the standalone FaqAccordion (3523:195091), so it's not
 * duplicated here -- OneLanding composes `<FaqAccordion />` directly instead
 * of a 5th "FaqWidget" wrapper that would just re-render the same thing.
 */

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex w-full items-center gap-3 p-3">
      {icon}
      <p className="font-noontree text-base font-bold" style={{ color: finalTokens.color.decorative.widgetHeaderText }}>
        {title}
      </p>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" fill={finalTokens.color.surface.primaryInverted} />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="13" rx="3" fill={finalTokens.color.surface.primaryInverted} />
      <path d="M9 20l3-3h3" stroke={finalTokens.color.surface.primaryInverted} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3" fill={finalTokens.color.surface.primaryInverted} />
      <circle cx="17" cy="9" r="2.4" fill={finalTokens.color.surface.primaryInverted} />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" fill={finalTokens.color.surface.primaryInverted} />
      <path d="M14 20c0-2.4 1.4-4.4 3.4-5.3 1.9.6 3.6 2.4 3.6 5.3" fill={finalTokens.color.surface.primaryInverted} />
    </svg>
  );
}

function SparkleGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.5l1.4 4.6L14 7.5l-4.6 1.4L8 13.5l-1.4-4.6L2 7.5l4.6-1.4L8 1.5z" fill={finalTokens.color.decorative.mutedGlyph} />
    </svg>
  );
}

/** "Share all the benefits" widget — Figma node 3136:25848. */
export function AllBenefitsWidget() {
  const rows = [
    { title: copy.oneLanding.benefitDeliveryTitle, subtitle: copy.oneLanding.benefitDeliverySubtitle },
    { title: copy.oneLanding.benefitSavingsTitle, subtitle: copy.oneLanding.benefitSavingsSubtitle },
    { title: copy.oneLanding.benefitPrivacyTitle, subtitle: copy.oneLanding.benefitPrivacySubtitle },
  ];
  return (
    <div className="flex w-full flex-col items-start gap-1 rounded-2xl bg-white p-1">
      <SectionHeader icon={<ShieldIcon />} title={copy.oneLanding.shareAllBenefits} />
      <div className="flex w-full flex-col items-start gap-4 rounded-xl px-3 py-5" style={{ backgroundColor: finalTokens.color.surface.secondary }}>
        {rows.map((row, i) => (
          <div key={row.title} className="flex w-full flex-col gap-4">
            {i > 0 && <div className="h-0 w-full border-t border-dashed" style={{ borderColor: finalTokens.color.border.subtle }} />}
            <div className="flex w-full items-start gap-3 pl-[2px]">
              <SparkleGlyph />
              <div className="flex flex-1 flex-col items-start gap-[6px]">
                <p className="font-noontree text-sm font-semibold" style={{ color: finalTokens.color.text.primary }}>
                  {row.title}
                </p>
                <p className="font-noontree text-xs font-medium" style={{ color: finalTokens.color.text.secondary }}>
                  {row.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** "How it works" widget — Figma node 3136:25851 (3-step timeline). */
export function HowItWorksWidget() {
  const steps = [
    { title: copy.oneLanding.howItWorksStep1Title, subtitle: copy.oneLanding.howItWorksStep1Subtitle },
    { title: copy.oneLanding.howItWorksStep2Title, subtitle: copy.oneLanding.howItWorksStep2Subtitle },
    { title: copy.oneLanding.howItWorksStep3Title, subtitle: copy.oneLanding.howItWorksStep3Subtitle },
  ];
  return (
    <div className="flex w-full flex-col items-start gap-1 rounded-2xl bg-white p-1">
      <SectionHeader icon={<ChatIcon />} title={copy.oneLanding.howItWorksTitle} />
      <div className="flex w-full items-start gap-[14px] rounded-xl px-3 py-5" style={{ backgroundColor: finalTokens.color.surface.secondary }}>
        <div className="flex flex-col items-center gap-2 self-stretch pb-[18px] pt-[2px]">
          {steps.map((_, i) => (
            <div key={i} className="flex flex-1 flex-col items-center justify-between gap-2">
              <div
                className="flex size-[18px] shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: finalTokens.color.surface.tertiary }}
              >
                <span className="font-noontree text-[9px] font-extrabold" style={{ color: finalTokens.color.decorative.widgetHeaderText }}>
                  {i + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col items-start gap-4">
          {steps.map((step, i) => (
            <div key={step.title} className="flex w-full flex-col gap-4">
              {i > 0 && <div className="h-0 w-full border-t border-dashed" style={{ borderColor: finalTokens.color.border.subtle }} />}
              <div className="flex flex-1 flex-col items-start gap-[6px]">
                <p className="font-noontree text-sm font-semibold" style={{ color: finalTokens.color.text.primary }}>
                  {step.title}
                </p>
                <p className="font-noontree text-xs font-medium" style={{ color: finalTokens.color.text.secondary }}>
                  {step.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** "Not sure if this is for you?" share-offer widget — Figma node 3136:25849.
 *  `title` is overridable because PlanSheet's instance (3161:30840) retitles the
 *  identical widget "Know someone who'd want in?" -- content below is unchanged. */
export function ShareOfferWidget({ onShare, title = copy.oneLanding.notSureIfForYou }: { onShare?: () => void; title?: string }) {
  return (
    <div className="flex w-full flex-col items-start gap-1 rounded-2xl bg-white p-1">
      <SectionHeader icon={<PeopleIcon />} title={title} />
      <div className="flex w-full flex-col items-start overflow-hidden rounded-xl" style={{ backgroundColor: finalTokens.color.surface.primary }}>
        <div className="flex w-full flex-col items-center justify-center gap-5 rounded-xl p-4" style={{ backgroundColor: finalTokens.color.surface.secondary }}>
          <div className="flex w-full items-center gap-6">
            <p className="flex-1 font-noontree text-[13px] font-semibold leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.primary }}>
              {copy.oneLanding.shareOfferBody}
            </p>
            <div className="h-12 w-[60px] shrink-0 rounded-[10px]" style={{ backgroundColor: finalTokens.color.border.medium }} />
          </div>
          <button
            type="button"
            onClick={onShare}
            className="flex h-12 w-full items-center justify-center gap-[6px] rounded-[10px] border px-4 py-[14px]"
            style={{ backgroundColor: finalTokens.color.surface.primary, borderColor: finalTokens.color.border.primary }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 13V3M6 7l4-4 4 4M4 13v3a1 1 0 001 1h10a1 1 0 001-1v-3" stroke={finalTokens.color.text.primary} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-noontree text-sm font-semibold" style={{ color: finalTokens.color.text.primary }}>
              {copy.oneLanding.shareOfferDetails}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * "OSN+ is available now" promo card -- a sibling widget between
 * SavingsWidget and AllBenefitsWidget in every OneLanding node surveyed
 * (e.g. node 3533:29242, a direct sibling of the Savings-widget instance
 * 3533:29177 inside the same flex-col container 3533:29173). Not one of
 * the 4 widgets in the task's literal "Landing widgets" component-set list
 * (3136:25852 only has all-benefits/how-it-works/share-offer/faq), but
 * required for OneLanding to render every surveyed node faithfully --
 * placed here since it's clearly a landing-page widget in kind, not folded
 * into SavingsWidget (a structurally separate card, confirmed by node tree).
 *
 * Title/subtitle text colors (rgba(2,6,12,0.92) / rgba(2,6,12,0.75)) are
 * confirmed via get_variable_defs on 3533:29242 to be raw literal fills in
 * Figma itself -- not bound to any colour/* variable -- so they're left as
 * literals here rather than force-mapped onto an unrelated named token.
 */
export function OsnPromoCard({ onActivate }: { onActivate?: () => void }) {
  return (
    <div className="relative flex h-[139px] w-full items-stretch overflow-hidden rounded-xl bg-white">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-[6px]">
          <p className="font-noontree text-base font-bold" style={{ color: "rgba(2,6,12,0.92)" }}>
            {copy.oneLanding.osnAvailableTitle}
          </p>
          <p className="max-w-[155px] font-noontree text-xs" style={{ color: "rgba(2,6,12,0.75)" }}>
            {copy.oneLanding.osnAvailableSubtitle}
          </p>
        </div>
        <button type="button" onClick={onActivate} className="w-fit rounded-lg bg-black px-5 py-2">
          <span className="font-noontree text-sm font-bold text-white">{copy.oneLanding.osnActivateNow}</span>
        </button>
      </div>
      <div className="absolute right-3 top-2 flex size-[42px] items-center justify-center rounded-full bg-black">
        <span className="font-noontree text-[9px] font-bold text-white">{copy.oneLanding.osnBadgeLabel}</span>
      </div>
      <img src={visualTvEn} alt="" className="absolute right-0 top-[25px] h-[116px] w-[183px] object-cover" />
    </div>
  );
}
