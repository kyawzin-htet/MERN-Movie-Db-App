import { Typography, useTheme } from "@mui/material"


const Logo = () => {
    const theme = useTheme()
  return (
   <Typography fontWeight="700" fontSize="1.6rem">
        <span style={{color: theme.palette.primary.main}}>MovieDb</span>
   </Typography>
  )
}

export default Logo