import type { ReactNode } from "react";
import type { ScreenProps } from "./StubScreen";
import { copy } from "../copy";
import { finalTokens } from "../lib/tokens";
import storefrontBackdrop from "../assets/noonhome-storefront-backdrop.png";

/**
 * noon Home — Figma "01 · Home" pattern. Two variants live across the 21
 * recipes and share this one entry point, gated on `state.pov` (never on
 * recipe/flow id — matches OneLanding.tsx/ActivePlanCard.tsx's own precedent
 * for the same owner/invitee gate):
 *
 *  - `pov === "owner"` -> the ACCOUNT variant (3161:30127 upgrade-family /
 *    3161:32232 upgrade-duo). Verified via get_design_context (3161:30127)
 *    plus a direct get_screenshot diff of both node ids: byte-for-byte the
 *    same "01 · Home (logged-in subscriber)" component tree and copy on both.
 *    A plain noon storefront Account tab for an existing subscriber; no
 *    overlay on this step. Both upgrade recipes seed from
 *    `seeds.activeIndividual` (pov: "owner").
 *
 *  - `pov === "invitee"` -> the STOREFRONT variant (3180:31300, reused by all
 *    4 member recipes, confirmed via get_screenshot: 3205:82330/3207:12793/
 *    3207:16915 render the identical frame). All 4 recipes seed from
 *    `seeds.inviteeProspect` (pov: "invitee").
 *
 * SCOPE EXCEPTION (documented, matching this module's own precedent for inert
 * decorative content -- e.g. BottomActionBar.tsx's unwired "on scroll" picker,
 * JoinFamilySheet.tsx's undecorated benefit-row chrome): the account variant's
 * "My Orders"/"My Wishlist" widgets (rotated/stacked product-photo collages),
 * footer social icons, and status-bar/bottom-nav OS chrome are inert
 * marketing/OS chrome that no flow step ever interacts with (confirmed via
 * get_design_context on 3161:30127). Rather than hand-rebuild ~15 rotated
 * photo tiles pixel-by-pixel, the ACCOUNT variant below reproduces the
 * INTERACTIVE surface as real components (profile card, noon Credits row,
 * every settings/support disclosure row -- all real DOM, all real onAdvance
 * handlers, matching ManagePlan.tsx's "every plausible CTA advances the flow"
 * contract) and renders the non-interactive photo widgets as static
 * placeholder shapes with the correct layout footprint, rather than an
 * unreadable flattened photo collage. This repo's own status bar / bottom tab
 * bar are never reproduced on any other screen in this module either (see
 * OneLanding.tsx/ManagePlan.tsx's plain `pt-16` top spacing) -- not
 * reintroduced here for consistency.
 *
 * The STOREFRONT variant is a flattened image behind the join-family sheet --
 * but NOT the same asset the Task 17 reference build (a sibling worktree,
 * consulted read-only while porting this screen) used. That reference had no
 * working JoinFamilySheet component yet, so it exported node 3180:31300's
 * FULL composite (dimmed storefront + the join-sheet card baked into the same
 * PNG) and rendered ONLY that image, full-bleed, with no live sheet on top.
 * THIS repo already ships a fully-built, Task-15 `components/JoinFamilySheet`
 * (registered under both `joinFamilySheet`/`joinErrorSheet` in
 * screens/registry.tsx, mounted by FlowRunner.tsx above whichever screen the
 * current step names) -- reusing that same full-composite export here would
 * render the join-sheet card TWICE (once baked into the image, once for
 * real). So this screen's own backdrop asset
 * (assets/noonhome-storefront-backdrop.png) was re-derived instead: per
 * get_metadata on 3180:31300, the frame's top-level children are the
 * storefront content + chrome (status bar, category-tile switcher, "Home"
 * breadcrumb, wishlist icon) as ordinary siblings of a separate
 * "M-BottomSheet" instance (which contains its own full-screen scrim child
 * plus the "Join Family" sheet body -- exactly what JoinFamilySheet.tsx
 * already reproduces as real, interactive markup). The exported backdrop
 * asset here therefore contains ONLY the storefront chrome visible above
 * where that sheet's scrim/card sit (the sheet's own maxHeight leaves roughly
 * the top 15% of the viewport showing just backdrop-through-scrim), reverse-
 * brightened to approximate the UNDIMMED storefront (Figma's own composite
 * had its scrim baked in) -- JoinFamilySheet's real scrim (already `absolute
 * inset-0` at 80% black, see that component's own file comment) supplies the
 * dimming on top of it, matching Figma's own layering (bright content +
 * scrim = final look) instead of double-darkening a pre-dimmed export. Full
 * pixel-perfect reconstruction of the multi-thousand-px product grid behind
 * it is out of scope -- inert backdrop no flow ever interacts with, matching
 * the reference's own documented scope exception for this exact node.
 */

function ChevronSmallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M5.25 3.5L9.625 7L5.25 10.5" stroke={finalTokens.color.text.tertiary} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M11.5 2.5l4 4L6 16H2v-4l9.5-9.5z" stroke={finalTokens.color.text.primary} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2.5l6 2.2v4.3c0 4-2.6 6.9-6 8.5-3.4-1.6-6-4.5-6-8.5V4.7L10 2.5z" stroke={finalTokens.color.text.secondary} strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function SignOutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M8 3H4.5A1.5 1.5 0 003 4.5v11A1.5 1.5 0 004.5 17H8M13 13.5L17 10l-4-3.5M17 10H7" stroke={finalTokens.color.text.secondary} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PreferencesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke={finalTokens.color.text.secondary} strokeWidth="1.3" />
      <path d="M10 6.5v3.5l2.2 2.2" stroke={finalTokens.color.text.secondary} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NotificationsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3a4 4 0 00-4 4v2.3c0 .5-.2 1-.5 1.4L4.5 12.5h11L14.5 10.7c-.3-.4-.5-.9-.5-1.4V7a4 4 0 00-4-4z" stroke={finalTokens.color.text.secondary} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8.2 15a1.8 1.8 0 003.6 0" stroke={finalTokens.color.text.secondary} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function GenericRowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="14" height="12" rx="2" stroke={finalTokens.color.text.secondary} strokeWidth="1.3" />
      <path d="M3 8h14" stroke={finalTokens.color.text.secondary} strokeWidth="1.3" />
    </svg>
  );
}

function LanguageIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke={finalTokens.color.text.secondary} strokeWidth="1.3" />
      <path d="M3 10h14M10 3c1.8 2 1.8 12 0 14M10 3c-1.8 2-1.8 12 0 14" stroke={finalTokens.color.text.secondary} strokeWidth="1.1" />
    </svg>
  );
}

/** Disclosure row -- shared shape for every "App & Settings"/"Support" list item (3161:30204/30205/30206). */
function SettingsRow({ icon, label, trailing, onPress }: { icon: ReactNode; label: string; trailing?: ReactNode; onPress: () => void }) {
  return (
    <button type="button" onClick={onPress} className="flex h-[38px] w-full items-center justify-between text-left">
      <div className="flex flex-1 items-center gap-2">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg">{icon}</div>
        <span className="font-noontree text-sm font-medium" style={{ color: finalTokens.color.text.primary }}>
          {label}
        </span>
      </div>
      {trailing ?? <ChevronSmallIcon />}
    </button>
  );
}

function RowDivider() {
  return <div className="h-px w-full" style={{ backgroundColor: finalTokens.color.border.subtle }} />;
}

/** "01 · Home (logged-in subscriber)" -- 3161:30127 (upgrade-family) / 3161:32232 (upgrade-duo).
 *  Verified via get_design_context + get_screenshot: identical component tree + copy on both. */
