/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ivory: {
                    DEFAULT: '#fdfaf5',
                    dark: '#f4f1ea',
                    surface: '#fffffe',
                },
                navy: {
                    DEFAULT: '#1a2236',
                    light: '#2d3748',
                    accent: '#3e4e6e',
                },
                gold: {
                    DEFAULT: '#c5a059',
                    light: '#e5c185',
                    dark: '#a68041',
                    bg: '#fbf7ed',
                },
                accent: {
                    blue: '#4a6fa5',
                    orange: '#d97706',
                    purple: '#7c3aed',
                    green: '#059669',
                },
                border: {
                    DEFAULT: '#e4ddd0',
                    light: '#f2ece4',
                }
            },
            fontFamily: {
                playfair: ['"Playfair Display"', 'serif'],
                mono: ['"IBM Plex Mono"', 'monospace'],
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            boxShadow: {
                'premium': '0 4px 20px -2px rgba(26, 34, 54, 0.08), 0 2px 8px -1px rgba(26, 34, 54, 0.04)',
                'premium-hover': '0 20px 40px -4px rgba(26, 34, 54, 0.12), 0 8px 16px -2px rgba(26, 34, 54, 0.06)',
                'glass': 'inset 0 0 0 1px rgba(255, 255, 255, 0.4)',
            }
        },
    },
    plugins: [],
}
