import type { StorybookConfig } from "@storybook-astro/framework";

const config: StorybookConfig = {
  framework: "@storybook-astro/framework",
  stories: ["../src/presentation/**/*.stories.{tsx,jsx,astro}"],
  addons: ["@chromatic-com/storybook"],
  viteFinal: (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        tsconfigPaths: true,
      },
    };
  },
};

export default config;
