import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Chip,
    Icon,
    List
} from 'mdc-react';

export default function EnrollmentPosts({ enrollment }) {
    return (
        <div className="enrollment-posts">
            <Card outlined>
                <Card.Header
                    graphic={<Icon>article</Icon>}
                    title="Отчеты об обучении"
                    subtitle={(!enrollment.posts || enrollment.posts.length === 0) && 'Отчетов пока нет'}
                />

                {enrollment.posts?.length > 0 &&
                    <Card.Section>
                        <List twoLine>
                            {enrollment.posts?.map(post =>
                                <List.Item
                                    key={post.id}
                                    component={Link}
                                    to={`${enrollment.url}${post.url}`}
                                    primaryText={post.title}
                                    secondaryText={post.timeSinceCreated}
                                    meta={
                                        <Chip
                                            icon={<Icon>forum</Icon>}
                                            text={post.comments.length}
                                            disabled
                                            outlined
                                        />
                                    }
                                />
                            )}
                        </List>
                    </Card.Section>
                }
            </Card>
        </div >
    );
}