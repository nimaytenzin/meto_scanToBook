module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'nunito': ['nunito', 'sans-serif']
    },
    
    extend: {
      colors: {
        'metoPrimary':{
          100:'#d4dce1',
          200:'#bfcad1',
          300:'#aab8c2',
          400:'#95a7b3',
          500:'#7f95a4',
          600:'#6a8395',
          700:'#557185',
          800:'#3f6076',
          900:'#2a4e67'
        },
        'metoContrast':'#C93A38'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide')
    
  ],
}
