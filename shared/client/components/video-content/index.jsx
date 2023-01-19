import classnames from 'classnames';

import { useBoolean } from 'shared/hooks/state';
import { Button, Flex, Icon, Text } from 'shared/ui-components';
import VideoPlayer from 'shared/components/video-player';

import './index.scss';

export default function VideoContent({ video, className, ...props }) {
    const [isScriptOpen, toggleScriptOpen] = useBoolean(false);

    const classNames = classnames('video-content', className);

    return (
        <div className={classNames} {...props}>
            {video?.url ?
                <VideoPlayer
                    id="video-player"
                    src={video?.url}
                    provider={video?.provider}
                    controls
                    options={{
                        stretching: 'fill'
                    }}
                />
                :
                'Видео'
            }

            {video?.script &&
                <Flex hAlign="start" column>
                    <Button
                        icon={<Icon>{isScriptOpen ? 'subtitles_off' : 'subtitles'}</Icon>}
                        content={isScriptOpen ? 'Закрыть скрипт' : 'Показать скрипт'}
                        text
                        onClick={toggleScriptOpen}
                    />

                    {isScriptOpen &&
                        <Text as="article" className="video-script" dangerouslySetInnerHTML={{ __html: video.script }} />
                    }
                </Flex>
            }
        </div>
    );
}