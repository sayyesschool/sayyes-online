import { Header as FluentHeader } from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';

export default function Header({ icon, ...props }) {
    return (
        <FluentHeader
            {...props}
        />
    );
}