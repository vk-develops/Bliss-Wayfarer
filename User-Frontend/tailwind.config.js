/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}",
        "./Screens/**/*.{js,jsx,ts,tsx}",
        "./Components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "purple--50": "#f3f1ff",
                "purple--100": "#ebe5ff",
                "purple--200": "#d9ceff",
                "purple--300": "#bea6ff",
                "purple--400": "#9f75ff",
                "purple--500": "#843dff",
                "purple--600": "#7916ff",
                "purple--700": "#6b04fd",
                "purple--800": "#5a03d5",
                "purple--900": "#4b05ad",
                "purple--950": "#2c0076",
                "bgColor-light": "#fafafa",
                "bgColor-dark": "#050505",
                "headerColor-light": "#1e1e1e",
                "paraColor-light": "#5e5e5e",
                white: "#ffffff",
            },
        },
    },
    plugins: [],
};
