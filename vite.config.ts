import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": ["vp check --fix", "pnpm lint:spell"],
    "*.md": "markdownlint --ignore-path .gitignore",
    "*.css": "stylelint --ignore-path .gitignore",
  },

  fmt: {},

  lint: {
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
    ],

    categories: {
      correctness: "error",
      suspicious: "warn",
      pedantic: "warn",
      perf: "warn",
    },

    rules: {
      "vite-plus/prefer-vite-plus-imports": "error",

      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
        },
      ],

      complexity: ["warn", { max: 10, variant: "classic" }],
    },

    options: {
      typeAware: true,
      typeCheck: true,
    },
  },

  run: {
    cache: true,
  },
});
