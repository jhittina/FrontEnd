import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularLoadingBar() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            invisible="true"
            style={{ backgroundColor: 'transparent' }}
        >
            <CircularProgress />
        </Box>
    );
}
