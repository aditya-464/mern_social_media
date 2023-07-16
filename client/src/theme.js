import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        primaryLight: "#dfdddd",
        secondaryLight: "white",
        lightHover: "#d2cdcd",
        primaryDark: "#181818",
        secondaryDark: "#353535",
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
    breakpoints:{
        "3xl" : "1900px"
    }
});

export default theme;