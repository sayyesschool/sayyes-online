import { Grid } from 'shared/ui-components';

import SettingSection from 'crm/components/settings/setting-section';

export default function RequestsSettings() {
    return (
        <Grid>
            <Grid.Item span="4">
                <SettingSection name="request.types" title="Типы" />
            </Grid.Item>

            <Grid.Item span="4">
                <SettingSection name="request.channels" title="Каналы" />
            </Grid.Item>

            <Grid.Item span="4">
                <SettingSection name="request.sources" title="Источники" />
            </Grid.Item>
        </Grid>
    );
}