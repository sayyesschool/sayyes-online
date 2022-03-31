import { useCallback } from 'react';

import { useFormData } from 'shared/hooks/form';
import Form from 'shared/components/form';
import FormInput from 'shared/components/form-input';
import FormSelect from 'shared/components/form-select';

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
            <FormSelect
                name="age"
                value={data.age}
                label="Возраст"
                options={ageOptions}
                fluid
                required
                onChange={handleChange}
            />

            <FormSelect
                name="domain"
                value={data.domain}
                label="Направление"
                options={domainOptions}
                fluid
                required
                onChange={handleChange}
            />

            <FormSelect
                name="teacher"
                value={data.teacher}
                label="Тип преподавателя"
                options={teacherOptions}
                fluid
                required
                onChange={handleChange}
            />

            <FormInput
                type="number"
                name="numberOfLessons"
                value={data.numberOfLessons}
                label="Кол-во уроков"
                fluid
                onChange={handleChange}
            />

            <FormInput
                type="number"
                name="pricePerLesson"
                value={data.pricePerLesson}
                label="Стоимость урока, руб."
                fluid
                onChange={handleChange}
            />

            <FormInput
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