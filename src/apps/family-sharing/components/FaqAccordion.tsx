import { useState } from "react";
import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";

/**
 * Interactive FAQ accordion — Figma node 3523:195091 ("FAQ"). Mechanics
 * (chevron rotates 180deg, one row's Details slot toggles visible) copied
 * verbatim from the M-Accordion instances in that node.
 *
 * Question titles are the 4 real ones shared with the compact "faq" Landing
 * Widget preview (3136:25850) -- "What is noon One?", "How much does noon
 * One cost?", "Is there a free trial? What does it include?", "What is
 * included in free express delivery?". Answer copy is NOT authored
 * anywhere in this Figma file for this question set: the only expanded
 * answer body visible in 3523:195091 belongs to an unrelated question
 * ("How much does noon One cost?" showing lorem-ish copy about a "GaN wall
 * charger", clearly leftover placeholder from a different component this
 * FAQ accordion was duplicated from). Rendered here with a clearly-labeled
 * placeholder string (`copy.oneLanding.faqAnswerPending`) rather than
 * invented marketing copy -- flagged in Task 10's report as a content gap.
 */

const DEFAULT_QUESTIONS: string[] = [
  copy.oneLanding.faqQuestion1,
  copy.oneLanding.faqQuestion2,
  copy.oneLanding.faqQuestion3,
  copy.oneLanding.faqQuestion4,
];

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-200"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <path d="M5 7.5L10 12.5L15 7.5" stroke={finalTokens.color.text.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export interface FaqAccordionProps {
  title?: string;
  className?: string;
  /** Per-screen question overrides -- PlanSheet's faq widget instance (3161:30635)
   *  swaps in 4 different questions on the otherwise-identical accordion. */
  questions?: string[];
}

export default function FaqAccordion({ title = copy.oneLanding.faqTitle, className = "", questions = DEFAULT_QUESTIONS }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div
      className={`flex w-full flex-col items-start gap-4 rounded-xl px-3 pb-3 pt-4 ${className}`}
      style={{ backgroundColor: finalTokens.color.surface.primary }}
    >
      <div className="flex w-full items-center gap-2 px-1">
        <p className="font-noontree text-base font-bold" style={{ color: finalTokens.color.text.primary }}>
          {title}
        </p>
      </div>
      <div className="flex w-full flex-col items-start gap-2">
        {questions.map((question, i) => {
          const open = openIndex === i;
          return (
            <button
              key={question}
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full flex-col items-start justify-center gap-px overflow-hidden rounded-xl"
              aria-expanded={open}
            >
              <div className="flex h-11 w-full items-center justify-center gap-2 p-3" style={{ backgroundColor: finalTokens.color.surface.secondary }}>
                <div className="flex flex-1 items-center gap-2">
                  <p className="flex-1 truncate text-left font-noontree text-sm font-semibold" style={{ color: finalTokens.color.text.primary }}>
                    {question}
                  </p>
                </div>
                <ChevronDown open={open} />
              </div>
              {open && (
                <div className="flex w-full flex-col items-start gap-3 p-3" style={{ backgroundColor: finalTokens.color.surface.secondary }}>
                  <p className="text-left font-noontree text-sm" style={{ color: finalTokens.color.text.primary }}>
                    {copy.oneLanding.faqAnswerPending}
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
