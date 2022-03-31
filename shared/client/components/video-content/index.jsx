import {
    Segment
} from '@fluentui/react-northstar';
import classnames from 'classnames';

import VideoPlayer from 'shared/components/video-player';

import './index.scss';

export default function VideoContent({ audio, className, ...props }) {
    const classNames = classnames('video-content', className);

    return (
        <Segment as="section" className={classNames} {...props}>
            <VideoPlayer
                id="video-player"
                src={exercise.video.url}
                controls
                options={{
                    stretching: 'fill'
                }}
            />
        </Segment>
    );
}