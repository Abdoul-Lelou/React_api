import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'



const DashboradList= () => {



  return (
    <div>
        <Grid container sx={12}>
            <Grid item md={4}>             
            <Card
                sx={{ height: '100%' }}
                // {...props}
            >
                <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid item>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="overline"
                    >
                        BUDGET
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                        $24k
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Avatar
                        sx={{
                        backgroundColor: 'error.main',
                        height: 56,
                        width: 56
                        }}
                    >
                        {/* <MoneyOff /> */}
                        icon
                    </Avatar>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                    pt: 2,
                    display: 'flex',
                    alignItems: 'center'
                    }}
                >
                    error
                    <Typography
                    color="error"
                    sx={{
                        mr: 1
                    }}
                    variant="body2"
                    >
                    12%
                    </Typography>
                    <Typography
                    color="textSecondary"
                    variant="caption"
                    >
                    Since last month
                    </Typography>
                </Box>
                </CardContent>
            </Card>
            </Grid>
            <Grid item md={3}>
            <Card
                sx={{ height: '100%' }}
                // {...props}
            >
                <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid item>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="overline"
                    >
                        BUDGET
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                        $24k
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Avatar
                        sx={{
                        backgroundColor: 'error.main',
                        height: 56,
                        width: 56
                        }}
                    >
                        {/* <MoneyOff /> */}
                        icon
                    </Avatar>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                    pt: 2,
                    display: 'flex',
                    alignItems: 'center'
                    }}
                >
                    error
                    <Typography
                    color="error"
                    sx={{
                        mr: 1
                    }}
                    variant="body2"
                    >
                    12%
                    </Typography>
                    <Typography
                    color="textSecondary"
                    variant="caption"
                    >
                    Since last month
                    </Typography>
                </Box>
                </CardContent>
            </Card>
            </Grid>
            <Grid item md={3}>
            <Card
                sx={{ height: '100%' }}
                // {...props}
            >
                <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid item>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="overline"
                    >
                        BUDGET
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                        $24k
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Avatar
                        sx={{
                        backgroundColor: 'error.main',
                        height: 56,
                        width: 56
                        }}
                    >
                        {/* <MoneyOff /> */}
                        icon
                    </Avatar>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                    pt: 2,
                    display: 'flex',
                    alignItems: 'center'
                    }}
                >
                    error
                    <Typography
                    color="error"
                    sx={{
                        mr: 1
                    }}
                    variant="body2"
                    >
                    12%
                    </Typography>
                    <Typography
                    color="textSecondary"
                    variant="caption"
                    >
                    Since last month
                    </Typography>
                </Box>
                </CardContent>
            </Card>
            </Grid>
            <Grid item md={3}>
            <Card
                sx={{ height: '100%' }}
                // {...props}
            >
                <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid item>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="overline"
                    >
                        BUDGET
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                        $24k
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Avatar
                        sx={{
                        backgroundColor: 'error.main',
                        height: 56,
                        width: 56
                        }}
                    >
                        {/* <MoneyOff /> */}
                        icon
                    </Avatar>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                    pt: 2,
                    display: 'flex',
                    alignItems: 'center'
                    }}
                >
                    error
                    <Typography
                    color="error"
                    sx={{
                        mr: 1
                    }}
                    variant="body2"
                    >
                    12%
                    </Typography>
                    <Typography
                    color="textSecondary"
                    variant="caption"
                    >
                    Since last month
                    </Typography>
                </Box>
                </CardContent>
            </Card>
            </Grid>
        </Grid>
    </div>
  )
}

export default DashboradList