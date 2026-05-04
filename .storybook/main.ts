import type { StorybookConfig } from "@storybook-astro/framework";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  framework: {
    name: "@storybook-astro/framework",
    options: {
      renderMode: "static",
    },
  },
  stories: ["../src/presentation/**/*.stories.{tsx,jsx,astro}"],
  addons: ["@chromatic-com/storybook"],
  staticDirs: ["../public"],
  viteFinal: (config) => {
    return {
      ...config,
      plugins: [...(config.plugins || []), tsconfigPaths()],
    };
  },
};

export default config;
