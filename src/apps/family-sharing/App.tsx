import "./index.css";
import SmoothCorners from "@ui/SmoothCorners";
import FinalFlowsApp from "./shell/FinalFlowsApp";

/**
 * Family Sharing — the 21 dev-ready noon One family-plan flows, ported from
 * the florence prototype's `src/final/` module.
 *
 * Fixed 375×812 frame, same convention as one-flows/App.tsx (SmoothCorners
 * squircle clip, centred edge-to-edge) -- for reviewing on a desktop browser
 * this reads as one stable phone screen regardless of window size, rather
 * than mobile content stretched across whatever width the browser happens
 * to be. FinalFlowsApp owns everything inside the frame: the flow picker,
 * the step runner (framer-motion slide between intra-flow steps), the debug
 * pill, and `?flow=<id>&step=<n>` query-param deep links (query-only via
 * history.replaceState, so it coexists with react-router's /family-sharing/*
 * path routing).
 */
export default function App() {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-auto bg-[#e5e5ea] py-6">
      <SmoothCorners radius={20}>
        <div className="relative h-[812px] w-[375px] overflow-hidden">
          <FinalFlowsApp />
        </div>
      </SmoothCorners>
    </div>
  );
}
