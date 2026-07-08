import { AnimatePresence, motion } from "framer-motion";
import type { FinalFlowState } from "../state/types";
import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";

/**
 * Member-joined toast — Figma "M-Toast" component (2240:14174, Dark variant),
 * live instance 3161:31739. Both upgrade.ts call sites (`overlay:
 * "memberJoinedToast"` on figmaNodeId 3161:31758 [family flow] and
 * 3161:33506 [duo flow]) name a screen that, on direct inspection, has NO
 * toast in its own subtree -- confirmed via get_metadata on both. The toast
 * actually lives one step EARLIER in Figma's own numbering, as an
 * absolutely-positioned child of 3161:31576 ("12 · noon One landing", the
 * screen where upgrade.ts's own `memberJoined` action fires, immediately
 * before the memberJoinedToast overlay step) -- not of 3161:31758 ("13 ·
 * First member joined", the BYTE-IDENTICAL next screen minus the toast).
 * Figma's own flow numbering places the toast as the tail end of the
 * "action" screen, then a separate clean screen after it settles -- mounting
 * this copy on the recipe's overlay step (on top of oneLanding, per
 * FlowRunner's normal overlay mechanism) reproduces that exact same
 * screen+toast composition, one recipe step later than Figma's own frame
 * numbering, with no visual difference.
 *
 * GENUINE FIGMA GAP (flagged per the task brief rather than silently
 * papered over): the duo flow's equivalent action screen (3161:33326, "11 ·
 * noon One landing") carries NO toast instance anywhere in its subtree, and
 * a file-wide search of the page turned up exactly one M-Toast in the whole
 * document -- the family-flow one at 3161:31739. The duo flow's own
 * memberJoinedToast step (figmaNodeId 3161:33506) therefore has no Figma
 * grounding of its own; this component is still mounted for it (same
 * generic, stateless toast design, correctly reused) with the joined name
 * substituted from state exactly as the family flow does, since Figma
 * itself is inconsistent between the two otherwise-parallel flows rather
 * than intentionally omitting the duo toast.
 *
 * Copy: verbatim Figma text is "Kumar Siddharth has joined your family" --
 * templated on `{name}` here (copy.memberJoinedToast.joined) since the real
 * driver is `state.invite.lastJoined`, set by the reducer's `memberJoined`
 * case one step earlier -- not a hardcoded name. Falls back to the seed's
 * MEMBER_POOL[0] convention ("Kumar Siddharth") only in the sense that
 * every recipe path reaching this overlay has already fired that exact
 * action; there is no scenario in this prototype where lastJoined is unset
 * by the time this overlay mounts.
 *
 * No subtitle, no leading icon/avatar, no action button in Figma's own
 * instance (all three toggled off) -- just title + trailing close (X). This
 * is a small transient notification, not a full sheet -- no scrim, no
 * spring bottom-sheet mount; positioned near the bottom of the screen
 * (Figma: x=12, y=732 within the 375x812 frame) with a simple fade+rise,
 * distinct from this module's sheet overlays (InviteSheet/PaymentSheet/
 * JoinFamilySheet) which all share the scrim+spring-sheet treatment.
 */

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M13.725 5.391a.6.6 0 0 1 .884.884L10.884 10l3.725 3.725a.6.6 0 0 1-.884.884L10 10.884l-3.725 3.725a.6.6 0 0 1-.884-.884L9.116 10 5.391 6.275a.6.6 0 0 1 .884-.884L10 9.116l3.725-3.725Z"
        fill="white"
      />
    </svg>
  );
}

export interface MemberJoinedToastProps {
  state: FinalFlowState;
  onAdvance: () => void;
  onClose?: () => void;
}

export default function MemberJoinedToast({ state, onClose }: MemberJoinedToastProps) {
  const name = state.invite.lastJoined ?? state.members[state.members.length - 1]?.name ?? "";

  return (
    <AnimatePresence>
      <motion.div
        role="status"
        className="absolute inset-x-3 z-40"
        style={{ bottom: 33 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ type: "spring", damping: 28, stiffness: 340 }}
      >
        <div
          className="flex w-full items-center gap-2 rounded-[14px] border pl-3"
          style={{ backgroundColor: finalTokens.color.text.primary, borderColor: finalTokens.color.border.overlay, boxShadow: "0px 12px 14px rgba(11,12,14,0.1)" }}
        >
          <p className="flex-1 truncate py-3 font-noontree text-sm font-semibold leading-5 tracking-[-0.1px] text-white">
            {copy.memberJoinedToast.joined.replace("{name}", name)}
          </p>
          <button type="button" onClick={onClose} aria-label="Dismiss" className="flex shrink-0 items-center justify-center self-stretch p-2.5">
            <span className="flex items-center justify-center rounded-full p-1" style={{ backgroundColor: finalTokens.color.border.overlay }}>
              <CloseIcon />
            </span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
