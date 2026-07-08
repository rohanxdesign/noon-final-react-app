import type { ComponentType } from "react";
import type { ScreenId } from "../state/recipes/types";
import StubScreen, { type ScreenProps } from "./StubScreen";
import OneLanding from "./OneLanding";
import ManagePlan from "./ManagePlan";
import PlanSheet from "./PlanSheet";
import ExplorePlans from "./ExplorePlans";

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
