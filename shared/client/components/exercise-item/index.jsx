import { createElement, memo } from 'react';
import classnames from 'classnames';

import AudioItem from './audio';
import BooleanItem from './boolean';
import ChoiceItem from './choice';
import DirectionsItem from './directions';
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
    directions: DirectionsItem,
    divider: DividerItem,
    essay: EssayItem,
    fib: FIBItem,
    image: ImageItem,
    images: ImagesItem,
    input: InputItem,
    text: TextItem,
    video: VideoItem
};

export default memo(function ExerciseItem({
    item,
    checked,
    state,
    onUpdateState,
    ...props
}) {
    const classNames = classnames('exercise-item', `exercise-item--${item.type}`);

    return (
        <div id={item.id} className={classNames} {...props}>
            {item.type && Components[item.type] &&
                createElement(Components[item.type], {
                    item,
                    checked,
                    state,
                    onUpdateState
                })
            }
        </div>
    );
});