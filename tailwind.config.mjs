/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Sober color palette: light background, anthracite text, single accent color
        primary: {
          DEFAULT: '#1f2937', // Anthracite for text
          dark: '#111827',
          light: '#374151',
        },
      },
      maxWidth: {
        'content': '1040px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

