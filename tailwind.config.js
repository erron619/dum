module.exports = {
    mode: "jit",
    content: [
        "./admin/dum/**/*.js",
        "./admin/ejs/**/*.ejs",
        "./admin/pages/**/*.ejs",
        "./admin/scripts.js",
    ],
    darkMode: "class",
    safelist: [],
    theme: {
        colors: {
            white: "#FFF",
            black: "#000",
            neutral: {
                0: "#f8fafc",
                1: "#f1f5f9",
                2: "#e2e8f0",
                3: "#cbd5e1",
                4: "#94a3b8",
                5: "#64748b",
                6: "#475569",
                7: "#334155",
                8: "#1e293b",
                9: "#0f172a",
            },
            primary: {
                1: "#2A85FF",
                2: "#83BF6E",
                3: "#FF6A55",
                4: "#8E59FF",
            },
            secondary: {
                1: "#FFBC99",
                2: "#CABDFF",
                3: "#B1E5FC",
                4: "#B5E4CA",
                5: "#FFD88D",
            },
            transparent: "transparent",
            inherite   : "inherite",
        },
        fontFamily: {
            Inter: ["Inter", "sans-serif"],
        },
        fontWeight: {
            regular: "400",
            medium: "500",
            semiBold: "600",
            bold: "700",
        },
        extend: {
            container: {
                center: true,
                padding: "1rem"
            },
            borderWidth: {
                1: "1px",
            },
            opacity: {
                "2": "0.02",
            },
            zIndex: {
                max: 99,
                layerFrontScreen: 100,
                layerToast: 101,
                layerDropdown: 102,
                layerTooltip: 103,
            },
        }
    },
    plugins: [],
};