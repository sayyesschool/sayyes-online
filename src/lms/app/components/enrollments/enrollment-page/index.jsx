import { useBoolean } from 'shared/hooks/state';
import { useEnrollment } from 'shared/hooks/enrollments';
import { useUser } from 'shared/hooks/user';
import { Button, Flex, IconButton, Grid, MenuButton } from 'shared/ui-components';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';

import EnrollmentAssignments from 'app/components/enrollments/enrollment-assignments';
import EnrollmentClient from 'app/components/enrollments/enrollment-client';
import EnrollmentChat from 'app/components/enrollments/enrollment-chat';
import EnrollmentCourses from 'app/components/enrollments/enrollment-courses';
import EnrollmentDetails from 'app/components/enrollments/enrollment-details';
import EnrollmentLessons from 'app/components/enrollments/enrollment-lessons';
import EnrollmentManagers from 'app/components/enrollments/enrollment-managers';
import EnrollmentMaterials from 'app/components/enrollments/enrollment-materials';
import EnrollmentSchedule from 'app/components/enrollments/enrollment-schedule';
import EnrollmentTeachers from 'app/components/enrollments/enrollment-teachers';

import './index.scss';

export default function EnrollmentPage({ match }) {
    const [enrollment] = useEnrollment(match.params.id);
    const [user] = useUser();

    const [isDrawerOpen, toggleDrawerOpen] = useBoolean(false);

    if (!enrollment) return <LoadingIndicator fullscreen />;

    const isLearner = user.role === 'client';
    const isTeacher = user.role === 'teacher';

    return (
        <Page className="EnrollmentPage">
            <Page.Drawer open={isDrawerOpen}>
                <EnrollmentChat
                    enrollment={enrollment}
                    user={user}
                    onClose={toggleDrawerOpen}
                />
            </Page.Drawer>

            <Page.Header
                title={enrollment.domainLabel}
                actions={[
                    <Button
                        key="class"
                        as="a"
                        href={enrollment.classUrl}
                        icon="video_call"
                        content="Перейти в класс"
                        variant="soft"
                    />,
                    <IconButton
                        key="chat"
                        icon="chat"
                        title="Чат"
                        variant="soft"
                        onClick={toggleDrawerOpen}
                    />,
                    (enrollment.teachers[0]?.zoomUrl &&
                        <MenuButton
                            key="menu"
                            trigger={
                                <Button
                                    icon="more_vert"
                                    iconOnly
                                    text
                                />
                            }
                            menu={[
                                {
                                    key: 'zoom',
                                    element: 'a',
                                    href: enrollment.teacher.zoomUrl,
                                    target: '_blank',
                                    content: 'Подключиться в Zoom'
                                }
                            ]}
                        />
                    )
                ]}
            />

            <Page.Content>
                <Grid spacing={2}>
                    <Grid.Item lg={8}>
                        <EnrollmentAssignments
                            enrollment={enrollment}
                            readonly={isLearner}
                        />
                    </Grid.Item>

                    <Grid.Item lg={4}>
                        <Flex gap="medium" column>
                            <EnrollmentLessons
                                enrollment={enrollment}
                                readonly={isLearner}
                            />

                            <EnrollmentSchedule
                                enrollment={enrollment}
                            />

                            {isLearner &&
                                <EnrollmentTeachers
                                    enrollment={enrollment}
                                />
                            }

                            {isTeacher &&
                                <EnrollmentDetails
                                    enrollment={enrollment}
                                />
                            }

                            {isTeacher &&
                                <EnrollmentClient
                                    enrollment={enrollment}
                                />
                            }

                            <EnrollmentManagers
                                enrollment={enrollment}
                            />

                            {(isTeacher || enrollment.courses?.length > 0) &&
                                <EnrollmentCourses
                                    enrollment={enrollment}
                                    readonly={isLearner}
                                />
                            }

                            {(isTeacher || enrollment.materials?.length > 0) &&
                                <EnrollmentMaterials
                                    enrollment={enrollment}
                                    readonly={isLearner}
                                />
                            }
                        </Flex>
                    </Grid.Item>
                </Grid>
            </Page.Content>
        </Page>
    );
}