import React from 'react';
import {
    Card,
    Icon,
    IconButton,
    LayoutGrid
} from 'mdc-react';

import AudioList from 'shared/components/audio-list';
import VideoList from 'shared/components/video-list';

import UnitList from 'app/components/courses/unit-list';

export default function CourseDetails({ course, onAddUnit, onDeleteUnit }) {
    return (
        <section className="course-details">
            <LayoutGrid>
                <LayoutGrid.Cell span="4">
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

                <LayoutGrid.Cell span="4">
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

                <LayoutGrid.Cell span="4">
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