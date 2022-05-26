import {
    Segment
} from '@fluentui/react-northstar';
import classnames from 'classnames';

import VideoPlayer from 'shared/components/video-player';

import './index.scss';

export default function VideoContent({ video = {}, className, ...props }) {
    const classNames = classnames('video-content', className);

    return (
        <div className={classNames} {...props}>
            <VideoPlayer
                id="video-player"
                src={video.src}
                controls
                options={{
                    stretching: 'fill'
                }}
            />
        </div>
    );
}