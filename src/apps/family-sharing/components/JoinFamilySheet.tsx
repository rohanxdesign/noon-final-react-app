import { AnimatePresence, motion } from "framer-motion";
import type { FinalFlowState } from "../state/types";
import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";

/**
 * Join-family sheet — registered under BOTH `joinFamilySheet` and
 * `joinErrorSheet` in screens/registry.tsx's OVERLAYS map (one component,
 * two overlay ids, exactly like the task brief specifies) since every
 * caller reads `props.joinError` to pick a branch rather than the overlay
 * id itself:
 *
 *  - `joinError` undefined -> the join-prompt body, Figma base component
 *    "Join Family" (3180:27794), verified byte-identical across its 4 live
 *    call sites: 3180:31300 (member-accepts-invite's only step) and the 3
 *    pre-error steps in the error-path recipes (3205:82330, 3207:12793,
 *    3207:16915 -- memberAlreadyInFamily/AlreadySubscribed/DifferentCountry's
 *    FIRST step, before each flow advances into its own error variant).
 *    Heading/subtitle/3 benefit rows/CTA/footer note all confirmed
 *    identical on every one of those 4 nodes (get_design_context on each
 *    node's own scoped M-BottomSheet instance -- 3205:84093 / 3207:14556 /
 *    3207:18678 for the 3 error-path pre-steps -- not just the bare base
 *    component). Owner name is Figma's own literal "Rahul" on all 4, not
 *    state-derived (state.plan.ownerName is "Rahul Jaiswal"/"Rahul" across
 *    every seed this sheet mounts on, so this never diverges in practice,
 *    but the copy itself is a fixed string per copy.ts's ground rule
 *    against inventing template substitution Figma doesn't itself bind).
 *
 *  - `joinError` set -> one of 3 error variants, ALL THREE instancing the
 *    same Figma "Error Message" component (3187:74761) with only the
 *    icon/title/body overridden per instance -- extracted once here as the
 *    inline <ErrorMessage> below rather than tripling the markup, per the
 *    task brief. Verified against each error's own scoped M-BottomSheet
 *    instance (3205:87906 "alreadyInFamily" / 3207:16315 "alreadySubscribed"
 *    / 3207:20437 "differentCountry"), not the bare 3187:74761 component in
 *    isolation -- querying that node directly resolves to an unrelated
 *    instantiation (a "Remove <name>?" confirmation override used by the
 *    Task 18 removeMemberSheet elsewhere in the file), which would have been
 *    a false "Figma drift" flag if taken as this sheet's own copy source.
 *    All 3 variants share identical structure: a 56px icon circle (light
 *    surface-tertiary ring, navy exclamation glyph, Figma's own
 *    "system/tick-circle" slot name despite showing an alert glyph, not a
 *    tick -- rendered as-is, not corrected, since Code Connect binds no
 *    other icon here) flanked by two fully-transparent (opacity:0 in
 *    Figma's own source SVG) decorative alert glyphs -- omitted here since
 *    they render nothing -- then a title/body pair (both 293px in Figma,
 *    rendered here as max-w-[293px] centered text) and a single
 *    "Got it" M-NeutralButton CTA with no secondary button.
 *
 * Mount/animation (scrim + spring bottom sheet) matches InviteSheet.tsx/
 * PaymentSheet.tsx for visual consistency across this module's overlays.
 */

/**
 * Icon at the top of ErrorMessage — Figma's own "alert" component (768:44797,
 * viewBox 0 0 50 50, downloaded directly from 3187:74761's live instances)
 * inside a 56px ring (Ellipse 24014, surface.tertiary fill + surface.secondary
 * stroke). Figma's outer layer is named "system/tick-circle" despite showing
 * this exclamation glyph, not a tick -- rendered as-is since Code Connect
 * binds no other icon to that slot on any of the 3 error instances checked.
 * The two smaller flanking "alert" glyphs in Figma's source (either side of
 * the ring) carry `opacity:0` in their own downloaded SVG group and render
 * nothing -- correctly omitted here, not an oversight.
 */
