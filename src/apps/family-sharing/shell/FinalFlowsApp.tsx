import { useCallback, useEffect, useState } from "react";
import FlowPicker from "./FlowPicker";
import FlowRunner from "./FlowRunner";
import { ALL_RECIPES, recipeById } from "../state/recipes";

function readParams() {
  const q = new URLSearchParams(window.location.search);
  return { flow: q.get("flow"), step: Number(q.get("step") ?? "0") || 0 };
}

// Query-param deep links (?flow=<id>&step=<n>). Only touches the query string
// via history.replaceState, so it doesn't fight react-router's path-based
// routing. (florence's `v=final` mode-switch param is not carried over — it
// was meaningless outside that prototype.)
function writeParams(flow: string | null, step: number) {
  const q = new URLSearchParams(window.location.search);
  if (flow) { q.set("flow", flow); q.set("step", String(step)); } else { q.delete("flow"); q.delete("step"); }
  const qs = q.toString();
  window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
}

export default function FinalFlowsApp() {
  const [flowId, setFlowId] = useState<string | null>(() => readParams().flow);
  const [step, setStep] = useState<number>(() => readParams().step);

  useEffect(() => writeParams(flowId, step), [flowId, step]);

  const pick = useCallback((id: string) => { setFlowId(id); setStep(0); }, []);
  const exit = useCallback(() => { setFlowId(null); setStep(0); }, []);
  const nextFlow = useCallback(() => {
    const idx = ALL_RECIPES.findIndex((r) => r.id === flowId);
    pick(ALL_RECIPES[(idx + 1) % ALL_RECIPES.length].id);
  }, [flowId, pick]);

  const recipe = flowId ? recipeById(flowId) : undefined;
  if (!recipe) return <FlowPicker onPick={pick} />;
  return <FlowRunner recipe={recipe} step={step} onStepChange={setStep} onExit={exit} onNextFlow={nextFlow} />;
}
