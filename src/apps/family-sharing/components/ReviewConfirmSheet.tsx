import { AnimatePresence, motion } from "framer-motion";
import type { FinalFlowState } from "../state/types";
import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";
import paymentApplePay from "../assets/payment-apple-pay.svg";
import paymentCard from "../assets/payment-card.svg";

/**
 * Review & confirm sheet — Figma "Review & Confirm" component (3201:77070)
 * inside an "M-BottomSheet" instance. Hosted by three different screens per
 * the recipes (explorePlans in manage.ts's switch flows; cancelSavings AND
 * cancelReason in cancel.ts), always with the same internal shape: title ->
 * message box -> divider -> payment row + Confirm CTA. Copy has exactly two
 * flavors, distinguished by `state.cancellation` per the task's own
 * instruction (present -> canceling; absent -> switching/upgrading plan) —
 * NOT by which flow/screen currently hosts the overlay.
 *
 * Verified verbatim against 6 live instances: the base component 3201:77070
 * (switch-plan flavor — the ONLY surviving instance of that flavor; see
 * below) and 5 byte-identical cancel-flow instances (3207:44420, 3208:50263,
 * 3208:52967, 3208:60394, 3208:61281). A 6th cancel node, 3208:54026, carries
 * a Figma-authored typo ("upgradw") not reproduced here (majority reading
 * wins, same precedent as ManagePlan/ExplorePlans's own copy.ts comments).
 *
 * KNOWN GAP, flagged rather than silently worked around: every manage.ts
 * switch-flow node ID that carries `overlay: "reviewConfirmSheet"`
 * (3201:77113, 3161:44599, 3274:32243, 3201:80092) has either been deleted
 * or points at a frame that no longer contains an M-BottomSheet at all --
 * 3161:44599 (the one surviving id) is literally the pre-sheet "Explore all
 * plan" selection page with no sheet mounted, confirmed via get_metadata (no
 * M-BottomSheet/Review & Confirm instance anywhere in its subtree). This
 * mirrors ExplorePlans.tsx's own documented finding that this whole screen
 * was redesigned upstream after the recipes were authored. The switch-copy
 * flavor below is therefore sourced from the base "Review & Confirm"
 * component itself (3201:77070) rather than any of those 4 stale instances.
 *
 * A 7th node the task listed, 3208:53775, is NOT a review-confirm sheet at
 * all on inspection: its metadata shows an M-StackedActionBar with "Keep
 * membership" / "Cancel upgrade" copy and a completely different shape
 * (title + subtitle + current-plan-with-avatars + two-button row, no
 * payment method, no single Confirm CTA) — a retention prompt mislabeled
 * `reviewConfirmSheet` in cancel.ts's upgrade-full step table. Not modeled
 * here; flagged in the Task 14 report as a recipe/Figma mismatch.
 */

const PAYMENT_ICON: Record<FinalFlowState["payment"]["method"], string> = {
  applePay: paymentApplePay,
  card: paymentCard,
};

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

export interface ReviewConfirmSheetProps {
  state: FinalFlowState;
  onAdvance: () => void;
  onClose?: () => void;
}

export default function ReviewConfirmSheet({ state, onAdvance, onClose }: ReviewConfirmSheetProps) {
  const { plan, payment, cancellation } = state;
  const price = `dhm${plan.pricePerMonth.toFixed(2)}`;
  const isCanceling = cancellation !== undefined;

  const body = isCanceling
    ? copy.reviewConfirmSheet.cancelBody.replace("{price}", price).replace("{date}", plan.renewsOn)
    : copy.reviewConfirmSheet.switchBody
        .replace("{plan}", planLabel(plan.type))
        .replace("{price}", price)
        .replace("{date}", plan.renewsOn);

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
        aria-label={copy.reviewConfirmSheet.title}
        className="absolute inset-x-0 bottom-0 z-40 flex flex-col overflow-hidden rounded-t-2xl"
        style={{ backgroundColor: finalTokens.color.surface.primary }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 32, stiffness: 320 }}
      >
        <div className="flex shrink-0 justify-center py-3">
          <div className="h-1 w-9 rounded-full" style={{ backgroundColor: finalTokens.color.surface.muted }} />
        </div>

        <div className="flex flex-col gap-3 px-3 pb-3">
          <p className="text-center font-noontree text-[15px] font-bold leading-[18px] tracking-[-0.16px]" style={{ color: finalTokens.color.text.sheetTitle }}>
            {copy.reviewConfirmSheet.title}
          </p>

          <div
            className="flex w-full items-center justify-center rounded-xl border p-3"
            style={{ backgroundColor: finalTokens.color.surface.secondary, borderColor: finalTokens.color.decorative.reviewBoxBorder }}
          >
            <p className="w-full font-noontree text-xs leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.secondary }}>
              {body}
            </p>
          </div>

          <div className="h-px w-full" style={{ backgroundColor: finalTokens.color.border.subtle }} aria-hidden="true" />

          <div className="flex w-full items-center gap-5">
            <div className="flex shrink-0 items-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-lg bg-white">
                <img src={PAYMENT_ICON[payment.method]} alt="" className="h-[25px] w-10" />
              </div>
              <div className="flex flex-col gap-0.5">
                <button type="button" className="flex items-center gap-1">
                  <span className="font-noontree text-[13px] text-black/45">{copy.reviewConfirmSheet.payWith}</span>
                  <ChevronDownIcon />
                </button>
                <p className="font-noontree text-[15px] font-bold text-black/[.92]">{"•••• " + (payment.last4 ?? "")}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onAdvance}
              className="flex h-14 flex-1 items-center justify-center rounded-xl"
              style={{ backgroundColor: finalTokens.color.decorative.neutralBlack }}
            >
              <span className="font-noontree text-[17px] font-semibold text-white">{copy.reviewConfirmSheet.confirm}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
