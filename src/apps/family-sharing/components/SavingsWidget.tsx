import type { Savings } from "../state/types";
import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";

/**
 * Savings widget — Figma node 3502:21159. Ships exactly 2 amount rows
 * ("Free deliveries", "Member-only deals") in the visible instance; a 3rd
 * row exists in the component's structure (node 3502:21132, marked
 * `hidden="true"` in this specific frame) but it is NOT a 3rd amount-row —
 * fetching it directly (get_design_context on 3502:21132) shows a
 * completely different visual pattern: a star icon + "OSN+ Streaming
 * Included" headline + OSN badge, i.e. a benefit-promo callout, not a
 * savings-amount line. Rendered here as its own conditional row (keyed off
 * `savings.osn`) using that promo pattern rather than force-fit into the
 * icon/title/amount row the other two rows use.
 */
export interface SavingsWidgetProps {
  savings: Savings;
}

function DeliveryIcon() {
  return (
    <div className="flex size-[46px] shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: finalTokens.color.decorative.iconChipBg }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="9" width="16" height="10" rx="1.5" fill={finalTokens.color.text.success} />
        <path d="M4 9l2-4h12l2 4" stroke={finalTokens.color.text.success} strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="8" cy="19" r="1.6" fill={finalTokens.color.text.primary} />
        <circle cx="16" cy="19" r="1.6" fill={finalTokens.color.text.primary} />
      </svg>
    </div>
  );
}

function DealsIcon() {
  return (
    <div className="flex size-[46px] shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: finalTokens.color.decorative.iconChipBg }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 8V6a3 3 0 0 1 6 0v2" stroke={finalTokens.color.text.success} strokeWidth="1.4" strokeLinecap="round" />
        <rect x="4" y="8" width="10" height="11" rx="1.5" fill={finalTokens.color.text.success} />
        <text x="9" y="15.5" fontSize="6" fill="white" textAnchor="middle" fontWeight="700">%</text>
      </svg>
    </div>
  );
}

function OsnBadge() {
  return (
    <div className="flex size-11 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: finalTokens.color.decorative.osnBadgeBg }}>
      <span className="font-noontree text-[10px] font-bold text-white">{copy.oneLanding.osnBadgeLabel}</span>
    </div>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-[2px] shrink-0">
      <path d="M8 1.5l1.4 4.6L14 7.5l-4.6 1.4L8 13.5l-1.4-4.6L2 7.5l4.6-1.4L8 1.5z" fill={finalTokens.color.avatar.green} />
    </svg>
  );
}

export default function SavingsWidget({ savings }: SavingsWidgetProps) {
  return (
    <div
      className="flex w-full flex-col items-start gap-0 overflow-hidden rounded-2xl border-[1.6px] pb-1 pt-0"
      style={{ borderColor: finalTokens.color.surface.primary, backgroundColor: finalTokens.color.surface.primary }}
    >
      <div className="flex w-full items-center justify-between p-4">
        <div className="flex flex-col items-start gap-[2px]">
          <p className="font-noontree text-xs" style={{ color: finalTokens.color.text.tertiary }}>
            {copy.oneLanding.savingsTitle}
          </p>
          <p className="font-noontree text-[28px] font-bold leading-9 tracking-[-0.25px]" style={{ color: finalTokens.color.text.primary }}>
            dhm{savings.total.toFixed(2)}
          </p>
        </div>
        <div className="flex h-10 items-center rounded-full p-1" style={{ backgroundColor: finalTokens.color.surface.secondary }}>
          <div className="flex h-8 items-center gap-1 rounded-full bg-white px-[10px] py-2" style={{ boxShadow: "0px 1px 3px rgba(34,34,34,0.06)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="6" cy="5" r="2" stroke={finalTokens.color.text.primary} strokeWidth="1.2" />
              <circle cx="11" cy="6" r="1.6" stroke={finalTokens.color.text.primary} strokeWidth="1.2" />
              <path d="M2 13c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke={finalTokens.color.text.primary} strokeWidth="1.2" />
            </svg>
            <span className="font-noontree text-xs font-semibold" style={{ color: finalTokens.color.text.primary }}>
              {copy.oneLanding.switchFamily}
            </span>
          </div>
        </div>
      </div>

      <div
        className="flex w-full items-center gap-1 px-4 py-[6px]"
        style={{ background: `linear-gradient(90deg, ${finalTokens.color.surface.successSubtle} 0%, ${finalTokens.color.surface.primary} 100%)` }}
      >
        <span className="font-noontree text-xs font-medium" style={{ color: finalTokens.color.text.success }}>
          {copy.oneLanding.savingsSaved3x}
        </span>
      </div>

      <div className="flex w-full flex-col items-start gap-4 rounded-2xl px-4 py-3">
        <div className="flex w-full items-center gap-2">
          <DeliveryIcon />
          <div className="flex flex-1 items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="font-noontree text-sm font-semibold" style={{ color: finalTokens.color.text.primary }}>
                {copy.oneLanding.freeDeliveries}
              </p>
              <p className="font-noontree text-xs font-medium" style={{ color: finalTokens.color.text.secondary }}>
                {copy.oneLanding.usedNTimes.replace("{n}", String(savings.freeDeliveries.count))}
              </p>
            </div>
            <p className="font-noontree text-lg font-semibold" style={{ color: finalTokens.color.text.primary }}>
              dhm{savings.freeDeliveries.amount.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="h-0 w-full border-t" style={{ borderColor: finalTokens.color.border.subtle }} />

        <div className="flex w-full items-center gap-2">
          <DealsIcon />
          <div className="flex flex-1 items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="font-noontree text-sm font-semibold" style={{ color: finalTokens.color.text.primary }}>
                {copy.oneLanding.memberOnlyDeals}
              </p>
              <p className="font-noontree text-xs font-medium" style={{ color: finalTokens.color.text.secondary }}>
                {copy.oneLanding.usedNTimes.replace("{n}", String(savings.memberDeals.count))}
              </p>
            </div>
            <p className="font-noontree text-lg font-semibold" style={{ color: finalTokens.color.text.primary }}>
              dhm{savings.memberDeals.amount.toFixed(2)}
            </p>
          </div>
        </div>

        {savings.osn && (
          <>
            <div className="h-0 w-full border-t" style={{ borderColor: finalTokens.color.border.subtle }} />
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex flex-1 items-start gap-2">
                <StarIcon />
                <div className="flex flex-1 flex-col gap-[6px]">
                  <p className="font-noontree text-base font-bold" style={{ color: finalTokens.color.text.primary }}>
                    {copy.oneLanding.osnStreamingIncluded}
                  </p>
                  <p className="font-noontree text-xs" style={{ color: finalTokens.color.text.secondary }}>
                    {copy.oneLanding.osnStreamingSubtitle}
                  </p>
                </div>
              </div>
              <OsnBadge />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
