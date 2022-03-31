import { createElement, useCallback, useRef } from 'react';
import { Button, Form } from '@fluentui/react-northstar';
import classnames from 'classnames';

import useForm from 'shared/hooks/form';
import Icon from 'shared/components/material-icon';
import ImagesField from 'shared/components/images-field';
import PageSection from 'shared/components/page-section';
import TextEditor from 'shared/components/text-editor';

import BooleanExerciseContent from './boolean';
import ChoiceExerciseContent from './choice';
import EssayExerciseContent from './essay';
import FIBExerciseContent from './fib';
import InputExerciseContent from './input';
import TextExerciseContent from './text';

import './index.scss';

const componentsByType = {
    boolean: BooleanExerciseContent,
    choice: ChoiceExerciseContent,
    essay: EssayExerciseContent,
    fib: FIBExerciseContent,
    input: InputExerciseContent,
    text: TextExerciseContent
};

const defaultData = {
    text: '',
    images: [],
    video: {},
    audio: {},
    items: []
};

export default function ExerciseContent({ exercise, onUpdate }) {
    const textEditorRef = useRef();

    const [data, handleChange, setData] = useForm({
        ...defaultData,
        ...exercise
    }, [exercise.type]);

    const handleUpdate = useCallback(() => {
        setData(data => {
            const text = textEditorRef.current.editor.getData();

            onUpdate({
                ...data,
                text
            });

            return data;
        });
    }, [exercise, setData]);

    const handleUpdateItems = useCallback(items => {
        setData(data => ({
            ...data,
            ...items
        }));
    }, [setData]);

    const classNames = classnames('exercise-content', `exercise-content--${exercise.type}`);

    return (
        <PageSection
            className={classNames}
            title="Содержание"
            actions={
                <Button
                    icon={<Icon>save</Icon>}
                    iconOnly
                    text
                    onClick={handleUpdate}
                />
            }
        >
            <TextEditor
                ref={textEditorRef}
                value={exercise.text}
            />

            <Form>
                <ImagesField
                    name="images"
                    label="Изображения"
                    images={exercise.images}
                    onChange={handleChange}
                />

                {exercise.type &&
                    createElement(componentsByType[exercise.type], {
                        key: exercise.id,
                        exercise: data,
                        onUpdate: handleUpdateItems
                    })
                }
            </Form>
        </PageSection>
    );
}