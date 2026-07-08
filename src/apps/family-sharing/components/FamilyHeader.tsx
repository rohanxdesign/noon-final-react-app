import oneLogoFrame from "../assets/one-logo-frame.svg";
import oneLogoGroup from "../assets/one-logo-group.svg";
import familyHeaderIllustration from "../assets/family-header-avatars.png";
import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";

/**
 * Hero header above the ActivePlanCard. Two visual variants exist in Figma:
 *
 * 1. "one" logo hero (Frame 2147226225, node 3458:135683) -- the ellipse +
 *    "one" wordmark seen in every OneLanding node this task actually
 *    surveyed against the flow map (3533:29160, 3161:31150/31167/31395/
 *    31576/38768/40856/42258/46402, 3180:33538/47039). Reuses the identical
 *    brand-mark SVGs already shipped for V1-V3 (one-logo-frame.svg /
 *    one-logo-group.svg) rather than re-downloading duplicate art.
 * 2. "Family Header" avatar-cluster hero (node 3187:66505) -- a heart-shaped
 *    hex cluster of 4 illustrated members around the owner's initial. This
 *    is the node this task explicitly names for extraction, but it did NOT
 *    appear in any of the OneLanding flow-map nodes actually inspected here
 *    (all of which use variant 1 above). No trigger condition for it could
 *    be grounded in the surveyed data, so it's built as an opt-in `variant`
 *    prop rather than guessed into OneLanding's branching -- flagged in the
 *    Task 10 report.
 */
export interface FamilyHeaderProps {
  ownerName: string;
  memberSinceDate: string;
  variant?: "logo" | "avatarCluster";
}

export default function FamilyHeader({ ownerName, memberSinceDate, variant = "logo" }: FamilyHeaderProps) {
  return (
    <div className="flex w-full flex-col items-center gap-2 px-[15px] pt-7">
      {variant === "logo" ? (
        <div className="relative h-[72px] w-[121px]">
          <img src={oneLogoFrame} alt="" className="absolute inset-0 h-full w-full" />
          <img
            src={oneLogoGroup}
            alt="noon One"
            className="absolute left-[7px] top-[6px] h-[57px] w-[105px]"
            style={{ transform: "rotate(0.18deg) skewX(0.53deg)" }}
          />
        </div>
      ) : (
        <img src={familyHeaderIllustration} alt="" className="h-auto w-full max-w-[292px]" />
      )}
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="font-noontree text-[28px] font-extrabold tracking-[-1px]" style={{ color: finalTokens.color.text.primary }}>
          {ownerName}
        </p>
        <p className="font-noontree text-sm tracking-[-0.3px]" style={{ color: finalTokens.color.text.tertiary }}>
          {copy.oneLanding.memberSince.replace("{date}", memberSinceDate)}
        </p>
      </div>
    </div>
  );
}

/** Landing-page gradient/glow background — Figma node 3458:133247, sits behind FamilyHeader. */
export function LandingBackground() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-0 h-[411px] w-[375px] -translate-x-1/2"
      style={{ background: "linear-gradient(180deg, rgba(242,226,181,0.205) 0%, rgba(238,179,62,0.512) 0%, rgba(251,251,251,0) 101.13%, rgba(251,251,251,0) 332.68%)" }}
      aria-hidden="true"
    >
      <div
        className="absolute left-[84px] top-[74px] h-[171px] w-[174px] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(255,244,214,0.9), rgba(255,244,214,0))", mixBlendMode: "color-dodge" }}
      />
    </div>
  );
}
