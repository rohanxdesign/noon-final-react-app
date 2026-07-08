import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";

/**
 * Sticky bottom CTA bar — Figma "Bottom Action/Default" (3136:26780) and
 * "Bottom Action/On Scroll" (3136:26771). Default is the plain CTA + caption;
 * On Scroll additionally shows a plan-switcher radio list (Duo vs Family)
 * stacked above the CTA. That picker content is Figma's example placeholder
 * for this slot ("Duo plan . 2 members / dhm19.99 per member" vs "Family
 * Plan . 5 members / dhm9.99 per member") -- it doesn't correspond to a
 * real per-member price shown anywhere else in this file's OneLanding
 * states (which always show a single flat plan price, e.g. dhm49.99/mo for
 * Family), and no flow-map step actually visits an "on scroll" state, so it
 * isn't wired to real scroll physics here. Exposed as an explicit
 * `expanded` prop (opt-in) rather than guessed scroll-listener wiring.
 */
export interface BottomActionBarProps {
  label: string;
  caption?: string;
  onPress: () => void;
  expanded?: boolean;
}

export default function BottomActionBar({ label, caption, onPress, expanded = false }: BottomActionBarProps) {
  return (
    <div className="flex w-full flex-col items-center gap-3 p-3">
      {expanded && (
        <div className="flex w-full flex-col items-start overflow-hidden rounded-2xl" style={{ backgroundColor: finalTokens.color.surface.secondary }}>
          <div className="flex w-full items-center justify-between rounded-t-lg rounded-b-md px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="size-5 shrink-0 rounded-full border-2" style={{ borderColor: finalTokens.color.border.medium }} aria-hidden="true" />
              <div className="flex flex-col items-start gap-1">
                <p className="font-noontree text-sm" style={{ color: finalTokens.color.text.primary }}>{copy.oneLanding.bottomBarDuoPlanLabel}</p>
                <p className="font-noontree text-xs" style={{ color: finalTokens.color.text.muted }}>{copy.oneLanding.bottomBarDuoPlanPerMember}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="font-noontree text-base font-bold" style={{ color: finalTokens.color.text.primary }}>dhm39.99</p>
              <p className="font-noontree text-[11px]" style={{ color: finalTokens.color.text.muted }}>{copy.oneLanding.billedMonthly}</p>
            </div>
          </div>
          <div className="flex w-full items-center justify-between rounded-b-2xl rounded-t-sm bg-white px-4 pb-3 pt-[10px]">
            <div className="flex items-center gap-3">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full border-2" style={{ borderColor: finalTokens.color.text.primary }} aria-hidden="true">
                <span className="size-[10px] rounded-full" style={{ backgroundColor: finalTokens.color.text.primary }} />
              </span>
              <div className="flex flex-col items-start gap-1">
                <p className="font-noontree text-sm font-bold" style={{ color: finalTokens.color.text.primary }}>{copy.oneLanding.bottomBarFamilyPlanLabel}</p>
                <p className="font-noontree text-xs" style={{ color: finalTokens.color.text.muted }}>{copy.oneLanding.bottomBarFamilyPlanPerMember}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="font-noontree text-base font-bold" style={{ color: finalTokens.color.text.primary }}>dhm49.99</p>
              <p className="font-noontree text-[11px]" style={{ color: finalTokens.color.text.muted }}>{copy.oneLanding.billedMonthly}</p>
            </div>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={onPress}
        className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl px-5 py-[14px]"
        style={{ backgroundColor: finalTokens.color.surface.primaryInverted }}
      >
        <span className="font-noontree text-base font-semibold" style={{ color: finalTokens.color.text.onSurfaceBold }}>
          {label}
        </span>
      </button>
      {caption && (
        <p className="font-noontree text-xs font-medium" style={{ color: finalTokens.color.text.tertiary }}>
          {caption}
        </p>
      )}
    </div>
  );
}
