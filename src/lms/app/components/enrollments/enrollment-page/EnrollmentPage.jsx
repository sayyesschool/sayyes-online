import { useBoolean } from 'shared/hooks/state';
import { useEnrollment } from 'shared/hooks/enrollments';
import { useUser } from 'shared/hooks/user';
import { Button, Flex, IconButton, Grid, MenuButton } from 'shared/ui-components';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { DomainLabel } from 'shared/data/common';

import EnrollmentAssignments from 'app/components/enrollments/enrollment-assignments';
import EnrollmentChat from 'app/components/enrollments/enrollment-chat';
import EnrollmentCourses from 'app/components/enrollments/enrollment-courses';
import EnrollmentDetails from 'app/components/enrollments/enrollment-details';
import EnrollmentLessons from 'app/components/enrollments/enrollment-lessons';
import EnrollmentLearner from 'app/components/enrollments/enrollment-learner';
import EnrollmentManager from 'app/components/enrollments/enrollment-manager';
import EnrollmentMaterials from 'app/components/enrollments/enrollment-materials';
import EnrollmentSchedule from 'app/components/enrollments/enrollment-schedule';
import EnrollmentTeacher from 'app/components/enrollments/enrollment-teacher';

export default function EnrollmentPage({ match }) {
    const [enrollment] = useEnrollment(match.params.id);
    const [user] = useUser();

    const [isDrawerOpen, toggleDrawerOpen] = useBoolean(false);

    if (!enrollment) return <LoadingIndicator fullscreen />;

    const isLearner = user.role === 'learner';
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
                title={DomainLabel[enrollment.domain]}
                actions={[
                    <Button
                        key="class"
                        as="a"
                        href={`${CLASS_URL}/${enrollment.id}`}
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
                    (enrollment.teacher?.zoomUrl &&
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
                    <Grid.Item lg={8} md={8} sm={8} xs={12}>
                        <Flex gap="medium" column>
                            <EnrollmentLessons
                                enrollment={enrollment}
                                readonly={isLearner}
                            />

                            <EnrollmentAssignments
                                enrollment={enrollment}
                                readonly={isLearner}
                            />
                        </Flex>
                    </Grid.Item>

                    <Grid.Item lg={4} md={4} sm={4} xs={12}>
                        <Flex gap="medium" column>
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

                            <EnrollmentSchedule
                                enrollment={enrollment}
                            />

                            {isLearner &&
                                <EnrollmentTeacher
                                    enrollment={enrollment}
                                />
                            }

                            {isTeacher &&
                                <EnrollmentDetails
                                    enrollment={enrollment}
                                />
                            }

                            {isTeacher &&
                                <EnrollmentLearner
                                    enrollment={enrollment}
                                />
                            }

                            <EnrollmentManager
                                enrollment={enrollment}
                            />
                        </Flex>
                    </Grid.Item>
                </Grid>
            </Page.Content>
        </Page>
    );
}