import { useState } from "react";
import type { ScreenProps } from "./StubScreen";
import type { PlanType } from "../state/types";
import BottomActionBar from "../components/BottomActionBar";
import { AllBenefitsWidget, HowItWorksWidget, ShareOfferWidget } from "../components/LandingWidgets";
import FaqAccordion from "../components/FaqAccordion";
import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";
import planSheetHero from "../assets/plan-sheet-hero.png";

/**
 * Plan sheet — Figma "03 · Plan sheet", the "Try Family free" full-page
 * upsell. Verified against both recipe-mapped nodes: 3161:30635 (family
 * upgrade flow, design context) and 3261:104319 (duo upgrade flow,
 * screenshot). Composition is identical on both: illustrated hero (asset
 * 3261:103080, downloaded) -> "Try Family free / for 30 days" headline
 * (constant on BOTH nodes -- it does not become "Try Duo free") -> duo/family
 * selector cards (component set 3136:25329; header segments 3136:25126,
 * price content 3136:25143) -> all-benefits -> how-it-works -> share-offer ->
 * FAQ (4 planSheet-specific questions) -> sticky "Upgrade for free" bar
 * (M-StackedActionBar 3161:30859, reusing BottomActionBar which matches its
 * 52px/rounded-12/primaryInverted spec exactly).
 *
 * Which card renders selected is LOCAL UI state (the two flow nodes differ
 * only in that selection while carrying identical FinalFlowState -- the
 * screen cannot know the flow). Seeded from state.plan.type so the
 * overlay-bearing step 4 nodes (3261:103309 / 3187:70138, where selectPlan
 * has already fired) mount with the right card highlighted; the pre-select
 * step defaults to family (3161:30635's state). Tapping a card only moves
 * the local highlight; the CTA calls onAdvance and the recipe layer owns the
 * selectPlan dispatch -- no scenario branching here.
 *
 * The "Free Upgrade" block (3187:67673, extracted during this task) belongs
 * to the payment-sheet context -- neither plan-sheet node renders it, so it
 * is not composed here (its copy is recorded in the Task 12 report for the
 * overlay task).
 *
 * `overlay` (paymentSheet on step 4) is intentionally unused: the overlay
 * component mounts above this screen in a later task; the underlying page
 * needs nothing extra.
 */

function CheckBadgeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8.4" fill={finalTokens.color.text.success} />
      <path d="M6.6 10.2l2.2 2.2 4.6-4.7" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12.5 4.5L7 10L12.5 15.5" stroke={finalTokens.color.text.primary} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 24px marketing seat chips in the card header (3136:25126): teal owner-initial chip + empty slots. */
function PlanSeatChips({ ownerInitial, emptySeats }: { ownerInitial: string; emptySeats: number }) {
  return (
    <div className="flex w-fit rounded-[32px] p-[2px]" style={{ backgroundColor: finalTokens.color.surface.tertiary }}>
      <div className="flex items-center" style={{ isolation: "isolate" }}>
        <div
          className="flex size-6 shrink-0 items-center justify-center rounded-full border-[1.4px] border-white"
          style={{ backgroundColor: finalTokens.color.avatar.teal, zIndex: emptySeats + 1 }}
        >
          <span className="font-noontree text-xs font-bold text-white">{ownerInitial}</span>
        </div>
        {Array.from({ length: emptySeats }).map((_, i) => (
          <div
            key={i}
            className="-ml-[9.6px] size-6 shrink-0 rounded-full border-[1.4px] border-white"
            style={{ backgroundColor: finalTokens.color.surface.tertiary, zIndex: emptySeats - i }}
          />
        ))}
      </div>
    </div>
  );
}

interface PlanSelectCardProps {
  title: string;
  membersLabel: string;
  price: string;
  perMember: string;
  emptySeats: number;
  ownerInitial: string;
  selected: boolean;
  onSelect: () => void;
}

