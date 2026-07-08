import { seeds } from "../seeds";
import type { FlowRecipe, FlowStep } from "./types";

type CancelPhase = "trial" | "upgrade" | "posttrial";
type Fill = "empty" | "partial" | "full";
const FILL_N: Record<Fill, 0 | 1 | 5> = { empty: 0, partial: 1, full: 5 };

// Step tables per phase×fill, node IDs from the map table in this plan's header.
// Keyed by the template-literal type (not `string`) so a missing/misspelled entry is a
// compile error instead of a runtime `steps: undefined` caught only by the integrity tests.
const STEPS: Record<`${CancelPhase}-${Fill}`, FlowStep[]> = {
  "trial-empty": [
    { screen: "managePlan", figmaNodeId: "3207:42852", advanceLabel: "Cancel membership", action: { type: "startCancellation" } },
    { screen: "cancelSavings", figmaNodeId: "3207:43094", advanceLabel: "Leave Family" },
    { screen: "cancelSavings", overlay: "cancelOptionsSheet", figmaNodeId: "3207:43659", advanceLabel: "Cancel plan" },
    { screen: "cancelSavings", overlay: "cancelOptionsSheet", figmaNodeId: "3207:43265", advanceLabel: "Continue", action: { type: "selectCancelOption", option: "switchIndividual" } },
    { screen: "cancelReason", figmaNodeId: "3207:44309", advanceLabel: "Confirm Cancellation", action: { type: "selectCancelReason", reason: "The price is quite high" } },
    { screen: "cancelReason", overlay: "reviewConfirmSheet", figmaNodeId: "3207:44420", advanceLabel: "Confirm", action: { type: "confirmCancellation" } },
  ],
  // Single placeholder step each -- NOT a 6-step copy of trial-empty's shape (that would push
  // deferred-node count to 12+ and blow the integrity test's `deferred.length <= 4` budget,
  // which assumes exactly 2 deferred steps here + 2 in upgrade-family). Task 22 replaces this
  // one placeholder step with the real step sequence resolved from the wrapper frame.
  "trial-partial": [
    { screen: "cancelSavings", figmaNodeId: "", advanceLabel: "(unresolved)", note: "resolve in Task 22 from wrapper 3207:46204" },
  ],
  "trial-full": [
    { screen: "cancelSavings", figmaNodeId: "", advanceLabel: "(unresolved)", note: "resolve in Task 22 from wrapper 3207:47490" },
  ],
  "upgrade-empty": [
    { screen: "managePlan", figmaNodeId: "3208:49832", advanceLabel: "Cancel membership", action: { type: "startCancellation" } },
    { screen: "cancelSavings", figmaNodeId: "3208:49861", advanceLabel: "Leave Family" },
    { screen: "cancelSavings", overlay: "reviewConfirmSheet", figmaNodeId: "3208:50263", advanceLabel: "Confirm", action: { type: "confirmCancellation" } },
  ],
  "upgrade-partial": [
    { screen: "managePlan", figmaNodeId: "3208:52536", advanceLabel: "Cancel membership", action: { type: "startCancellation" } },
    { screen: "cancelSavings", figmaNodeId: "3208:52565", advanceLabel: "Leave Family" },
    { screen: "cancelSavings", overlay: "reviewConfirmSheet", figmaNodeId: "3208:52967", advanceLabel: "Confirm", action: { type: "confirmCancellation" } },
  ],
  "upgrade-full": [
    { screen: "managePlan", figmaNodeId: "3208:53436", advanceLabel: "Cancel membership", action: { type: "startCancellation" } },
    { screen: "cancelSavings", figmaNodeId: "3208:53463", advanceLabel: "Leave Family" },
    { screen: "cancelSavings", overlay: "reviewConfirmSheet", figmaNodeId: "3208:53775", advanceLabel: "Continue" },
    { screen: "cancelSavings", overlay: "reviewConfirmSheet", figmaNodeId: "3208:54026", advanceLabel: "Confirm", action: { type: "confirmCancellation" } },
  ],
  "posttrial-empty": [
    { screen: "managePlan", figmaNodeId: "3208:60124", advanceLabel: "Cancel membership", action: { type: "startCancellation" } },
    { screen: "cancelSavings", figmaNodeId: "3208:60153", advanceLabel: "Leave Family" },
    { screen: "cancelSavings", overlay: "cancelOptionsSheet", figmaNodeId: "3208:60272", advanceLabel: "Continue", action: { type: "selectCancelOption", option: "proceed" } },
    { screen: "cancelSavings", overlay: "reviewConfirmSheet", figmaNodeId: "3208:60394", advanceLabel: "Continue" },
    { screen: "cancelReason", figmaNodeId: "3208:60477", advanceLabel: "Confirm Cancellation", action: { type: "confirmCancellation" } },
  ],
  "posttrial-partial": [
    { screen: "managePlan", figmaNodeId: "3208:60987", advanceLabel: "Cancel membership", action: { type: "startCancellation" } },
    { screen: "cancelSavings", figmaNodeId: "3208:61016", advanceLabel: "Leave Family" },
    { screen: "cancelSavings", overlay: "cancelOptionsSheet", figmaNodeId: "3208:61159", advanceLabel: "Continue", action: { type: "selectCancelOption", option: "proceed" } },
    { screen: "cancelSavings", overlay: "reviewConfirmSheet", figmaNodeId: "3208:61281", advanceLabel: "Continue" },
    { screen: "cancelReason", figmaNodeId: "3208:61364", advanceLabel: "Confirm Cancellation", action: { type: "confirmCancellation" } },
  ],
  "posttrial-full": [
    { screen: "managePlan", figmaNodeId: "3208:61927", advanceLabel: "Cancel membership", action: { type: "startCancellation" } },
    { screen: "cancelSavings", figmaNodeId: "3208:62562", advanceLabel: "Leave Family" },
    { screen: "cancelSavings", overlay: "cancelOptionsSheet", figmaNodeId: "3208:63041", advanceLabel: "Cancel plan" },
    { screen: "cancelSavings", overlay: "cancelOptionsSheet", figmaNodeId: "3208:63306", advanceLabel: "Continue", action: { type: "selectCancelOption", option: "proceed" } },
    { screen: "cancelReason", figmaNodeId: "3208:63783", advanceLabel: "Confirm Cancellation", action: { type: "confirmCancellation" } },
  ],
};

const SEED_BY_PHASE = {
  trial: seeds.familyTrial,
  upgrade: seeds.familyMonthly,
  posttrial: seeds.familyPostTrial,
};

export function makeCancelRecipe(phase: CancelPhase, fill: Fill): FlowRecipe {
  return {
    id: `cancel-${phase}-${fill}-family`,
    group: "cancel",
    title: "",    // verbatim from flow-title during Task 22
    subtitle: "",
    seed: SEED_BY_PHASE[phase](FILL_N[fill]),
    steps: STEPS[`${phase}-${fill}`],
  };
}

export const cancelRecipes = (["trial", "upgrade", "posttrial"] as const).flatMap((phase) =>
  (["empty", "partial", "full"] as const).map((fill) => makeCancelRecipe(phase, fill)),
);
