/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: "#1E1F26", // dark
        accent: "#FF6F61", // coral
        accentAlt: "#7F5AF0", // purple
        light: "#F8F9FA", // light gray instead of pure white
        lightGray: "#F1F3F5", // slightly darker gray for contrast
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
