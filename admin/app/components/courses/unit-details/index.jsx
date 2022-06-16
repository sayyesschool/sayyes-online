import { Button } from '@fluentui/react-northstar';

import Icon from 'shared/components/icon';
import PageSection from 'shared/components/page-section';

import UnitForm from 'app/components/courses/unit-form';

export default function UnitDetails({ unit, onUpdate }) {
    return (
        <PageSection
            className="unit-details"
            title="Детали"
            actions={
                <Button
                    type="submit"
                    form="unit-form"
                    icon={<Icon name="save" />}
                    iconOnly
                    text
                />
            }
        >
            <UnitForm
                id="unit-form"
                unit={unit}
                onSubmit={onUpdate}
            />
        </PageSection>
    );
}