function AlertIcon() {
  return (
    <div
      className="relative flex size-14 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: finalTokens.color.surface.tertiary, boxShadow: `0 0 0 6px ${finalTokens.color.surface.secondary}` }}
    >
      <svg width="20" height="20" viewBox="0 0 50 50" fill="none" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25 2.5C39.625 2.5 47.5 10.375 47.5 25C47.5 39.625 39.625 47.5 25 47.5C10.375 47.5 2.5 39.625 2.5 25C2.5 10.375 10.375 2.5 25 2.5ZM25 31.25C22.8125 31.25 21.875 32.1875 21.875 34.375C21.875 36.5625 22.8125 37.5 25 37.5C27.1875 37.5 28.125 36.5625 28.125 34.375C28.125 32.1875 27.1875 31.25 25 31.25ZM25 12.5C22.3753 12.5 21.2503 13.5407 21.25 15.9668C21.2503 18.3953 22.3754 28.75 25 28.75C27.6246 28.75 28.7497 18.3953 28.75 15.9668C28.7497 13.5407 27.6247 12.5 25 12.5Z"
          fill={finalTokens.color.decorative.widgetHeaderText}
        />
      </svg>
    </div>
  );
}

/** Shared "Error Message" body (Figma 3187:74761) — icon + title + body, reused across all 3 joinError variants. */
function ErrorMessage({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex w-full flex-col items-center gap-4 px-3 pb-2 pt-6 text-center">
      <AlertIcon />
      <div className="flex w-full flex-col items-center gap-2">
        <p className="max-w-[293px] font-noontree text-lg font-bold leading-6 tracking-[-0.15px]" style={{ color: finalTokens.color.decorative.widgetHeaderText }}>
          {title}
        </p>
        <p className="max-w-[293px] font-noontree text-sm leading-5 tracking-[-0.13px]" style={{ color: finalTokens.color.text.tertiary }}>
          {body}
        </p>
      </div>
    </div>
  );
}

/**
 * "Icon container" sparkle glyph — Figma's own asset (`imgIconContainer` in
 * the 3180:27794 design context), reused identically on all 3 benefit rows
 * in the base component (confirmed: the same asset URL appears 3 times in
 * the downloaded markup). Each row's own visual identity in Figma instead
 * comes from decorative trailing chrome on the right (brand-logo pills for
 * delivery, a %-badge, a shield glyph) -- out of scope here as marketing
 * chrome unrelated to the benefit text itself, matching this file's own
 * precedent of not importing every decorative Figma asset (e.g. ShareSheet's
 * generic share-target glyphs, InviteSheet's hand-drawn copy icon).
 */
function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
      <path
        d="M10.286 5.701c.265-.633 1.163-.633 1.428 0l.937 2.234a1 1 0 0 0 .534.534l2.233.937c.633.265.633 1.163 0 1.428l-2.233.937a1 1 0 0 0-.534.534l-.937 2.233c-.265.633-1.163.633-1.428 0l-.937-2.233a1 1 0 0 0-.534-.534l-2.233-.937c-.633-.265-.633-1.163 0-1.428l2.233-.937a1 1 0 0 0 .534-.534l.937-2.234Z"
        fill={finalTokens.color.text.primary}
      />
    </svg>
  );
}

function BenefitRow({ title, subtitle, showDivider }: { title: string; subtitle: string; showDivider: boolean }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full items-start gap-3 pl-0.5">
        <div className="flex h-4 w-[22px] shrink-0 items-center justify-center">
          <SparkleIcon />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <p className="font-noontree text-sm font-semibold leading-5 tracking-[-0.1px]" style={{ color: finalTokens.color.text.primary }}>
            {title}
          </p>
          <p className="font-noontree text-xs font-medium leading-[18px] tracking-[-0.1px]" style={{ color: finalTokens.color.text.tertiary }}>
            {subtitle}
          </p>
        </div>
      </div>
      {showDivider && <div className="h-px w-full" style={{ backgroundColor: finalTokens.color.border.subtle }} />}
    </div>
  );
}

