import classnames from 'classnames';
import {
    Card
} from 'mdc-react';

import VideoPlayer from 'shared/components/video-player';

import './index.scss';

export default function VideoContent({ audio, className, ...props }) {
    const classNames = classnames('video-content', className);

    return (
        <section className={classNames} {...props}>
            <Card outlined>
                <VideoPlayer
                    id="video-player"
                    src={exercise.video.url}
                    controls
                    options={{
                        stretching: 'fill'
                    }}
                />
            </Card>
        </section>
    );
}