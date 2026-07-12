import type { ComponentType } from "react";
import type { FlowStep, OverlayId, ScreenId } from "../state/recipes/types";
import type { FinalFlowState } from "../state/types";
import StubScreen, { type ScreenProps } from "./StubScreen";
import NoonHome from "./NoonHome";
import OneLanding from "./OneLanding";
import ManagePlan from "./ManagePlan";
import PlanSheet from "./PlanSheet";
import ExplorePlans from "./ExplorePlans";
import TransitionScreen from "./TransitionScreen";
import SuccessScreen from "./SuccessScreen";
import PaymentSheet from "../components/PaymentSheet";
import ReviewConfirmSheet from "../components/ReviewConfirmSheet";
import InviteSheet from "../components/InviteSheet";
import ShareSheet from "../components/ShareSheet";
import JoinFamilySheet from "../components/JoinFamilySheet";
import MemberJoinedToast from "../components/MemberJoinedToast";
import CancelSavings from "./CancelSavings";
import CancelReason from "./CancelReason";
import CancelOptionsSheet from "../components/CancelOptionsSheet";

const stub = (name: string): ComponentType<ScreenProps> =>
  function Stub(props: ScreenProps) { return <StubScreen {...props} name={name} />; };

// Replaced screen-by-screen in Phase B.
export const SCREENS: Record<ScreenId, ComponentType<ScreenProps>> = {
  noonHome: NoonHome,
  oneLanding: OneLanding,
  planSheet: PlanSheet,
  explorePlans: ExplorePlans,
  managePlan: ManagePlan,
  transition: TransitionScreen,
  success: SuccessScreen,
  cancelSavings: CancelSavings,
  cancelReason: CancelReason,
};

export interface OverlayProps {
  state: FinalFlowState;
  onAdvance: () => void;
  onClose?: () => void;
  joinError?: FlowStep["joinError"];
}

// Task 14 built paymentSheet + reviewConfirmSheet. Task 15 adds inviteSheet,
// shareSheet, joinFamilySheet + joinErrorSheet (one JoinFamilySheet component,
// registered under both ids -- it branches internally on `props.joinError`),
// and memberJoinedToast. Task 18 adds cancelOptionsSheet (shared by 7 live
// instances across cancel.ts's owner flows AND member.ts's memberLeavesFamily
// -- see CancelOptionsSheet.tsx's own file comment for the full node survey).
// removeMemberSheet remains unregistered -- a separate, currently-unused
// OverlayId, out of every task's scope so far -- the map stays Partial so
// FlowRunner can look up an id and no-op (render nothing) when it's absent,
// exactly like SCREENS's stubs no-op visually rather than erroring.
export const OVERLAYS: Partial<Record<OverlayId, ComponentType<OverlayProps>>> = {
  paymentSheet: PaymentSheet,
  reviewConfirmSheet: ReviewConfirmSheet,
  inviteSheet: InviteSheet,
  shareSheet: ShareSheet,
  joinFamilySheet: JoinFamilySheet,
  joinErrorSheet: JoinFamilySheet,
  cancelOptionsSheet: CancelOptionsSheet,
  memberJoinedToast: MemberJoinedToast,
};
