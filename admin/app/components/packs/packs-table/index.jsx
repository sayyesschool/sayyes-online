import {
    DataTable
} from 'mdc-react';

import MenuButton from 'shared/components/menu-button';

import { ageLabel, domainLabel, teacherLabel } from 'app/data/pack';

export default function LessonTable({ packs, onEdit, onDelete }) {
    return (
        <DataTable id="packs-table">
            <DataTable.Header>
                <DataTable.HeaderRow>
                    {columns.map(col =>
                        <DataTable.HeaderCell
                            key={col.key}
                            numeric={col.numeric}
                        >
                            {col.text}
                        </DataTable.HeaderCell>
                    )}
                </DataTable.HeaderRow>
            </DataTable.Header>

            <DataTable.Content>
                {packs.map(pack =>
                    <DataTable.Row key={pack.id}>
                        <DataTable.Cell>
                            {ageLabel[pack.age]}
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {domainLabel[pack.domain]}
                        </DataTable.Cell>

                        <DataTable.Cell numeric>
                            {pack.numberOfLessons}
                        </DataTable.Cell>

                        <DataTable.Cell numeric>
                            {pack.pricePerLesson}
                        </DataTable.Cell>

                        <DataTable.Cell numeric>
                            {pack.price}
                        </DataTable.Cell>

                        <DataTable.Cell numeric>
                            {pack.lessonDuration}
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {teacherLabel[pack.teacher]}
                        </DataTable.Cell>

                        <DataTable.Cell numeric>
                            <MenuButton
                                items={[
                                    {
                                        key: 'edit',
                                        text: 'Изменить',
                                        onClick: () => onEdit(pack)
                                    },
                                    {
                                        key: 'delete',
                                        text: 'Удалить',
                                        onClick: () => onDelete(pack)
                                    }
                                ]}
                            />
                        </DataTable.Cell>
                    </DataTable.Row>
                )}
            </DataTable.Content>
        </DataTable>
    );
}

const columns = [
    {
        key: 'age',
        text: 'Возраст'
    },
    {
        key: 'domain',
        text: 'Направление'
    },
    {
        key: 'numberOfLessons',
        text: 'Кол-во уроков',
        numeric: true
    },
    {
        key: 'pricePerLesson',
        text: 'Стоимость урока, руб.',
        numeric: true
    },
    {
        key: 'totalPrice',
        text: 'Стоимость пакета, руб.',
        numeric: true
    },
    {
        key: 'lessonDuration',
        text: 'Прод-ть урока, мин.',
        numeric: true
    },
    {
        key: 'teacher',
        text: 'Тип преподавателя'
    }
];