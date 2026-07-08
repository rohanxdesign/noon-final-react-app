import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FinalFlowState } from "../state/types";
import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";

/**
 * Invite sheet — Figma "Share invite" component (3187:66754, standalone) as
 * mounted inside an "M-BottomSheet" instance on both flow-bearing nodes:
 * 3161:31939 (family, "08 · Invite your first member" — full home-screen
 * context behind the sheet) and 3187:72847 (duo, same composition). Both
 * instances render byte-identical body content ("4 more seats available" /
 * "Add your loved ones to the Family plan" / "They'll enjoy free delivery on
 * everything" / the invite-link field), confirmed directly against both
 * nodes — only the surrounding host screen differs, which this component
 * doesn't render (FlowRunner mounts it as an overlay on top of whatever
 * `Screen` the current step specifies, exactly like PaymentSheet/
 * ReviewConfirmSheet).
 *
 * "4 more seats available" is Figma's own literal on both nodes, but it's
 * clearly meant to track the plan's remaining capacity rather than being a
 * fixed constant (the invite flow can fire at any fill level) -- derived here
 * from `seatsTotal - members.length` and rendered through the SAME copy key
 * OneLanding.tsx's utility row already uses for this exact phrase
 * (`copy.oneLanding.seatsAvailable`, "{n} more seats available") rather than
 * inventing a duplicate inviteSheet-scoped string for identical wording.
 *
 * Link text is `state.invite.link` verbatim (seeds.ts already ports Figma's
 * "invite.noon.com/RAHUL" as the default seed value) -- never hardcoded.
 *
 * "Share invite" CTA copy comes from the M-StackedActionBar's footer note,
 * "Invitee remains on your noon One plan until removed." (3187:72847's
 * I...;4588:3617;4588:3330;3187:72623) -- present on the duo node but NOT
 * inspected as text on the family node (font/whitespace differs slightly
 * across the same slot on some other overlays in this file, e.g.
 * ReviewConfirmSheet's cancel-flow "upgradw" typo) -- rendered verbatim as
 * the only surviving instance of this footer string.
 */

function CopyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="7" y="7" width="10" height="10" rx="2" stroke={finalTokens.color.text.muted} strokeWidth="1.4" />
      <path d="M4.5 13V5.5a1 1 0 0 1 1-1H13" stroke={finalTokens.color.text.muted} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ShareUploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 15V4M12 4L8 8M12 4l4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export interface InviteSheetProps {
  state: FinalFlowState;
  onAdvance: () => void;
  onClose?: () => void;
}

export default function InviteSheet({ state, onAdvance, onClose }: InviteSheetProps) {
  const { invite, seatsTotal, members } = state;
  const seatsLeft = Math.max(0, seatsTotal - members.length);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(invite.link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

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
        aria-label="Share invite"
        className="absolute inset-x-0 bottom-0 z-40 flex flex-col overflow-hidden rounded-t-2xl"
        style={{ backgroundColor: finalTokens.color.surface.primary, maxHeight: "85%" }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 32, stiffness: 320 }}
      >
        <div className="flex shrink-0 justify-center py-3">
          <div className="h-1 w-9 rounded-full" style={{ backgroundColor: finalTokens.color.surface.muted }} />
        </div>

        <div className="flex flex-col items-center gap-5 overflow-y-auto px-3 pb-3 pt-3">
          <div className="flex w-full flex-col items-center gap-2 text-center">
            <div
              className="flex w-fit items-center justify-center rounded-full px-4 py-2"
              style={{ backgroundColor: finalTokens.color.surface.tertiary }}
            >
              <span className="font-noontree text-[11px] font-semibold" style={{ color: finalTokens.color.text.success }}>
                {copy.oneLanding.seatsAvailable.replace("{n}", String(seatsLeft))}
              </span>
            </div>
            <p className="w-[281px] font-noontree text-[26px] font-bold leading-[30px] tracking-[-0.26px]" style={{ color: finalTokens.color.text.primary }}>
              {copy.inviteSheet.title}
            </p>
            <p className="font-noontree text-sm font-semibold leading-5" style={{ color: finalTokens.color.text.secondary }}>
              {copy.inviteSheet.subtitle}
            </p>
          </div>

          <div
            className="flex min-h-[48px] w-full items-center gap-2 rounded-xl border p-3"
            style={{ backgroundColor: finalTokens.color.surface.secondary, borderColor: finalTokens.color.border.subtle }}
          >
            <span className="flex-1 truncate font-noontree text-sm font-medium tracking-[-0.1px]" style={{ color: finalTokens.color.text.primary }}>
              {invite.link}
            </span>
            <button type="button" onClick={handleCopy} aria-label="Copy invite link" className="shrink-0">
              <CopyIcon />
            </button>
          </div>
          {copied && (
            <p className="-mt-3 font-noontree text-xs font-semibold" style={{ color: finalTokens.color.text.success }}>
              {copy.inviteSheet.copied}
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-center gap-3 p-3">
          <button
            type="button"
            onClick={onAdvance}
            className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5"
            style={{ backgroundColor: finalTokens.color.surface.primaryInverted }}
          >
            <ShareUploadIcon />
            <span className="font-noontree text-base font-semibold text-white">{copy.inviteSheet.shareInvite}</span>
          </button>
          <p className="font-noontree text-xs font-medium tracking-[-0.1px]" style={{ color: finalTokens.color.text.tertiary }}>
            {copy.inviteSheet.footerNote}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
