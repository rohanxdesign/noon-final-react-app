import type { FinalFlowState } from "../state/types";
import type { FlowStep } from "../state/recipes/types";

export interface ScreenProps {
  state: FinalFlowState;
  onAdvance: () => void;
  overlay?: string;
  joinError?: FlowStep["joinError"];
}

export default function StubScreen({ name, onAdvance, overlay }: ScreenProps & { name: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-white text-center">
      <p className="text-sm font-semibold text-gray-900">{name}</p>
      {overlay && <p className="text-xs text-gray-500">overlay: {overlay}</p>}
      <button className="rounded-full bg-gray-900 px-5 py-2 text-sm text-white" onClick={onAdvance}>
        Advance
      </button>
    </div>
  );
}
