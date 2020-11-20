import React from 'react';
import {
    Card,
    Icon,
    IconButton,
    LayoutGrid
} from 'mdc-react';

import LessonList from 'app/components/courses/lesson-list';
import UnitForm from 'app/components/courses/unit-form';

export default function UnitDetails({ unit, onUpdate, onAddLesson, onDeleteLesson }) {
    return (
        <section className="unit-details">
            <LayoutGrid>
                <LayoutGrid.Cell span="6">
                    <Card>
                        <Card.Header
                            graphic={<Icon>article</Icon>}
                            title="Детали"
                            actions={
                                <IconButton
                                    icon="save"
                                    type="submit"
                                    form="unit-form"
                                />
                            }
                        />

                        <Card.Section primary>
                            <UnitForm
                                unit={unit}
                                onSubmit={onUpdate}
                            />
                        </Card.Section>
                    </Card>
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="4">
                    <Card>
                        <Card.Header
                            graphic={<Icon>school</Icon>}
                            title="Уроки"
                            actions={
                                <IconButton
                                    icon="add"
                                    onClick={onAddLesson}
                                />
                            }
                        />

                        {unit.lessons.length > 0 &&
                            <Card.Section>
                                <LessonList
                                    lessons={unit.lessons}
                                    onDelete={onDeleteLesson}
                                />
                            </Card.Section>
                        }
                    </Card>
                </LayoutGrid.Cell>
            </LayoutGrid>
        </section>
    );
}