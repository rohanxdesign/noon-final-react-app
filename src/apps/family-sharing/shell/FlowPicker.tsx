import { ALL_RECIPES } from "../state/recipes";
import type { FlowGroup } from "../state/recipes/types";

const GROUPS: { key: FlowGroup; label: string }[] = [
  { key: "upgrade", label: "Upgrade" },
  { key: "manage", label: "Manage" },
  { key: "member", label: "Member" },
  { key: "cancel", label: "Cancel" },
];

export default function FlowPicker({ onPick }: { onPick: (id: string) => void }) {
  return (
    <div className="h-full overflow-y-auto bg-[#F7F7FA] px-4 pb-10 pt-14">
      <h1 className="text-xl font-bold text-gray-900">Family Sharing — final flows</h1>
      <p className="mt-1 text-xs text-gray-500">21 Dev-Ready flows · tap to run</p>
      {GROUPS.map((g) => (
        <section key={g.key} className="mt-5">
          <h2 className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">{g.label}</h2>
          <div className="mt-2 space-y-2">
            {ALL_RECIPES.filter((r) => r.group === g.key).map((r) => (
              <button key={r.id} onClick={() => onPick(r.id)}
                className="block w-full rounded-2xl bg-white p-3 text-left shadow-sm active:scale-[0.99]">
                <p className="text-sm font-semibold text-gray-900">{r.id}</p>
                {r.title && <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">{r.title}</p>}
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
