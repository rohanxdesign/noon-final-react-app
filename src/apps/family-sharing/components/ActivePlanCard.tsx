import type { Member, PlanInfo, POV } from "../state/types";
import FamilySeats from "./FamilySeats";
import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";

/**
 * Active plan card — Figma component set "Active plan card" (container
 * 3136:22678 shows the planType axis: Individual / Family / Duo plan /
 * "Plan type4" [a duplicate Family instance, not a distinct 4th plan type];
 * the utility axis comes from the 4 standalone variant nodes: 3636:25801
 * "Individual plan/Annual/Plan full", 3636:25917 "Family plan/Monthly/Invite
 * first user", 3636:26048 "Family plan/Monthly/Invite another member",
 * 3636:26179 "Family plan/Monthly/Plan full").
 *
 * Two axes compose independently:
 *  - `plan.type` controls the header (title + trial/renewal line + seat
 *    avatars only shown for family/duo).
 *  - `utility` controls the bottom action row. Individual plans only ever
 *    render as "manage-membership" (no seats to invite into) but use a plain
 *    chevron instead of the settings-gear icon family/duo use for the same
 *    utility -- confirmed by comparing 3636:25801 (individual, chevron) against
 *    3636:26179 (family, settings icon) side by side. That's a rendering
 *    detail keyed off `plan.type`, not a 5th utility value.
 *
 * A 3rd input, `pov`, gates the header's seat cluster specifically: every
 * surveyed invitee-POV OneLanding node (3180:33538 right after joining,
 * 3180:47039 about to leave -- confirmed via get_design_context on both)
 * shows NO seat cluster at all in the header, regardless of how many
 * members that family actually has (0 vs 2 respectively in this prototype's
 * seeds) -- an invitee only ever sees "Manage your membership", never a
 * roster of who else is in the family. Owner-POV nodes always show the
 * cluster for family/duo plans. Not folded into the `utility` axis (which
 * `OneLanding.tsx` already forces to "manage-membership" for invitees)
 * because the header's seat cluster and the bottom row are visually and
 * structurally independent elements of this card.
 */

export type ActivePlanUtility = "invite-first" | "invite-another" | "plan-full" | "manage-membership";

