import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        primaryLight : "white",
        secondaryLight : "#e0e0e0",
        primaryDark : "#010a12",
        secondaryDark : "#0e1218",
        pinkish : "#DB005B",
        orangish : "#F79327",
        yellowish : "#FFE569"
    },
    fontSizes : {
        h1 : "60px",
        h2 : "44px",
        h3 : "32px",
        h4 : "24px",
        h5 : "20px",
        h6 : "16px",
    }
});

export default theme;