/** Duo/Family selector card — Figma component set "Plan Card" (3136:25329). */
function PlanSelectCard({ title, membersLabel, price, perMember, emptySeats, ownerInitial, selected, onSelect }: PlanSelectCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex min-w-0 flex-1 flex-col items-center gap-4 rounded-2xl bg-white p-1 text-left ${selected ? "border-2" : "border"}`}
      style={{
        borderColor: selected ? finalTokens.color.decorative.planCardSelectedBorder : finalTokens.color.border.primary,
        // Selected-card glow is a raw literal effect in Figma (3136:25326), not a bound variable.
        boxShadow: selected ? "0px 0px 2px rgba(38,181,124,0.4)" : undefined,
      }}
    >
      <div className="flex w-full flex-col gap-[10px] px-[10px] pb-[2px] pt-3">
        <PlanSeatChips ownerInitial={ownerInitial} emptySeats={emptySeats} />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p
              className="font-noontree text-lg font-bold leading-6 tracking-[-0.15px]"
              style={{ color: selected ? finalTokens.color.text.success : finalTokens.color.text.primary }}
            >
              {title}
            </p>
            {selected && <CheckBadgeIcon />}
          </div>
          <p className="font-noontree text-xs leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.tertiary }}>
            {membersLabel}
          </p>
        </div>
      </div>
      <div
        className="flex w-full flex-col gap-1 rounded-xl p-3"
        style={{ backgroundColor: selected ? finalTokens.color.decorative.planCardSelectedBg : finalTokens.color.surface.secondary }}
      >
        <p className="whitespace-nowrap font-noontree text-base font-bold leading-5 tracking-[-0.15px]" style={{ color: finalTokens.color.text.primary }}>
          {price}
        </p>
        <p className="whitespace-nowrap font-noontree text-xs leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.tertiary }}>
          {perMember}
        </p>
      </div>
    </button>
  );
}

export default function PlanSheet({ state, onAdvance }: ScreenProps) {
  // Local selection only -- seeded from state so post-selectPlan steps (payment-sheet
  // overlay states) mount highlighted correctly; "individual" (pre-select) => family.
  const [selected, setSelected] = useState<Extract<PlanType, "duo" | "family">>(state.plan.type === "duo" ? "duo" : "family");
  const ownerInitial = state.plan.ownerName.trim().charAt(0).toUpperCase();

  return (
    <div className="relative flex h-full w-full flex-col overflow-y-auto" style={{ backgroundColor: finalTokens.color.surface.tertiary }}>
      <img
        src={planSheetHero}
        alt=""
        className="pointer-events-none absolute left-1/2 top-0 z-0 w-full max-w-[375px] -translate-x-1/2"
        aria-hidden="true"
      />
      <button
        type="button"
        aria-label="Back"
        className="absolute left-3 top-[70px] z-20 flex size-10 items-center justify-center rounded-full border"
        style={{ backgroundColor: finalTokens.color.surface.primary, borderColor: finalTokens.color.border.subtle }}
      >
        <ChevronLeftIcon />
      </button>

      <div className="relative z-10 flex w-full flex-col items-center gap-4 px-3 pb-6 pt-[222px]">
        {/* Headline (3261:103278) -- constant across the family and duo nodes. */}
        <div className="flex w-full flex-col items-center text-center">
          <p className="font-noontree text-[26px] font-bold leading-[30px] tracking-[-0.26px]" style={{ color: finalTokens.color.text.primary }}>
            {copy.planSheet.heroTitlePrefix}{" "}
            <span style={{ color: finalTokens.color.text.success }}>{copy.planSheet.heroTitleHighlight}</span>
          </p>
          <p className="font-noontree text-xl font-medium leading-[30px] tracking-[-0.26px]" style={{ color: finalTokens.color.text.primary }}>
            {copy.planSheet.heroSubtitle}
          </p>
        </div>

        <div className="flex w-full items-stretch gap-3">
          <PlanSelectCard
            title={copy.planSheet.duoPlanTitle}
            membersLabel={copy.planSheet.duoMembers}
            price={copy.planSheet.duoPrice}
            perMember={copy.planSheet.duoPerMember}
            emptySeats={1}
            ownerInitial={ownerInitial}
            selected={selected === "duo"}
            onSelect={() => setSelected("duo")}
          />
          <PlanSelectCard
            title={copy.planSheet.familyPlanTitle}
            membersLabel={copy.planSheet.familyMembers}
            price={copy.planSheet.familyPrice}
            perMember={copy.planSheet.familyPerMember}
            emptySeats={4}
            ownerInitial={ownerInitial}
            selected={selected === "family"}
            onSelect={() => setSelected("family")}
          />
        </div>

        <AllBenefitsWidget />
        <HowItWorksWidget />
        <ShareOfferWidget title={copy.planSheet.shareOfferTitle} onShare={onAdvance} />
        <FaqAccordion questions={[copy.planSheet.faqQ1, copy.planSheet.faqQ2, copy.planSheet.faqQ3, copy.planSheet.faqQ4]} />
      </div>

      <div
        className="sticky bottom-0 z-20 mt-auto w-full rounded-t-[20px] bg-white"
        style={{ boxShadow: "0px -7px 7.5px rgba(224,224,224,0.1), 0px -27px 13.5px rgba(224,224,224,0.09)" }} // raw literal stack in Figma (3161:30853)
      >
        <BottomActionBar label={copy.planSheet.upgradeForFree} onPress={onAdvance} />
      </div>
    </div>
  );
}
