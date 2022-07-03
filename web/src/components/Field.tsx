import Grid from "@mui/material/Grid";
import Board from "./Board";
import { MyHand, YourHand } from "./Hand";

const Field = () => {
    return (
        <>
            <Grid container paddingX={'160px'} paddingTop={'100px'}>
                <Grid item xl={2} paddingRight={'30px'} paddingLeft={'90px'} alignSelf={'flex-start'} justifyContent={'flex-start'}>
                    <YourHand />
                </Grid>
                <Grid item xl={8} paddingX={'30px'}>
                    <Board />
                </Grid>
                <Grid item xl={2} paddingLeft={'30px'} paddingRight={'90px'} alignSelf={'flex-end'} justifySelf={'flex-end'}>
                    <MyHand />
                </Grid>
            </Grid>
        </>
    )
}

export default Field;