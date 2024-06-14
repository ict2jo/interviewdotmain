'use client';
import { createTheme } from "@mui/material";

const theme = createTheme({
    palette:{
        primary:{
            main:"#1400FF",
            light:"#ECF4FF",
            dark:"#1000C6",
            contrastText:"#fff"
        },
    },
    typography: {
        fontFamily: 'GmarketSansMedium',
    },
    components:{
        MuiCssBaseline: {
            styleOverrides: `
            @font-face {
                font-family: 'GmarketSansMedium';
                src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
                font-weight: normal;
                font-style: normal;
            }`,
        },
        MuiButton:{
            defaultProps:{
                size:"large",
                color:"primary",
                disableRipple:true,
            },
            styleOverrides:{
                root:{
                    fontSize:"1rem", 
                    mt:"20px",
                    borderRadius: "50px",
                    paddingLeft:"50px",
                    paddingRight:"50px",
                    margin:"10px"
                }
            }
        }
    }
});

export default theme;
