import type { ScreenProps } from "./StubScreen";
import type { Savings } from "../state/types";
import { seatFill } from "../state/types";
import FamilySeats from "../components/FamilySeats";
import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";

/**
 * Cancel savings — Figma "cancelSavings" screen, 7 live instances across all
 * 3 real BillingPhases this module models (freeTrial/monthly/postTrial;
 * cancel.ts's internal "trial"/"upgrade"/"posttrial" recipe-phase labels are
 * NOT real state values, they map to those 3 BillingPhases via
 * SEED_BY_PHASE — branching here is on `plan.phase`, never the recipe
 * label): 3207:43094 (trial, empty), 3208:49861/52565/53463 (monthly, empty/
 * partial/full), 3208:60153/61016/62562 (postTrial, empty/partial/full).
 * trial-partial/trial-full are explicitly deferred to Task 22 (empty
 * figmaNodeId in cancel.ts) — this screen renders them anyway since it's
 * driven by state, not by recipe id, so they'll pick up the freeTrial+
 * partial/full branch automatically once those steps get real node ids.
 *
 * Primary CTA is "Leave Family" — verbatim and byte-identical across all 7
 * live instances (confirmed by reading cancel.ts directly), zero ambiguity.
 *
 * GAP, flagged rather than silently worked around: this session had no
 * Figma/MCP tool access and no connected browser extension (see this task's
 * final report), so page title / trial-banner / savings-tile-header copy
 * below are honestly-flagged placeholders, not verbatim Figma text — see
 * copy.ts's cancelSavings comment for exactly what's reused-verbatim
 * (pageTitle, leaveFamily) vs. invented placeholder. Layout/composition is a
 * best-effort structural inference from this task's two named shared
 * sub-pieces:
 *  - "Component 224" (3207:46321, generic/unnamed Figma component name, no
 *    further signal available without Figma access) — modeled here as a
 *    trial-countdown banner, the only state-driven, screen-appropriate
 *    thing this prototype has a real field for (`plan.trialDaysLeft`) that
 *    would plausibly warrant its own standalone component on a
 *    cancellation screen. Shown only during freeTrial.
 *  - "savings tiles" (3208:60060) — modeled as a compact 2-tile stat grid
 *    (distinct from the already-built SavingsWidget's stacked-row layout,
 *    to honor the "tiles" plural naming), reusing the same money-savings
 *    state (`state.savings`) SavingsWidget already renders elsewhere.
 * Both flagged as structural best-effort, not confirmed against Figma.
 */

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12.5 4.5L7 10L12.5 15.5" stroke={finalTokens.color.text.primary} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PageHeader({ title }: { title: string }) {
  return (
    <div className="flex h-14 w-full items-center gap-1 px-3 py-2">
      <button
        type="button"
        aria-label="Back"
        className="flex size-10 shrink-0 items-center justify-center rounded-full border"
        style={{ backgroundColor: finalTokens.color.surface.primary, borderColor: finalTokens.color.border.subtle }}
      >
        <ChevronLeftIcon />
      </button>
      <p className="flex-1 pl-2 pr-1 font-noontree text-base font-bold leading-5 tracking-[-0.15px]" style={{ color: finalTokens.color.text.primary }}>
        {title}
      </p>
    </div>
  );
}

/** "Component 224" (3207:46321) — trial-countdown banner, shown only during freeTrial. */
function TrialBanner({ daysLeft }: { daysLeft: number }) {
  return (
    <div
      className="flex w-full items-center gap-2 rounded-xl border p-3"
      style={{ backgroundColor: finalTokens.color.surface.successSubtle, borderColor: finalTokens.color.border.successBold }}
    >
      <span className="inline-block size-2 shrink-0 rounded-full" style={{ backgroundColor: finalTokens.color.text.success }} aria-hidden="true" />
      <p className="font-noontree text-xs font-semibold leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.success }}>
        {copy.cancelSavings.trialBanner.replace("{days}", String(daysLeft))}
      </p>
    </div>
  );
}

