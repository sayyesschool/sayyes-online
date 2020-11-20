import React, { useState } from 'react';
import {
    Card
} from 'mdc-react';

import { useSelector } from 'shared/hooks/store';
import Page from 'shared/components/page';
import PageContent from 'shared/components/page-content';
import LoadingIndicator from 'shared/components/loading-indicator';

import StudentList from 'app/components/students/student-list';

// import './index.scss';

export default function StudentsPage() {
    const enrollments = useSelector(store => store.enrollments.list);

    if (!enrollments) return <LoadingIndicator />;

    const students = enrollments.map(enrollment => {
        const student = enrollment.client;

        student.url = enrollment.url;

        return student;
    });

    return (
        <Page id="students-page">
            <PageContent>
                <Card outlined>
                    <Card.Header
                        title="Мои ученики"
                        subtitle={`Количество учеников: ${students.length}`}
                    />

                    <StudentList
                        students={students}
                    />
                </Card>
            </PageContent>
        </Page>
    );
}