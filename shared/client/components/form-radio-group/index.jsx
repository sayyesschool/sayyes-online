import { FormRadioGroup as FluentFormRadioGroup } from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';

export default function FormRadioGroup({ ...props }) {
    return (
        <FluentFormRadioGroup
            indicator={<Icon>radio_button_unchecked</Icon>}
            checkedIndicator={<Icon>radio_button_checked</Icon>}
            {...props}
        />
    );
}