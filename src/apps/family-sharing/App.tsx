import "./index.css";
import FinalFlowsApp from "./shell/FinalFlowsApp";

/**
 * Family Sharing — the 21 dev-ready noon One family-plan flows, ported from
 * the florence prototype's `src/final/` module.
 *
 * Unlike florence (which wrapped everything in a desktop 375×812 phone frame
 * with SmoothCorners + splash), this surface renders full-viewport mobile web
 * like the other apps here. FinalFlowsApp owns everything else: the flow
 * picker, the step runner (framer-motion slide between intra-flow steps), the
 * debug pill, and `?flow=<id>&step=<n>` query-param deep links (query-only via
 * history.replaceState, so it coexists with react-router's /family-sharing/*
 * path routing).
 */
export default function App() {
  return (
    <div className="h-full w-full">
      <FinalFlowsApp />
    </div>
  );
}
