/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
    colors: {
            backgroundColor: '#333333',
            boxColor: '434343',
            primaryColor: '#ffffff',
            buttonText: '#000000',
            placeholder: '#E1E1E1',
            negative: '#DD4B4B',
            positive: '#45AA34'
        },
        fontFamily: {
            inter: ["Inter", "ui-monospace", "SFMono-Regular"]
        },
        fontSize: {
            title1: "2.0rem",
            title2: "1.5rem",
            headline: "1rem",
            headline2: "1rem",
            headline3: "0.875rem",
            placeholder: "1rem",
        },
            fontWeight: {
            bold: "700",
            semibold: "600",
            medium: "500",
            regular: "400",
        },
        extend: {},
    },
        plugins: [],
}