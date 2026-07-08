import { seeds } from "../seeds";
import type { FlowRecipe } from "./types";

export const manageRemoveMember: FlowRecipe = {
  id: "manage-remove-member",
  group: "manage",
  title: "",
  subtitle: "",
  seed: seeds.familyMonthly(1),
  steps: [
    { screen: "oneLanding", figmaNodeId: "3161:33979", advanceLabel: "Manage your membership" },
    { screen: "managePlan", figmaNodeId: "3161:34160", advanceLabel: "Remove", action: { type: "removeMember", id: "m1" } },
    { screen: "managePlan", figmaNodeId: "3201:76044", advanceLabel: "(end)" },
  ],
};

export const manageSwitchIndividual: FlowRecipe = {
  id: "manage-switch-individual",
  group: "manage",
  title: "",
  subtitle: "",
  seed: seeds.familyMonthly(5),
  steps: [
    { screen: "oneLanding", figmaNodeId: "3161:38768", advanceLabel: "Manage your membership" },
    { screen: "managePlan", figmaNodeId: "3201:78358", advanceLabel: "Change plan" },
    { screen: "explorePlans", figmaNodeId: "3161:39741", advanceLabel: "Individual" },
    { screen: "explorePlans", figmaNodeId: "3201:76762", advanceLabel: "Change my plan" },
    { screen: "explorePlans", overlay: "reviewConfirmSheet", figmaNodeId: "3201:77113", advanceLabel: "Confirm", action: { type: "switchPlan", to: "individual" } },
  ],
};

export const manageSwitchDuoFromFullFamily: FlowRecipe = {
  id: "manage-switch-duo-from-full-family",
  group: "manage",
  title: "",
  subtitle: "",
  seed: seeds.familyMonthly(5),
  steps: [
    { screen: "oneLanding", figmaNodeId: "3161:40856", advanceLabel: "Manage your membership" },
    { screen: "managePlan", figmaNodeId: "3201:78640", advanceLabel: "Change plan" },
    { screen: "explorePlans", figmaNodeId: "3161:44306", advanceLabel: "Duo" },
    { screen: "explorePlans", figmaNodeId: "3161:44401", advanceLabel: "Change my plan" },
    { screen: "explorePlans", overlay: "reviewConfirmSheet", figmaNodeId: "3161:44599", advanceLabel: "Confirm", action: { type: "switchPlan", to: "duo" } },
  ],
};

export const manageSwitchDuoFromPartialFamily: FlowRecipe = {
  id: "manage-switch-duo-from-partial-family",
  group: "manage",
  title: "",
  subtitle: "",
  seed: seeds.familyMonthly(1),
  steps: [
    { screen: "oneLanding", figmaNodeId: "3161:42258", advanceLabel: "Manage your membership" },
    { screen: "managePlan", figmaNodeId: "3201:79493", advanceLabel: "Change plan" },
    { screen: "explorePlans", figmaNodeId: "3161:46817", advanceLabel: "Duo" },
    { screen: "explorePlans", figmaNodeId: "3274:32387", advanceLabel: "Change my plan" },
    { screen: "explorePlans", overlay: "reviewConfirmSheet", figmaNodeId: "3274:32243", advanceLabel: "Confirm", action: { type: "switchPlan", to: "duo" } },
  ],
};

export const manageSwitchFamilyFromDuo: FlowRecipe = {
  id: "manage-switch-family-from-duo",
  group: "manage",
  title: "Duo owner upgrades to the Family plan",
  subtitle: "Owner opens Manage Family plan, selects the Family plan, then reviews and confirms (Pay ₫49.99). Seats expand from 2 to 5.",
  seed: seeds.duoOwnerFull,
  steps: [
    { screen: "oneLanding", figmaNodeId: "3161:46402", advanceLabel: "Manage your membership" },
    { screen: "managePlan", figmaNodeId: "3201:79736", advanceLabel: "Change plan" },
    { screen: "explorePlans", figmaNodeId: "3161:45673", advanceLabel: "Family" },
    { screen: "explorePlans", overlay: "reviewConfirmSheet", figmaNodeId: "3201:80092", advanceLabel: "Pay", action: { type: "switchPlan", to: "family" } },
  ],
};

export const manageRecipes = [
  manageRemoveMember,
  manageSwitchIndividual,
  manageSwitchDuoFromFullFamily,
  manageSwitchDuoFromPartialFamily,
  manageSwitchFamilyFromDuo,
];