export interface ActivePlanCardProps {
  plan: PlanInfo;
  members: Member[];
  seatsTotal: 2 | 6;
  utility: ActivePlanUtility;
  onUtility: () => void;
  /** Gates the header seat cluster -- omit only for call sites that never render for an invitee. */
  pov?: POV;
  /** Secondary CTA next to "Share Invite" (opens manage sheet) -- omit to hide the icon button. */
  onManage?: () => void;
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M5.25 3.5L9.625 7L5.25 10.5" stroke={finalTokens.color.text.tertiary} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 4h6M11 4h2M3 8h2M7 8h6M3 12h8M13 12h0" stroke={finalTokens.color.text.primary} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="7" cy="4" r="1.4" fill={finalTokens.color.text.primary} />
      <circle cx="5" cy="8" r="1.4" fill={finalTokens.color.text.primary} />
      <circle cx="11" cy="12" r="1.4" fill={finalTokens.color.text.primary} />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="3" width="13" height="11.5" rx="2.2" stroke={finalTokens.color.text.tertiary} strokeWidth="1.2" />
      <line x1="1.5" y1="6.2" x2="14.5" y2="6.2" stroke={finalTokens.color.text.tertiary} strokeWidth="1.2" />
      <line x1="5" y1="1.5" x2="5" y2="4.5" stroke={finalTokens.color.text.tertiary} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="11" y1="1.5" x2="11" y2="4.5" stroke={finalTokens.color.text.tertiary} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function planTitle(type: PlanInfo["type"]): string {
  if (type === "family") return copy.oneLanding.familyPlanTitle;
  if (type === "duo") return copy.oneLanding.duoPlanTitle;
  return copy.oneLanding.individualPlanTitle;
}

function renewalLine(plan: PlanInfo): string {
  const price = `dhm${plan.pricePerMonth.toFixed(2)}`;
  if (plan.phase === "freeTrial") {
    const days = plan.trialDaysLeft ?? 0;
    return (plan.type === "individual" ? copy.oneLanding.trialEndsIndividual : copy.oneLanding.trialEndsFamily)
      .replace("{days}", String(days))
      .replace("{price}", price);
  }
  return copy.oneLanding.renewsOn.replace("{date}", plan.renewsOn).replace("{price}", price);
}

function seatsLeftLabel(plan: PlanInfo, remaining: number): string {
  if (plan.type === "duo") return copy.oneLanding.seatsLeftDuo.replace("{n}", String(remaining));
  return copy.oneLanding.seatsAvailable.replace("{n}", String(remaining));
}

export default function ActivePlanCard({ plan, members, seatsTotal, utility, onUtility, pov = "owner", onManage }: ActivePlanCardProps) {
  const isIndividual = plan.type === "individual";
  const showSeats = !isIndividual && pov === "owner";
  const capacity = seatsTotal - 1;
  const memberCount = members.filter((m) => m.role === "member").length;
  const remaining = Math.max(0, capacity - memberCount);

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-[10px] rounded-xl border p-1"
      style={{ borderColor: finalTokens.color.border.white, background: finalTokens.color.surface.primary, boxShadow: "0px 2px 20px rgba(0,0,0,0.03)" }}
    >
      {/* Plan info */}
      <div className="flex h-[70px] w-full flex-col items-start justify-center gap-0 overflow-hidden rounded-lg px-4 pb-3 pt-[10px]">
        <div className="flex items-center gap-1">
          <span className="font-noontree text-[13px] font-medium leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.success }}>
            {copy.oneLanding.activePlanLabel}
          </span>
          <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: finalTokens.color.text.success }} aria-hidden="true" />
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="truncate font-noontree text-[20px] font-bold leading-7 tracking-[-0.25px]" style={{ color: finalTokens.color.text.primary }}>
            {planTitle(plan.type)}
          </p>
          {showSeats && <FamilySeats members={members} seatsTotal={seatsTotal} />}
        </div>
      </div>

      <div className="h-px w-full" style={{ backgroundColor: finalTokens.color.border.subtle }} />

      {/* Renewal / trial line */}
      <div className="flex w-full items-center gap-1 px-4 py-3">
        <CalendarIcon />
        <span className="font-noontree text-xs font-medium leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.secondary }}>
          {renewalLine(plan)}
        </span>
      </div>

      {/* Bottom utility row */}
      <div
        className="flex w-full items-center gap-[10px] rounded-b-lg rounded-t-[4px] p-3"
        style={{ backgroundColor: finalTokens.color.surface.secondary, border: `1px solid ${finalTokens.color.border.overlay}` }}
      >
        {isIndividual ? (
          <button type="button" onClick={onUtility} className="flex flex-1 items-center justify-between">
            <span className="font-noontree text-[13px] font-medium" style={{ color: finalTokens.color.text.primary }}>
              {copy.oneLanding.manageMembership}
            </span>
            <ChevronRightIcon />
          </button>
        ) : utility === "plan-full" || utility === "manage-membership" ? (
          <>
            <button type="button" onClick={onUtility} className="flex flex-1 items-center gap-2 text-left">
              <span className="font-noontree text-[13px] font-bold" style={{ color: finalTokens.color.text.primary }}>
                {copy.oneLanding.manageYourMembership}
              </span>
            </button>
            <button
              type="button"
              onClick={onManage ?? onUtility}
              aria-label="Manage settings"
              className="flex size-9 shrink-0 items-center justify-center rounded-full border"
              style={{ backgroundColor: finalTokens.color.surface.primary, borderColor: finalTokens.color.surface.tertiary }}
            >
              <SettingsIcon />
            </button>
          </>
        ) : (
          <>
            <div className="flex flex-1 flex-col gap-[2px]">
              <p className="font-noontree text-[13px] font-semibold" style={{ color: finalTokens.color.text.primary }}>
                {utility === "invite-first"
                  ? plan.type === "duo"
                    ? copy.oneLanding.inviteAMemberDuo
                    : copy.oneLanding.addFamilyToYourPlan
                  : seatsLeftLabel(plan, remaining)}
              </p>
              {utility === "invite-first" && (
                <p className="font-noontree text-[11px]" style={{ color: finalTokens.color.text.tertiary }}>
                  {plan.type === "duo" ? copy.oneLanding.seatsLeftDuo.replace("{n}", String(remaining)) : copy.oneLanding.seatsLeftFamily.replace("{n}", String(remaining))}
                </p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={onUtility}
                className="flex h-9 items-center justify-center gap-1 rounded-full px-3 py-[10px]"
                style={{ backgroundColor: finalTokens.color.surface.primaryInverted }}
              >
                <span className="font-noontree text-xs font-semibold" style={{ color: finalTokens.color.text.onSurfaceBold }}>
                  {copy.oneLanding.shareInvite}
                </span>
              </button>
              <button
                type="button"
                onClick={onManage ?? onUtility}
                aria-label="Manage settings"
                className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                style={{ backgroundColor: finalTokens.color.surface.primary, borderColor: finalTokens.color.surface.tertiary }}
              >
                <SettingsIcon />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
