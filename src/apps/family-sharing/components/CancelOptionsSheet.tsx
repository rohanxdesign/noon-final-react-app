import { AnimatePresence, motion } from "framer-motion";
import type { FinalFlowState } from "../state/types";
import { seatFill } from "../state/types";
import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";
import FamilySeats from "./FamilySeats";

/**
 * Cancel-options sheet — Figma "M-BottomSheet" overlay shared by 7 live
 * instances across 2 different recipe files: cancel.ts's owner-cancellation
 * flows (3207:43659 + 3207:43265 [trial-empty, 2 sequential steps];
 * 3208:60272 [posttrial-empty]; 3208:61159 [posttrial-partial]; 3208:63041 +
 * 3208:63306 [posttrial-full, 2 sequential steps]) and member.ts's
 * memberLeavesFamily (3187:24714, hosted on the `managePlan` screen, not
 * `cancelSavings`) — confirmed directly against both recipe files, not
 * assumed from the task brief. The brief also named 3205:81276 as a possible
 * 8th instance "in cancel.ts" — verified FALSE on inspection: that id isn't
 * in cancel.ts at all, it's member.ts's own memberLeavesFamily END step
 * (`{ screen: "managePlan", figmaNodeId: "3205:81276", advanceLabel: "(end)"
 * }`) with no `overlay` field whatsoever, so it isn't modeled here.
 *
 * STRUCTURAL FINDING (verified from recipe data, not guessed): 4 of the 6
 * owner-context instances are single cancelOptionsSheet steps; trial-empty
 * and posttrial-full each carry an extra FIRST step ("Cancel plan"
 * advanceLabel, no action) before the real one ("Continue" advanceLabel,
 * dispatches selectCancelOption). The condition that predicts exactly this
 * split across all 4 known data points is `seatFill === "full" OR
 * (phase === "freeTrial" AND seatFill === "empty")` — i.e. an extra step
 * appears when the stakes are highest (a full family) or when a retention
 * offer is being dangled (trial + nothing to lose by switching down). This
 * is used below to decide whether to show the switch-to-individual
 * suggestion and the member-impact row, NOT to render two different views:
 * see the GAP note below for why.
 *
 * GAP, flagged rather than silently worked around: `state.cancellation` is
 * `{}` (all fields undefined) at BOTH steps of a 2-step sequence — the
 * `selectCancelOption` action only fires when advancing PAST the LAST
 * cancelOptionsSheet step (stateAtStep applies prior steps' actions only),
 * and OverlayProps carries no step-index/figmaNodeId signal (unlike
 * `joinError`, which JoinFamilySheet.tsx uses for an analogous multi-variant
 * split). So this component genuinely cannot distinguish "first frame" from
 * "second frame" of a 2-step sequence from state alone. Rather than invent a
 * new FlowStep field to model a visual difference that hasn't been verified
 * to exist (no Figma/MCP/browser access this session — see Task 18 report),
 * this renders ONE state-driven view for the whole sequence: on a 2-step
 * recipe the sheet simply re-animates in once more on the second click
 * before the real action fires. Functionally correct, not proven pixel-
 * identical to both source frames. Flagged for Task 22 (which re-walks every
 * cancel recipe node-by-node) to confirm whether the two frames are visually
 * distinct enough to warrant extending FlowStep the way `joinError` was.
 *
 * CTA copy is verbatim, sourced from the recipes' own advanceLabel field
 * (already Figma-extracted per FlowStep's own doc comment) rather than
 * invented: owner CTA "Continue" is the majority reading across the 6
 * owner-context nodes (4/6 read "Continue"; the other 2 — the first frame of
 * each 2-step sequence — read "Cancel plan", not reproduced here per this
 * codebase's established "majority reading wins" precedent, same as
 * ReviewConfirmSheet's typo handling and ManagePlan's page-title
 * inconsistency). Invitee CTA "Leave Family" is the only member-flow
 * instance, 1/1. Title/body copy is UNVERIFIED placeholder text — see
 * copy.ts's cancelOptionsSheet comment for the full breakdown of what's
 * reused-verbatim vs. invented.
 */
export interface CancelOptionsSheetProps {
  state: FinalFlowState;
  onAdvance: () => void;
  onClose?: () => void;
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="8" cy="8" r="6.4" stroke={finalTokens.color.text.success} strokeWidth="1.3" />
      <path d="M8 7.2v4M8 5.2v.1" stroke={finalTokens.color.text.success} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export default function CancelOptionsSheet({ state, onAdvance, onClose }: CancelOptionsSheetProps) {
  const { pov, plan, savings, members } = state;
  const isInvitee = pov === "invitee";
  const fill = seatFill(state);
  const showSwitchSuggestion = !isInvitee && plan.phase === "freeTrial" && fill === "empty";
  const memberCount = members.filter((m) => m.role === "member").length;

  const title = isInvitee ? copy.cancelOptionsSheet.titleInvitee : copy.cancelOptionsSheet.title;
  const body = isInvitee
    ? copy.cancelOptionsSheet.bodyInvitee
    : copy.cancelOptionsSheet.savingsBody.replace("{amount}", savings.total.toFixed(2));
  const cta = isInvitee ? copy.cancelOptionsSheet.ctaInvitee : copy.cancelOptionsSheet.ctaOwner;

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
        aria-label={title}
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
            {title}
          </p>

          <div
            className="flex w-full items-center justify-center rounded-xl border p-3"
            style={{ backgroundColor: finalTokens.color.surface.secondary, borderColor: finalTokens.color.decorative.reviewBoxBorder }}
          >
            <p className="w-full font-noontree text-xs leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.secondary }}>
              {body}
            </p>
          </div>

          {!isInvitee && fill !== "empty" && (
            <div className="flex w-full items-center justify-between gap-3 rounded-xl p-3" style={{ backgroundColor: finalTokens.color.surface.secondary }}>
              <p className="flex-1 font-noontree text-xs leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.secondary }}>
                {copy.cancelOptionsSheet.membersAffected.replace("{n}", String(memberCount))}
              </p>
              <FamilySeats members={members} seatsTotal={state.seatsTotal} size={24} />
            </div>
          )}

          {showSwitchSuggestion && (
            <div
              className="flex w-full flex-col gap-1 rounded-xl border p-3"
              style={{ backgroundColor: finalTokens.color.surface.successSubtle, borderColor: finalTokens.color.border.successBold }}
            >
              <div className="flex items-center gap-1.5">
                <InfoIcon />
                <p className="font-noontree text-xs font-bold leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.success }}>
                  {copy.cancelOptionsSheet.switchSuggestionTitle}
                </p>
              </div>
              <p className="font-noontree text-xs leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.secondary }}>
                {copy.cancelOptionsSheet.switchSuggestionBody}
              </p>
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-col p-3">
          <button
            type="button"
            onClick={onAdvance}
            className="flex h-14 w-full items-center justify-center rounded-xl"
            style={{ backgroundColor: finalTokens.color.decorative.neutralBlack }}
          >
            <span className="font-noontree text-[17px] font-semibold text-white">{cta}</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
