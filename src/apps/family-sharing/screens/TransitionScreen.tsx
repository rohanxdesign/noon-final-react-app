import { motion } from "framer-motion";
import type { ScreenProps } from "./StubScreen";
import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";
import interstitialGradient from "../assets/interstitial-gradient.png";
import interstitialGradientMember from "../assets/interstitial-gradient-member.png";

/**
 * Transition interstitial — Figma "03 · Confirmation" pattern, a headline-only
 * loading/setup screen that sits between a confirming action and its result.
 * Auto-advances via FlowRunner's existing `autoAdvanceMs` (no timer logic here).
 *
 * Only one live recipe step renders this screen today: member-accepts-invite's
 * second step (3180:33497, seed `inviteeProspect`, autoAdvanceMs: 1800) —
 * verified via get_screenshot: warm gradient-glow background + a single
 * centered ExtraBold headline, "Upgrading your experience", no checkmark badge
 * and no subtitle.
 *
 * upgrade-family's transition step (upgrade.ts) has `figmaNodeId: ""` with
 * `note: "resolve node in Task 19"` — left untouched per this task's brief
 * (not this task's call to fix). That seed (`activeIndividual`, pov: "owner")
 * differs from member-accepts-invite's (`inviteeProspect`, pov: "invitee") in
 * exactly the field this component branches on, so once Task 19 fills in the
 * real node id this screen already renders a sensible (if placeholder)
 * headline + background rather than blank content — `settingUpYourPlan` is a
 * same-shape placeholder pending that node's real verbatim string.
 *
 * Two gradient-glow background assets exist in this module's assets/ folder
 * (interstitial-gradient.png / interstitial-gradient-member.png, pre-staged
 * before this task) rather than one shared asset — kept distinct per pov
 * (owner vs. member) rather than collapsed into one, matching how the assets
 * were already named/exported.
 */
export default function TransitionScreen({ state }: ScreenProps) {
  const isInvitee = state.pov === "invitee";
  const headline = isInvitee ? copy.transition.upgradingYourExperience : copy.transition.settingUpYourPlan;

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ backgroundColor: finalTokens.color.decorative.interstitialFrameBg }}
    >
      <img
        src={isInvitee ? interstitialGradientMember : interstitialGradient}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <motion.p
        key={headline}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
        className="relative z-10 px-8 text-center font-noontree text-2xl font-extrabold tracking-[-0.4px]"
        style={{ color: finalTokens.color.decorative.interstitialHeadline }}
      >
        {headline}
      </motion.p>
    </div>
  );
}