/** Join-prompt body (Figma "Join Family" base component, 3180:27794). */
function JoinPromptBody() {
  return (
    <div className="flex w-full flex-col items-center gap-5 px-3 pb-3 pt-6">
      <div className="flex w-full flex-col items-center gap-2 text-center">
        <p className="w-[234px] font-noontree text-2xl font-bold leading-8 tracking-[-0.25px]" style={{ color: finalTokens.color.text.primary }}>
          {copy.joinFamilySheet.heading}
        </p>
        <p className="font-noontree text-sm leading-5 tracking-[-0.1px]" style={{ color: finalTokens.color.text.secondary }}>
          {copy.joinFamilySheet.subtitle}
        </p>
      </div>
      <div
        className="flex w-full flex-col gap-4 rounded-xl border-2 px-3 py-4"
        style={{ backgroundColor: finalTokens.color.surface.alphaLight80, borderColor: finalTokens.color.border.white }}
      >
        <BenefitRow title={copy.joinFamilySheet.benefit1Title} subtitle={copy.joinFamilySheet.benefit1Subtitle} showDivider />
        <BenefitRow title={copy.joinFamilySheet.benefit2Title} subtitle={copy.joinFamilySheet.benefit2Subtitle} showDivider />
        <BenefitRow title={copy.joinFamilySheet.benefit3Title} subtitle={copy.joinFamilySheet.benefit3Subtitle} showDivider={false} />
      </div>
    </div>
  );
}

export interface JoinFamilySheetProps {
  state: FinalFlowState;
  onAdvance: () => void;
  onClose?: () => void;
  joinError?: "alreadyInFamily" | "alreadySubscribed" | "differentCountry";
}

const ERROR_CONTENT: Record<NonNullable<JoinFamilySheetProps["joinError"]>, { title: string; body: string }> = {
  alreadyInFamily: { title: copy.joinFamilySheet.alreadyInFamilyTitle, body: copy.joinFamilySheet.alreadyInFamilyBody },
  alreadySubscribed: { title: copy.joinFamilySheet.alreadySubscribedTitle, body: copy.joinFamilySheet.alreadySubscribedBody },
  differentCountry: { title: copy.joinFamilySheet.differentCountryTitle, body: copy.joinFamilySheet.differentCountryBody },
};

export default function JoinFamilySheet({ onAdvance, onClose, joinError }: JoinFamilySheetProps) {
  const error = joinError ? ERROR_CONTENT[joinError] : undefined;

  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 z-30"
        style={{ backgroundColor: finalTokens.color.surface.overlayBold }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        role="dialog"
        aria-label={error ? error.title : copy.joinFamilySheet.heading}
        className="absolute inset-x-0 bottom-0 z-40 flex flex-col overflow-hidden rounded-t-2xl"
        style={{ backgroundColor: finalTokens.color.surface.primary, maxHeight: "85%" }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 32, stiffness: 320 }}
      >
        <div className="flex shrink-0 justify-center py-3">
          <div className="h-1 w-9 rounded-full" style={{ backgroundColor: finalTokens.color.surface.muted }} />
        </div>

        <div className="flex flex-col items-center overflow-y-auto">
          {error ? <ErrorMessage title={error.title} body={error.body} /> : <JoinPromptBody />}
        </div>

        <div className="flex shrink-0 flex-col items-center gap-3 p-3">
          <button
            type="button"
            onClick={onAdvance}
            className="flex min-h-[52px] w-full items-center justify-center rounded-xl px-5 py-3.5"
            style={{ backgroundColor: finalTokens.color.surface.primaryInverted }}
          >
            <span className="font-noontree text-base font-semibold text-white">
              {error ? copy.joinFamilySheet.errorCta : copy.joinFamilySheet.cta}
            </span>
          </button>
          {!error && (
            <p className="font-noontree text-xs font-medium tracking-[-0.1px]" style={{ color: finalTokens.color.text.tertiary }}>
              {copy.joinFamilySheet.footerNote}
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
