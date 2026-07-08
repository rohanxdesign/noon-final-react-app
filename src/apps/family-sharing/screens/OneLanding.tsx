import type { ScreenProps } from "./StubScreen";
import { seatFill } from "../state/types";
import type { ActivePlanUtility } from "../components/ActivePlanCard";
import ActivePlanCard from "../components/ActivePlanCard";
import SavingsWidget from "../components/SavingsWidget";
import FamilyHeader, { LandingBackground } from "../components/FamilyHeader";
import BottomActionBar from "../components/BottomActionBar";
import { AllBenefitsWidget, HowItWorksWidget, ShareOfferWidget, OsnPromoCard } from "../components/LandingWidgets";
import FaqAccordion from "../components/FaqAccordion";
import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";

/**
 * noon One landing — Figma "02 · noon One landing" pattern, verified against
 * every OneLanding node in the flow map: 3533:29160 (individual, owner),
 * 3161:31150 (family empty, post-upgrade confirmation), 3161:31167/31395/
 * 31576 (family filling: empty -> partial -> full), 3161:31758 (toast state,
 * same underlying screen as 31576 with an overlay), 3533:30475 + duo nodes
 * (upgrade-duo variant), 3180:33538 (invitee, just joined), 3161:38768/
 * 40856/42258/46402 (manage entries -- partial/full family and full duo),
 * 3180:47039 (invitee pre-leave).
 *
 * Composition is stable across every one of those nodes: landing background
 * -> hero (name + "Member since") -> ActivePlanCard -> SavingsWidget -> OSN
 * promo card -> all-benefits widget -> (how-it-works / share-offer appear
 * only in the plain "noon One landing" node 3533:29160, not in the
 * post-upgrade "Frame 2147240729" variants, which go straight from the
 * benefits strip to FAQ) -> FAQ. Everything below is derived from
 * `state`/`pov`/`seatFill(state)`/`state.plan.phase` -- no scenario branch
 * keys off a flow id.
 *
 * `pov` specifically gates BOTH the ActivePlanCard's utility row (invitees
 * always get "manage-membership", never an invite CTA) AND its header seat
 * cluster (invitees never see one, confirmed on 3180:33538/47039 -- see
 * ActivePlanCard.tsx's file comment for the full grounding). Initially
 * missed in this file's first draft since `utility`'s derivation only
 * branched on `isIndividual`/`fill`, which happened to look plausible for
 * every owner-POV node surveyed but silently mis-rendered both invitee
 * nodes as an invite-CTA state -- caught by hand-tracing `stateAtStep()`
 * output against get_design_context rather than by inspection alone.
 *
 * KNOWN GAP (see FamilyHeader.tsx + Task 10 report): the invitee-POV hero
 * name in Figma's mock (3180:33538/47039) shows the invitee's own name
 * ("Kumar Siddharth"), but FinalFlowState has no field for "the current
 * user's own display name" distinct from `plan.ownerName` (the family
 * owner) -- inviteeProspect/inviteeMember seeds never set one. Rendering
 * `plan.ownerName` for both POVs here rather than inventing an unstated
 * field or hardcoding a name string.
 */
export default function OneLanding({ state, onAdvance }: ScreenProps) {
  const { plan, members, savings, seatsTotal, pov } = state;
  const fill = seatFill(state);
  const isIndividual = plan.type === "individual";

  // Invite-first/invite-another/plan-full are owner-only utility rows -- inviting into a family
  // plan's seats is an action only the plan owner can take. An invitee's own landing view (e.g.
  // node 3180:33538, confirmed via get_design_context: bottom row reads "Manage your membership"
  // with a single settings icon, no seat cluster, no invite CTA at all) always renders
  // manage-membership regardless of how many seats the family plan happens to have filled.
  const utility: ActivePlanUtility =
    isIndividual || pov === "invitee"
      ? "manage-membership"
      : fill === "empty"
        ? "invite-first"
        : fill === "full"
          ? "plan-full"
          : "invite-another";

  const showUpgradePrompt = isIndividual && pov === "owner";
  const showFullLandingWidgets = isIndividual; // how-it-works/share-offer only appear pre-upgrade (3533:29160)

  const priceLabel = `dhm${plan.pricePerMonth.toFixed(2)}`;

  return (
    <div className="relative flex h-full w-full flex-col overflow-y-auto bg-white pb-8">
      <LandingBackground />
      <div className="relative z-10 flex flex-col items-center gap-6 px-3 pt-16">
        <FamilyHeader ownerName={plan.ownerName} memberSinceDate="5th Jan, 2026" />

        <ActivePlanCard
          plan={plan}
          members={members}
          seatsTotal={seatsTotal}
          utility={utility}
          onUtility={onAdvance}
          pov={pov}
        />

        {showUpgradePrompt && (
          <div className="-mt-2 flex w-full items-center gap-3 rounded-xl bg-white px-3 py-2">
            <p className="flex-1 font-noontree text-[13px]" style={{ color: finalTokens.color.text.primary }}>
              <span className="font-bold">{copy.oneLanding.upgradeToFamilyPlan}</span>
            </p>
            <button
              type="button"
              onClick={onAdvance}
              className="rounded-full px-3 py-2"
              style={{ backgroundColor: finalTokens.color.surface.primaryInverted }}
            >
              <span className="font-noontree text-xs font-semibold text-white">{copy.oneLanding.tryForFree}</span>
            </button>
          </div>
        )}

        <SavingsWidget savings={savings} />
        <OsnPromoCard onActivate={onAdvance} />
        <AllBenefitsWidget />
        {showFullLandingWidgets && (
          <>
            <HowItWorksWidget />
            <ShareOfferWidget onShare={onAdvance} />
          </>
        )}
        <FaqAccordion />
      </div>

      {showUpgradePrompt && (
        <div className="sticky bottom-0 mt-auto">
          <BottomActionBar
            label={copy.oneLanding.upgradeForFree}
            caption={copy.oneLanding.freeUpgradeCaption.replace("{price}", priceLabel)}
            onPress={onAdvance}
          />
        </div>
      )}
    </div>
  );
}
