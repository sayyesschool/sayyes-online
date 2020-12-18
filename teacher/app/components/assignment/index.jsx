import React, { useState, useCallback } from 'react';
import {
    Card
} from 'mdc-react';

import { useAssignment } from 'shared/hooks/assignments';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import AssignmentForm from './assignment-form';

import './index.scss';

export default function AssignmentPage({ match }) {
    const [assignment, actions] = useAssignment(match.params.id);

    const handleUpdateAssignment = useCallback(data => {
        actions.updateAssignment(assignment.id, data);
    }, [assignment]);

    const handleDeleteAssignment = useCallback(() => {
        if (confirm('Вы уверены что хотите удалить задание?')) {
            actions.deleteAssignment(assignment.id);
        }
    }, [assignment]);

    const handleCreateComment = useCallback(data => {
        actions.createComment(assignment.id, data);
    }, [assignment]);

    const handleUpdateComment = useCallback((comment, data) => {
        actions.updateComment(assignment.id, comment.id, data);
    }, [assignment]);

    const handleDeleteComment = useCallback(comment => {
        actions.deleteComment(assignment.id, comment.id);
    }, [assignment]);

    if (!assignment) return <LoadingIndicator />;

    return (
        <Page id="assignment-page">
            <PageHeader
                title="Задание"
                actions={[
                    { key: 'save', icon: 'save', type: 'submit', form: 'assignment-form' },
                    { key: 'delete', icon: 'delete', onClick: handleDeleteAssignment },
                ]}
            />

            <PageContent>
                <Card outlined>
                    <AssignmentForm
                        assignment={assignment}
                        onSubmit={handleUpdateAssignment}
                    />
                </Card>
            </PageContent>
        </Page>
    );
}