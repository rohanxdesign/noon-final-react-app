export type PlanType = "individual" | "duo" | "family";
export type BillingPhase = "freeTrial" | "monthly" | "annual" | "postTrial";
export type POV = "owner" | "invitee";
export type SeatFill = "empty" | "partial" | "full";
export type PaymentMethodKind = "applePay" | "card";

export interface Member {
  id: string;
  name: string;
  role: "owner" | "member";
  savedAmount?: number;
  avatar: string; // key into avatar asset map
}

export interface Savings {
  total: number;
  freeDeliveries: { amount: number; count: number };
  memberDeals: { amount: number; count: number };
  osn?: { amount: number };
}

export interface PlanInfo {
  type: PlanType;
  phase: BillingPhase;
  trialDaysLeft?: number;
  pricePerMonth: number;
  renewsOn: string;
  ownerName: string;
}

export interface Cancellation {
  offeredSwitch?: PlanType;
  selectedOption?: "switchIndividual" | "proceed";
  reason?: string;
  confirmed?: boolean;
}

export interface FinalFlowState {
  pov: POV;
  plan: PlanInfo;
  seatsTotal: 2 | 6; // duo | family (owner + 5 members — pin against Figma copy in Task 10)
  members: Member[];
  savings: Savings;
  payment: { method: PaymentMethodKind; last4?: string };
  invite: { link: string; lastJoined?: string };
  cancellation?: Cancellation;
  membershipEnded?: boolean; // post-cancel / post-leave
}

export type FinalAction =
  | { type: "selectPlan"; plan: PlanType }
  | { type: "confirmUpgrade"; plan: PlanType; trial?: boolean }
  | { type: "memberJoined"; name: string }
  | { type: "removeMember"; id: string }
  | { type: "switchPlan"; to: PlanType }
  | { type: "joinFamily" }
  | { type: "leaveFamily" }
  | { type: "startCancellation" }
  | { type: "selectCancelOption"; option: "switchIndividual" | "proceed" }
  | { type: "selectCancelReason"; reason: string }
  | { type: "confirmCancellation" }
  | { type: "keepMembership" };

export function seatFill(s: FinalFlowState): SeatFill {
  const members = s.members.filter((m) => m.role === "member").length;
  const capacity = s.seatsTotal - 1;
  if (members <= 0) return "empty";
  return members >= capacity ? "full" : "partial";
}
