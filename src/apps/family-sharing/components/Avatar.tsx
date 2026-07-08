import { finalTokens } from "../lib/tokens";

/**
 * Member avatar — Figma "Avatar" component set (node 3145:64246, file
 * kubsiHaVw54DXp94M3YBii). Figma ships 5 named-member variants + "Empty" as
 * pure CSS gradients + a letter initial (no raster art per member) — the
 * only raster asset in the set is the dashed placeholder ring behind the
 * "Empty" state's plus icon, rendered here as an inline SVG since Figma's
 * own downloaded export returned no fill image (confirmed via
 * download_assets — zero rawImages for both the "Empty" and "FamilySeats"
 * nodes).
 *
 * Color is derived from `name` via {@link avatarColorFor} so the same person
 * always renders the same color — this mirrors Figma's per-name variant
 * list exactly (it is not an arbitrary/round-robin palette).
 */

const KNOWN_AVATAR_COLORS: Record<string, string> = {
  "rahul-jaiswal": finalTokens.color.avatar.green,
  "rahul-kumar": finalTokens.color.avatar.green,
  "kumar-siddharth": finalTokens.color.avatar.pink,
  "arushi-maheshwari": finalTokens.color.avatar.teal,
  "rohan-arora": finalTokens.color.avatar.blue,
  "saransh-rawat": finalTokens.color.avatar.purple,
};

// Fallback cycle for names outside Figma's authored set (e.g. "Sanchita
// Zunane" in seeds.ts's MEMBER_POOL — Figma's Avatar component set only
// defines 4 named members + the owner, one short of the 5-member pool this
// prototype's state model allows). Cycling keeps every unseen name visually
// distinct without inventing a 6th "official" Figma color.
const FALLBACK_CYCLE = [
  finalTokens.color.avatar.purpleDeep,
  finalTokens.color.avatar.blue,
  finalTokens.color.avatar.teal,
];

function avatarColorFor(avatarKey: string): string {
  const known = KNOWN_AVATAR_COLORS[avatarKey];
  if (known) return known;
  let hash = 0;
  for (let i = 0; i < avatarKey.length; i++) hash = (hash * 31 + avatarKey.charCodeAt(i)) | 0;
  return FALLBACK_CYCLE[Math.abs(hash) % FALLBACK_CYCLE.length];
}

function initialFor(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "?";
}

export interface AvatarProps {
  /** Member display name — used to derive both the color and the initial. */
  name: string;
  /** Avatar pool key (`Member.avatar`) — used only for color lookup so two members with the
   *  same first-initial but different identities (e.g. two "Rahul"s) never collide on color. */
  avatarKey: string;
  size?: number;
  className?: string;
}

export default function Avatar({ name, avatarKey, size = 40, className = "" }: AvatarProps) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full border-[1.5px] ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: avatarColorFor(avatarKey),
        borderColor: finalTokens.color.surface.secondary,
      }}
    >
      <span
        className="font-noontree font-bold text-white"
        style={{ fontSize: size * 0.4, letterSpacing: -0.16 }}
      >
        {initialFor(name)}
      </span>
    </div>
  );
}

/** The dashed "add a member" empty seat — Figma's "Empty" Avatar variant. */
export function EmptyAvatarSlot({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-full border border-dashed ${className}`}
      style={{ width: size, height: size, borderColor: finalTokens.color.border.medium }}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 4v12M4 10h12" stroke={finalTokens.color.text.muted} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}
