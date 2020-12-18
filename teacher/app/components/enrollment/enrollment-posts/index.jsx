import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    IconButton,
    List
} from 'mdc-react';

import FormDialog from 'shared/components/form-dialog';

import PostForm from 'app/components/post/post-form';

export default function EnrollmentPosts({ enrollment, onCreate }) {
    const [isFormOpen, setFormOpen] = useState(false);

    const handleSubmit = useCallback(data => {
        onCreate(data);
        setFormOpen(false);
    }, []);

    return (
        <div className="enrollment-posts">
            <Card outlined>
                <Card.Header
                    title="Прогресс обучения"
                    subtitle={(!enrollment.posts || enrollment.posts.length === 0) && 'Отчетов пока нет'}
                    actions={
                        <IconButton
                            icon="add"
                            onClick={() => setFormOpen(true)}
                        />
                    }
                />

                {enrollment.posts &&
                    <Card.Section>
                        <List twoLine>
                            {enrollment.posts?.map(post =>
                                <List.Item
                                    key={post.id}
                                    component={Link}
                                    to={post.url}
                                    primaryText={post.title}
                                    secondaryText={post.publishedAt}
                                />
                            )}
                        </List>
                    </Card.Section>
                }
            </Card>

            <FormDialog
                className="post-dialog"
                form="post-form"
                title="Новая запись"
                open={isFormOpen}
                onClose={() => setFormOpen(false)}
            >
                <PostForm
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </div >
    );
}