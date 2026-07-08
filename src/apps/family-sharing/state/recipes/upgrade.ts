import { seeds } from "../seeds";
import type { FlowRecipe } from "./types";

export const upgradeFamily: FlowRecipe = {
  id: "upgrade-family",
  group: "upgrade",
  title: "Turning an Active Subscriber into a noon One Family owner",
  subtitle: "Subscriber taps 'Try Family for free' on the noon One landing page, upgrades to the 5-seat Family plan (free for 30 days), then shares an invite link to add members.",
  seed: seeds.activeIndividual,
  steps: [
    { screen: "noonHome", figmaNodeId: "3161:30127", advanceLabel: "Try for free" },
    { screen: "oneLanding", figmaNodeId: "3533:29160", advanceLabel: "Upgrade to family plan" },
    { screen: "planSheet", figmaNodeId: "3161:30635", advanceLabel: "Upgrade for free", action: { type: "selectPlan", plan: "family" } },
    { screen: "planSheet", overlay: "paymentSheet", figmaNodeId: "3261:103309", advanceLabel: "Upgrade for free", action: { type: "confirmUpgrade", plan: "family", trial: true } },
    { screen: "transition", figmaNodeId: "", advanceLabel: "(auto)", autoAdvanceMs: 1800, note: "resolve node in Task 19" },
    { screen: "success", figmaNodeId: "3161:31141", advanceLabel: "(auto)", autoAdvanceMs: 2000 },
    { screen: "oneLanding", figmaNodeId: "3161:31150", advanceLabel: "Share invite" },
    { screen: "oneLanding", overlay: "inviteSheet", figmaNodeId: "3161:31939", advanceLabel: "Share invite" },
    { screen: "oneLanding", overlay: "shareSheet", figmaNodeId: "", advanceLabel: "(dismiss)", note: "resolve node in Task 19" },
    { screen: "oneLanding", figmaNodeId: "3161:31167", advanceLabel: "(next)" },
    { screen: "oneLanding", figmaNodeId: "3161:31395", advanceLabel: "(next)" },
    { screen: "oneLanding", figmaNodeId: "3161:31576", advanceLabel: "(next)", action: { type: "memberJoined", name: "Kumar Siddharth" } },
    { screen: "oneLanding", overlay: "memberJoinedToast", figmaNodeId: "3161:31758", advanceLabel: "Manage your membership" },
    { screen: "managePlan", figmaNodeId: "3539:33433", advanceLabel: "(end)" },
  ],
};

export const upgradeDuo: FlowRecipe = {
  id: "upgrade-duo",
  group: "upgrade",
  title: "Duo owner journey",  // replace with verbatim flow-title during Task 19
  subtitle: "",                 // replace with verbatim flow-subtitle during Task 19
  seed: seeds.activeIndividual,
  steps: [
    { screen: "noonHome", figmaNodeId: "3161:32232", advanceLabel: "Try for free" },
    { screen: "oneLanding", figmaNodeId: "3533:30475", advanceLabel: "Upgrade to duo plan" },
    { screen: "planSheet", figmaNodeId: "3261:104319", advanceLabel: "Upgrade for free", action: { type: "selectPlan", plan: "duo" } },
    { screen: "planSheet", overlay: "paymentSheet", figmaNodeId: "3187:70138", advanceLabel: "Upgrade for free", action: { type: "confirmUpgrade", plan: "duo", trial: true } },
    { screen: "success", figmaNodeId: "3161:33072", advanceLabel: "(auto)", autoAdvanceMs: 2000 },
    { screen: "oneLanding", figmaNodeId: "3161:33081", advanceLabel: "Share invite" },
    { screen: "oneLanding", overlay: "inviteSheet", figmaNodeId: "3187:72847", advanceLabel: "Share invite" },
    { screen: "oneLanding", figmaNodeId: "3161:33098", advanceLabel: "(next)" },
    { screen: "oneLanding", figmaNodeId: "3161:33326", advanceLabel: "(next)", action: { type: "memberJoined", name: "Kumar Siddharth" } },
    { screen: "oneLanding", overlay: "memberJoinedToast", figmaNodeId: "3161:33506", advanceLabel: "(end)" },
  ],
};
