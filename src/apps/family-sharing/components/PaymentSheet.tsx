import { AnimatePresence, motion } from "framer-motion";
import type { FinalFlowState } from "../state/types";
import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";
import paymentApplePay from "../assets/payment-apple-pay.svg";
import paymentCard from "../assets/payment-card.svg";

/**
 * Payment sheet — Figma "M-BottomSheet" instance carrying the "Free Upgrade"
 * body (3187:67673 standalone; verified in-context on both upgrade.ts
 * overlay-bearing nodes: 3261:103309 family flow, 3187:70138 duo flow —
 * identical composition on both, only the plan-upgrade card's plan
 * name/price differ). Mounts above `planSheet` when the current step's
 * `overlay` is `"paymentSheet"` (see FlowRunner.tsx's OVERLAYS registry).
 *
 * Everything is derived from `state.plan` — no flow-id branching. At this
 * step, the PRECEDING step's `selectPlan` action has already fired (per
 * stateAtStep, which applies every step's action before rendering the next
 * one), so `state.plan.type`/`pricePerMonth` already reflect the plan being
 * upgraded TO — that's what the plan-upgrade card shows. `state.payment` and
 * `state.seatsTotal` drive the payment-icon swap and the seat-chip count the
 * same way PlanSheet.tsx's PlanSeatChips and ManagePlan.tsx's PAYMENT_META
 * already do (mirrored here rather than imported, to keep this component
 * self-contained per its own file boundary).
 *
 * GAP: the tooltip's "[plan name] [current plan price]/mo" describes the
 * PREVIOUS plan's continuing bill during the 40-day upgrade window, but that
 * value isn't recoverable from state (selectPlan already overwrote
 * state.plan by the time this step renders) and Figma itself never binds
 * those brackets to a variable (confirmed directly on the node). Rendered
 * verbatim — see copy.ts's paymentSheet.billingTooltip comment and the Task
 * 14 report rather than inventing a "previous plan" field.
 */

const PAYMENT_ICON: Record<FinalFlowState["payment"]["method"], string> = {
  applePay: paymentApplePay,
  card: paymentCard,
};

