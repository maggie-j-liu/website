const { normalizeConfig } = require('next/dist/next-server/server/config-shared');
const colors = require('tailwindcss/colors');
module.exports = {
    purge: {
        content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        minWidth: {
            '0': '0',
            '25': '25%',
            '50': '50%',
            '75': '75%',
            'full': '100%',
        },
        extend: {
            colors: {
                orange: colors.orange,
                teal: colors.teal,
                cyan: colors.cyan,
                lightblue: colors.lightBlue,
                home: {
                    primary: colors.blue,
                    secondary: colors.indigo,
                    contrast: colors.fuchsia,
                    gray: colors.blueGray,
                    main: {
                        light: colors.white,
                        dark: colors.blueGray[900],
                    }
                },
                blog: {
                    primary: colors.cyan,
                    secondary: colors.teal,
                    contrast: colors.amber,
                    gray: colors.gray,
                    header: colors.cyan,
                    main: {
                        light: colors.white,
                        dark: colors.blueGray[900],
                    }
                },
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: theme('colors.blog.gray.700'),
                        h1: {
                            color: theme('colors.blog.header.800'),
                            fontWeight: 'bold',
                        },
                        h2: {
                            color: theme('colors.blog.header.800'),
                            fontWeight: 'bold',
                            fontSize: theme('fontSize.3xl[0]'),
                        },
                        h3: {
                            color: theme('colors.blog.header.700'),
                            fontWeight: '600',
                            fontSize: theme('fontSize.2xl[0]'),
                        },
                        h4: {
                            color: theme('colors.blog.header.700'),
                            fontWeight: '600',
                            fontSize: theme('fontSize.xl[0]'),
                        },
                        h5: {
                            color: theme('colors.blog.header.700'),
                            fontWeight: '500',
                            fontSize: theme('fontSize.lg[0]'),
                        },
                        h6: {
                            color: theme('colors.blog.header.700'),
                            fontWeight: '500',
                            fontSize: theme('fontSize.base[0]'),
                        },
                        code: {
                            fontWeight: 'inherit',
                        },
                        'code::before': {
                            content: 'none',
                        },
                        'code::after': {
                            content: 'none',
                        },
                        a: {
                            color: theme('colors.blog.secondary.600'),
                            textDecoration: 'none',
                            fontWeight: 600,
                            '&:hover': {
                                textDecoration: 'underline',
                                color: theme('colors.blog.contrast.500'),
                            },
                        },
                        'a code': {
                            color: 'inherit',
                        },
                        thead: {
                            color: 'inherit',
                        },
                        'ol > li::before': {
                            color: theme('colors.blog.contrast.600'),
                        },
                        'ul > li::before': {
                            backgroundColor: theme('colors.blog.contrast.600'),
                        }
                    },
                },
                dark: {
                    css: {
                        h1: {
                            color: theme('colors.blog.header.300'),
                        },
                        h2: {
                            color: theme('colors.blog.header.300'),
                        },
                        h3: {
                            color: theme('colors.blog.header.200'),
                        },
                        h4: {
                            color: theme('colors.blog.header.200'),
                        },
                        h5: {
                            color: theme('colors.blog.header.100'),
                        },
                        h6: {
                            color: theme('colors.blog.header.100'),
                        },
                        code: {
                            color: 'inherit',
                            fontWeight: 'inherit',
                        },
                        a: {
                            color: theme('colors.blog.secondary.400'),
                            textDecoration: 'none',
                            fontWeight: 600,
                            '&:hover': {
                                textDecoration: 'underline',
                                color: theme('colors.blog.contrast.300'),
                            },
                        },
                        'a code': {
                            color: 'inherit',
                        },
                        thead: {
                            color: 'inherit',
                        },
                        tr: {
                            borderColor: theme('colors.gray.400')
                        },
                        'ol > li::before': {
                            color: theme('colors.blog.contrast.600'),
                        },
                        'ul > li::before': {
                            backgroundColor: theme('colors.blog.constrast.600'),
                        },
                    },
                },
            }),
        },
    },
    variants: {
        typography: ['dark'],
        extend: {},
    },
    plugins: [require('@tailwindcss/typography')],
}
