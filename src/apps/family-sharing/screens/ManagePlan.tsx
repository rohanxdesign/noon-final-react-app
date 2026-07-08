import type { ScreenProps } from "./StubScreen";
import type { Member, PlanInfo, PaymentMethodKind } from "../state/types";
import Avatar, { EmptyAvatarSlot } from "../components/Avatar";
import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";
import paymentApplePay from "../assets/payment-apple-pay.svg";
import paymentCard from "../assets/payment-card.svg";

/**
 * Manage plan — Figma "02 · Manage family plan" (owner: 3161:34160, built from
 * the Current Plan component 3187:75676 + Manage Family list 3161:28282 with
 * 3145:73535's owner/invitee rows + payment card 3161:34221 + cancel row
 * 3161:34233) and "02 · Manage family plan" invitee variant (3180:47438,
 * built from Manage Membership - invitee 3205:82048 + leave row 3180:47511).
 *
 * Verified against recipe-mapped nodes: 3161:34160 (remove flow, design
 * context), 3180:47438 (invitee, design context), 3201:78358 / 3207:42852 /
 * 3208:49832 / 3208:60124 / 3201:76044 / 3539:33433 / 3201:79736
 * (screenshots). The remaining mapped nodes (3208:52536/53436/60987/61927,
 * 3201:78640/79493) were code-traced from their recipes' seeds only.
 *
 * Everything derives from state -- no flow branching. Where Figma's own mocks
 * contradict each other for identical seeds, the state-grounded majority
 * reading wins (all divergences quoted in copy.ts comments + Task 11 report):
 *  - page title: owner -> "Manage Family plan", invitee -> "Manage your
 *    membership" (3201:78358 titles an owner screen with the invitee string).
 *  - renewal line + plan row label: phase freeTrial -> "Free upgrade for
 *    {days} days..." + "Change upgrade" (3539:33433, whose "39 days" matches
 *    the seed's trialDaysLeft); anything else -> "Auto renews..." + "Change
 *    plan". The cancel-upgrade entry nodes' "Cancel upgrade" row is a third
 *    variant reproducible only with flow knowledge -- not modelled.
 *  - cancel-row trial note: hidden for postTrial (3208:60124 omits it).
 *  - member list renders from state.members; the "Add another member" row
 *    appears while seats remain (3207:42852 et al.), so post-remove states
 *    (3201:76044) re-derive without a bespoke branch. Figma's static rosters
 *    (always 5 members) and seat numerals ("4 more seats available" beside an
 *    empty roster) don't always agree with their own seeds -- counts here are
 *    real: seatsTotal - 1 - memberCount.
 *
 * Per the task contract, every plausible CTA advances the flow (the runner
 * owns which action actually fires): Change plan / Change upgrade, every
 * Remove, Add another member, Change payment method, Cancel membership,
 * Leave Family plan.
 */

function ChevronSmallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M5.25 3.5L9.625 7L5.25 10.5" stroke={finalTokens.color.text.primary} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 5.5L16 12L9 18.5" stroke={finalTokens.color.text.primary} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12.5 4.5L7 10L12.5 15.5" stroke={finalTokens.color.text.primary} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.4" stroke={finalTokens.color.text.primary} strokeWidth="1.2" />
      <path d="M6.8 10.2l2.1 2.1 4.3-4.4" stroke={finalTokens.color.text.primary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DashedDivider({ emphasis = "low", className = "" }: { emphasis?: "low" | "high"; className?: string }) {
  return (
    <div
      className={`h-0 border-t border-dashed ${className}`}
      style={{ borderColor: emphasis === "high" ? finalTokens.color.border.medium : finalTokens.color.border.subtle }}
      aria-hidden="true"
    />
  );
}

function PageHeader({ title }: { title: string }) {
  return (
    <div className="flex h-14 w-full items-center gap-1 px-3 py-2">
      <button
        type="button"
        aria-label="Back"
        className="flex size-10 shrink-0 items-center justify-center rounded-full border"
        style={{ backgroundColor: finalTokens.color.surface.primary, borderColor: finalTokens.color.border.subtle }}
      >
        <ChevronLeftIcon />
      </button>
      <p className="flex-1 pl-2 pr-1 font-noontree text-base font-bold leading-5 tracking-[-0.15px]" style={{ color: finalTokens.color.text.primary }}>
        {title}
      </p>
    </div>
  );
}

function CurrentPlanTag() {
  return (
    <div
      className="flex h-6 w-fit items-center justify-center rounded-b-xl px-3 py-1"
      style={{ backgroundColor: finalTokens.color.decorative.planTagBg }}
    >
      <span className="font-noontree text-xs font-semibold text-white">{copy.managePlan.currentPlanTag}</span>
    </div>
  );
}

function BenefitRow({ text }: { text: string }) {
  return (
    <div className="flex w-full items-center">
      <div className="flex items-center pl-3">
        <CheckCircleIcon />
      </div>
      <p className="px-3 py-[10px] font-noontree text-xs font-medium leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.secondary }}>
        {text}
      </p>
    </div>
  );
}

const BENEFITS = [copy.managePlan.benefit1, copy.managePlan.benefit2, copy.managePlan.benefit3];

function planTitle(plan: PlanInfo): string {
  return plan.type === "duo" ? copy.managePlan.planTitleDuo : copy.managePlan.planTitleFamily;
}

/** Owner current-plan card (3187:75676): tertiary shell wrapping a white benefits card + Change-plan row. */
function OwnerCurrentPlanCard({ plan, onAdvance }: { plan: PlanInfo; onAdvance: () => void }) {
  const price = `dhm${plan.pricePerMonth.toFixed(2)}`;
  const isTrial = plan.phase === "freeTrial";
  const renewalLine = isTrial
    ? copy.managePlan.freeUpgradeRenews
        .replace("{days}", String(plan.trialDaysLeft ?? 0))
        .replace("{date}", plan.renewsOn)
        .replace("{price}", price)
    : copy.managePlan.autoRenewsAtPrice.replace("{date}", plan.renewsOn).replace("{price}", price);

  return (
    <section
      className="flex w-full flex-col items-center gap-3 rounded-xl border px-1 pb-[14px] pt-1"
      style={{
        backgroundColor: finalTokens.color.surface.tertiary,
        borderColor: finalTokens.color.surface.primary,
        boxShadow: "0px 2px 20px rgba(0,0,0,0.02)", // raw literal in Figma (3187:75676), not a bound variable
      }}
    >
      <div
        className="flex w-full flex-col gap-[2px] rounded-lg border"
        style={{ backgroundColor: finalTokens.color.surface.primary, borderColor: finalTokens.color.border.white }}
      >
        <div className="w-full px-2">
          <CurrentPlanTag />
        </div>
        <div className="w-full p-3">
          <p className="truncate font-noontree text-base font-bold leading-[22px] tracking-[-0.15px]" style={{ color: finalTokens.color.text.primary }}>
            {planTitle(plan)}
          </p>
        </div>
        <DashedDivider className="w-full" />
        {BENEFITS.map((b) => (
          <BenefitRow key={b} text={b} />
        ))}
        <DashedDivider emphasis="high" className="mx-3" />
        <p className="px-3 py-4 font-noontree text-xs font-medium leading-[14px] tracking-[-0.12px]" style={{ color: finalTokens.color.text.tertiary }}>
          {renewalLine}
        </p>
      </div>
      <button type="button" onClick={onAdvance} className="flex w-full items-center justify-between px-4">
        <span className="font-noontree text-[13px] font-medium leading-[15px] tracking-[-0.12px]" style={{ color: finalTokens.color.decorative.black2 }}>
          {isTrial ? copy.managePlan.changeUpgrade : copy.managePlan.changePlan}
        </span>
        <ChevronSmallIcon />
      </button>
    </section>
  );
}

/** Invitee current-plan card (3205:82048): frosted card, owner-named title, no price, no Change-plan row. */
function InviteeCurrentPlanCard({ plan }: { plan: PlanInfo }) {
  return (
    <section
      className="flex w-full flex-col gap-[2px] rounded-xl border"
      style={{ backgroundColor: finalTokens.color.surface.alphaLight80, borderColor: finalTokens.color.border.subtle }}
    >
      <div className="w-full px-3">
        <CurrentPlanTag />
      </div>
      <div className="w-full p-3">
        <p className="truncate font-noontree text-base font-bold leading-[22px] tracking-[-0.15px]" style={{ color: finalTokens.color.text.primary }}>
          {copy.managePlan.planTitleInvitee.replace("{name}", plan.ownerName)}
        </p>
      </div>
      <DashedDivider className="w-full" />
      {BENEFITS.map((b) => (
        <BenefitRow key={b} text={b} />
      ))}
      <DashedDivider emphasis="high" className="mx-3" />
      <p className="px-3 py-4 font-noontree text-xs font-medium leading-[14px] tracking-[-0.12px]" style={{ color: finalTokens.color.text.tertiary }}>
        {copy.managePlan.autoRenewsInvitee.replace("{date}", plan.renewsOn)}
      </p>
    </section>
  );
}

function MemberRow({ member, onRemove }: { member: Member; onRemove: () => void }) {
  const isOwner = member.role === "owner";
  const saved = String(member.savedAmount ?? 0);
  return (
    <div className="flex w-full items-center">
      <div className="flex items-center pl-3">
        <Avatar name={member.name} avatarKey={member.avatar} size={40} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[2px] p-3">
        <p className="truncate font-noontree text-sm font-medium leading-5 tracking-[-0.1px]" style={{ color: finalTokens.color.text.primary }}>
          {member.name}
        </p>
        <p className="font-noontree text-xs leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.tertiary }}>
          {(isOwner ? copy.managePlan.ownerRow : copy.managePlan.memberRow).replace("{amount}", saved)}
        </p>
      </div>
      {!isOwner && (
        <button type="button" onClick={onRemove} className="mr-3 flex min-h-6 items-center justify-center rounded px-[6px] py-1">
          <span className="font-noontree text-xs font-semibold leading-4" style={{ color: finalTokens.color.text.error }}>
            {copy.managePlan.remove}
          </span>
        </button>
      )}
    </div>
  );
}

/** Manage Family list (3161:28282). Rows come from state.members; Add-row while seats remain. */
function ManageFamilyCard({ members, seatsTotal, onAdvance }: { members: Member[]; seatsTotal: 2 | 6; onAdvance: () => void }) {
  const remaining = Math.max(0, seatsTotal - 1 - members.filter((m) => m.role === "member").length);
  return (
    // #fefefe is the card's literal Figma fill (3161:28282) -- not a bound colour/* variable.
    <section className="flex w-full flex-col rounded-xl bg-[#fefefe]">
      <div className="w-full">
        <div className="flex flex-col gap-[2px] px-3 py-4">
          <p className="font-noontree text-sm font-bold leading-5 tracking-[-0.1px]" style={{ color: finalTokens.color.text.primary }}>
            {copy.managePlan.manageFamilyTitle}
          </p>
          <p className="font-noontree text-xs leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.tertiary }}>
            {copy.managePlan.manageFamilySubtitle}
          </p>
        </div>
        <DashedDivider className="w-full" />
      </div>
      {members.map((m) => (
        <MemberRow key={m.id} member={m} onRemove={onAdvance} />
      ))}
      {remaining > 0 && (
        <button type="button" onClick={onAdvance} className="flex w-full items-center text-left">
          <div className="flex items-center pl-3">
            <EmptyAvatarSlot size={40} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-[2px] p-3">
            <p className="font-noontree text-sm font-medium leading-5 tracking-[-0.1px]" style={{ color: finalTokens.color.text.primary }}>
              {copy.managePlan.addAnotherMember}
            </p>
            <p className="font-noontree text-xs leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.tertiary }}>
              {copy.managePlan.seatsAvailable.replace("{n}", String(remaining))}
            </p>
          </div>
        </button>
      )}
    </section>
  );
}

const PAYMENT_META: Record<PaymentMethodKind, { label: string; icon: string }> = {
  applePay: { label: copy.managePlan.paymentApplePay, icon: paymentApplePay },
  card: { label: copy.managePlan.paymentCard, icon: paymentCard },
};

/** Payment method card (3161:34221): secondary shell around a white method card + change row. */
function PaymentMethodCard({ method, onAdvance }: { method: PaymentMethodKind; onAdvance: () => void }) {
  const meta = PAYMENT_META[method];
  return (
    <section
      className="flex w-full flex-col items-center gap-3 rounded-xl border-[1.5px] pb-4"
      style={{ backgroundColor: finalTokens.color.surface.secondary, borderColor: finalTokens.color.border.primary }}
    >
      <div
        className="flex w-full items-center overflow-hidden rounded-xl border-[1.5px]"
        style={{ backgroundColor: finalTokens.color.surface.primary, borderColor: finalTokens.color.decorative.hairline }}
      >
        <div className="flex items-center pl-3">
          <div className="flex size-10 items-center justify-center rounded-lg" style={{ backgroundColor: finalTokens.color.surface.primary }}>
            <img src={meta.icon} alt="" className="h-[25px] w-10" />
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-[2px] px-3 py-4">
          <p className="font-noontree text-xs leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.tertiary }}>
            {copy.managePlan.paymentMethodLabel}
          </p>
          <p className="truncate font-noontree text-base font-bold leading-[22px] tracking-[-0.15px]" style={{ color: finalTokens.color.text.primary }}>
            {meta.label}
          </p>
        </div>
      </div>
      <button type="button" onClick={onAdvance} className="flex w-full items-center justify-between px-4">
        <span className="font-noontree text-[13px] font-medium leading-[15px] tracking-[-0.12px]" style={{ color: finalTokens.color.decorative.widgetHeaderText }}>
          {copy.managePlan.changePaymentMethod}
        </span>
        <ChevronSmallIcon />
      </button>
    </section>
  );
}

/** Full-width disclosure row card -- Cancel membership (3161:34233) / Leave Family plan (3180:47511). */
function DisclosureRowCard({
  title,
  subtitle,
  frosted,
  onPress,
}: {
  title: string;
  subtitle?: string;
  frosted?: boolean;
  onPress: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPress}
      className={`flex w-full items-center rounded-xl text-left ${frosted ? "border-2" : "border"}`}
      style={{
        backgroundColor: frosted ? finalTokens.color.surface.alphaLight80 : finalTokens.color.surface.primary,
        borderColor: finalTokens.color.border.white,
      }}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-[2px] px-3 py-4">
        <p className="truncate font-noontree text-sm font-bold leading-5 tracking-[-0.1px]" style={{ color: finalTokens.color.text.primary }}>
          {title}
        </p>
        {subtitle && (
          <p className="font-noontree text-xs font-medium leading-[14px] tracking-[-0.12px]" style={{ color: finalTokens.color.text.tertiary }}>
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex items-center py-2 pr-3">
        <ChevronRightIcon />
      </div>
    </button>
  );
}

export default function ManagePlan({ state, onAdvance }: ScreenProps) {
  const { plan, members, seatsTotal, payment, pov } = state;
  const isOwner = pov === "owner";

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto pb-8" style={{ backgroundColor: finalTokens.color.surface.secondary }}>
      <div className="pt-16">
        <PageHeader title={isOwner ? copy.managePlan.pageTitleOwner : copy.managePlan.pageTitleInvitee} />
      </div>
      <div className={`flex w-full flex-col px-3 pt-4 ${isOwner ? "gap-6" : "gap-4"}`}>
        {isOwner ? (
          <>
            <OwnerCurrentPlanCard plan={plan} onAdvance={onAdvance} />
            <ManageFamilyCard members={members} seatsTotal={seatsTotal} onAdvance={onAdvance} />
            <PaymentMethodCard method={payment.method} onAdvance={onAdvance} />
            <DisclosureRowCard
              title={copy.managePlan.cancelMembership}
              subtitle={plan.phase === "postTrial" ? undefined : copy.managePlan.cancelMembershipTrialNote}
              onPress={onAdvance}
            />
          </>
        ) : (
          <>
            <InviteeCurrentPlanCard plan={plan} />
            <DisclosureRowCard title={copy.managePlan.leaveFamily} subtitle={copy.managePlan.leaveFamilySubtitle} frosted onPress={onAdvance} />
          </>
        )}
      </div>
    </div>
  );
}
