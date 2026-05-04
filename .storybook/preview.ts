import type { Preview } from "@storybook/react";
import "../src/presentation/styles/tokens.scss";
import "../src/presentation/styles/globals.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
