import { AnimatePresence, motion } from "framer-motion";
import type { FinalFlowState } from "../state/types";
import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";

/**
 * Share sheet — iOS native share-sheet MOCK, visual only (per the task
 * brief; this is not a real OS share integration). No Figma node is bound to
 * this overlay: upgrade.ts's only `shareSheet` call site (the family flow,
 * immediately after inviteSheet) carries `figmaNodeId: ""` with the note
 * "resolve node in Task 19" -- it is NOT present in upgrade-duo at all, and
 * no "share sheet"/"ios share" layer exists anywhere else in the file
 * (confirmed by grepping every recipe for `shareSheet` -- this is the only
 * reference, and get_metadata on the family flow's neighboring nodes turned
 * up no such component). Built here as a generic, minimal iOS share-sheet
 * silhouette (grabber + row of share-target icons + Cancel) using this
 * surface's own tokens rather than inventing Figma grounding that doesn't
 * exist -- flagged in the Task 15 report as an unresolved node, same
 * disposition as PaymentSheet's/ReviewConfirmSheet's own documented gaps.
 *
 * Advances (dismisses) via `onAdvance` on either the scrim tap or the
 * Cancel button, matching the recipe step's own `advanceLabel: "(dismiss)"`
 * -- this overlay has no other action to take.
 */

const SHARE_TARGETS = [
  { key: "messages", label: "Messages", color: "#3ddc61" },
  { key: "mail", label: "Mail", color: "#3392ff" },
  { key: "whatsapp", label: "WhatsApp", color: "#25d366" },
  { key: "copy", label: "Copy", color: "#8a8a8a" },
];

function ShareTargetGlyph({ color }: { color: string }) {
  return (
    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: color }}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8c-1.1 0-2.1-.2-3-.6L4 20l1.1-4.5c-.7-1-1.1-2.2-1.1-3.5Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export interface ShareSheetProps {
  state: FinalFlowState;
  onAdvance: () => void;
  onClose?: () => void;
}

export default function ShareSheet({ onAdvance }: ShareSheetProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 z-30"
        style={{ backgroundColor: finalTokens.color.surface.overlayBold }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onAdvance}
        aria-hidden="true"
      />
      <motion.div
        role="dialog"
        aria-label={copy.shareSheet.title}
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

        <div className="flex flex-col gap-1 px-4 pb-4 text-center">
          <p className="font-noontree text-[13px] font-semibold" style={{ color: finalTokens.color.text.secondary }}>
            {copy.shareSheet.title}
          </p>
        </div>

        <div className="flex items-start gap-5 overflow-x-auto px-4 pb-5">
          {SHARE_TARGETS.map((t) => (
            <div key={t.key} className="flex w-16 shrink-0 flex-col items-center gap-1.5">
              <ShareTargetGlyph color={t.color} />
              <span className="font-noontree text-[11px]" style={{ color: finalTokens.color.text.secondary }}>
                {t.label}
              </span>
            </div>
          ))}
        </div>

        <div className="h-px w-full" style={{ backgroundColor: finalTokens.color.border.subtle }} />

        <div className="p-3">
          <button
            type="button"
            onClick={onAdvance}
            className="flex min-h-[52px] w-full items-center justify-center rounded-xl"
            style={{ backgroundColor: finalTokens.color.surface.secondary }}
          >
            <span className="font-noontree text-base font-semibold" style={{ color: finalTokens.color.text.primary }}>
              {copy.shareSheet.cancel}
            </span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
