import { useCallback } from 'react';

import { useFormData } from 'shared/hooks/form';
import Form from 'shared/ui-components/form';

import { ageOptions, domainOptions, teacherOptions } from 'app/data/pack';

import './index.scss';

const defaultPack = {
    age: '',
    domain: '',
    numberOfLessons: 4,
    pricePerLesson: 0,
    lessonDuration: 60,
    teacher: ''
};

export default function PackForm({ pack = {}, onSubmit, ...props }) {
    const { data, handleChange } = useFormData({
        ...defaultPack,
        ...pack
    });

    const handleSubmit = useCallback(() => {
        onSubmit(data);
    }, [data]);

    return (
        <Form className="pack-form" onSubmit={handleSubmit} {...props}>
            <Form.Select
                name="age"
                value={data.age}
                label="Возраст"
                options={ageOptions}
                fluid
                required
                onChange={handleChange}
            />

            <Form.Select
                name="domain"
                value={data.domain}
                label="Направление"
                options={domainOptions}
                fluid
                required
                onChange={handleChange}
            />

            <Form.Select
                name="teacher"
                value={data.teacher}
                label="Тип преподавателя"
                options={teacherOptions}
                fluid
                required
                onChange={handleChange}
            />

            <Form.Input
                type="number"
                name="numberOfLessons"
                value={data.numberOfLessons}
                label="Кол-во уроков"
                fluid
                onChange={handleChange}
            />

            <Form.Input
                type="number"
                name="pricePerLesson"
                value={data.pricePerLesson}
                label="Стоимость урока, руб."
                fluid
                onChange={handleChange}
            />

            <Form.Input
                type="number"
                name="lessonDuration"
                value={data.lessonDuration}
                label="Продолжительность урока, мин."
                fluid
                onChange={handleChange}
            />
        </Form>
    );
}