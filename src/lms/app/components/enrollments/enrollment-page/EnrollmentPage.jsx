import { useCallback, useState } from 'react';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { CLASS_URL } from 'shared/constants';
import { DomainLabel } from 'shared/data/common';
import { useEnrollment } from 'shared/hooks/enrollments';
import { useBoolean } from 'shared/hooks/state';
import { useUser } from 'shared/hooks/user';
import { Badge, Button, Flex, Grid, IconButton, MenuButton } from 'shared/ui-components';

import EnrollmentAssignments from 'lms/components/enrollments/enrollment-assignments';
import EnrollmentChat from 'lms/components/enrollments/enrollment-chat';
import EnrollmentCourses from 'lms/components/enrollments/enrollment-courses';
import EnrollmentDetails from 'lms/components/enrollments/enrollment-details';
import EnrollmentLearner from 'lms/components/enrollments/enrollment-learner';
import EnrollmentLessons from 'lms/components/enrollments/enrollment-lessons';
import EnrollmentManager from 'lms/components/enrollments/enrollment-manager';
import EnrollmentMaterials from 'lms/components/enrollments/enrollment-materials';
import EnrollmentSchedule from 'lms/components/enrollments/enrollment-schedule';
import EnrollmentTeacher from 'lms/components/enrollments/enrollment-teacher';
import EnrollmentVocabulary from 'lms/components/enrollments/enrollment-vocabulary';

import styles from './EnrollmentPage.module.scss';

export default function EnrollmentPage({ match }) {
    const [user] = useUser();
    const [enrollment] = useEnrollment(match.params.id);

    const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
    const [isChatOpen, toggleChatOpen] = useBoolean(false);
    const [isVocabularyOpen, toggleVocabularyOpen] = useBoolean(false);

    const openChat = useCallback(() => {
        toggleChatOpen(true);
        toggleVocabularyOpen(false);
    }, [/* empty */]);

    const openVocabulary = useCallback(() => {
        toggleChatOpen(false);
        toggleVocabularyOpen(true);
    }, [/* empty */]);

    const handleChatJoined = useCallback(() => {
        setUnreadMessagesCount(0);
    }, []);

    if (!enrollment) return <LoadingIndicator fullscreen />;

    const isLearner = user.isLearner;
    const isTeacher = user.isTeacher;
    const hasChat = enrollment.learner && enrollment.teacher;

    return (
        <Page className={styles.root}>
            {/* <Page.Drawer open={isChatOpen} onClose={toggleChatOpen}>
                <EnrollmentChat
                    enrollment={enrollment}
                    user={user}
                    onJoined={handleChatJoined}
                    onClose={toggleChatOpen}
                />
            </Page.Drawer> */}

            <Page.Drawer open={isVocabularyOpen} onClose={toggleVocabularyOpen}>
                <EnrollmentVocabulary
                    enrollment={enrollment}
                    user={user}
                    onClose={toggleVocabularyOpen}
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
                    // hasChat &&
                    //     <Badge
                    //         key="chat"
                    //         badgeContent={unreadMessagesCount}
                    //         showZero={false}
                    //         size="sm"
                    //     >
                    //         <IconButton
                    //             icon="chat"
                    //             title="Чат"
                    //             variant="soft"
                    //             onClick={openChat}
                    //         />
                    //     </Badge>,
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
                    <Grid.Item sm={8} xs={12}>
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

                    <Grid.Item sm={4} xs={12}>
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