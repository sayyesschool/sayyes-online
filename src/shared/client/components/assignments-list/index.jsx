import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { IconButton, List } from 'shared/ui-components';

export default function AssignmentsList({ assignments, onRemove }) {
    const handleRemove = useCallback((event, assignmentId) => {
        event.preventDefault();
        event.stopPropagation();

        onRemove(assignmentId);
    }, [onRemove]);

    return (
        <List className="AssignmentsList">
            {assignments.map(assignment =>
                <List.Item
                    key={assignment.id}
                    as={Link}
                    to={assignment.url}
                    // decorator={course.imageUrl &&
                    //     <Image imageUrl={course.imageUrl} alt="" />
                    // }
                    content={assignment.title}
                    endAction={onRemove &&
                        <IconButton
                            icon="remove"
                            title="Удалить задание"
                            color="danger"
                            size="sm"
                            onClick={event => handleRemove(event, assignment.id)}
                        />
                    }
                />
            )}
        </List>
    );
}