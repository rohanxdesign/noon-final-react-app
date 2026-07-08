import type { ScreenProps } from "./StubScreen";
import type { PlanType } from "../state/types";
import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";

/**
 * Explore plans / plan switching — built against the LIVE "03 · Plan
 * selection" frames. Every figmaNodeId the recipes carry for this screen
 * (3161:39741, 3201:76762, 3161:44306/44401/46817, 3274:32387, 3161:45673)
 * has been deleted from the Figma file: the screen was redesigned upstream
 * after the recipes were authored. The current file keeps sections named
 * exactly after the recipe ids, each containing 2-3 "03 · Plan selection"
 * frames:
 *   ✅ manage-switch-individual        3792:22277 / 3792:22429 / 3792:22690
 *   ✅ manage-switch-duo-from-full-…   3792:23486 / 3943:25601 / 3880:141534
 *   ✅ manage-switch-duo-from-partial… 3792:23336 / 3880:143000 / 3880:143390
 *   ✅ manage-switch-family-from-duo   3890:23890 / 3943:25859
 * Inspected: 3792:22277 (design context) + 3792:23486, 3890:23890,
 * 3792:22429, 3792:22690 (screenshots). The remaining frames are the same
 * page beneath step overlays (confirm dialog / review-and-confirm sheet --
 * later tasks own those).
 *
 * The redesign replaced the old Family/Individual tabs + radio plan cards +
 * "Change my plan" CTA (which Task 13's spec described) with: "Change plan"
 * header -> current-plan summary card (green border, "Current plan" tag,
 * 3 benefits, auto-renew line) -> "Explore other plans" heading -> two
 * constant offer cards ("One & OSN+ Monthly", "One Annual") -> sticky
 * "Keep my current plan" bar. There is no selection state anywhere in the
 * live frames -- step-to-step differences are overlays only -- so the
 * spec's "selected plan is local UI state" no longer applies.
 *
 * Only the current-plan card varies across flows, and it derives entirely
 * from state.plan (title from plan.type -- "Family plan" on the
 * switch-individual/duo-from-family sections, "Duo plan" on 3890:23890;
 * renewal line from renewsOn/pricePerMonth; the mock's static
 * "xx-xx-xx"/"24.99" placeholders are replaced by state values per
 * established precedent). Offer cards and the bottom bar call onAdvance --
 * the recipe layer owns which switchPlan action actually fires.
 *
 * Prices render with the Noontree "dhm" ligature (project-wide dirham
 * precedent); the Figma frames draw a standalone dirham-symbol SVG because
 * this redesigned page is authored in the newer library style -- same glyph.
 */

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12.5 4.5L7 10L12.5 15.5" stroke={finalTokens.color.text.primary} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** material-symbols:check-small-rounded, 16px (3792:22293). */
function CheckSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 8.5l2.8 2.8 6.2-6.6" stroke={finalTokens.color.decorative.widgetHeaderText} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DashedLine() {
  return <div className="h-0 w-full border-t border-dashed" style={{ borderColor: finalTokens.color.border.subtle }} aria-hidden="true" />;
}

function BenefitLine({ text, muted = false }: { text: string; muted?: boolean }) {
  return (
    <div className="flex items-end gap-[10px]">
      <CheckSmallIcon />
      <p
        className="font-noontree text-xs font-medium leading-[14px] tracking-[-0.12px]"
        style={{ color: muted ? finalTokens.color.text.secondary : finalTokens.color.decorative.widgetHeaderText }}
      >
        {text}
      </p>
    </div>
  );
}

function planTitle(type: PlanType): string {
  if (type === "family") return copy.explorePlans.planTitleFamily;
  if (type === "duo") return copy.explorePlans.planTitleDuo;
  return copy.explorePlans.planTitleIndividual;
}

/** Green-bordered current-plan summary (3792:22283). */
function CurrentPlanSummary({ title, renewalLine }: { title: string; renewalLine: string }) {
  return (
    <section
      className="flex w-full flex-col overflow-hidden rounded-2xl border-[1.5px] bg-white px-4 pb-4"
      style={{
        borderColor: finalTokens.color.decorative.planTagBg, // ✅-sementic/icon/offer resolves to the same #108757
        boxShadow: "0px 0px 0px 4px rgba(16,135,87,0.08)", // raw literal glow in Figma (3792:22283)
      }}
    >
      <div className="flex w-full flex-col gap-3">
        <div
          className="flex h-6 w-fit items-center justify-center rounded-b-xl px-3 py-1"
          style={{ backgroundColor: finalTokens.color.decorative.planTagBg }}
        >
          <span className="font-noontree text-xs font-semibold text-white">{copy.explorePlans.currentPlanTag}</span>
        </div>
        <div className="flex w-full flex-col gap-[14px]">
          <p className="w-full font-noontree text-base font-bold leading-5 tracking-[-0.16px]" style={{ color: finalTokens.color.text.primary }}>
            {title}
          </p>
          <DashedLine />
          <BenefitLine text={copy.explorePlans.benefit1} />
          <BenefitLine text={copy.explorePlans.benefit2} />
          <BenefitLine text={copy.explorePlans.benefit3} />
          <DashedLine />
        </div>
        <p className="font-noontree text-xs font-semibold leading-[14px] tracking-[-0.12px]" style={{ color: finalTokens.color.text.tertiary }}>
          {renewalLine}
        </p>
      </div>
    </section>
  );
}

