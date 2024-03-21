import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercelStatic from "@astrojs/vercel/static";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import starlight from "@astrojs/starlight";

import cookieconsent from "@jop-software/astro-cookieconsent";
import jopSoftwarecookieconsent from "@jop-software/astro-cookieconsent";

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: ["en", "lv"],
    prefixDefaultLocale: false,
  },
  // https://docs.astro.build/en/guides/images/#authorizing-remote-images
  site: "https://screwfast.uk",
  image: {
    domains: ["images.unsplash.com"],
  },
  prefetch: true,
  integrations: [
    tailwind(),
    sitemap(),
    starlight({
      title: "ScrewFast Docs",
      defaultLocale: "lv",
      locales: {
        en: {
          label: "English",
          lang: "en",
        },
        lv: {
          label: "Latviešu",
          lang: "lv",
        },
      },
      sidebar: [
        {
          label: "Quick Start Guides",
          autogenerate: {
            directory: "guides",
          },
        },
        {
          label: "Tools & Equipment",
          autogenerate: {
            directory: "tools",
          },
        },
        {
          label: "Construction Services",
          autogenerate: {
            directory: "construction",
          },
        },
        {
          label: "Advanced Topics",
          autogenerate: {
            directory: "advanced",
          },
        },
      ],
      social: {
        github: "https://github.com/mearashadowfax/ScrewFast",
      },
      disable404Route: true,
      customCss: ["./src/styles/starlight.css"],
      favicon: "/favicon.ico",
      components: {
        SiteTitle: "./src/components/ui/SiteTitle.astro",
      },
    }),
    compressor({
      gzip: false,
      brotli: true,
    }),
    jopSoftwarecookieconsent(),
    cookieconsent({
      guiOptions: {
        consentModal: {
          layout: "cloud",
          position: "bottom center",
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: {
          layout: "box",
          position: "right",
          equalWeightButtons: true,
          flipButtons: false,
        },
      },
      // ...
    }),
  ],
  output: "static",
  experimental: {
    clientPrerender: true,
    directRenderScript: true,
  },
  adapter: vercelStatic(),
});