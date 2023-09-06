import { memo } from 'react';
import classnames from 'classnames';

import { capitalize } from 'shared/utils/string';

import AudioItem from './audio';
import BooleanItem from './boolean';
import ChoiceItem from './choice';
import DividerItem from './divider';
import EssayItem from './essay';
import FIBItem from './fib';
import ImageItem from './image';
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
    input: InputItem,
    text: TextItem,
    video: VideoItem
};

function ExerciseItem({
    item,
    checked,
    completed,
    state,
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
            onUpdateState={onUpdateState}
        />
    ) : null;
}

export default memo(ExerciseItem);