/** @type {import("@trivago/prettier-plugin-sort-imports").PrettierConfig & import("prettier-plugin-tailwindcss").PluginOptions} */
const config = {
  bracketSameLine: true,
  printWidth: 120,
  trailingComma: "es5",
  importOrder: ["^server-only$", "<BUILTIN_MODULES>", "<THIRD_PARTY_MODULES>", "^~/(.*)$", "^[./]"],
  importOrderCaseInsensitive: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
};

export default config;
