import { Tooltip } from '@material-ui/core';
import clsx from 'clsx';

import useParticipantIsReconnecting from '../../../hooks/useParticipantIsReconnecting/useParticipantIsReconnecting';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    indicator: {
        width: '10px',
        height: '10px',
        borderRadius: '100%',
        background: '#0c0',
        display: 'inline-block',
        marginRight: '3px'
    },
    isReconnecting: {
        background: '#ffb100'
    }
});

export default function ParticipantConnectionIndicator({ participant }) {
    const isReconnecting = useParticipantIsReconnecting(participant);
    const classes = useStyles();
    return (
        <Tooltip title={isReconnecting ? 'Participant is reconnecting' : 'Participant is connected'}>
            <span className={clsx(classes.indicator, { [classes.isReconnecting]: isReconnecting })}></span>
        </Tooltip>
    );
}