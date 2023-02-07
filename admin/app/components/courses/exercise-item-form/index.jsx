import { createElement, useCallback, useRef, useState } from 'react';

import { Button, Flex, Icon, Text } from 'shared/ui-components';

import AudioItem from './audio';
import BooleanItem from './boolean';
import ChoiceItem from './choice';
import DividerItem from './divider';
import DirectionsItem from './directions';
import EssayItem from './essay';
import FIBItem from './fib';
import ImageItem from './image';
import ImagesItem from './images';
import InputItem from './input';
import InputItem2 from './input2';
import TextItem from './text';
import VideoItem from './video';

import './index.scss';

const Components = {
    audio: AudioItem,
    boolean: BooleanItem,
    choice: ChoiceItem,
    divider: DividerItem,
    directions: DirectionsItem,
    essay: EssayItem,
    fib: FIBItem,
    image: ImageItem,
    images: ImagesItem,
    input: InputItem,
    input2: InputItem2,
    text: TextItem,
    video: VideoItem
};

const labelsByType = {
    audio: 'Аудио',
    boolean: 'Да/Нет',
    choice: 'Выбор',
    divider: 'Разделитель',
    directions: 'Инструкции',
    essay: 'Эссе',
    fib: 'Заполнить пробелы',
    image: 'Изображение',
    images: 'Изображения',
    input: 'Ввод',
    input2: 'Ввод (новый)',
    text: 'Текст',
    video: 'Видео'
};

const defaultItem = {
    type: '',
    title: ''
};

export default function ExerciseItemForm({ item = defaultItem, onCancel, onSubmit, ...props }) {
    const itemRef = useRef();

    const [isLoading, setLoading] = useState();

    const handleSubmit = useCallback(event => {
        event.preventDefault();

        const data = itemRef.current.data;

        setLoading(true);

        if (data instanceof Promise) {
            data.then(onSubmit);
        } else {
            onSubmit(data);
        }
    }, [onSubmit]);

    return (
        <form id={item.id} className={`exercise-item-form exercise-item-form--${item.type}`} onSubmit={handleSubmit} {...props}>
            <Flex space="between" vAlign="center" styles={{ paddingLeft: '.5rem' }}>
                <Text>{labelsByType[item.type]}</Text>

                <Button.Group
                    buttons={[
                        {
                            key: 'save',
                            type: 'submit',
                            form: 'exercise-item-form',
                            icon: <Icon>save</Icon>,
                            iconOnly: true,
                            text: true,
                            title: 'Сохранить',
                            loading: isLoading
                        },
                        {
                            key: 'close',
                            type: 'button',
                            icon: <Icon>close</Icon>,
                            iconOnly: true,
                            text: true,
                            title: 'Закрыть',
                            onClick: onCancel
                        }
                    ]}
                />
            </Flex>

            {createElement(Components[item.type], {
                key: item.id,
                ref: itemRef,
                item
            })}
        </form>
    );
}