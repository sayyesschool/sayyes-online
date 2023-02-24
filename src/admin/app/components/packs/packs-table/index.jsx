import { Button, Icon, Table } from 'shared/ui-components';

import { ageLabel, domainLabel, teacherLabel } from 'app/data/pack';

const columns = [
    { key: 'age', content: 'Возраст' },
    { key: 'domain', content: 'Направление' },
    { key: 'numberOfLessons', content: 'Кол-во уроков', numeric: true },
    { key: 'pricePerLesson', content: 'Стоимость урока, руб.', numeric: true },
    { key: 'totalPrice', content: 'Стоимость пакета, руб.', numeric: true },
    { key: 'lessonDuration', content: 'Прод-ть урока, мин.', numeric: true },
    { key: 'teacher', content: 'Тип преподавателя' }
];

export default function PacksTable({ packs, onEdit, onDelete }) {
    return (
        <Table id="packs-table">
            <Table.Row header>
                {columns.map(col =>
                    <Table.Cell
                        key={col.key}
                        content={col.content}
                    />
                )}

                <Table.Cell />
            </Table.Row>

            {packs.map(pack =>
                <Table.Row key={pack.id}>
                    <Table.Cell
                        content={ageLabel[pack.age]}
                    />

                    <Table.Cell
                        content={domainLabel[pack.domain]}
                    />

                    <Table.Cell
                        content={pack.numberOfLessons}
                    />

                    <Table.Cell
                        content={pack.pricePerLesson}
                    />

                    <Table.Cell
                        content={pack.price}
                    />

                    <Table.Cell
                        content={pack.lessonDuration}
                    />

                    <Table.Cell
                        content={teacherLabel[pack.teacher]}
                    />

                    <Table.Cell
                        className="ui-table__cell--actions"
                        content={
                            <Button.Group
                                buttons={[
                                    {
                                        key: 'edit',
                                        icon: <Icon>edit</Icon>,
                                        iconOnly: true,
                                        flat: true,
                                        text: true,
                                        title: 'Изменить',
                                        onClick: () => onEdit(pack)
                                    },
                                    {
                                        key: 'delete',
                                        icon: <Icon>delete</Icon>,
                                        iconOnly: true,
                                        flat: true,
                                        text: true,
                                        title: 'Удалить',
                                        onClick: () => onDelete(pack)
                                    }
                                ]}
                            />
                        }
                    />
                </Table.Row>
            )}
        </Table>
    );
}