import { Link } from 'react-router-dom';

import { Checkbox, Table } from 'shared/ui-components';

const columns = [
    {
        key: 'image',
        text: 'Изображение'
    },
    {
        key: 'title',
        text: 'Название'
    },
    {
        key: 'level',
        text: 'Уровень'
    },
    {
        key: 'published',
        text: 'Опубликовано'
    }
];

export default function MaterialsTable({ materials }) {
    return (
        <Table className="material-table">
            <Table.Row header>
                {columns.map(column =>
                    <Table.Cell
                        key={column.key}
                        content={column.title}
                    />
                )}
            </Table.Row>

            {materials.map(material =>
                <Table.Row key={material.id}>
                    <Table.Cell
                        content={
                            <img src={material.imageUrl} />
                        }
                    />

                    <Table.Cell
                        content={
                            <Link to={material.uri}>
                                {material.title}
                            </Link>
                        }
                    />

                    <Table.Cell
                        content={material.level || '[Уровень не назначен]'}
                    />

                    <Table.Cell
                        content={
                            <Checkbox
                                name="published"
                                checked={material.published}
                                toggle
                            />
                        }
                    />
                </Table.Row>
            )}
        </Table>
    );
}