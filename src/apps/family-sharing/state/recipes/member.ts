import { seeds } from "../seeds";
import type { FlowRecipe } from "./types";

export const memberAcceptsInvite: FlowRecipe = {
  id: "member-accepts-invite",
  group: "member",
  title: "",
  subtitle: "",
  seed: seeds.inviteeProspect,
  steps: [
    { screen: "noonHome", overlay: "joinFamilySheet", figmaNodeId: "3180:31300", advanceLabel: "Join Family plan for free", action: { type: "joinFamily" } },
    { screen: "transition", figmaNodeId: "3180:33497", advanceLabel: "(auto)", autoAdvanceMs: 1800 },
    { screen: "success", figmaNodeId: "3180:33506", advanceLabel: "(auto)", autoAdvanceMs: 2000 },
    { screen: "oneLanding", figmaNodeId: "3180:33538", advanceLabel: "(end)" },
  ],
};

export const memberLeavesFamily: FlowRecipe = {
  id: "member-leaves-family",
  group: "member",
  title: "",
  subtitle: "",
  seed: seeds.inviteeMember,
  steps: [
    { screen: "oneLanding", figmaNodeId: "3180:47039", advanceLabel: "Manage your membership" },
    { screen: "managePlan", figmaNodeId: "3180:47438", advanceLabel: "Leave Family" },
    { screen: "managePlan", overlay: "cancelOptionsSheet", figmaNodeId: "3187:24714", advanceLabel: "Leave Family", action: { type: "leaveFamily" } },
    { screen: "managePlan", figmaNodeId: "3205:81276", advanceLabel: "(end)" },
  ],
};

export const memberAlreadyInFamily: FlowRecipe = {
  id: "member-already-in-family",
  group: "member",
  title: "",
  subtitle: "",
  seed: seeds.inviteeProspect,
  steps: [
    { screen: "noonHome", overlay: "joinFamilySheet", figmaNodeId: "3205:82330", advanceLabel: "Join Family plan for free" },
    { screen: "noonHome", overlay: "joinErrorSheet", figmaNodeId: "3205:84526", advanceLabel: "(end)", joinError: "alreadyInFamily" },
  ],
};

export const memberAlreadySubscribed: FlowRecipe = {
  id: "member-already-subscribed",
  group: "member",
  title: "",
  subtitle: "",
  seed: seeds.inviteeProspect,
  steps: [
    { screen: "noonHome", overlay: "joinFamilySheet", figmaNodeId: "3207:12793", advanceLabel: "Join Family plan for free" },
    { screen: "noonHome", overlay: "joinErrorSheet", figmaNodeId: "3207:14557", advanceLabel: "(end)", joinError: "alreadySubscribed" },
  ],
};

export const memberDifferentCountry: FlowRecipe = {
  id: "member-different-country",
  group: "member",
  title: "",
  subtitle: "",
  seed: seeds.inviteeProspect,
  steps: [
    { screen: "noonHome", overlay: "joinFamilySheet", figmaNodeId: "3207:16915", advanceLabel: "Join Family plan for free" },
    { screen: "noonHome", overlay: "joinErrorSheet", figmaNodeId: "3207:18679", advanceLabel: "(end)", joinError: "differentCountry" },
  ],
};

export const memberRecipes = [
  memberAcceptsInvite,
  memberLeavesFamily,
  memberAlreadyInFamily,
  memberAlreadySubscribed,
  memberDifferentCountry,
];
