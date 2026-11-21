const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier/flat');

module.exports = defineConfig([
  globalIgnores(['node_modules/', '.expo/', 'dist/', 'coverage/']),
  expoConfig,
  // Disables ESLint rules that conflict with Prettier. Keep this last.
  prettierConfig,
]);
