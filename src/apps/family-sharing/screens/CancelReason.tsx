import { useState } from "react";
import type { ScreenProps } from "./StubScreen";
import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";

/**
 * Cancel reason — Figma "cancelReason" screen, 4 live instances (3207:44309
 * [trial-empty], 3208:60477/61364/63783 [posttrial-empty/partial/full]).
 * upgrade-* recipes never reach this screen (they confirm straight from
 * cancelSavings' reviewConfirmSheet overlay) — confirmed by reading
 * cancel.ts directly.
 *
 * "Confirm Cancellation" is verbatim and byte-identical across all 4 live
 * instances. "The price is quite high" is a real Figma-sourced reason string
 * too — taken directly from trial-empty's own recorded `selectCancelReason`
 * action, not invented. Both used as-is, zero ambiguity.
 *
 * GAP: the remaining reason options and the page title could NOT be verified
 * against Figma this session (no MCP/browser access — see this task's final
 * report), so they're honestly-flagged placeholders. Selection state is
 * local-only (`useState`, not lifted into FinalFlowState): none of the 4
 * recipes vary which reason gets dispatched in a way this screen needs to
 * read back, and `state.cancellation.reason` isn't consumed by any
 * downstream screen/overlay today (checked ReviewConfirmSheet.tsx, the only
 * plausible reader — it branches on `cancellation !== undefined`, never on
 * `.reason`) — this mirrors ManagePlan.tsx's own documented precedent that
 * "every plausible CTA advances the flow (the runner owns which action
 * actually fires)", just applied to a selection affordance instead of a row
 * tap. Advancing always calls the same `onAdvance`, matching the recipe's
 * own single `action: confirmCancellation`/`selectCancelReason` per step.
 */

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12.5 4.5L7 10L12.5 15.5" stroke={finalTokens.color.text.primary} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RadioIcon({ selected }: { selected: boolean }) {
  return (
    <div
      className="flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px]"
      style={{ borderColor: selected ? finalTokens.color.text.success : finalTokens.color.border.medium }}
    >
      {selected && <div className="size-2.5 rounded-full" style={{ backgroundColor: finalTokens.color.text.success }} />}
    </div>
  );
}

function ReasonRow({ label, selected, onSelect }: { label: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-center gap-3 rounded-xl border p-3 text-left"
      style={{
        backgroundColor: selected ? finalTokens.color.surface.successSubtle : finalTokens.color.surface.primary,
        borderColor: selected ? finalTokens.color.border.successBold : finalTokens.color.border.subtle,
      }}
    >
      <RadioIcon selected={selected} />
      <span className="flex-1 font-noontree text-sm font-medium leading-5 tracking-[-0.1px]" style={{ color: finalTokens.color.text.primary }}>
        {label}
      </span>
    </button>
  );
}

const REASON_KEYS = ["reason1", "reason2", "reason3", "reason4", "reason5"] as const;

export default function CancelReason({ onAdvance }: ScreenProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto pb-8" style={{ backgroundColor: finalTokens.color.surface.secondary }}>
      <div className="pt-16">
        <div className="flex h-14 w-full items-center gap-1 px-3 py-2">
          <button
            type="button"
            aria-label="Back"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border"
            style={{ backgroundColor: finalTokens.color.surface.primary, borderColor: finalTokens.color.border.subtle }}
          >
            <ChevronLeftIcon />
          </button>
          <p className="flex-1 pl-2 pr-1 font-noontree text-base font-bold leading-5 tracking-[-0.15px]" style={{ color: finalTokens.color.text.primary }}>
            {copy.cancelReason.pageTitle}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 px-3 pt-4">
        {REASON_KEYS.map((key) => (
          <ReasonRow key={key} label={copy.cancelReason[key]} selected={selected === key} onSelect={() => setSelected(key)} />
        ))}
      </div>

      <div className="mt-auto flex w-full shrink-0 flex-col p-3">
        <button
          type="button"
          onClick={onAdvance}
          className="flex h-14 w-full items-center justify-center rounded-xl"
          style={{ backgroundColor: finalTokens.color.decorative.neutralBlack }}
        >
          <span className="font-noontree text-[17px] font-semibold text-white">{copy.cancelReason.confirmCancellation}</span>
        </button>
      </div>
    </div>
  );
}
