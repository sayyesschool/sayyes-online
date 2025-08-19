import { createElement, useCallback, useMemo, useRef, useState } from 'react';

import { ContentEditorContext } from 'shared/components/content-editor';
import { Flex, IconButton, Text } from 'shared/ui-components';
import classnames from 'shared/utils/classnames';
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
import VocabularyItem from './VocabularyItem';

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
    video: VideoItem,
    vocabulary: VocabularyItem
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
    video: 'Видео',
    vocabulary: 'Список слов'
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

    const editorContextValue = useMemo(() => ({
        uploadPath: `courses/${item.courseId}/images`
    }), [item.courseId]);

    const classNames = classnames('ExerciseItemForm', `${capitalize(item.type)}ItemForm`);

    return (
        <form
            id={item.id}
            className={classNames}
            {...props}
        >
            <Flex
                space="between"
                alignItems="center"
                justifyContent="space-between"
                sx={{ padding: '4px 4px 4px 8px' }}
            >
                <Text>{labelsByType[item.type]}</Text>

                <IconButton.Group
                    buttons={[
                        {
                            key: 'save',
                            icon: 'save',
                            title: 'Сохранить',
                            disabled: isLoading,
                            onClick: handleSubmit
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

            <ContentEditorContext.Provider value={editorContextValue}>
                {createElement(Components[item.type], {
                    key: item.id,
                    ref: itemRef,
                    ...item.props
                })}
            </ContentEditorContext.Provider>
        </form>
    );
}