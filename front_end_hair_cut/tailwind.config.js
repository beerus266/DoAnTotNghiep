module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      s: '576px',
      sm: '640px',
      md: '768px',
      l: '992px',
      //lg: '1024px',
      xl: '1128px',
    },
    extend: {
      keyframes: {
        bounceRight: {
          '0%': {
            transform: 'translateX(150%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        }, 
        shake: {
          '10%, 90%': {
            transform: 'translateX(-1px)',
          },
          '20%, 80%': {
            transform: 'translate(2px)',
          },
          '30%, 50%, 70%': {
            transform: 'translate(-4px)'
          },
          '40%, 60%': {
            transform: 'translate(4px)'
          }
        }
      },
      animation: {
        'show-alert': 'bounceRight .7s ease',
        'shake': 'shake .8s cubic-bezier(.36,.07,.19,.97)'
      }
    },
    colors: {
      gray: {
        light: '#F2F2F6',
        DEFAULT: '#DDDDDD',
        dark: '#3A3A3A',
        lightest: '#F6F6F9',
        lighting: '#F9F8F8',
        original: '#72849C',
        cm: '#888C9D',
        neutrals: '#8D8383',
        n300: '#F5F2F2',
        n400: '#E9E6E6',
        n500: '#DCD7D7',
        n600: '#C9C2C2',
        n700: '#8D8383',
        n800: '#2F2826',
      },
      red: {
        DEFAULT: "#FF5656",
        dark: "#F42D39",
        neutral: '#DC3545'
      },
      blue: {
        DEFAULT: '#6170F7',
        dark: '#4C5AA2',
      },
      white: {
        DEFAULT: '#fff'
      },
      black: {
        DEFAULT: "#2F2826",
      },
      purple: {
        '500': '#9C27B0',
        deep: '#570861'
      },
      pink: {
        '500': '#E91E63',
        deep: '#FF1493'
      },
      yellow: {
        neutral: '#FFC107'
      },
      blue: {
        DEFAULT: '#6170F7',
        neutral: '#007bff'
      },
      green: {
        DEFAULT: '#70BF54',
        dark: '#377D3C',
        g100: '#F5FBF8',
        g200: '#BBF7D0',
        g300: '#86EFAC',
        g400: '#35B584',
        g500: '#317159',
        neutral: '#28A745'
      },
      orange: {
        DEFAULT: '#FFAA45',
        dark: '#EC9B3A',
        honey: '#FDA94F',
        blush: "#FFF2E3",
        carrot: "#F37B6A",
        y500: '#B14B00',
        y400: '#FFBB38',
        y300: '#FFD079',
        y100: '#FFFAF1'
      },
      text: {
        light: '#A7ABB9',
        DEFAULT: '#2F2826',
        red: '#DF1642',
        white: '#FFFFFF',
        green: '#70BF54',
        contrast: '#777',
        cp: '#6c6c6c'
      },
    }
  },
  plugins: [],
}
