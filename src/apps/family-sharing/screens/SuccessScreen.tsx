import { motion } from "framer-motion";
import type { ScreenProps } from "./StubScreen";
import { MEMBER_POOL } from "../state/seeds";
import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";
import interstitialGradient from "../assets/interstitial-gradient.png";
import interstitialGradientMember from "../assets/interstitial-gradient-member.png";
import successCheckmark from "../assets/success-checkmark.png";

/**
 * Success interstitial. Pulled all 3 live recipe-mapped nodes via
 * get_screenshot before writing this component:
 *
 *  - member-accepts-invite's success step (3180:33506, "04 · Confirmation",
 *    seed `inviteeProspect` / pov "invitee"): 179px checkmark badge +
 *    "Congratulations, {name}!" headline + "You are now a member of noon
 *    One" subtitle.
 *  - upgrade-family's success step (3161:31141, "06 · Confirmation", seed
 *    `activeIndividual` / pov "owner").
 *  - upgrade-duo's success step (3161:33072, also "06 · Confirmation", same
 *    seed/pov) — visually identical gradient background to the family node
 *    and IDENTICAL headline text: "Setting up your Family plan" appears on
 *    the duo node too, not "Setting up your Duo plan"; not edited, Figma's
 *    own canvas literally shows the Family-plan string on both.
 *
 * FIGMA DRIFT (flagged, not silently fixed): both "06 · Confirmation" nodes
 * mapped to `success` in upgrade.ts are headline-only — structurally
 * IDENTICAL to a transition screen (no checkmark, no subtitle), confirmed via
 * get_screenshot. The checkmark-bearing "Your free upgrade is on" / "Start
 * adding your loved ones to the Family plan" content that visually matches
 * what a "success" screen should look like actually lives ONE STEP LATER in
 * both flows, at "07 · Confirmation" (3161:31150 for upgrade-family,
 * 3161:33081 for upgrade-duo — verified visually identical background and
 * copy between the two via get_screenshot) — which upgrade.ts currently types
 * as `screen: "oneLanding"`, not `"success"`. So the `success`/`oneLanding`
 * screen-id assignments for these two adjacent, already-resolved
 * (non-deferred) steps look swapped relative to their own content. This is
 * NOT a deleted/redesigned node (both nodes are live and exactly as
 * described) — it's a recipe-authoring mismatch, one step later than the
 * single node upgrade.ts marks "resolve node in Task 19" (the transition step
 * immediately before these two). Out of this task's scope to rewrite
 * state/recipes/upgrade.ts's screen/figmaNodeId assignments — Task 19's full
 * flow-verification pass is the named place to correct the wiring. This
 * component is therefore built against the CURRENTLY WIRED node
 * (headline-only) for the `success` id, with the true checkmark copy also
 * authored in copy.ts (yourFreeUpgradeIsOn/startAddingLovedOnes) ready for
 * whenever that reassignment happens.
 *
 * Variant is driven by `state.pov` (grounded, not flow-id string matching):
 * `pov === "invitee"` is only ever true for member-accepts-invite's seed
 * (`inviteeProspect`) and renders the checkmark layout; `pov === "owner"` is
 * upgrade-family/upgrade-duo's seed (`activeIndividual`) and renders the
 * headline-only layout matching what's actually live on those two nodes
 * today. `plan.type` can't be used as the discriminator here — by this step
 * both flows have already dispatched their family-plan action (`joinFamily`
 * / `confirmUpgrade`), so `state.plan.type === "family"` on all three steps.
 *
 * The invitee's own display name ("Siddarth" in Figma's mock, from
 * "Congratulations, Siddarth!") has no field on FinalFlowState — same gap
 * noted in OneLanding.tsx/FamilyHeader.tsx's file comments (no "current
 * user's own name" distinct from plan.ownerName, and inviteeProspect's seed
 * carries neither). MEMBER_POOL[0] ("Kumar Siddharth") is used here rather
 * than inventing an unstated string — it's the same person the upgrade
 * recipes' `memberJoined` action already names for this exact "member-joins"
 * moment, not a new invention. Given name is the LAST token ("Siddharth"),
 * not the first ("Kumar") — matches how Figma's own mock greets by given
 * name, one letter off this seed's spelling ("Siddarth" vs. "Siddharth"),
 * not corrected here since "Kumar Siddharth" is this prototype's own
 * established spelling, used verbatim elsewhere in upgrade.ts's
 * `memberJoined` actions — consistency with the rest of the seed data
 * matters more than matching a placeholder name's one-off Figma spelling.
 *
 * Background assets: two gradient-glow PNGs (interstitial-gradient.png /
 * interstitial-gradient-member.png, pre-staged before this task, same pair
 * TransitionScreen.tsx uses) picked per `pov` rather than one shared asset.
 */
export default function SuccessScreen({ state }: ScreenProps) {
  const isInviteeJoining = state.pov === "invitee";
  const inviteeGivenName = MEMBER_POOL[0].split(" ").at(-1) ?? MEMBER_POOL[0];

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: finalTokens.color.decorative.interstitialFrameBg }}
    >
      <img
        src={isInviteeJoining ? interstitialGradientMember : interstitialGradient}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />

      {isInviteeJoining ? (
        <motion.div
          key="checkmark"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.36, ease: [0.32, 0.72, 0, 1] }}
          className="relative z-10 flex flex-col items-center gap-8 px-8"
        >
          <img src={successCheckmark} alt="" className="h-[179px] w-[179px]" aria-hidden="true" />
          <div className="flex flex-col items-center gap-[9px] text-center">
            <p
              className="font-noontree text-2xl font-extrabold tracking-[-0.4px]"
              style={{ color: finalTokens.color.decorative.interstitialHeadline }}
            >
              {copy.success.congratulations.replace("{name}", inviteeGivenName)}
            </p>
            <p
              className="font-noontree text-sm font-medium tracking-[-0.14px]"
              style={{ color: finalTokens.color.decorative.interstitialSubtitle }}
            >
              {copy.success.nowMemberOfNoonOne}
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.p
          key="headline-only"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
          className="relative z-10 px-8 text-center font-noontree text-2xl font-extrabold tracking-[-0.4px]"
          style={{ color: finalTokens.color.decorative.interstitialHeadline }}
        >
          {copy.success.settingUpYourFamilyPlan}
        </motion.p>
      )}
    </div>
  );
}
