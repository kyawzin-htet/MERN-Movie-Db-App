import {createTheme} from '@mui/material/styles';
import {colors} from "@mui/material"

export const themeModes = {
    dark: "dark",
    light: "light"
}

const themeConfigs = {
    custom: ({mode}) => {
        const customePalette = mode === themeModes.dark ? {
            primary: {
                main: "#18dcff",
                contrastText: "#ffffff"
            },
            secondary: {
                main: "#f44336",
                contrastText: "#ffffff"
            },
            background:{
                default: "#000000",
                paper: "#131313"
            }
        } : {
            primary: {
                main: "#18dcff",
            },
            secondary: {
                main: "#f44336",
            },
            background:{
                default: colors.grey["100"],
            }
        }
        return createTheme({
            palette : {
                mode,
                ...customePalette
            },
            components:{
                MuiButton:{
                    defaultProps: {disableElevation: true}
                }
            }
        })
    }
}

export default themeConfigs;