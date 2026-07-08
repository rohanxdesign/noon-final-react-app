import type { ComponentType } from "react";
import type { OverlayId, ScreenId } from "../state/recipes/types";
import type { FinalFlowState } from "../state/types";
import StubScreen, { type ScreenProps } from "./StubScreen";
import OneLanding from "./OneLanding";
import ManagePlan from "./ManagePlan";
import PlanSheet from "./PlanSheet";
import ExplorePlans from "./ExplorePlans";
import PaymentSheet from "../components/PaymentSheet";
import ReviewConfirmSheet from "../components/ReviewConfirmSheet";

const stub = (name: string): ComponentType<ScreenProps> =>
  function Stub(props: ScreenProps) { return <StubScreen {...props} name={name} />; };

// Replaced screen-by-screen in Phase B.
export const SCREENS: Record<ScreenId, ComponentType<ScreenProps>> = {
  noonHome: stub("NoonHome"),
  oneLanding: OneLanding,
  planSheet: PlanSheet,
  explorePlans: ExplorePlans,
  managePlan: ManagePlan,
  transition: stub("Transition"),
  success: stub("Success"),
  cancelSavings: stub("CancelSavings"),
  cancelReason: stub("CancelReason"),
};

export interface OverlayProps {
  state: FinalFlowState;
  onAdvance: () => void;
  onClose?: () => void;
}

// Task 14 builds paymentSheet + reviewConfirmSheet. The remaining 7 OverlayIds
// (inviteSheet, shareSheet, joinFamilySheet, joinErrorSheet, cancelOptionsSheet,
// removeMemberSheet, memberJoinedToast) are future tasks' scope — a Partial map
// so FlowRunner can look up an id and no-op (render nothing) when it's absent,
// exactly like SCREENS's stubs no-op visually rather than erroring.
export const OVERLAYS: Partial<Record<OverlayId, ComponentType<OverlayProps>>> = {
  paymentSheet: PaymentSheet,
  reviewConfirmSheet: ReviewConfirmSheet,
};
