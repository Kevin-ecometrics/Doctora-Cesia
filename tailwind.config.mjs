export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        glorich: ['"Glorich"', "sans-serif"],
        binomaBold: ['"BinomaTrialBold"', "sans-serif"], // Agrega esta línea
        binomaRegular: ['"BinomaTrialRegular"', "sans-serif"], // Y esta línea
        blisstwine: ['"Blisstwin"', "sans-serif"], // Y esta línea
      },
    },
  },
  plugins: [],
};
