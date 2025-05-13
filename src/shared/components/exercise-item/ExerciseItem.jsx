import { memo } from 'react';

import classnames from 'shared/utils/classnames';
import { capitalize } from 'shared/utils/string';

import AudioItem from './Audio';
import BooleanItem from './Boolean';
import ChoiceItem from './Choice';
import DividerItem from './Divider';
import EssayItem from './Essay';
import FIBItem from './Fib';
import ImageItem from './Image';
import InputItem from './Input';
import TextItem from './Text';
import VideoItem from './Video';
import VocabularyItem from './VocabularyItem';

const Components = {
    audio: AudioItem,
    boolean: BooleanItem,
    choice: ChoiceItem,
    divider: DividerItem,
    essay: EssayItem,
    fib: FIBItem,
    image: ImageItem,
    input: InputItem,
    text: TextItem,
    video: VideoItem,
    vocabulary: VocabularyItem
};

function ExerciseItem({
    item,
    checked,
    completed,
    state,
    readOnly,
    onUpdateState
}) {
    const Component = Components[item?.type];

    const classNames = classnames('ExerciseItem', `${capitalize(item.type)}Item`);

    return Component ? (
        <Component
            id={item.id}
            className={classNames}
            {...item.props}
            checked={checked}
            completed={completed}
            state={state}
            readOnly={readOnly}
            onUpdateState={onUpdateState}
        />
    ) : null;
}

export default memo(ExerciseItem);