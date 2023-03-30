import PersonChip from 'shared/components/person-chip';

import { ChipGroup, Flex, Label } from 'shared/ui-components';

export default function EnrollmentMeta({ enrollment }) {
    return (
        <section className="sy-EnrollmentMeta">
            <Flex gap="small">
                <Label content={enrollment.managers.length > 1 ? 'Менеджеры:' : 'Менеджер:'} horizontal>
                    <ChipGroup>
                        {enrollment.managers?.map(manager =>
                            <PersonChip
                                key={manager.id}
                                imageSrc={manager?.imageUrl}
                                content={manager?.fullname}
                            />
                        )}
                    </ChipGroup>
                </Label>

                {enrollment.teachers.length > 0 &&
                    <Label content={enrollment.teachers.length > 1 ? 'Преподаватели:' : 'Преподаватель:'} horizontal>
                        <ChipGroup>
                            {enrollment.teachers.map(teacher =>
                                <PersonChip
                                    key={teacher.id}
                                    imageSrc={teacher?.imageUrl}
                                    content={teacher?.fullname}
                                />
                            )}
                        </ChipGroup>
                    </Label>
                }
            </Flex>
        </section>
    );
}