function AccountVariant({ onAdvance }: { onAdvance: () => void }) {
  return (
    <div className="relative h-full w-full" style={{ backgroundColor: finalTokens.color.surface.tertiary }}>
      <div className="h-full w-full overflow-y-auto pb-8">
        <div className="flex flex-col gap-3 px-3 pb-6 pt-16">
          {/* Profile card + promo strip (3161:30129) */}
          <section
            className="flex w-full flex-col items-center overflow-hidden rounded-2xl border-2"
            style={{ borderColor: finalTokens.color.surface.primary, background: "linear-gradient(90deg, #fff3c0 0%, #fff3c0 100%)" }}
          >
            <div className="flex w-full items-center gap-3 bg-white px-3 py-4">
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: finalTokens.color.surface.tertiary }}
              >
                <span className="font-noontree text-2xl font-bold" style={{ color: finalTokens.color.text.primary }}>
                  {copy.noonHome.profileInitial}
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
                <p className="truncate font-noontree text-lg font-bold leading-6" style={{ color: finalTokens.color.text.primary }}>
                  {copy.noonHome.profileName}
                </p>
                <p className="truncate font-noontree text-xs" style={{ color: finalTokens.color.text.tertiary }}>
                  {copy.noonHome.profileEmail}
                </p>
              </div>
              <button
                type="button"
                onClick={onAdvance}
                aria-label="Edit profile"
                className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                style={{ borderColor: finalTokens.color.border.subtle }}
              >
                <EditIcon />
              </button>
            </div>
            <button type="button" onClick={onAdvance} className="flex w-full items-center justify-between px-3 py-3">
              <span className="font-noontree text-sm font-bold" style={{ color: finalTokens.color.text.primary }}>
                {copy.noonHome.savedPromo}
              </span>
              <ChevronSmallIcon />
            </button>
          </section>

          {/* My Orders / My Wishlist widgets (3161:30164) -- inert product-photo collages in
              Figma; per this file's scope exception, rendered as static labeled placeholders
              rather than a pixel-rebuilt stack of ~15 rotated thumbnails (no flow interacts
              with either widget). */}
          <div className="flex w-full items-stretch gap-3">
            <div className="flex flex-1 flex-col items-center gap-3 rounded-xl bg-white py-3">
              <p className="w-full px-3 font-noontree text-sm font-bold" style={{ color: finalTokens.color.text.primary }}>
                {copy.noonHome.myOrders}
              </p>
              <div className="flex h-[60px] w-full items-center justify-center px-3">
                <div className="h-11 w-full rounded-lg" style={{ backgroundColor: finalTokens.color.surface.tertiary }} />
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center gap-3 rounded-xl bg-white py-3">
              <p className="w-full px-3 font-noontree text-sm font-bold" style={{ color: finalTokens.color.text.primary }}>
                {copy.noonHome.myWishlist}
              </p>
              <div className="flex h-[60px] w-full items-center justify-center px-3">
                <div className="h-11 w-full rounded-lg" style={{ backgroundColor: finalTokens.color.surface.tertiary }} />
              </div>
            </div>
          </div>

          {/* noon Credits row (3161:30195) */}
          <button type="button" onClick={onAdvance} className="flex w-full items-center justify-between rounded-2xl bg-white px-[10px] py-[14px]">
            <div className="flex items-center gap-[6px]">
              <div className="flex size-7 items-center justify-center rounded-lg">
                <GenericRowIcon />
              </div>
              <span className="font-noontree text-sm font-medium" style={{ color: finalTokens.color.text.primary }}>
                {copy.noonHome.noonCredits}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full px-3 py-2" style={{ backgroundColor: finalTokens.color.surface.secondary }}>
              <span className="font-noontree text-sm font-semibold" style={{ color: finalTokens.color.text.primary }}>
                {copy.noonHome.noonCreditsAmount}
              </span>
              <ChevronSmallIcon />
            </div>
          </button>

          {/* App & Settings block 1 (3161:30204) */}
          <section className="flex w-full flex-col gap-[14px] rounded-2xl bg-white p-3">
            <SettingsRow icon={<GenericRowIcon />} label={copy.noonHome.addresses} onPress={onAdvance} />
            <RowDivider />
            <SettingsRow icon={<GenericRowIcon />} label={copy.noonHome.manageCards} onPress={onAdvance} />
            <RowDivider />
            <SettingsRow icon={<GenericRowIcon />} label={copy.noonHome.returns} onPress={onAdvance} />
            <RowDivider />
            <SettingsRow icon={<GenericRowIcon />} label={copy.noonHome.warrantyClaims} onPress={onAdvance} />
            <RowDivider />
            <SettingsRow
              icon={<LanguageIcon />}
              label={copy.noonHome.language}
              trailing={
                <div className="flex items-center gap-1 rounded-full p-1" style={{ backgroundColor: finalTokens.color.surface.secondary }}>
                  <span className="rounded-2xl bg-white px-[10px] py-2 font-noontree text-xs font-semibold" style={{ color: finalTokens.color.text.primary }}>
                    {copy.noonHome.languageEnglish}
                  </span>
                  <span className="px-[10px] py-2 font-noontree text-xs" style={{ color: finalTokens.color.text.tertiary }} dir="rtl">
                    {copy.noonHome.languageArabic}
                  </span>
                </div>
              }
              onPress={onAdvance}
            />
            <RowDivider />
            <SettingsRow icon={<GenericRowIcon />} label={copy.noonHome.country} onPress={onAdvance} />
          </section>

          {/* App & Settings block 2 (3161:30205) */}
          <section className="flex w-full flex-col gap-[14px] rounded-2xl bg-white p-3">
            <SettingsRow icon={<PreferencesIcon />} label={copy.noonHome.preferences} onPress={onAdvance} />
            <RowDivider />
            <SettingsRow icon={<NotificationsIcon />} label={copy.noonHome.notifications} onPress={onAdvance} />
          </section>

          {/* Support block (3161:30206) */}
          <section className="flex w-full flex-col gap-3 rounded-2xl bg-white p-3">
            <SettingsRow icon={<ShieldIcon />} label={copy.noonHome.accountSecurity} onPress={onAdvance} />
            <RowDivider />
            <SettingsRow icon={<SignOutIcon />} label={copy.noonHome.signOut} onPress={onAdvance} />
          </section>

          {/* Footer (3161:30207) -- inert copyright/policy chrome, verbatim text only. */}
          <div className="flex w-full flex-col items-center gap-4 rounded-2xl bg-white px-3 py-4 text-center">
            <div className="flex w-full items-center justify-between">
              <span className="font-noontree text-xs" style={{ color: finalTokens.color.text.tertiary }}>
                {copy.noonHome.policies}
              </span>
              <span className="font-noontree text-xs" style={{ color: finalTokens.color.text.tertiary }}>
                {copy.noonHome.sellOnNoon}
              </span>
            </div>
            <RowDivider />
            <p className="font-noontree text-[11px]" style={{ color: finalTokens.color.text.muted }}>
              {copy.noonHome.copyright}
            </p>
            <p className="font-noontree text-xs leading-5" style={{ color: finalTokens.color.text.muted }}>
              {copy.noonHome.joinedNoonApp}
              <br />
              {copy.noonHome.versionInfo}
            </p>
          </div>
        </div>
      </div>

      {/* Floating "Need help?" chip (Component 218, 3161:30249) -- positioned against this
          screen's own non-scrolling root (a sibling of the scrollable content div above), so
          it stays put while the content scrolls rather than a `position: fixed` chip (no
          precedent elsewhere in this module, and this shell doesn't wrap screens in a device
          frame that would give `fixed` the right containing block -- see App.tsx's file
          comment). */}
      <button
        type="button"
        onClick={onAdvance}
        className="absolute bottom-24 right-3 flex items-center gap-2 rounded-full border-2 bg-white px-3 py-3 shadow-lg"
        style={{ borderColor: finalTokens.color.decorative.needHelpBorder }}
      >
        <span className="size-5 rounded-full" style={{ backgroundColor: finalTokens.color.surface.tertiary }} aria-hidden="true" />
        <span className="font-noontree text-sm font-semibold" style={{ color: finalTokens.color.text.primary }}>
          {copy.noonHome.needHelp}
        </span>
      </button>
    </div>
  );
}

/** "01 · Home (invitee)" -- 3180:31300 (shared by all 4 member recipes; also 3205:82330/
 *  3207:12793/3207:16915, confirmed identical reuses of this same frame via get_screenshot).
 *  The storefront chrome BEHIND the join-family sheet -- backdrop only, per this file's header
 *  comment. The sheet itself (Task 15's real, working `JoinFamilySheet`) mounts above this
 *  screen as an overlay (see shell/FlowRunner.tsx); this component renders none of that. */
function StorefrontVariant() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      <img
        src={storefrontBackdrop}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 z-0 w-full max-w-[375px] -translate-x-1/2"
      />
    </div>
  );
}

export default function NoonHome({ state, onAdvance }: ScreenProps) {
  return state.pov === "owner" ? <AccountVariant onAdvance={onAdvance} /> : <StorefrontVariant />;
}
