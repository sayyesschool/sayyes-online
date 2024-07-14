
import { CircularProgress, Icon, Tooltip } from 'shared/ui-components';

const StatusIcon = {
    0: 'kid_star',
    1: 'school',
    2: 'school',
    3: 'school',
    4: 'school',
    5: 'done'
};

const StatusColor = {
    0: 'neutral',
    1: 'warning',
    2: 'warning',
    3: 'warning',
    4: 'warning',
    5: 'success'
};

export default function ProgressStatus({ level, placement = 'left' }) {
    const value = level * 20;
    const color = StatusColor[level];
    const icon = StatusIcon[level];

    return (
        <Tooltip content={`${value}%`} placement={placement}>
            <CircularProgress
                value={value}
                thickness={3}
                color={color}
                size="sm"
                determinate
            >
                <Icon name={icon} />
            </CircularProgress>
        </Tooltip>
    );
}