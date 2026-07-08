import { reducer } from "../state/reducer";
import type { FlowRecipe } from "../state/recipes/types";
import type { FinalFlowState } from "../state/types";

/** State visible AT step `idx`: seed + actions of all steps before idx. */
export function stateAtStep(recipe: FlowRecipe, idx: number): FinalFlowState {
  let s = recipe.seed;
  for (let i = 0; i < Math.min(idx, recipe.steps.length); i++) {
    const a = recipe.steps[i].action;
    if (a) s = reducer(s, a);
  }
  return s;
}
