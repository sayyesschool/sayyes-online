import { createElement, memo } from 'react';
import classnames from 'classnames';

import AudioItem from './Audio';
import BooleanItem from './Boolean';
import ChoiceItem from './Choice';
import DirectionsItem from './Directions';
import DividerItem from './Divider';
import EssayItem from './Essay';
import FIBItem from './FIB';
import ImageItem from './Image';
import InputItem from './Input';
import TextItem from './Text';
import VideoItem from './Video';

const Components = {
    audio: AudioItem,
    boolean: BooleanItem,
    choice: ChoiceItem,
    directions: DirectionsItem,
    divider: DividerItem,
    essay: EssayItem,
    fib: FIBItem,
    image: ImageItem,
    input: InputItem,
    text: TextItem,
    video: VideoItem
};

export default memo(function ExerciseItem({
    item,
    checked,
    completed,
    state,
    onUpdateState,
    ...props
}) {
    const classNames = classnames('ExerciseItem', getItemClassName(item.type));

    return (
        <div id={item.id} className={classNames} {...props}>
            {item.type && Components[item.type] &&
                createElement(Components[item.type], {
                    item,
                    checked,
                    completed,
                    state,
                    onUpdateState
                })
            }
        </div>
    );
});

function getItemClassName(type) {
    return `Exercise${type[0].toUpperCase() + type.slice(1)}Item`;
}