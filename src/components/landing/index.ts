import dynamic from "next/dynamic";

export const components = {
  bento: dynamic(() => import("./Bento")),
  call_to_action: dynamic(() => import("./CallToAction")),
  hero: dynamic(() => import("./Hero")),
  rich_text: dynamic(() => import("./RichText")),
  showcase: dynamic(() => import("./Showcase")),
};
