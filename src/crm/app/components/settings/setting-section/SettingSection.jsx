import { PageSection } from 'shared/components/page/Page';
import { useSetting } from 'shared/store/settings';
import { Flex } from 'shared/ui-components';

import SettingForm from 'crm/components/settings/setting-form';

export default function SettingSection({ name, title }) {
    const [setting = {}, set] = useSetting(name);

    const create = (data, form) => {
        set({
            ...setting,
            [data.get('key')]: data.get('value')
        });

        form.reset();
    };

    const update = (data, form) => {
        delete setting[form.name];

        set({
            ...setting,
            [data.get('key')]: data.get('value')
        });
    };

    return (
        <PageSection title={title}>
            <Flex dir="column" gap="s">
                {Object.entries(setting).map(([key, value]) =>
                    <SettingForm
                        key={key}
                        name={key}
                        data={{ key, value }}
                        buttonContent="Сохранить"
                        onSubmit={update}
                    />
                )}

                <SettingForm buttonContent="Добавить" onSubmit={create} />
            </Flex>
        </PageSection>
    );
}