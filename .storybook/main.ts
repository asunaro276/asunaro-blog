import type { StorybookConfig } from "@storybook-astro/framework";
import { react } from "@storybook-astro/framework/integrations";

const config: StorybookConfig = {
  framework: {
    name: "@storybook-astro/framework",
    options: {
      renderMode: "static",
      integrations: [react()],
    },
  },
  stories: ["../src/presentation/**/*.stories.{tsx,jsx,astro}"],
  addons: ["@chromatic-com/storybook"],
  staticDirs: ["../public"],
  viteFinal: (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        // Vite 6 / Astro 5 ではネイティブで tsconfig のパス解決をサポートしています
        // @ts-ignore - Storybook の ViteConfig 型定義に未反映の場合があるため
        tsconfigPaths: true,
      },
    };
  },
};

export default config;
