import { defineConfig, squooshImageService } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  image: {
    service: squooshImageService()
  },
  site: "https://cesiaborjon.com/",
  integrations: [react(), tailwind(), partytown(), sitemap(), robotsTxt()]
});