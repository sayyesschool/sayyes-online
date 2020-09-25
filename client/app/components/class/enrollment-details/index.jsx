import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Icon,
    List,
    TabBar, Tab,
    Typography
} from 'mdc-react';

import CourseContent from 'app/components/class/course-content';

import './index.scss';

export default function EnrollmentDetails({ enrollment }) {
    const [activeTab, setActiveTab] = useState('course');

    return (
        <div className="enrollment-details">
            <Typography variant="headline4">{enrollment.title}</Typography>

            <TabBar value={activeTab} onChange={setActiveTab} minWidth>
                <Tab
                    value="course"
                    label="Курс"
                />

                <Tab
                    value="lessons"
                    label="Уроки"
                />

                <Tab
                    value="homework"
                    label="Задания"
                />
            </TabBar>

            {activeTab === 'course' &&
                <section>
                    <CourseContent
                        enrollment={enrollment}
                        course={enrollment.course}
                    />
                </section>
            }

            {activeTab === 'lessons' &&
                <section>
                    <List twoLine>
                        {enrollment.lessons.map(lesson =>
                            <List.Item
                                key={lesson.id}
                                graphic={<Icon>{lesson.statusIcon}</Icon>}
                                primaryText={lesson.datetime}
                                secondaryText={lesson.statusLabel}
                            />
                        )}
                    </List>
                </section>
            }

            {activeTab === 'homework' &&
                <section>

                </section>
            }
        </div>
    );
}