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
  noonHome: {},
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
  transition: {},
  success: {},
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
};