/** Owner-initial chip + generic filler circles — same visual language as PlanSheet's PlanSeatChips. */
function UpgradeCardSeatChips({ ownerInitial, filledSeats }: { ownerInitial: string; filledSeats: number }) {
  return (
    <div className="flex w-fit rounded-[40px] p-1" style={{ backgroundColor: finalTokens.color.surface.secondary }}>
      <div className="flex items-center" style={{ isolation: "isolate" }}>
        <div
          className="flex size-8 shrink-0 items-center justify-center rounded-full border-[1.83px] border-white"
          style={{ backgroundColor: finalTokens.color.avatar.green, zIndex: filledSeats + 1 }}
        >
          <span className="font-noontree text-base font-bold text-white">{ownerInitial}</span>
        </div>
        {Array.from({ length: filledSeats }).map((_, i) => (
          <div
            key={i}
            className="-ml-3 size-8 shrink-0 rounded-full border-[1.83px] border-white"
            style={{ backgroundColor: finalTokens.color.surface.muted, zIndex: filledSeats - i }}
          />
        ))}
      </div>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke={finalTokens.color.text.muted} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function planLabel(type: FinalFlowState["plan"]["type"]): string {
  if (type === "family") return "Family";
  if (type === "duo") return "Duo";
  return "Individual";
}

export interface PaymentSheetProps {
  state: FinalFlowState;
  onAdvance: () => void;
  onClose?: () => void;
}

export default function PaymentSheet({ state, onAdvance, onClose }: PaymentSheetProps) {
  const { plan, payment, seatsTotal } = state;
  const ownerInitial = plan.ownerName.trim().charAt(0).toUpperCase();
  // Filler circles in the card = other seats in the plan besides the owner (marketing
  // preview of "who else is on this plan", mirrors the 4-empty-seat cluster Figma shows
  // on the family variant, 3 on duo) — derived from seatsTotal, not a hardcoded count.
  const fillerSeats = Math.max(0, seatsTotal - 1);
  const price = `dhm${plan.pricePerMonth.toFixed(2)}`;
  const planName = planLabel(plan.type);

  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 z-30"
        style={{ backgroundColor: finalTokens.color.surface.overlayBold }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        role="dialog"
        aria-label="Payment"
        className="absolute inset-x-0 bottom-0 z-40 flex flex-col overflow-hidden rounded-t-2xl"
        style={{ backgroundColor: finalTokens.color.surface.secondary, maxHeight: "85%" }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 32, stiffness: 320 }}
      >
        <div className="flex shrink-0 justify-center py-3">
          <div className="h-1 w-9 rounded-full" style={{ backgroundColor: finalTokens.color.surface.muted }} />
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto px-3 pb-3">
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="font-noontree text-lg font-bold leading-6 tracking-[-0.15px]" style={{ color: finalTokens.color.text.success }}>
              {copy.paymentSheet.freeUpgradeTitle}
            </p>
            <p className="w-[269px] font-noontree text-sm leading-5 tracking-[-0.1px]" style={{ color: finalTokens.color.text.tertiary }}>
              {copy.paymentSheet.freeUpgradeSubtitle}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div
              className="flex w-full flex-col gap-4 overflow-hidden rounded-xl border-[1.5px] border-white pb-4 pt-3"
              style={{ backgroundColor: finalTokens.color.surface.alphaLight80 }}
            >
              <div className="flex w-full items-center gap-2 px-4">
                <p className="flex-1 truncate pt-0.5 font-noontree text-lg font-bold leading-6 tracking-[-0.15px]" style={{ color: finalTokens.color.text.primary }}>
                  {planName} plan
                </p>
                <UpgradeCardSeatChips ownerInitial={ownerInitial} filledSeats={fillerSeats} />
              </div>
              <div className="h-px w-full" style={{ backgroundColor: finalTokens.color.border.subtle }} />
              <div className="flex w-full items-start justify-between px-4">
                <div className="flex flex-col gap-0.5">
                  <p className="font-noontree text-xs font-semibold leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.secondary }}>
                    {copy.paymentSheet.todayLabel}
                  </p>
                  <p className="font-noontree text-xs leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.muted }}>
                    {copy.paymentSheet.todayNote}
                  </p>
                </div>
                <p className="whitespace-nowrap font-noontree text-[13px] font-bold leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.success }}>
                  {copy.paymentSheet.todayCharge}
                </p>
              </div>
              <div className="flex w-full items-start justify-between px-4">
                <div className="flex flex-col gap-0.5">
                  <p className="font-noontree text-xs font-semibold leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.secondary }}>
                    {copy.paymentSheet.fromDateLabel}
                  </p>
                  <p className="font-noontree text-xs leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.muted }}>
                    {copy.paymentSheet.fromDateNote.replace("{plan}", planName)}
                  </p>
                </div>
                <p className="whitespace-nowrap font-noontree text-[13px] font-semibold leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.primary }}>
                  {price}
                </p>
              </div>
            </div>

            <div className="flex w-full items-center gap-6 rounded-xl p-3" style={{ backgroundColor: finalTokens.color.surface.primary }}>
              <p className="font-noontree text-xs leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.secondary }}>
                {copy.paymentSheet.billingTooltip.replace("{plan}", planName)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-5 p-3">
          <div className="flex shrink-0 items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-white">
              <img src={PAYMENT_ICON[payment.method]} alt="" className="h-[25px] w-10" />
            </div>
            <div className="flex flex-col gap-0.5">
              <button type="button" className="flex items-center gap-1">
                <span className="font-noontree text-[13px] text-black/45">{copy.paymentSheet.payWith}</span>
                <ChevronDownIcon />
              </button>
              <p className="font-noontree text-[15px] font-bold text-black/[.92]">{"•••• " + (payment.last4 ?? "")}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onAdvance}
            className="flex min-h-[52px] flex-1 items-center justify-center rounded-xl px-5 py-3.5"
            style={{ backgroundColor: finalTokens.color.surface.primaryInverted }}
          >
            <span className="font-noontree text-base font-semibold" style={{ color: finalTokens.color.text.onSurfaceBold }}>
              {copy.oneLanding.upgradeForFree}
            </span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
