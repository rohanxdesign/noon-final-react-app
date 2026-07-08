import type { FinalFlowState, Member } from "./types";

const owner: Member = { id: "owner", name: "Rahul Jaiswal", role: "owner", savedAmount: 213, avatar: "rahul-jaiswal" };
const m = (id: string, name: string): Member => ({ id, name, role: "member", savedAmount: 213, avatar: name.toLowerCase().replace(/\s+/g, "-") });

export const MEMBER_POOL = ["Kumar Siddharth", "Arushi Maheshwari", "Rohan Arora", "Saransh Rawat", "Sanchita Zunane"];

// Shared by reference across seeds (only `total`/`osn` get overridden per-seed below, via a
// shallow spread) — safe only because reducer.ts never mutates state in place, always spreads.
const baseSavings = { total: 124.34, freeDeliveries: { amount: 79.22, count: 21 }, memberDeals: { amount: 48.22, count: 3 } };

function base(partial: Partial<FinalFlowState>): FinalFlowState {
  return {
    pov: "owner",
    plan: { type: "individual", phase: "monthly", pricePerMonth: 24.99, renewsOn: "29th Jun", ownerName: "Rahul Jaiswal" },
    seatsTotal: 6,
    members: [owner],
    savings: baseSavings,
    payment: { method: "applePay", last4: "2006" },
    invite: { link: "invite.noon.com/RAHUL" },
    ...partial,
  };
}

const familyMembers = (n: number) => [owner, ...MEMBER_POOL.slice(0, n).map((name, i) => m(`m${i + 1}`, name))];

export const seeds = {
  activeIndividual: base({}),
  duoOwnerFull: base({
    plan: { type: "duo", phase: "monthly", pricePerMonth: 39.99, renewsOn: "29th Jun", ownerName: "Rahul Jaiswal" },
    seatsTotal: 2,
    members: familyMembers(1),
  }),
  familyTrial: (fill: 0 | 1 | 5) =>
    base({
      plan: { type: "family", phase: "freeTrial", trialDaysLeft: 39, pricePerMonth: 49.99, renewsOn: "29th Jun", ownerName: "Rahul Jaiswal" },
      members: familyMembers(fill),
      savings: { ...baseSavings, total: 343, osn: { amount: 29.99 } },
    }),
  familyMonthly: (fill: 0 | 1 | 5) =>
    base({
      plan: { type: "family", phase: "monthly", pricePerMonth: 49.99, renewsOn: "29th Jun", ownerName: "Rahul Jaiswal" },
      members: familyMembers(fill),
      savings: { ...baseSavings, total: 442.34, freeDeliveries: { amount: 379.22, count: 21 } },
    }),
  familyPostTrial: (fill: 0 | 1 | 5) =>
    base({
      plan: { type: "family", phase: "postTrial", pricePerMonth: 49.99, renewsOn: "29th Jun", ownerName: "Rahul Jaiswal" },
      members: familyMembers(fill),
      savings: { ...baseSavings, total: 343, osn: { amount: 29.99 } },
    }),
  inviteeProspect: base({ pov: "invitee", members: [], plan: { type: "individual", phase: "monthly", pricePerMonth: 0, renewsOn: "29th Jun", ownerName: "Rahul" } }),
  inviteeMember: base({
    pov: "invitee",
    plan: { type: "family", phase: "monthly", pricePerMonth: 34.99, renewsOn: "29th Jun", ownerName: "Rahul" },
    members: familyMembers(1),
  }),
};
