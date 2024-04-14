import { Grid, makeStyles, Typography } from '@material-ui/core';

import ErrorIcon from '../../../icons/ErrorIcon';
import { SuccessIcon } from '../../../icons/SuccessIcon';
import WarningIcon from '../../../icons/WarningIcon';
import ProgressIndicator from './ProgressIndicator/ProgressIndicator';
import useGetPreflightTokens from './useGetPreflightTokens/useGetPreflightTokens';

import getNetworkCondition from './getNetworkCondition/getNetworkCondition';
import usePreflightTest from './usePreflightTest/usePreflightTest';

export const TEST_DURATION = 10000;

export const NetworkCondition = {
    Red: 0,
    Yellow: 1,
    Green: 2
};

const useStyles = makeStyles({
    iconContainer: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '0.4em'
    },
    result: {
        color: 'white'
    }
});

function ResultItem({ children, icon }) {
    const classes = useStyles();

    return (
        <>
            <div className={classes.iconContainer}>{icon}</div>

            <Typography variant="subtitle2" className={classes.result}>
                {children}
            </Typography>
        </>
    );
}

export function Result({ networkCondition, error }) {
    if (error) {
        return <ResultItem icon={<ErrorIcon />}>There was a problem connecting to the network</ResultItem>;
    }

    if (networkCondition === NetworkCondition.Red) {
        return (
            <ResultItem icon={<ErrorIcon />}>
        Poor network conditions. You may experience poor call quality and reliability.
            </ResultItem>
        );
    }

    if (networkCondition === NetworkCondition.Yellow) {
        return (
            <ResultItem icon={<WarningIcon />}>
        Poor network conditions. You may experience degraded video performance.
            </ResultItem>
        );
    }

    if (networkCondition === NetworkCondition.Green) {
        return <ResultItem icon={<SuccessIcon />}>Your network connection is stable</ResultItem>;
    }

    return null;
}

export default function PreflightTest() {
    const classes = useStyles();

    const { tokens, tokenError } = useGetPreflightTokens();
    const { testFailure, testReport } = usePreflightTest(tokens?.[0], tokens?.[1]);

    const networkCondition = getNetworkCondition(testReport);

    return (
        <Grid justify="center" alignItems="center" style={{ height: '55px', paddingBottom: '1.5em' }} container>
            {!testFailure && !testReport ? (
                <>
                    <ProgressIndicator />

                    <Typography variant="subtitle2" className={classes.result}>
            Checking your network connection
                    </Typography>
                </>
            ) : (
                <Result networkCondition={networkCondition} error={tokenError || testFailure} />
            )}
        </Grid>
    );
}
