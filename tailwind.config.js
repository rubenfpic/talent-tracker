/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: [(() => {
    const plugin = require('daisyui');
    return plugin.default || plugin;
  })()],
  daisyui: {
    themes: ['corporate', 'aqua', 'forest', 'dark', 'business']
  }
};
