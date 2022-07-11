import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import Board from "./Board";
import { MyHand, YourHand } from "./Hand";

const Field = () => {
    return (
        <>
            <Grid
                container
                paddingTop={'100px'}
            >
                <Box
                    sx={{
                        width: {
                          xs: '10px',
                          sm: '30px',
                          md: '100px',
                          lg: '250px',
                          xl: '300px',
                        },
                    }}
                />
                <Grid
                    item
                    xl={2}
                    alignSelf={'flex-start'}
                    justifyContent={'flex-start'}
                >
                    <YourHand />
                </Grid>
                <Box
                    sx={{
                        width: {
                          xs: '10px',
                          sm: '20px',
                          md: '30px',
                          lg: '50px',
                          xl: '60px',
                        },
                    }}
                />
                <Grid
                    item
                    xl={8}
                >
                    <Board />
                </Grid>
                <Box
                    sx={{
                        width: {
                          xs: '10px',
                          sm: '20px',
                          md: '30px',
                          lg: '50px',
                          xl: '60px',
                        },
                    }}
                />
                <Grid
                    item
                    xl={2}
                    alignSelf={'flex-end'}
                    justifySelf={'flex-end'}
                >
                    <MyHand />
                </Grid>
            </Grid>
        </>
    )
}

export default Field;