interface OfferCardProps {
  title: string;
  price: string;
  subPrice: string;
  subPriceStruck: boolean;
  chip: string;
  onPress: () => void;
}

/** "Change Plan" offer card (3792:22306 / 3792:22307). */
function OfferCard({ title, price, subPrice, subPriceStruck, chip, onPress }: OfferCardProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="flex w-full flex-col gap-[14px] overflow-hidden rounded-2xl border-[1.5px] bg-white p-4 text-left"
      style={{ borderColor: finalTokens.color.decorative.hairline }}
    >
      <div className="flex w-full flex-col gap-2">
        <p className="w-full font-noontree text-base font-bold leading-5 tracking-[-0.16px]" style={{ color: finalTokens.color.text.primary }}>
          {title}
        </p>
        <div className="flex flex-col gap-1">
          <p className="font-noontree text-sm font-semibold leading-[18px] tracking-[-0.14px]" style={{ color: finalTokens.color.decorative.widgetHeaderText }}>
            {price}
          </p>
          <div className="flex items-center gap-2">
            <p
              className={`font-noontree text-xs font-medium leading-[14px] tracking-[-0.12px] ${subPriceStruck ? "line-through" : ""}`}
              style={{ color: finalTokens.color.text.muted }}
            >
              {subPrice}
            </p>
            <span
              className="flex items-center justify-center rounded-md px-2 py-1 font-noontree text-xs font-semibold"
              style={{ backgroundColor: finalTokens.color.decorative.offerChipBg, color: finalTokens.color.decorative.planTagBg }}
            >
              {chip}
            </span>
          </div>
        </div>
      </div>
      <DashedLine />
      <BenefitLine text={copy.explorePlans.offerBenefit1} muted />
      <BenefitLine text={copy.explorePlans.offerBenefit2} muted />
    </button>
  );
}

export default function ExplorePlans({ state, onAdvance }: ScreenProps) {
  const { plan } = state;
  const renewalLine = copy.explorePlans.autoRenews
    .replace("{date}", plan.renewsOn)
    .replace("{price}", plan.pricePerMonth.toFixed(2));

  return (
    <div
      className="flex h-full w-full flex-col overflow-y-auto"
      style={{ background: "linear-gradient(180deg, #ffffff 31.78%, #f3f3f5 99.85%)" }} // raw literal page fill in Figma (3792:22277)
    >
      {/* Page header (3792:22280): 36px icon button + title, at x18/y52. */}
      <div className="flex w-full items-center gap-2 px-[18px] pt-[52px]">
        <button
          type="button"
          aria-label="Back"
          className="flex size-9 items-center justify-center rounded-[18px] border"
          style={{ backgroundColor: finalTokens.color.surface.primary, borderColor: finalTokens.color.border.subtle }}
        >
          <ChevronLeftIcon />
        </button>
        <p className="flex-1 font-noontree text-base font-bold leading-5 tracking-[-0.16px]" style={{ color: "rgba(0,0,0,0.9)" }}>
          {copy.explorePlans.pageTitle}
        </p>
      </div>

      <div className="flex w-full flex-col gap-6 px-4 pb-6 pt-6">
        <CurrentPlanSummary title={planTitle(plan.type)} renewalLine={renewalLine} />

        <div className="flex w-full flex-col gap-5">
          <p className="w-full font-noontree text-base font-bold leading-5 tracking-[-0.16px]" style={{ color: finalTokens.color.decorative.widgetHeaderText }}>
            {copy.explorePlans.exploreOtherPlans}
          </p>
          <OfferCard
            title={copy.explorePlans.offer1Title}
            price={copy.explorePlans.offer1Price}
            subPrice={copy.explorePlans.offer1Was}
            subPriceStruck
            chip={copy.explorePlans.offer1Chip}
            onPress={onAdvance}
          />
          <OfferCard
            title={copy.explorePlans.offer2Title}
            price={copy.explorePlans.offer2Price}
            subPrice={copy.explorePlans.offer2Sub}
            subPriceStruck={false}
            chip={copy.explorePlans.offer2Chip}
            onPress={onAdvance}
          />
        </div>
      </div>

      {/* Bottom section (3792:22314). */}
      <div
        className="sticky bottom-0 mt-auto w-full rounded-t-xl bg-white px-4 pb-4 pt-3"
        style={{ boxShadow: "0px -4px 17.6px rgba(0,0,0,0.1)" }} // raw literal in Figma (3792:22314)
      >
        <button
          type="button"
          onClick={onAdvance}
          className="flex h-14 w-full items-center justify-center rounded-[9px]"
          style={{ backgroundColor: finalTokens.color.decorative.neutralBlack }}
        >
          <span className="font-noontree text-base font-bold tracking-[-0.16px] text-white">{copy.explorePlans.keepMyCurrentPlan}</span>
        </button>
      </div>
    </div>
  );
}
