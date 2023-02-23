import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

const Container = ({header, children}) => {

  return (
    <Box sx={{
        marginTop: "5rem",
        marginX: "auto",
        color: "text.primary"
    }}>
        <Stack spacing={4}>
            {header && (
                <Box sx={{
                    position: "relative",
                    paddingX: {xs:"20px", md: 0},
                    maxWidth: "1366px",
                    marginX: "auto",
                    width: "100%",
                    "&::before":{
                        content: '""',
                        position: "absolute",
                        left: { xs:"5px", md:"0"},
                        top: "10-0%",
                        height: "30px",
                        width: "2px",
                        backgroundColor: "primary.main"
                    }
                }}>
                    <Typography variant="h5" fontWeight="700" textTransform="uppercase" sx={{marginLeft:{ xs: "0", md: "10px"}}}>
                        {header}
                    </Typography>
                </Box>
            )}
            {children}
        </Stack>
    </Box>
  )
}

export default Container