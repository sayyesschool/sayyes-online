import PersonChip from 'shared/components/person-chip';

import { Flex, Label } from 'shared/ui-components';

export default function EnrollmentMeta({ enrollment }) {
    return (
        <section className="EnrollmentMeta">
            <Flex gap="small">
                <Label content="Менеджер" horizontal>
                    <PersonChip
                        key={enrollment.manager?.id}
                        imageSrc={enrollment.manager?.imageUrl}
                        content={enrollment.manager?.fullname}
                    />
                </Label>

                {enrollment.teacher &&
                    <Label content="Преподаватель" horizontal>
                        <PersonChip
                            key={enrollment.teacher?.id}
                            imageSrc={enrollment.teacher?.imageUrl}
                            content={enrollment.teacher?.fullname}
                        />
                    </Label>
                }
            </Flex>
        </section>
    );
}