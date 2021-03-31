import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    Chip,
    Icon,
    LayoutGrid,
    Typography
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import { useEnrollment } from 'shared/hooks/enrollments';
import { useAssignment } from 'shared/hooks/assignments';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import AssignmentContent from 'shared/components/assignment-content';
import CommentCard from 'shared/components/comment-card';
import CommentForm from 'shared/components/comment-form';

import './index.scss';

export default function AssignmentPage({ match }) {
    const [enrollment] = useEnrollment(match.params.enrollmentId);
    const [assignment, actions] = useAssignment(match.params.assignmentId);

    const [isCommenting, toggleCommenting] = useBoolean(false);

    const handleCreateComment = useCallback(data => {
        return actions.createComment(assignment.id, data)
            .then(() => toggleCommenting(false));
    }, [assignment]);

    const handleUpdateComment = useCallback(data => {
        return actions.updateComment(assignment.id, data.id, data);
    }, [assignment]);

    const handleDeleteComment = useCallback(comment => {
        return actions.deleteComment(assignment.id, comment.id);
    }, [assignment]);

    if (!enrollment || !assignment) return <LoadingIndicator />;

    return (
        <Page id="assignment-page">
            <PageHeader
                breadcrumbs={[
                    <Link to={enrollment.url}>{enrollment.title}</Link>
                ]}
                title={assignment.title}
                actions={<Chip
                    icon={<Icon>{assignment.statusIcon}</Icon>}
                    text={assignment.statusLabel}
                    outlined
                />}
                pullContent
            />

            <PageContent>
                <LayoutGrid>
                    <LayoutGrid.Cell span="12">
                        <Card outlined>
                            <AssignmentContent
                                assignment={assignment}
                            />
                        </Card>
                    </LayoutGrid.Cell>

                    {assignment.comments?.length > 0 &&
                        <LayoutGrid.Cell span="12">
                            <Typography type="headline6">Комментарии</Typography>

                            {assignment.comments.map(comment =>
                                <CommentCard
                                    comment={comment}
                                    onUpdate={handleUpdateComment}
                                    onDelete={handleDeleteComment}
                                />
                            )}
                        </LayoutGrid.Cell>
                    }

                    <LayoutGrid.Cell span="12">
                        {isCommenting ?
                            <Card outlined>
                                <Card.Header
                                    title="Новый комментарий"
                                />

                                <CommentForm
                                    id="new-comment-form"
                                    onSubmit={handleCreateComment}
                                />

                                <Card.Actions>
                                    <Card.Action>
                                        <Button onClick={toggleCommenting}>Закрыть</Button>
                                    </Card.Action>

                                    <Card.Action>
                                        <Button type="submit" form="new-comment-form" icon={<Icon>send</Icon>} unelevated>Отправить</Button>
                                    </Card.Action>
                                </Card.Actions>
                            </Card>
                            :
                            <Button onClick={toggleCommenting} outlined>Оставить комментарий</Button>
                        }
                    </LayoutGrid.Cell>
                </LayoutGrid>
            </PageContent>
        </Page>
    );
}