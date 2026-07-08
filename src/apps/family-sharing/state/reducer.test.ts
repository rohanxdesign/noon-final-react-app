import { describe, expect, it } from "vitest";
import { reducer } from "./reducer";
import type { FinalFlowState } from "./types";
import { seatFill } from "./types";

const base: FinalFlowState = {
  pov: "owner",
  plan: { type: "individual", phase: "monthly", pricePerMonth: 24.99, renewsOn: "29th Jun", ownerName: "Rahul Jaiswal" },
  seatsTotal: 6,
  members: [{ id: "owner", name: "Rahul Jaiswal", role: "owner", avatar: "rahul-jaiswal" }],
  savings: { total: 124.34, freeDeliveries: { amount: 79.22, count: 21 }, memberDeals: { amount: 48.22, count: 3 } },
  payment: { method: "applePay" },
  invite: { link: "invite.noon.com/RAHUL" },
};

describe("reducer", () => {
  it("selectPlan updates plan type and price without touching seats", () => {
    const s = reducer(base, { type: "selectPlan", plan: "family" });
    expect(s.plan.type).toBe("family");
    expect(s.plan.pricePerMonth).toBe(49.99);
    expect(s.seatsTotal).toBe(base.seatsTotal);
  });

  it("memberJoined derives a stable id from name (replay-safe)", () => {
    const fam = reducer(base, { type: "confirmUpgrade", plan: "family", trial: true });
    const s1 = reducer(fam, { type: "memberJoined", name: "Kumar Siddharth" });
    const s2 = reducer(fam, { type: "memberJoined", name: "Kumar Siddharth" });
    const id1 = s1.members.find((m) => m.role === "member")!.id;
    const id2 = s2.members.find((m) => m.role === "member")!.id;
    expect(id1).toBe(id2);
  });

  it("confirmUpgrade to family (trial) sets plan, seats, phase", () => {
    const s = reducer(base, { type: "confirmUpgrade", plan: "family", trial: true });
    expect(s.plan.type).toBe("family");
    expect(s.plan.phase).toBe("freeTrial");
    expect(s.seatsTotal).toBe(6);
    expect(seatFill(s)).toBe("empty");
  });

  it("confirmUpgrade to duo sets 2 seats", () => {
    const s = reducer(base, { type: "confirmUpgrade", plan: "duo", trial: true });
    expect(s.seatsTotal).toBe(2);
  });

  it("memberJoined appends member and records lastJoined", () => {
    const fam = reducer(base, { type: "confirmUpgrade", plan: "family", trial: true });
    const s = reducer(fam, { type: "memberJoined", name: "Kumar Siddharth" });
    expect(s.members).toHaveLength(2);
    expect(s.invite.lastJoined).toBe("Kumar Siddharth");
    expect(seatFill(s)).toBe("partial");
  });

  it("removeMember removes by id", () => {
    const fam = reducer(base, { type: "confirmUpgrade", plan: "family", trial: true });
    const joined = reducer(fam, { type: "memberJoined", name: "Kumar Siddharth" });
    const target = joined.members.find((m) => m.role === "member")!;
    const s = reducer(joined, { type: "removeMember", id: target.id });
    expect(seatFill(s)).toBe("empty");
  });

  it("switchPlan family→duo truncates members to capacity", () => {
    let s = reducer(base, { type: "confirmUpgrade", plan: "family", trial: false });
    s = reducer(s, { type: "memberJoined", name: "A" });
    s = reducer(s, { type: "memberJoined", name: "B" });
    s = reducer(s, { type: "switchPlan", to: "duo" });
    expect(s.seatsTotal).toBe(2);
    expect(s.members.filter((m) => m.role === "member")).toHaveLength(1);
  });

  it("switchPlan duo→family keeps existing members (no truncation)", () => {
    let s = reducer(base, { type: "confirmUpgrade", plan: "duo", trial: false });
    s = reducer(s, { type: "memberJoined", name: "A" });
    s = reducer(s, { type: "switchPlan", to: "family" });
    expect(s.seatsTotal).toBe(6);
    const members = s.members.filter((m) => m.role === "member");
    expect(members).toHaveLength(1);
    expect(members[0].name).toBe("A");
  });

  it("cancellation path: start → option → reason → confirm", () => {
    let s = reducer(base, { type: "startCancellation" });
    s = reducer(s, { type: "selectCancelOption", option: "switchIndividual" });
    s = reducer(s, { type: "selectCancelReason", reason: "The price is quite high" });
    s = reducer(s, { type: "confirmCancellation" });
    expect(s.cancellation?.confirmed).toBe(true);
    expect(s.cancellation?.selectedOption).toBe("switchIndividual");
    expect(s.membershipEnded).toBe(true);
  });

  it("keepMembership clears cancellation", () => {
    let s = reducer(base, { type: "startCancellation" });
    s = reducer(s, { type: "keepMembership" });
    expect(s.cancellation).toBeUndefined();
  });

  it("joinFamily (invitee) becomes member of owner family", () => {
    const invitee: FinalFlowState = { ...base, pov: "invitee", members: [] };
    const s = reducer(invitee, { type: "joinFamily" });
    expect(s.plan.type).toBe("family");
    expect(s.membershipEnded).toBeFalsy();
  });

  it("leaveFamily ends membership for invitee", () => {
    const invitee: FinalFlowState = { ...base, pov: "invitee" };
    const s = reducer(invitee, { type: "leaveFamily" });
    expect(s.membershipEnded).toBe(true);
  });

  it("is pure — does not mutate input", () => {
    const before = JSON.stringify(base);
    reducer(base, { type: "confirmUpgrade", plan: "family", trial: true });
    expect(JSON.stringify(base)).toBe(before);
  });
});
