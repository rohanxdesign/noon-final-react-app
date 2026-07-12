import type { ScreenId, OverlayId } from "./state/recipes/types";

/**
 * Every user-facing string in the final-flows module, keyed by screen.
 * Filled in screen-by-screen (verbatim from Figma) across Tasks 10-18.
 * Fill flat: e.g. copy.oneLanding.ctaLabel = "...". For repeated content
 * (FAQ, benefit lists), flatten with numbered keys (faqQuestion1, faqAnswer1,
 * ...) rather than introducing arrays or a second export.
 *
 * Task 14 extends the keyspace to also include OverlayId: paymentSheet and
 * reviewConfirmSheet mount on top of several different host screens (per the
 * recipes -- paymentSheet on planSheet; reviewConfirmSheet on explorePlans,
 * cancelSavings, AND cancelReason), so keying their copy by *screen* would
 * force duplicating identical strings under 3 different screen keys. Keying
 * by the overlay id itself (orthogonal to ScreenId, exactly like FlowStep's
 * own `overlay?: OverlayId` field is orthogonal to `screen`) keeps one copy
 * of each string regardless of which screen currently hosts the overlay.
 */
export const copy: Record<ScreenId | OverlayId, Record<string, string>> = {
  // Task 17. NoonHome -- account variant ("01 · Home (logged-in subscriber)", 3161:30127
  // upgrade-family / 3161:32232 upgrade-duo) verified byte-for-byte identical component tree
  // and copy on both node ids via get_design_context + a direct screenshot diff of both. The
  // storefront variant (3180:31300 et al., shared by all 4 member recipes) is a flattened
  // backdrop image behind the join-family sheet (see NoonHome.tsx's file comment) -- no screen
  // copy of its own here; the join-family sheet on top of it owns its own copy (Task 15).
  noonHome: {
    profileInitial: "A",
    profileName: "Rahul Jaiswal",
    profileEmail: "rjaiswal@gmail.com",
    // Ligature-rendered "dhm" for the dirham glyph -- project-wide precedent (ManagePlan/
    // PlanSheet's own "dhm{price}" strings render the same way).
    savedPromo: "dhm94 saved in 12 days",
    myOrders: "My Orders",
    myWishlist: "My Wishlist",
    noonCredits: "noon Credits",
    noonCreditsAmount: "dhm320.21",
    addresses: "Addresses",
    manageCards: "Manage Cards",
    returns: "Returns",
    warrantyClaims: "Warranty claims",
    language: "Language",
    languageEnglish: "English",
    languageArabic: "العربية",
    country: "Country",
    preferences: "Preferences",
    notifications: "Notifications",
    accountSecurity: "Account Security",
    signOut: "Sign out",
    policies: "Policies",
    sellOnNoon: "Sell on noon",
    copyright: "© 2025 noon. All Rights Reserved",
    joinedNoonApp: "You joined the noon app in June 2022.",
    versionInfo: "Version 4.63.0 designed with care in every detail.",
    needHelp: "Need help?",
  },
  oneLanding: {
    // ActivePlanCard (3136:22678, 3636:25801/25917/26048/26179) — verbatim per plan.type/utility.
    activePlanLabel: "Active plan",
    individualPlanTitle: "Individual Monthly",
    familyPlanTitle: "Family plan",
    duoPlanTitle: "Duo plan",
    trialEndsIndividual: "Free trial ends in {days} days, renews at {price}",
    trialEndsFamily: "Free trial ends in {days} days, renews at {price}",
    renewsOn: "Renews on {date} at {price}",
    manageMembership: "Manage membership",
    manageYourMembership: "Manage your membership",
    inviteAMemberDuo: "Invite a member",
    addFamilyToYourPlan: "Add family to your plan",
    seatsLeftFamily: "{n} more seats left",
    seatsLeftDuo: "{n} more seats left",
    seatsAvailable: "{n} more seats available",
    shareInvite: "Share Invite",
    invite: "Invite",
    // Upgrade prompt row (individual card's inline "Upgrade to family plan" nudge, 3533:29176).
    // Verified directly against BOTH the family-upsell node (3533:29160/3533:29176) and the
    // "duo" node (3533:30475, I3533:30491;3502:122536) -- Figma's own canvas shows the
    // identical "Upgrade to family plan" text on both, so this is not conditioned on which
    // plan the individual is being upsold toward. A prior draft had an unused
    // `upgradeToDuoPlan: "Upgrade to duo plan"` key for this -- removed, since that string
    // does not actually appear anywhere in Figma; the recipe step's `advanceLabel: "Upgrade
    // to duo plan"` (upgrade.ts) is a label for the PROTOTYPE'S advance button, not real
    // screen copy, and shouldn't be confused for one.
    upgradeToFamilyPlan: "Upgrade to family plan",
    tryForFree: "Try for free",
    // SavingsWidget (3502:21159).
    savingsTitle: "You noon One savings",
    savingsSaved3x: "You’ve saved 3X of what you paid for!",
    freeDeliveries: "Free deliveries",
    usedNTimes: "Used {n} times",
    memberOnlyDeals: "Member-only deals",
    switchFamily: "Family",
    // OSN+ promo card (3502:21132 / the "Exclusive Deals"-adjacent "OSN+ is available now" card
    // seen live in 3533:29160 and every subsequent OneLanding node -- verbatim, not a savings row).
    osnAvailableTitle: "OSN+ is available now",
    osnAvailableSubtitle: "Watch your favourite shows!",
    osnActivateNow: "Activate now",
    // The OSN promo row inside SavingsWidget (node 3502:21132, "OSN+ Streaming Included")
    // uses different copy than the sibling OsnPromoCard widget above -- both verbatim, kept
    // distinct since they're genuinely different strings for different components.
    osnStreamingIncluded: "OSN+ Streaming Included",
    osnStreamingSubtitle: "HBO, Discovery+ & family favourites",
    osnBadgeLabel: "OSN+",
    // Hero / Family Header (3187:66505, 3458:135679 in 3533:29160).
    memberSince: "Member since {date}",
    // All-benefits widget (3136:25848).
    shareAllBenefits: "Share all the benefits",
    benefitDeliveryTitle: "Unlimited Free Delivery",
    benefitDeliverySubtitle: "On food, groceries, & shopping",
    benefitSavingsTitle: "Save 10%, 1st of every month",
    benefitSavingsSubtitle: "Big savings, every month",
    benefitPrivacyTitle: "Orders & accounts stay private",
    benefitPrivacySubtitle: "Share noon One, not your order history",
    // How-it-works widget (3136:25851).
    howItWorksTitle: "How it works",
    howItWorksStep1Title: "Upgrade to family plan for free",
    howItWorksStep1Subtitle: "No risk - cancel or switch back anytime",
    howItWorksStep2Title: "Share your invite & family accepts",
    howItWorksStep2Subtitle: "Add your loved ones to your family plan",
    howItWorksStep3Title: "Their access to noon One unlocked!",
    howItWorksStep3Subtitle: "Your orders & payments stay private",
    // Share-offer widget (3136:25849).
    notSureIfForYou: "Not sure if this is for you?",
    shareOfferBody: "Share the offer with family or friends & decide together",
    shareOfferDetails: "Share offer details",
    // FAQ preview widget (3136:25850) + full FaqAccordion (3523:195091) -- same 4 questions,
    // verbatim from Figma. Answers are NOT authored anywhere in this Figma file for this
    // question set (the one expanded-answer example on 3523:195091 is unrelated placeholder
    // copy about a "GaN wall charger" left over from a different component) -- flagged in
    // Task 10's report rather than invented here.
    faqTitle: "Frequently asked questions",
    faqQuestion1: "What is noon One?",
    faqQuestion2: "How much does noon One cost?",
    faqQuestion3: "Is there a free trial? What does it include?",
    faqQuestion4: "What is included in free express delivery?",
    faqAnswerPending: "Answer copy not yet authored in Figma for this question.",
    // Bottom action bar (3136:26771 / 3136:26780).
    upgradeForFree: "Upgrade for free",
    freeUpgradeCaption: "Free upgrade for 30 days, then {price}/mo",
    // On-Scroll plan-picker example content (3136:26771's Figma placeholder rows -- not wired
    // to real scroll physics, see BottomActionBar.tsx's file comment).
    bottomBarDuoPlanLabel: "Duo plan · 2 members",
    bottomBarDuoPlanPerMember: "dhm19.99 per member",
    bottomBarFamilyPlanLabel: "Family Plan · 5 members",
    bottomBarFamilyPlanPerMember: "dhm9.99 per member",
    billedMonthly: "Billed monthly",
  },
  planSheet: {
    // Hero headline (3261:103278): "Try Family free" with "free" in success green,
    // then "for 30 days" on line 2. Identical on the duo-flow node 3261:104319 --
    // the headline does NOT change to "Try Duo free".
    heroTitlePrefix: "Try Family",
    heroTitleHighlight: "free",
    heroSubtitle: "for 30 days",
    // Plan selector cards (component set 3136:25329; header segments 3136:25126,
    // price content 3136:25143) -- marketing constants, verbatim.
    duoPlanTitle: "Duo plan",
    familyPlanTitle: "Family plan",
    duoMembers: "for 2 members",
    familyMembers: "for 5 members",
    duoPrice: "dhm39.99/m",
    duoPerMember: "dhm19.99 per member",
    familyPrice: "dhm49.99/m",
    familyPerMember: "dhm9.99 per member",
    // Share-offer header on 3161:30840 (family node). The duo node 3261:104319 shows
    // the OneLanding default "Not sure if this is for you?" for identical state --
    // Figma inconsistency; the family node's string is used (flagged in Task 12 report).
    shareOfferTitle: "Know someone who’d want in?",
    // FAQ list (3136:25850 instance overrides on 3161:30635; same 4 on the duo node).
    // Q1's Figma literal carries a trailing space -- trimmed. Answers are unauthored
    // in Figma (same gap as OneLanding's FAQ, see Task 10 report).
    faqQ1: "What happens on day 30?",
    faqQ2: "What’s included in the 30-day trial?",
    faqQ3: "How does inviting members work?",
    faqQ4: "What is noon One?",
    // Sticky CTA (M-StackedActionBar 3161:30859, annotated WIP in Figma).
    upgradeForFree: "Upgrade for free",
  },
  explorePlans: {
    // IMPORTANT (Task 13): every explorePlans figmaNodeId in the recipes
    // (3161:39741 et al.) has been DELETED from the Figma file -- the screen was
    // redesigned upstream. All strings below are verbatim from the LIVE
    // "03 · Plan selection" frames inside the sections named exactly after the
    // recipe ids (✅ manage-switch-individual 3792:22277/22429/22690,
    // ✅ manage-switch-duo-from-full-family 3792:23486, ✅ manage-switch-family-
    // from-duo 3890:23890, ...). The old tabs/radio-card design no longer exists
    // anywhere in the file.
    pageTitle: "Change plan",
    currentPlanTag: "Current plan",
    planTitleFamily: "Family plan",
    planTitleDuo: "Duo plan", // 3890:23890 (duo owner)
    // No live explorePlans node renders an individual current plan; string taken
    // from the design system's Plan info component (3458:128359, "Individual" variant).
    planTitleIndividual: "Individual plan",
    benefit1: "Unlimited free delivery",
    benefit2: "Get 10% off, 1st of every month",
    benefit3: "Share noon One with up to 5 members",
    autoRenews: "Auto renews on {date} at AED {price}", // mock shows literal "xx-xx-xx"/"24.99"
    exploreOtherPlans: "Explore other plans",
    // Offer cards ("Change Plan" instances) -- constant marketing content on every
    // live node regardless of flow/current plan.
    offer1Title: "One & OSN+ Monthly",
    offer1Price: "dhm29.99/month",
    offer1Was: "dhm24.99 + 39.99",
    offer1Chip: "2 for 1 subscription",
    offer2Title: "One Annual",
    offer2Price: "dhm11.99/month",
    offer2Sub: "dhm143.88 billed yearly",
    offer2Chip: "Save dhm156",
    offerBenefit1: "Unlimited free delivery",
    offerBenefit2: "Watch HBO, OSN+ originals on demand.",
    keepMyCurrentPlan: "Keep my current plan",
  },
  managePlan: {
    // Page header (3161:34160 owner / 3180:47438 invitee). Note: one owner node,
    // 3201:78358, titles the same screen "Manage your membership" -- Figma is
    // inconsistent across flows for identical state; majority owner title kept.
    pageTitleOwner: "Manage Family plan",
    pageTitleInvitee: "Manage your membership",
    // Current-plan card (3187:75676 owner / 3205:82048 invitee, verbatim).
    currentPlanTag: "Current plan",
    planTitleFamily: "Family plan",
    planTitleDuo: "Duo plan", // duo owner node 3201:79736
    planTitleInvitee: "{name}’s Family Plan", // 3205:81966, annotated "Family Plan - Fallback for name"
    benefit1: "Share noon One with up to 5 members", // unchanged even on the duo node 3201:79736
    benefit2: "Unlimited free delivery",
    benefit3: "Get 10% cashback, 1st of every month",
    // Renewal line variants. Figma's mocks disagree for identical seeds (e.g. 3207:42852
    // [freeTrial] shows the Auto-renews line while 3539:33433 [also freeTrial] shows the
    // free-upgrade line whose "39 days" matches the seed's trialDaysLeft) -- derived here
    // from plan.phase, the only state-grounded signal: freeTrial -> freeUpgradeRenews +
    // changeUpgrade, otherwise autoRenewsAtPrice + changePlan. The "Free upgrade ends on
    // {date}, renews at {price}" / "Cancel upgrade" pair seen ONLY on the cancel-upgrade
    // entry nodes (3208:49832/52536/53436) is not reproducible without flow branching.
    autoRenewsAtPrice: "Auto renews on {date} at {price}",
    freeUpgradeRenews: "Free upgrade for {days} days, renews on {date} at {price}",
    autoRenewsInvitee: "Auto renews on {date}", // 3205:81972 "Auto renews on 25th April 2026"
    changePlan: "Change plan",
    changeUpgrade: "Change upgrade", // 3539:33433
    // Manage Family list (3161:28282 + rows 3145:73535). The subtitle is Figma's own
    // literal placeholder text on every surveyed node -- rendered verbatim, flagged in
    // the Task 11 report rather than replaced with invented copy.
    manageFamilyTitle: "Manage Family",
    manageFamilySubtitle: "Subtitle comes here",
    ownerRow: "Owner • Saved dhm {amount}",
    memberRow: "Saved dhm {amount}",
    remove: "Remove",
    addAnotherMember: "Add another member", // 3207:42852 / 3208:49832 / 3208:60124
    seatsAvailable: "{n} more seats available",
    // Payment method card (3161:34222 + payment icon set 3161:28888).
    paymentMethodLabel: "Payment Method",
    paymentApplePay: "Apple Pay",
    // "Card" is the Figma payment-icon variant name (3161:29005) -- no ManagePlan node
    // shows a card-based payment row, so no authored screen string exists for it.
    paymentCard: "Card",
    changePaymentMethod: "Change payment method",
    // Cancel membership row (3161:34233). The trial note renders on trial + monthly nodes
    // (3207:42852, 3161:34160) and is absent on post-trial (3208:60124).
    cancelMembership: "Cancel membership",
    cancelMembershipTrialNote: "We will notify you 2 days before your trial ends",
    // Invitee leave row (3180:47511; Figma's literal has a trailing space, trimmed here).
    leaveFamily: "Leave Family plan",
    leaveFamilySubtitle: "You'll lose benefits upon leaving the Family plan",
  },
  // Task 16. TransitionScreen -- "03 · Confirmation" pattern, headline-only interstitial.
  transition: {
    // member-accepts-invite's only live step (3180:33497) -- verified via get_screenshot.
    // Verbatim; renders regardless of narrative fit (Figma is the source of truth even though
    // "upgrading your experience" reads oddly for a member joining someone else's plan rather
    // than upgrading their own -- not edited).
    upgradingYourExperience: "Upgrading your experience",
    // upgrade-family's transition step (upgrade.ts) has figmaNodeId: "" -- deferred to Task 19
    // ("resolve node in Task 19"). No verbatim string exists for it yet; this is a same-shape
    // placeholder so the screen renders sensibly in the meantime rather than blank, expected to
    // be replaced once that node is resolved.
    settingUpYourPlan: "Setting up your plan",
  },
  // Task 16. SuccessScreen -- checkmark-badge (member) and headline-only (owner) variants.
  success: {
    // member-accepts-invite's success step (3180:33506, "04 · Confirmation") -- checkmark badge
    // + congratulations copy, verified via get_screenshot. "{name}" is the invitee's own
    // name -- FinalFlowState has no field for "current user's own display name" (same gap
    // noted in OneLanding.tsx/FamilyHeader.tsx's file comments), so this is a template
    // substituted from MEMBER_POOL[0]'s given name in the component rather than invented
    // state (Figma's own literal reads "Siddarth", one letter off MEMBER_POOL's "Kumar
    // Siddharth" -- this prototype's own established spelling is used instead for internal
    // consistency, see SuccessScreen.tsx's file comment).
    congratulations: "Congratulations, {name}!",
    nowMemberOfNoonOne: "You are now a member of noon One",
    // upgrade-family (3161:31141) and upgrade-duo (3161:33072) success steps -- BOTH nodes are
    // "06 · Confirmation" headline-only interstitials in live Figma (verified via
    // get_screenshot: no checkmark, no subtitle, structurally a transition screen, not a
    // success screen) -- byte-identical copy on both flows, not "Setting up your Duo plan" on
    // the duo node. See SuccessScreen.tsx's file comment for the full Figma-drift writeup: the
    // checkmark-bearing content that visually matches what a "success" screen should look like
    // actually lives ONE STEP LATER in both flows, at "07 · Confirmation" (3161:31150 /
    // 3161:33081, also verified byte-identical between the two via get_screenshot) -- which
    // upgrade.ts currently types as `screen: "oneLanding"`, not `"success"`. Rendered verbatim
    // as its own headline-only success variant here since this task builds against the
    // CURRENTLY WIRED node, not a reassignment -- flagged for Task 19.
    settingUpYourFamilyPlan: "Setting up your Family plan",
    // The true checkmark content at "07 · Confirmation" (3161:31150 / 3161:33081) -- not
    // currently wired to the `success` screen id (see above), kept here verbatim (verified via
    // get_screenshot on both nodes) so it's ready the moment Task 19 corrects the wiring.
    yourFreeUpgradeIsOn: "Your free upgrade is on",
    startAddingLovedOnes: "Start adding your loved ones to the Family plan",
  },
  cancelSavings: {},
  cancelReason: {},
  // Task 14. PaymentSheet -- verified against both flow-variant nodes (3261:103309
  // family, 3187:70138 duo; "Free Upgrade" body 3187:67673/I3261:103880 in-context) --
  // identical composition/copy on both, only the plan name/price differ (state-derived).
  // "40 days"/"10 remaining"/"30-day" are Figma marketing literals describing the promo
  // mechanic (10 rolled-over days + a 30-day upgrade), not state-derived: neither seed
  // used by upgrade.ts (seeds.activeIndividual) carries a trialDaysLeft to substitute,
  // and confirmUpgrade (which sets trialDaysLeft: 30) hasn't fired yet at this step --
  // stateAtStep only applies actions from steps BEFORE the current one. Kept as flat
  // constants rather than fake-templated against a field that doesn't exist yet.
  paymentSheet: {
    freeUpgradeTitle: "FREE upgrade for 40 days",
    freeUpgradeSubtitle: "We've added the 10 remaining days from your current plan to your 30-day upgrade",
    todayLabel: "Today",
    todayNote: "No extra charge. Cancel anytime",
    todayCharge: "+dhm0.00",
    fromDateLabel: "From July 1",
    // GAP (flagged in Task 14 report): Figma's literal text is a template whose
    // "[plan name] [current plan price]" tokens are never bound to a Figma variable
    // (confirmed on both 3187:67673 and its in-context instance) -- AND the value
    // isn't recoverable from FinalFlowState either: by the time this overlay's step
    // renders, the preceding step's `selectPlan` action has already overwritten
    // state.plan to the TARGET plan (stateAtStep applies every prior step's action),
    // so there is no "current/previous plan" left in state to substitute. Rendered
    // verbatim per the ground rule against inventing unauthored copy.
    fromDateNote: "{plan} plan price. Billed monthly",
    billingTooltip: "During the 40-day upgrade, your billing continues as usual at [plan name] [current plan price]/mo — the {plan} plan upgrade is added for free",
    payWith: "Pay with",
  },
  // Task 14. ReviewConfirmSheet -- base "Review & Confirm" component 3201:77070 (switch/
  // upgrade copy flavor, still live) + 5 of 6 named cancel-flow instances (3207:44420,
  // 3208:50263, 3208:52967, 3208:60394, 3208:61281 -- byte-identical copy on all 5;
  // 3208:54026 carries a Figma-authored typo, "upgradw", not reproduced here). All 4
  // manage.ts switch-flow node IDs (3201:77113, 3161:44599, 3274:32243, 3201:80092)
  // are stale/redesigned -- see Task 14 report -- so the switch copy below is sourced
  // from the base component itself, the only surviving instance of that flavor.
  reviewConfirmSheet: {
    title: "Review and confirm",
    switchBody: "Your plan will renew to {plan} plan at {price} every month, beginning {date}. You can add one member to your noon One plan after switching.",
    cancelBody: "Your plan will renew at {price} every month, beginning {date} after the free upgrade ends. All members will lose access to noon One.",
    payWith: "Pay with",
    confirm: "Confirm",
  },
  // Task 15. InviteSheet -- these keys were referenced by InviteSheet.tsx (built and
  // left uncommitted by a prior task) but never actually added to this object, which
  // meant `copy.inviteSheet.title` etc. resolved to `undefined` at runtime (a real bug,
  // not just a type gap) -- fixed here without touching InviteSheet.tsx itself, per this
  // task's brief to leave that file alone. Verified against the scoped M-BottomSheet
  // instance behind each of its 2 host nodes (3187:72624 family / 3187:73080 duo).
  // GAP, flagged rather than silently resolved: the two instances are NOT byte-identical
  // -- the family node reads "Add your loved ones to the Family plan" / "4 more seats
  // available", while the duo node reads "Add a loved one to your Duo plan" (2 lines) /
  // "1 seats available" (also a Figma grammar slip -- singular "seat" would be correct
  // for a 1-seat count, not authored that way). InviteSheet.tsx has no plan-based
  // branching (single `copy.inviteSheet.title/subtitle`, no duo variant), so the family
  // copy is used as the single source here -- the duo flow will show the family sheet's
  // title/seat-count text where Figma's own duo node shows different text. Not fixed by
  // adding branching, since that would mean modifying InviteSheet.tsx itself, out of
  // scope for this task -- flagged for whoever picks up InviteSheet.tsx next.
  inviteSheet: {
    title: "Add your loved ones to the Family plan",
    subtitle: "They'll enjoy free delivery on everything",
    shareInvite: "Share invite",
    // No "copied" confirmation state exists anywhere in Figma for the invite-link field
    // (a single non-variant Input instance, copy-icon right-slot only) -- this is a
    // genuinely unauthored micro-string, kept as a minimal, generic confirmation rather
    // than inventing elaborate copy for a state Figma never designed.
    copied: "Copied",
    footerNote: "Invitee remains on your noon One plan until removed.",
  },
  // Task 15. ShareSheet -- no Figma grounding exists for this overlay at all (confirmed:
  // upgrade.ts's only call site carries `figmaNodeId: ""`/"resolve node in Task 19", and
  // no "share sheet"/"ios share" sibling frame exists near either InviteSheet host node).
  // These 2 keys are the minimal generic iOS-share-sheet-mock copy ShareSheet.tsx already
  // renders (built and left uncommitted by a prior task) -- not sourced from Figma since
  // there is nothing to source from; kept short and platform-generic rather than invented
  // marketing copy.
  shareSheet: {
    title: "Share",
    cancel: "Cancel",
  },
  // Task 15. JoinFamilySheet -- join-prompt body verified verbatim against the base
  // component 3180:27794 ("Join Family") AND all 3 live pre-error instances that mount
  // it (3205:82330, 3207:12793, 3207:16915 -- byte-identical on all 3, including the
  // owner name "Rahul" and the leading space Figma's own heading literal carries before
  // "Join" -- trimmed here since it's a text-layer artifact, not intentional copy).
  // The 3 error variants are the SAME Figma "Error Message" component (3187:74761)
  // instanced 3 times with different title/body overrides -- confirmed by inspecting the
  // scoped M-BottomSheet instance behind each error's host screen (3205:87906 /
  // 3207:16315 / 3207:20437), not the bare 3187:74761 component (which happens to carry
  // an unrelated "Remove <name>?" override when queried directly -- that's node 3205
  // -- the removeMemberSheet's own use of this same shared component, Task 18 scope, not
  // a sign this component is mis-scoped here).
  joinFamilySheet: {
    heading: "Join Rahul's family",
    subtitle: "Enjoy free delivery on everything, any time",
    benefit1Title: "Unlimited Free Delivery",
    benefit1Subtitle: "On food, groceries, & shopping",
    benefit2Title: "Save 10%, 1st of every month",
    benefit2Subtitle: "Big savings, every month",
    benefit3Title: "Orders & accounts stay private",
    benefit3Subtitle: "Share noon One, not your order history",
    cta: "Join Family plan for free",
    footerNote: "Your noon One stays active until canceled or removed.",
    // Error variants -- verbatim per joinError, from 3205:84526 / 3207:14557 / 3207:18679.
    alreadyInFamilyTitle: "You're already in a Family plan",
    alreadyInFamilyBody: "To join this one, you'll need to leave your current plan first",
    alreadySubscribedTitle: "You're already subscribed",
    alreadySubscribedBody: "To join this one, you'll need to cancel your current plan first",
    differentCountryTitle: "Join from the same country as the plan owner",
    differentCountryBody: "To join the plan, you'll need an account in their country. Benefits work only in that country",
    errorCta: "Got it",
  },
  // `joinErrorSheet` is a distinct OverlayId (registry.tsx registers the SAME
  // JoinFamilySheet component under both `joinFamilySheet` and `joinErrorSheet`, per the
  // task brief), but copy.ts is keyed by OverlayId, not by component -- so this object
  // needs its own entry to satisfy the type even though JoinFamilySheet.tsx always reads
  // from `copy.joinFamilySheet.*` regardless of which overlay id it's mounted under (see
  // that component's own file comment). Left empty rather than duplicating the
  // joinFamilySheet block, since nothing ever reads copy.joinErrorSheet.* at runtime.
  joinErrorSheet: {},
  // Task 15. MemberJoinedToast -- Figma "M-Toast" component (2240:14174, Dark variant),
  // instance 3161:31739, verified live inside the "upgrade-family" flow's landing screen
  // (3161:31576 -- NOT the recipe step's own figmaNodeId 3161:31758/"13 · First member
  // joined", which is the byte-identical NEXT screen sans toast; the toast is anchored to
  // the screen BEFORE it visually settles, matching upgrade.ts's step order: memberJoined
  // action fires on 3161:31576, then the very next step, 3161:31758, carries the
  // memberJoinedToast overlay -- so mounting this copy on that overlay step, on top of
  // oneLanding, reproduces the same screen+toast composition Figma shows one step earlier).
  // Verbatim Figma text is "Kumar Siddharth has joined your family" -- templated here on
  // {name} since seeds.ts/upgrade.ts always join "Kumar Siddharth" as the first member, but
  // the underlying state field (state.invite.lastJoined, set by the memberJoined reducer
  // case) is the real driver, not a hardcoded name.
  memberJoinedToast: {
    joined: "{name} has joined your family",
  },
};
