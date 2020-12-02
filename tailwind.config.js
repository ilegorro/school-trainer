module.exports = {
  purge: {
    mode: 'layers',
    content: ['./public/*.html', './src/**/*.vue']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        '1_1_1': '1fr 1fr 1fr'
      }
    }
  },
  variants: {
    backgroundColor: ['hover', 'focus', 'active'],
    fontSize: ['hover'],
    translate: ['hover', 'focus', 'active', 'group-hover'],
    outline: ['hover', 'focus', 'active'],
    extend: {}
  },
  plugins: []
}
