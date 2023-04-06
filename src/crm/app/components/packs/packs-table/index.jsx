import { IconButton, Table } from 'shared/ui-components';
import { ageLabel, domainLabel, teacherLabel } from 'shared/data/pack';

const columns = [
    { key: 'age', content: 'Возраст' },
    { key: 'domain', content: 'Направление' },
    { key: 'numberOfLessons', content: 'Кол-во уроков', numeric: true },
    { key: 'pricePerLesson', content: 'Стоимость урока, руб.', numeric: true },
    { key: 'totalPrice', content: 'Стоимость пакета, руб.', numeric: true },
    { key: 'lessonDuration', content: 'Прод-ть урока, мин.', numeric: true },
    { key: 'teacher', content: 'Тип преподавателя' },
    { key: 'actions' }
];

export default function PacksTable({ packs, onEdit, onDelete }) {
    return (
        <Table className="sy-PacksTable">
            <Table.Head>
                <Table.Row header>
                    {columns.map(col =>
                        <Table.Cell
                            key={col.key}
                            content={col.content}
                            header
                        />
                    )}
                </Table.Row>
            </Table.Head>

            <Table.Body>
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

                        <Table.Cell>
                            <IconButton.Group
                                buttons={[
                                    {
                                        key: 'edit',
                                        icon: 'edit',
                                        title: 'Изменить',
                                        onClick: () => onEdit(pack)
                                    },
                                    {
                                        key: 'delete',
                                        icon: 'delete',
                                        title: 'Удалить',
                                        onClick: () => onDelete(pack)
                                    }
                                ]}
                                color="neutral"
                                size="sm"
                                variant="plain"
                            />
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}