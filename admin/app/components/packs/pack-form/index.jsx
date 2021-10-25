import { useCallback } from 'react';
import {
    Layout,
    Select,
    TextField
} from 'mdc-react';

import useForm from 'shared/hooks/form';
import Form from 'shared/components/form';

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
    const [data, handleChange] = useForm({
        ...defaultPack,
        ...pack
    });

    const handleSubmit = useCallback(() => {
        onSubmit(data);
    }, [data]);

    return (
        <Form className="pack-form" onSubmit={handleSubmit} {...props}>
            <Layout column>
                <Select
                    name="age"
                    value={data.age}
                    label="Возраст"
                    options={ageOptions}
                    filled
                    required
                    onChange={handleChange}
                />

                <Select
                    name="domain"
                    value={data.domain}
                    label="Направление"
                    options={domainOptions}
                    filled
                    required
                    onChange={handleChange}
                />

                <Select
                    name="teacher"
                    value={data.teacher}
                    label="Тип преподавателя"
                    options={teacherOptions}
                    filled
                    required
                    onChange={handleChange}
                />

                <TextField
                    type="number"
                    name="numberOfLessons"
                    value={data.numberOfLessons}
                    label="Кол-во уроков"
                    filled
                    onChange={handleChange}
                />

                <TextField
                    type="number"
                    name="pricePerLesson"
                    value={data.pricePerLesson}
                    label="Стоимость урока, руб."
                    filled
                    onChange={handleChange}
                />

                <TextField
                    type="number"
                    name="lessonDuration"
                    value={data.lessonDuration}
                    label="Продолжительность урока, мин."
                    filled
                    onChange={handleChange}
                />
            </Layout>
        </Form>
    );
}