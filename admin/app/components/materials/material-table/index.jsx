import { Link } from 'react-router-dom';
import {
    DataTable,
    Switch
} from 'mdc-react';

export default function MaterialTable({ materials }) {
    return (
        <DataTable className="material-table">
            <DataTable.Header>
                <DataTable.HeaderRow>
                    <DataTable.HeaderCell>Изображение</DataTable.HeaderCell>
                    <DataTable.HeaderCell>Название</DataTable.HeaderCell>
                    <DataTable.HeaderCell>Уровень</DataTable.HeaderCell>
                    <DataTable.HeaderCell>Опубликовано</DataTable.HeaderCell>
                </DataTable.HeaderRow>
            </DataTable.Header>

            <DataTable.Content>
                {materials.map(material =>
                    <DataTable.Row key={material.id}>
                        <DataTable.Cell>
                            <img src={material.imageUrl} />
                        </DataTable.Cell>

                        <DataTable.Cell>
                            <Link to={material.uri}>
                                {material.title}
                            </Link>
                        </DataTable.Cell>

                        <DataTable.Cell>
                            {material.level || '[Уровень не назначен]'}
                        </DataTable.Cell>

                        <DataTable.Cell numeric>
                            <Switch
                                name="published"
                                checked={material.published}
                            />
                        </DataTable.Cell>
                    </DataTable.Row>
                )}
            </DataTable.Content>
        </DataTable>
    );
}