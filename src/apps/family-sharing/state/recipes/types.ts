import type { FinalAction, FinalFlowState } from "../types";

export type ScreenId =
  | "noonHome" | "oneLanding" | "planSheet" | "explorePlans" | "managePlan"
  | "transition" | "success" | "cancelSavings" | "cancelReason";

export type OverlayId =
  | "paymentSheet" | "reviewConfirmSheet" | "inviteSheet" | "shareSheet"
  | "joinFamilySheet" | "joinErrorSheet" | "cancelOptionsSheet" | "removeMemberSheet"
  | "memberJoinedToast";

export type FlowGroup = "upgrade" | "manage" | "member" | "cancel";

export interface FlowStep {
  screen: ScreenId;
  overlay?: OverlayId;
  figmaNodeId: string;      // "" only where the plan marks it "resolve during flow task"
  advanceLabel: string;     // the CTA copy that advances this step (verbatim once extracted)
  action?: FinalAction;     // dispatched when advancing PAST this step
  autoAdvanceMs?: number;   // transitions/toasts advance themselves
  note?: string;
  // Only set on the joinErrorSheet overlay step -- the 3 member-error flows all use the same
  // overlay id, so this is the only signal a screen has for which error variant to render.
  joinError?: "alreadyInFamily" | "alreadySubscribed" | "differentCountry";
}

export interface FlowRecipe {
  id: string;
  group: FlowGroup;
  title: string;      // from Figma flow-title (verbatim)
  subtitle: string;   // from Figma flow-subtitle (verbatim)
  seed: FinalFlowState;
  steps: FlowStep[];
}
