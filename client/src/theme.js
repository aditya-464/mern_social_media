import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        // primaryLight : "white",
        // secondaryLight : "#e7e7e7",
        primaryLight: "#e7e7e7",
        secondaryLight: "white",
        lightHover: "#d2cdcd",
        primaryDark: "#353535",
        secondaryDark: "#3d3d3d",
        darkHover: "#505050",
        pinkish: "#DB005B",
        orangish: "#F79327",
        yellowish: "#FFE569"
    },
    fontSizes: {
        h1: "60px",
        h2: "44px",
        h3: "32px",
        h4: "24px",
        h5: "20px",
        h6: "16px",
    },
});

export default theme;