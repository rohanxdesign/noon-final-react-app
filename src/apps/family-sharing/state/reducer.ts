import type { FinalAction, FinalFlowState, Member, PlanType } from "./types";

const PLAN_PRICE: Record<PlanType, number> = { individual: 24.99, duo: 39.99, family: 49.99 };
const PLAN_SEATS: Record<"duo" | "family", 2 | 6> = { duo: 2, family: 6 };

// Id is derived from the name (not a counter) so replaying the same "memberJoined" action
// from a seed — which the shell does on every back/jump navigation — always yields the same
// id. A counter would mint a different id each replay and break list identity (e.g. React keys).
function newMember(name: string): Member {
  return { id: `m-${nameToAvatar(name)}`, name, role: "member", savedAmount: 213, avatar: nameToAvatar(name) };
}

function nameToAvatar(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function reducer(state: FinalFlowState, action: FinalAction): FinalFlowState {
  switch (action.type) {
    case "selectPlan":
      return { ...state, plan: { ...state.plan, type: action.plan, pricePerMonth: PLAN_PRICE[action.plan] } };
    case "confirmUpgrade":
      return {
        ...state,
        plan: {
          ...state.plan,
          type: action.plan,
          phase: action.trial ? "freeTrial" : "monthly",
          trialDaysLeft: action.trial ? 30 : undefined,
          pricePerMonth: PLAN_PRICE[action.plan],
        },
        seatsTotal: action.plan === "duo" ? 2 : 6,
      };
    case "memberJoined":
      return {
        ...state,
        members: [...state.members, newMember(action.name)],
        invite: { ...state.invite, lastJoined: action.name },
      };
    case "removeMember":
      return { ...state, members: state.members.filter((m) => m.id !== action.id) };
    case "switchPlan": {
      const capacity = action.to === "individual" ? 0 : PLAN_SEATS[action.to] - 1;
      const owner = state.members.filter((m) => m.role === "owner");
      const members = state.members.filter((m) => m.role === "member").slice(0, capacity);
      return {
        ...state,
        plan: { ...state.plan, type: action.to, pricePerMonth: PLAN_PRICE[action.to] },
        seatsTotal: action.to === "family" ? 6 : 2,
        members: [...owner, ...members],
      };
    }
    case "joinFamily":
      return { ...state, plan: { ...state.plan, type: "family" }, membershipEnded: false };
    case "leaveFamily":
      return { ...state, membershipEnded: true };
    case "startCancellation":
      return { ...state, cancellation: {} };
    case "selectCancelOption":
      return { ...state, cancellation: { ...state.cancellation, selectedOption: action.option } };
    case "selectCancelReason":
      return { ...state, cancellation: { ...state.cancellation, reason: action.reason } };
    case "confirmCancellation":
      return { ...state, cancellation: { ...state.cancellation, confirmed: true }, membershipEnded: true };
    case "keepMembership":
      return { ...state, cancellation: undefined };
  }
}
