/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        dingo: {
          violet: "#753BBD",
          orange: "#FF9425",
          yellow: "#EADA24",
          red: "#DA291C",
          pastel: "#A5B3CE",
          beige: "#CEB47E",
          blue: "#1E22AA",
          green: "#64A70B",
          olive: "#ABAD23",
          lime: "#78BE21",
          ochre: "#CBA052",
          mist: "#BBC7D6"
        }
      },
      fontFamily: {
        title: ["Griffy", "serif"],
        body: ["Atma", "Trebuchet MS", "Comic Sans MS", "cursive"]
      },
      boxShadow: {
        glow: "0 0 0 3px #EADA24, 0 0 18px #1E22AA, 8px 8px 0 #DA291C"
      },
      animation: {
        wobble: "wobble 1.4s ease-in-out infinite",
        floaty: "floaty 5s ease-in-out infinite",
        blink: "blink 4s infinite",
        dance: "dance .58s ease-in-out infinite"
      },
      keyframes: {
        wobble: {
          "0%,100%": { transform: "rotate(-1deg) scale(1)" },
          "35%": { transform: "rotate(2deg) scale(1.025)" },
          "70%": { transform: "rotate(-2deg) scale(.99)" }
        },
        floaty: {
          "0%,100%": { transform: "translate3d(0,0,0) rotate(-2deg)" },
          "50%": { transform: "translate3d(0,-18px,0) rotate(3deg)" }
        },
        blink: {
          "0%, 88%, 92%, 100%": { transform: "scaleY(1)" },
          "90%": { transform: "scaleY(.08)" }
        },
        dance: {
          "0%,100%": { transform: "translateY(0) rotate(-5deg)" },
          "50%": { transform: "translateY(-16px) rotate(6deg)" }
        }
      }
    }
  },
  plugins: []
};
