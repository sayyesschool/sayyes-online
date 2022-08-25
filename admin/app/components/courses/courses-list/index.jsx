import { Link } from 'react-router-dom';
import { Button, Image, List } from '@fluentui/react-northstar';

import Icon from 'shared/components/icon';

export default function CoursesList({ courses, onItemClick, onDelete }) {
    return (
        <List className="courses-list">
            {courses.map(course =>
                <List.Item
                    key={course.id}
                    as={onItemClick ? undefined : Link}
                    to={onItemClick ? undefined : course.url}
                    media={
                        <Image src={course.imageUrl} alt="" />
                    }
                    header={course.title}
                    endMedia={onDelete &&
                        <Button
                            title="Убрать курс"
                            icon={<Icon>remove</Icon>}
                            iconOnly
                            text
                            onClick={() => onDelete(course.id)}
                        />
                    }
                    onClick={onItemClick && (() => onItemClick(course))}
                />
            )}
        </List>
    );
}