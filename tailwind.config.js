const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '2rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2.5rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Lexend', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              color: theme("colors.red.700"),
              backgroundColor: theme('colors.stone.650'),
              wordWrap: 'break-word',
              boxDecorationBreak: 'clone',
              padding: '.1rem .3rem .2rem',
              borderRadius: '.2rem',
            },
          },
        },
        dark: {
          css: {
            code: { 
              color: theme("colors.amber.100"),
              backgroundColor: theme('colors.zinc.850'), 
              wordWrap: 'break-word',
              boxDecorationBreak: 'clone',
              padding: '.1rem .3rem .2rem',
              borderRadius: '.2rem',
            },
          },
        },
        light: {
          css: {
            code: { 
              color: theme("colors.red.700"),
              backgroundColor: theme('colors.zinc.800'), 
              wordWrap: 'break-word',
              boxDecorationBreak: 'clone',
              padding: '.1rem .3rem .2rem',
              borderRadius: '.2rem',
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ['light','dark'],
    },
  },
  plugins: [
    require(`@tailwindcss/typography`),
    plugin(function ({addVariant}) {
      addVariant( 
        'prose-inline-code',
        '&.prose :where(:not(pre)>code):not(:where([class~="not-prose"] *))'
      );
    })
  ]
}
