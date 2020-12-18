import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    List
} from 'mdc-react';

export default function EnrollmentPosts({ enrollment }) {
    return (
        <div className="enrollment-posts">
            <Card outlined>
                <Card.Header
                    title="Отчеты об обучения"
                    subtitle={(!enrollment.posts || enrollment.posts.length === 0) && 'Отчетов пока нет'}
                />

                {enrollment.posts &&
                    <Card.Section>
                        <List twoLine>
                            {enrollment.posts?.map(post =>
                                <List.Item
                                    key={post.id}
                                    component={Link}
                                    to={`${enrollment.url}${post.url}`}
                                    primaryText={post.title}
                                    secondaryText={post.timeSinceCreated}
                                />
                            )}
                        </List>
                    </Card.Section>
                }
            </Card>
        </div >
    );
}