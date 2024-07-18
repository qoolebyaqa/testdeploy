export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {      
      colors: {
        "lombard-main-blue": "#304F74",
        "lombard-btn-green": "#148F00",
        "lombard-btn-red": "#C31328",
        "lombard-btn-yellow": "#D4A80A",
        "lombard-btn-grey": "#D2DBE1",
        "lombard-borders-grey": "#D2DBE1",
        "lombard-text-black": "#3B3B3B",
        "lombard-bg-inactive-grey": "#EFF2F4",
        "lombard-table-green": "#E4F5E4"
      }
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}