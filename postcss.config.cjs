// Keep PostCSS config intentionally minimal. Tailwind is applied via the
// Vite plugin (`@tailwindcss/vite`) so we don't need to register Tailwind
// or other PostCSS plugins here. Export an empty config to avoid runtime
// errors when optional plugins (like `autoprefixer`) are not installed.
module.exports = {};
