import React from 'react';
import {
    Card,
    IconButton,
    Typography
} from 'mdc-react';

import EnrollmentsList from 'app/components/enrollments/enrollments-list';

export default function ClientEnrollments({ enrollments, onCreate }) {
    return (
        <section className="client-enrollments">
            <Card>
                <Card.Header
                    title="Обучение"
                    actions={
                        <IconButton
                            icon="add"
                            title="Создать обучение"
                            onClick={onCreate}
                        />
                    }
                />

                {enrollments && enrollments.length > 0 ?
                    <EnrollmentsList
                        enrollments={enrollments}
                    />
                    :
                    <Card.Section primary>
                        <Typography noMargin>Обучений пока нет</Typography>
                    </Card.Section>
                }
            </Card>
        </section>
    );
}