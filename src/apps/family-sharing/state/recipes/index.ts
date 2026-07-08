import { upgradeFamily, upgradeDuo } from "./upgrade";
import { manageRecipes } from "./manage";
import { memberRecipes } from "./member";
import { cancelRecipes } from "./cancel";
import type { FlowRecipe } from "./types";

export const ALL_RECIPES: FlowRecipe[] = [upgradeFamily, upgradeDuo, ...manageRecipes, ...memberRecipes, ...cancelRecipes];
export const recipeById = (id: string) => ALL_RECIPES.find((r) => r.id === id);
export * from "./types";
