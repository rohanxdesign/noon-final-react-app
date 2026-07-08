import type { Member } from "../state/types";
import Avatar, { EmptyAvatarSlot } from "./Avatar";
import { finalTokens } from "../lib/tokens";

/**
 * Overlapping avatar stack — Figma "Family seats" component set (node
 * 3136:38340). Variant axes confirmed via get_design_context/get_metadata:
 * `planType: "Duo" | "Family"` x `status: "Empty" | "Partial" | "Complete"`.
 * Duo only ever shows 2 slots (owner + 1 member); Family shows up to 5
 * (owner + 4 members) with the remainder rendered as dashed empty slots.
 *
 * Driven entirely by `members`/`seatsTotal` from FinalFlowState — no
 * hardcoded scenario branching.
 */
export interface FamilySeatsProps {
  members: Member[];
  seatsTotal: 2 | 6;
  size?: number;
}

export default function FamilySeats({ members, seatsTotal, size = 28 }: FamilySeatsProps) {
  const capacity = seatsTotal - 1; // seats for non-owner members
  const filled = members.slice(0, capacity + 1); // owner + members, capped
  const emptyCount = Math.max(0, capacity + 1 - filled.length);

  return (
    <div
      className="flex items-center rounded-[40px] p-1"
      style={{ backgroundColor: finalTokens.color.surface.secondary }}
    >
      <div className="flex items-center" style={{ isolation: "isolate" }}>
        {filled.map((m, i) => (
          <div key={m.id} className="-mr-2 last:mr-0" style={{ zIndex: filled.length + emptyCount - i }}>
            <Avatar name={m.name} avatarKey={m.avatar} size={size} />
          </div>
        ))}
        {Array.from({ length: emptyCount }).map((_, i) => (
          <div key={`empty-${i}`} className={i < emptyCount - 1 ? "-mr-2" : ""} style={{ zIndex: emptyCount - i }}>
            <EmptyAvatarSlot size={size} />
          </div>
        ))}
      </div>
    </div>
  );
}
