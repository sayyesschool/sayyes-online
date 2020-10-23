import React from 'react';
import {
    Card,
    Icon,
    IconButton,
    LayoutGrid
} from 'mdc-react';

import AudioList from 'shared/components/audio-list';
import VideoList from 'shared/components/video-list';

import CourseForm from 'app/components/courses/course-form';
import UnitList from 'app/components/courses/unit-list';

export default function CourseDetails({ course, onUpdate, onAddUnit, onDeleteUnit }) {
    return (
        <section className="course-details">
            <LayoutGrid>
                <LayoutGrid.Cell span="3">
                    <Card>
                        <Card.Header
                            graphic={<Icon>article</Icon>}
                            title="Детали"
                            actions={
                                <IconButton
                                    icon="save"
                                    type="submit"
                                    form="course-form"
                                />
                            }
                        />

                        <Card.Section primary>
                            <CourseForm
                                course={course}
                                onSubmit={onUpdate}
                            />
                        </Card.Section>
                    </Card>
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="3">
                    <Card>
                        <Card.Header
                            graphic={<Icon>school</Icon>}
                            title="Юниты"
                            actions={
                                <IconButton
                                    icon="add"
                                    onClick={onAddUnit}
                                />
                            }
                        />

                        <Card.Section>
                            <UnitList
                                units={course.units}
                                onDelete={onDeleteUnit}
                            />
                        </Card.Section>
                    </Card>
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="3">
                    <Card>
                        <Card.Header
                            graphic={<Icon>audiotrack</Icon>}
                            title="Аудио"
                            actions={
                                <IconButton
                                    icon="add"
                                />
                            }
                        />

                        <Card.Section>
                            <AudioList
                                audios={course.audios}
                            />
                        </Card.Section>
                    </Card>
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="3">
                    <Card>
                        <Card.Header
                            graphic={<Icon>movie</Icon>}
                            title="Видео"
                            actions={
                                <IconButton
                                    icon="add"
                                />
                            }
                        />

                        <Card.Section>
                            <VideoList
                                videos={course.videos}
                            />
                        </Card.Section>
                    </Card>
                </LayoutGrid.Cell>
            </LayoutGrid>
        </section>
    );
}