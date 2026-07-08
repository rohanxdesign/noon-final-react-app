// Final flows (Family Sharing v2, Figma file kubsiHaVw54DXp94M3YBii) — this
// app surface's local token set, ported from the florence prototype's
// src/lib/tokens.ts `finalTokens` export. Kept app-local (like
// one-flows/lib/dsTokens.ts) rather than merged into the shared @tokens
// package so nothing here can collide with or require changes to other
// surfaces' token usage. Sourced from get_variable_defs on the Components
// section (3179:35222), which returns every variable from every library
// linked to that Figma file (~300, most irrelevant -- other teams' libraries
// happen to be attached to the same file). Only the internally-consistent
// "colour/*"+"space/*"+"radius/*"+font-weight family is ported here -- it's
// the one whose values already match the Field DS tokens (e.g. Grass/700 =
// #108757) and whose font family (Noontree) matches what's already shipped.
// Object keys are the Figma variable's own suffix for traceability (e.g.
// space["4"] <- "space/4"). Per-screen type styles (font/heading/h20 etc.) are
// pulled fresh via get_design_context as each screen is built in Tasks 10-18,
// per the plan's "port tokens as used" ground rule -- not pre-guessed here.
export const finalTokens = {
  color: {
    text: {
      primary: "#1d2539", // colour/text-n-icon/primary
      secondary: "#475067", // colour/text-n-icon/secondary
      tertiary: "#666d85", // colour/text-n-icon/tertiary
      muted: "#989fb3", // colour/text-n-icon/muted
      success: "#0f8857", // colour/text-n-icon/success
      error: "#d92626", // colour/text-n-icon/error
      onSurfaceBold: "#ffffff", // colour/text-n-icon/on-surface-bold
      // Task 14 (PaymentSheet/ReviewConfirmSheet). Blue-gray/1000 -- the "Review and
      // confirm" sheet title color (3201:77070). Same hex as surface.primaryInverted
      // below but a distinct Figma variable/semantic (text vs. surface), kept separate
      // per this file's own precedent (e.g. avatar.green vs. decorative.planTagBg).
      sheetTitle: "#101628",
    },
    surface: {
      primary: "#ffffff", // colour/surface/primary
      secondary: "#f9f9fb", // colour/surface/secondary
      tertiary: "#f2f3f7", // colour/surface/tertiary
      muted: "#eaecf0", // colour/surface/muted
      successBold: "#0f8857", // colour/surface/success-bold
      successSubtle: "#e3fcf2", // colour/surface/success-subtle
      errorSubtle: "#fff0f0", // colour/surface/error-subtle
      primaryInverted: "#101628", // colour/surface/primary-inverted
      alphaLight80: "rgba(255,255,255,0.8)", // base/colour/alpha-light/80 — invitee ManagePlan cards (3205:82048)
      // Task 14 -- PaymentSheet/ReviewConfirmSheet scrim, from M-BottomSheet's own bound
      // variable (get_variable_defs on 3261:103880): colour/surface/overlay-bold, #000000cc
      // (80% black). Distinct from one-flows' ReviewAndConfirmSheet reference component,
      // which uses an unbound literal black/50 -- this surface's real Figma value is darker.
      overlayBold: "#000000cc",
    },
    border: {
      primary: "#eaecf0", // colour/border/primary
      subtle: "#f2f3f7", // colour/border/subtle
      medium: "#d0d4dd", // colour/border/medium
      bold: "#666d85", // colour/border/bold
      white: "#ffffff", // colour/border/white
      successBold: "#0f8857", // colour/border/success bold
      error: "#fed2d2", // colour/border/error
      overlay: "rgba(255,255,255,0.08)", // colour/border/overlay
    },
    // Member-avatar gradient family — Task 10, from the Avatar (3145:64246) and
    // FamilySeats (3136:38340) component sets. Each member NAME maps to a fixed
    // color (not assigned round-robin), matching the Figma Avatar variants.
    avatar: {
      green: "#108757", // grass/700 — Rahul Kumar / owner
      pink: "#f7306f", // pink/600 — Kumar Siddharth
      teal: "#3fa199", // emerald/500 — Arushi Maheshwari
      blue: "#3392ff", // brand-blue/500 — Rohan Arora (also "K" fill in some seat states)
      purple: "#c655ec", // purple/500 — Saransh Rawat
      purpleDeep: "#ad24db", // purple/700 — used for the 2nd seat in partial/duo-complete states
    },
    // Decorative/illustration-adjacent colors — Task 10, from LandingWidgets (3136:25848/25851)
    // and SavingsWidget (3502:21159). Not part of the curated text/surface/border families
    // above because Figma's own layer doesn't tag these with a "colour/*" variable (they're
    // literal fills on icon-background chips and section-header glyphs) -- kept as their own
    // small family rather than force-mapped onto an unrelated named token.
    decorative: {
      widgetHeaderText: "#343d54", // blue-gray/800 — LandingWidgets section-header title color
      iconChipBg: "#ebf9f2", // SavingsWidget's icon-background chip (Free deliveries / Member deals)
      mutedGlyph: "#8a8a8a", // LandingWidgets step-numeral circle glyph
      osnBadgeBg: "#141414", // SavingsWidget's small circular "OSN+" badge background
      // Task 11 (ManagePlan). planTagBg is a raw #108757 fill on the "Current plan" tag
      // (3187:75384) -- Figma binds no colour/* variable there, but the value IS grass/700.
      // black2 is the "Black2" Figma text style (#262626) on the Change-plan row (3187:75377).
      // hairline is "✅-sementic/border/primary" (#f5f5f5, another team's library) -- the
      // 1.5px ring on payment cards / avatar tiles.
      planTagBg: "#108757",
      black2: "#262626",
      hairline: "#f5f5f5",
      // Task 12 (PlanSheet selector cards, set 3136:25329; also ExplorePlans radio
      // cards in Task 13). Raw literals in Figma -- no colour/* variable bound:
      // selected card border rgba(15,136,87,0.7) (success at 70%), selected price
      // panel #f1f9f6 (pale green).
      planCardSelectedBorder: "rgba(15,136,87,0.7)",
      planCardSelectedBg: "#f1f9f6",
      // Task 13 (ExplorePlans, live "03 · Plan selection" frames e.g. 3792:22277).
      // offerChipBg is green/50 (#f0fdf1) behind the "2 for 1 subscription"/"Save"
      // chips; neutralBlack is neutral/black (#0e0e0e), the "Keep my current plan"
      // button fill (distinct from colour/surface/primary-inverted #101628).
      offerChipBg: "#f0fdf1",
      neutralBlack: "#0e0e0e",
      // Task 14 (ReviewConfirmSheet message box, 3201:77070). Gray/100 -- a hairline
      // border on the surface/secondary message box, from another team's library
      // (same situation as `hairline` above, kept distinct since the two nodes bind
      // different variables despite both being near-white).
      reviewBoxBorder: "#fafafa",
    },
  },
  // Raw px values as string keys, not a semantic t-shirt scale -- Figma didn't
  // ship names for these, so none are invented here.
  space: {
    "0": 0, "1": 1, "2": 2, "4": 4, "6": 6, "8": 8,
    "10": 10, "12": 12, "14": 14, "16": 16, "20": 20, "24": 24, "28": 28, "40": 40, "46": 46,
  },
  radius: {
    "0": 0, "4": 4, "8": 8, "10": 10, "12": 12, "14": 14, "16": 16, "40": 40, full: 9999, // radius/rounded
  },
  fontFamily: "Noontree", // fontFamily/primary
  fontWeight: {
    regular: 400, medium: 500, semibold: 600, bold: 700, // base/font/weight/*
  },
} as const;
