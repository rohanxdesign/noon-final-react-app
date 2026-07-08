import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FlowRecipe } from "../state/recipes/types";
import { OVERLAYS, SCREENS } from "../screens/registry";
import { stateAtStep } from "./stateAtStep";
import FlowPill from "./FlowPill";

interface Props {
  recipe: FlowRecipe;
  step: number;
  onStepChange: (n: number) => void;
  onExit: () => void;
  onNextFlow: () => void;
}

export default function FlowRunner({ recipe, step, onStepChange, onExit, onNextFlow }: Props) {
  const clamped = Math.max(0, Math.min(step, recipe.steps.length - 1));
  const current = recipe.steps[clamped];
  const state = useMemo(() => stateAtStep(recipe, clamped), [recipe, clamped]);
  const Screen = SCREENS[current.screen];
  const Overlay = current.overlay ? OVERLAYS[current.overlay] : undefined;
  const [pillOpen, setPillOpen] = useState(false);

  const advance = () => onStepChange(Math.min(clamped + 1, recipe.steps.length - 1));

  useEffect(() => {
    if (!current.autoAdvanceMs || clamped >= recipe.steps.length - 1) return;
    const t = setTimeout(advance, current.autoAdvanceMs);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clamped, recipe.id]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`${recipe.id}-${clamped}`}
          className="relative h-full w-full"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
        >
          <Screen state={state} onAdvance={advance} overlay={current.overlay} joinError={current.joinError} />
          {Overlay && <Overlay state={state} onAdvance={advance} joinError={current.joinError} />}
        </motion.div>
      </AnimatePresence>
      <FlowPill
        recipe={recipe}
        step={clamped}
        open={pillOpen}
        onToggle={() => setPillOpen((v) => !v)}
        onBack={() => onStepChange(Math.max(0, clamped - 1))}
        onJump={onStepChange}
        onExit={onExit}
        onNextFlow={onNextFlow}
      />
    </div>
  );
}
