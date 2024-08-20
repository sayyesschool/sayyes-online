import { useCallback, useState } from 'react';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { CLASS_URL } from 'shared/constants';
import { DomainLabel } from 'shared/data/common';
import { useEnrollment } from 'shared/hooks/enrollments';
import { useUser } from 'shared/hooks/user';
import { useVocabulary } from 'shared/hooks/vocabularies';
import { Badge, Button, Flex, Grid, IconButton, MenuButton } from 'shared/ui-components';

import EnrollmentAssignments from 'lms/components/enrollments/enrollment-assignments';
import EnrollmentCourses from 'lms/components/enrollments/enrollment-courses';
import EnrollmentDetails from 'lms/components/enrollments/enrollment-details';
import EnrollmentLearner from 'lms/components/enrollments/enrollment-learner';
import EnrollmentLessons from 'lms/components/enrollments/enrollment-lessons';
import EnrollmentManager from 'lms/components/enrollments/enrollment-manager';
import EnrollmentMaterials from 'lms/components/enrollments/enrollment-materials';
import EnrollmentSchedule from 'lms/components/enrollments/enrollment-schedule';
import EnrollmentTeacher from 'lms/components/enrollments/enrollment-teacher';

import EnrollmentDrawer, { DRAWER_CONTENT } from './EnrollmentDrawer';

export default function EnrollmentPage({ match }) {
    const [user] = useUser();
    const [enrollment] = useEnrollment(match.params.id);
    const [vocabulary] = useVocabulary('my', { learnerId: enrollment?.learner.id || '' });
    const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
    const [drawerContent, setDrawerContent] = useState(null);

    const openChat = useCallback(() => {
        setDrawerContent(DRAWER_CONTENT.chat);
    }, []);

    const openVocabulary = useCallback(() => {
        setDrawerContent(DRAWER_CONTENT.vocabulary);
    }, []);

    if (!enrollment) return <LoadingIndicator fullscreen />;

    const isLearner = user.role === 'learner';
    const isTeacher = user.role === 'teacher';
    const hasChat = enrollment.learner && enrollment.teacher;
    const hasVocabulary = !!vocabulary;

    return (
        <Page className="EnrollmentPage">
            <EnrollmentDrawer
                vocabulary={vocabulary}
                enrollment={enrollment}
                drawerContent={drawerContent}
                user={user}
                learnerId={enrollment.learner.id}
                hasChat={hasChat}
                hasVocabulary={hasVocabulary}
                setDrawerContent={setDrawerContent}
                setUnreadMessagesCount={setUnreadMessagesCount}
            />

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
                    hasChat &&
                        <Badge
                            key="chat"
                            badgeContent={unreadMessagesCount}
                            showZero={false}
                            size="sm"
                        >
                            <IconButton
                                icon="chat"
                                title="Чат"
                                variant="soft"
                                onClick={openChat}
                            />
                        </Badge>,
                    hasVocabulary &&
                        <IconButton
                            key="dictionary"
                            icon="dictionary"
                            title="Словарь"
                            variant="soft"
                            onClick={openVocabulary}
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
                    <Grid.Item
                        lg={8} md={8}
                        sm={8} xs={12}
                    >
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

                    <Grid.Item
                        lg={4} md={4}
                        sm={4} xs={12}
                    >
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

                            {enrollment.teacher && isLearner &&
                                <EnrollmentTeacher
                                    enrollment={enrollment}
                                />
                            }

                            {isTeacher &&
                                <EnrollmentDetails
                                    enrollment={enrollment}
                                />
                            }

                            {enrollment.learner && isTeacher &&
                                <EnrollmentLearner
                                    enrollment={enrollment}
                                />
                            }

                            {enrollment.manager &&
                                <EnrollmentManager
                                    enrollment={enrollment}
                                />
                            }
                        </Flex>
                    </Grid.Item>
                </Grid>
            </Page.Content>
        </Page>
    );
}