function TileIcon({ variant }: { variant: "total" | "deliveries" | "deals" }) {
  return (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: finalTokens.color.decorative.iconChipBg }}>
      {variant === "deliveries" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="9" width="16" height="10" rx="1.5" fill={finalTokens.color.text.success} />
          <path d="M4 9l2-4h12l2 4" stroke={finalTokens.color.text.success} strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      ) : variant === "deals" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 8V6a3 3 0 0 1 6 0v2" stroke={finalTokens.color.text.success} strokeWidth="1.4" strokeLinecap="round" />
          <rect x="4" y="8" width="10" height="11" rx="1.5" fill={finalTokens.color.text.success} />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 1.5l1.4 4.6L14 7.5l-4.6 1.4L8 13.5l-1.4-4.6L2 7.5l4.6-1.4L8 1.5z" fill={finalTokens.color.text.success} />
        </svg>
      )}
    </div>
  );
}

function Tile({ variant, label, amount }: { variant: "deliveries" | "deals"; label: string; amount: number }) {
  return (
    <div
      className="flex flex-1 flex-col items-start gap-2 rounded-xl border p-3"
      style={{ backgroundColor: finalTokens.color.surface.primary, borderColor: finalTokens.color.border.subtle }}
    >
      <TileIcon variant={variant} />
      <div className="flex flex-col gap-0.5">
        <p className="font-noontree text-xs leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.tertiary }}>
          {label}
        </p>
        <p className="font-noontree text-base font-bold leading-5 tracking-[-0.15px]" style={{ color: finalTokens.color.text.primary }}>
          dhm{amount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

/** "savings tiles" (3208:60060) — compact 2-tile stat grid + total hero line. */
function SavingsTiles({ savings }: { savings: Savings }) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border-[1.6px] p-3" style={{ backgroundColor: finalTokens.color.surface.primary, borderColor: finalTokens.color.surface.primary }}>
      <div className="flex items-center gap-2">
        <TileIcon variant="total" />
        <div className="flex flex-col gap-0.5">
          <p className="font-noontree text-xs leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.tertiary }}>
            {copy.cancelSavings.savingsTilesTitle}
          </p>
          <p className="font-noontree text-[22px] font-bold leading-7 tracking-[-0.2px]" style={{ color: finalTokens.color.text.primary }}>
            dhm{savings.total.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex w-full items-stretch gap-2">
        <Tile variant="deliveries" label={copy.cancelSavings.tileDeliveriesLabel} amount={savings.freeDeliveries.amount} />
        <Tile variant="deals" label={copy.cancelSavings.tileDealsLabel} amount={savings.memberDeals.amount} />
      </div>
    </div>
  );
}

export default function CancelSavings({ state, onAdvance }: ScreenProps) {
  const { plan, savings, members, seatsTotal } = state;
  const fill = seatFill(state);
  const memberCount = members.filter((m) => m.role === "member").length;

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto pb-8" style={{ backgroundColor: finalTokens.color.surface.secondary }}>
      <div className="pt-16">
        <PageHeader title={copy.cancelSavings.pageTitle} />
      </div>
      <div className="flex w-full flex-col gap-3 px-3 pt-4">
        {plan.phase === "freeTrial" && <TrialBanner daysLeft={plan.trialDaysLeft ?? 0} />}

        <SavingsTiles savings={savings} />

        {fill !== "empty" && (
          <div className="flex w-full items-center justify-between gap-3 rounded-xl p-3" style={{ backgroundColor: finalTokens.color.surface.tertiary }}>
            <p className="flex-1 font-noontree text-xs font-medium leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.secondary }}>
              {copy.cancelSavings.membersAffected.replace("{n}", String(memberCount))}
            </p>
            <FamilySeats members={members} seatsTotal={seatsTotal} size={28} />
          </div>
        )}
      </div>

      <div className="mt-auto flex w-full shrink-0 flex-col p-3">
        <button
          type="button"
          onClick={onAdvance}
          className="flex h-14 w-full items-center justify-center rounded-xl"
          style={{ backgroundColor: finalTokens.color.decorative.neutralBlack }}
        >
          <span className="font-noontree text-[17px] font-semibold text-white">{copy.cancelSavings.leaveFamily}</span>
        </button>
      </div>
    </div>
  );
}
