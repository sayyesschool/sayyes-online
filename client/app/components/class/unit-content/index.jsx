import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Card,
    IconButton,
    LayoutGrid,
    List
} from 'mdc-react';

import './index.scss';

export default function UnitContent({ course, unit }) {
    return (
        <div className="unit-content">
            <header className="unit-content__header">
                <h1 className="unit-title"><b>Unit 1</b> <span>{unit.title}</span><IconButton icon="panorama_fish_eye" /></h1>
            </header>

            <LayoutGrid>
                <LayoutGrid.Cell span="6">
                    {unit.image &&
                        <img
                            src={`https://static.sayes.ru/courses/${course.slug}/images/${unit.image}`}
                        />
                    }

                    <Card>
                        <Card.Header title="Содержание" />

                        <Card.Section primary>
                            {unit.description}
                        </Card.Section>
                    </Card>
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="6">
                    <Card outlined>
                        <Card.Header title="Уроки" />

                        <List avatarList twoLine>
                            {unit.lessons.map((lesson, index) =>
                                <List.Item
                                    component={Link}
                                    to={`${unit.url}/lesson/${lesson.id}`}
                                    graphic={<Avatar text={index + 1} />}
                                    primaryText={lesson.title}
                                    secondaryText={`${lesson.exercises.length} уроков`}
                                />
                            )}
                        </List>
                    </Card>
                </LayoutGrid.Cell>
            </LayoutGrid>
        </div>
    );
}