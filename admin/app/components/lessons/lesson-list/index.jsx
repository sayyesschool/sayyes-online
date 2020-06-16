import React from 'react';
import { Link } from 'react-router-dom';
import {
    DataTable, DataTableHeader, DataTableContent, DataTableRow, DataTableCell
} from 'mdc-react';

export default function LessonList({ lessons }) {
    return (
        <DataTable id="lesson-list">
            <DataTableHeader>
                <DataTableRow header>
                    <DataTableCell header>Название</DataTableCell>
                    <DataTableCell header>Дата и время</DataTableCell>
                    <DataTableCell header>Студент</DataTableCell>
                    <DataTableCell header>Преподаватель</DataTableCell>
                </DataTableRow>
            </DataTableHeader>

            <DataTableContent>
                {lessons.map(lesson =>
                    <DataTableRow key={lesson.id}>
                        <DataTableCell>
                            <Link to={`/lessons/${lesson.id}`}>
                                {lesson.title}
                                Урок
                            </Link>
                        </DataTableCell>

                        <DataTableCell>{lesson.datetime}</DataTableCell>

                        <DataTableCell>
                            {lesson.student.fullname}
                        </DataTableCell>

                        <DataTableCell>
                            {lesson.teacher ?
                                lesson.teacher.fullname
                                :
                                '[Преподаватель не назначен]'
                            }
                        </DataTableCell>
                    </DataTableRow>
                )}
            </DataTableContent>
        </DataTable>
    );
}