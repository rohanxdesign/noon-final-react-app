import { describe, expect, it } from "vitest";
import { ALL_RECIPES } from "./index";
import { reducer } from "../reducer";

describe("recipes", () => {
  it("has exactly 21 uniquely-named flows", () => {
    expect(ALL_RECIPES).toHaveLength(21);
    expect(new Set(ALL_RECIPES.map((r) => r.id)).size).toBe(21);
  });

  it("groups match the Figma canvas counts", () => {
    const count = (g: string) => ALL_RECIPES.filter((r) => r.group === g).length;
    expect(count("upgrade")).toBe(2);
    expect(count("manage")).toBe(5);
    expect(count("member")).toBe(5);
    expect(count("cancel")).toBe(9);
  });

  it("every step's action replays through the reducer without throwing", () => {
    for (const r of ALL_RECIPES) {
      let s = r.seed;
      for (const step of r.steps) if (step.action) s = reducer(s, step.action);
    }
  });

  it("all steps carry a Figma node id (except documented deferred ones)", () => {
    const deferred = ALL_RECIPES.flatMap((r) => r.steps.filter((s) => !s.figmaNodeId).map((s) => `${r.id}:${s.screen}`));
    // trial-partial/full resolve in Task 22; two unnumbered upgrade-family frames resolve in Task 19
    expect(deferred.length).toBeLessThanOrEqual(4);
  });
});
