import { AnimatePresence, motion } from "framer-motion";
import type { FlowRecipe } from "../state/recipes/types";

const FIGMA_BASE = "https://www.figma.com/design/kubsiHaVw54DXp94M3YBii/Family-Sharing--v2-?node-id=";

interface Props {
  recipe: FlowRecipe;
  step: number;
  open: boolean;
  onToggle: () => void;
  onBack: () => void;
  onJump: (n: number) => void;
  onExit: () => void;
  onNextFlow: () => void;
}

export default function FlowPill({ recipe, step, open, onToggle, onBack, onJump, onExit, onNextFlow }: Props) {
  const node = recipe.steps[step].figmaNodeId;
  const last = step === recipe.steps.length - 1;
  return (
    // bottom-24 (not bottom-3): screens render full-viewport here (no phone-frame
    // wrapper like the source prototype had), and several screens have a sticky
    // bottom-0 CTA bar (BottomActionBar). A smaller offset visually overlaps that
    // bar's tap target -- confirmed via a real click failing in Playwright, not
    // just a style nit. 96px clears every bottom bar built so far with margin.
    <div className="pointer-events-none absolute inset-x-0 bottom-24 z-50 flex flex-col items-center gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            className="pointer-events-auto max-h-64 w-72 overflow-y-auto rounded-2xl bg-black/85 p-2 text-white shadow-xl backdrop-blur"
          >
            {recipe.steps.map((s, i) => (
              <button key={i} onClick={() => onJump(i)}
                className={`block w-full rounded-lg px-3 py-1.5 text-left text-xs ${i === step ? "bg-white/20" : "hover:bg-white/10"}`}>
                {String(i + 1).padStart(2, "0")} · {s.screen}{s.overlay ? ` + ${s.overlay}` : ""}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-black/85 px-2 py-1.5 text-white shadow-xl backdrop-blur">
        <button onClick={onExit} className="rounded-full px-2 py-1 text-xs hover:bg-white/10">✕</button>
        <button onClick={onBack} disabled={step === 0} className="rounded-full px-2 py-1 text-xs disabled:opacity-30 hover:bg-white/10">←</button>
        <button onClick={onToggle} className="rounded-full px-2 py-1 text-xs font-medium hover:bg-white/10">
          {recipe.id} · {step + 1}/{recipe.steps.length}
        </button>
        {node && (
          <a href={`${FIGMA_BASE}${node.replace(":", "-")}`} target="_blank" rel="noreferrer"
            className="rounded-full px-2 py-1 text-xs hover:bg-white/10" title="Open in Figma">⌘F</a>
        )}
        {last && <button onClick={onNextFlow} className="rounded-full bg-white/20 px-2 py-1 text-xs">next flow →</button>}
      </div>
    </div>
  );
}
