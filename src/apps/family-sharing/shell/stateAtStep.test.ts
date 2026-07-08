import { describe, expect, it } from "vitest";
import { stateAtStep } from "./stateAtStep";
import { upgradeFamily } from "../state/recipes/upgrade";

describe("stateAtStep", () => {
  it("step 0 is the seed", () => {
    expect(stateAtStep(upgradeFamily, 0)).toEqual(upgradeFamily.seed);
  });
  it("is deterministic when jumping back", () => {
    const a = stateAtStep(upgradeFamily, 6);
    const b = stateAtStep(upgradeFamily, 6);
    expect(a).toEqual(b);
  });
  it("after the payment step the plan is family", () => {
    const idx = upgradeFamily.steps.findIndex((s) => s.action?.type === "confirmUpgrade") + 1;
    expect(stateAtStep(upgradeFamily, idx).plan.type).toBe("family");
  });
  it("clamps an out-of-range idx to the full step count", () => {
    expect(stateAtStep(upgradeFamily, 999)).toEqual(stateAtStep(upgradeFamily, upgradeFamily.steps.length));
  });
  it("a negative idx returns the seed", () => {
    expect(stateAtStep(upgradeFamily, -1)).toEqual(upgradeFamily.seed);
  });
});
