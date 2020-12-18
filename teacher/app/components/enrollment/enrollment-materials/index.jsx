import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Icon,
    IconButton,
    List
} from 'mdc-react';

import FormDialog from 'shared/components/form-dialog';

import AssignmentForm from 'app/components/assignment/assignment-form';
import PostForm from 'app/components/post/post-form';

export default function EnrollmentMaterials({ enrollment, onAdd }) {
    const [isPostFormOpen, setPostFormOpen] = useState(false);
    const [isAssignmentFromOpen, setAssignmentFormOpen] = useState(false);

    const handlePostFormSubmit = useCallback(data => {
        onCreatePost(data);
        setPostFormOpen(false);
    }, []);

    return (
        <div className="enrollment-materials">
            <Card outlined>
                <Card.Header
                    title="Дополнительные материалы"
                    subtitle={(!enrollment.materials || enrollment.materials.length === 0) && 'Отчетов пока нет'}
                    actions={
                        <IconButton
                            icon="add"
                            onClick={() => setPostFormOpen(true)}
                        />
                    }
                />

                {enrollment.materials &&
                    <Card.Section>
                        <List thumbnailList>
                            {enrollment.materials?.map(material =>
                                <List.Item
                                    key={material.id}
                                    component={Link}
                                    to={material.url}
                                    graphic={<img src={material.imageUrl} />}
                                    text={material.title}
                                />
                            )}
                        </List>
                    </Card.Section>
                }
            </Card>
        </div >
    );
}