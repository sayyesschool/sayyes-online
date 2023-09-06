import { createElement, useCallback, useRef, useState } from 'react';
import classnames from 'classnames';

import { IconButton, Flex, Text } from 'shared/ui-components';
import { capitalize } from 'shared/utils/string';

import AudioItem from './audio';
import BooleanItem from './boolean';
import ChoiceItem from './choice';
import DividerItem from './divider';
import EssayItem from './essay';
import FIBItem from './fib';
import ImageItem from './image';
import ImagesItem from './images';
import InputItem from './input';
import TextItem from './text';
import VideoItem from './video';

import './index.scss';

const Components = {
    audio: AudioItem,
    boolean: BooleanItem,
    choice: ChoiceItem,
    divider: DividerItem,
    essay: EssayItem,
    fib: FIBItem,
    image: ImageItem,
    images: ImagesItem,
    input: InputItem,
    text: TextItem,
    video: VideoItem
};

const labelsByType = {
    audio: 'Аудио',
    boolean: 'Да/Нет',
    choice: 'Выбор',
    divider: 'Разделитель',
    essay: 'Эссе',
    fib: 'Заполнить пробелы',
    image: 'Изображение',
    images: 'Изображения',
    input: 'Ввод',
    text: 'Текст',
    video: 'Видео'
};

const defaultItem = {
    type: '',
    props: {}
};

export default function ExerciseItemForm({
    item = defaultItem,
    onCancel,
    onSubmit,
    ...props
}) {
    const itemRef = useRef();

    const [isLoading, setLoading] = useState(false);

    const handleSubmit = useCallback(event => {
        event.preventDefault();

        const file = itemRef.current.file;
        const props = itemRef.current.props || {};

        if (file) {
            file.path = props.path || `courses/${item.courseId}/${item.type}s`;
        }

        const data = { file, props };

        setLoading(true);

        if (data instanceof Promise) {
            data.then(onSubmit);
        } else {
            onSubmit(data);
        }
    }, [item, onSubmit]);

    const classNames = classnames('ExerciseItemForm', `${capitalize(item.type)}ItemForm`);

    return (
        <form
            id={item.id}
            className={classNames}
            onSubmit={handleSubmit}
            {...props}
        >
            <Flex space="between" alignItems="center" justifyContent="space-between" sx={{ padding: '4px 4px 4px 8px' }}>
                <Text>{labelsByType[item.type]}</Text>

                <IconButton.Group
                    buttons={[
                        {
                            key: 'save',
                            type: 'submit',
                            icon: 'save',
                            title: 'Сохранить',
                            disabled: isLoading
                        },
                        {
                            key: 'close',
                            type: 'button',
                            icon: 'close',
                            title: 'Закрыть',
                            onClick: onCancel
                        }
                    ]}
                    color="neutral"
                    size="sm"
                    variant="plain"
                />
            </Flex>

            {createElement(Components[item.type], {
                key: item.id,
                ref: itemRef,
                ...item.props
            })}
        </form>
    );
}