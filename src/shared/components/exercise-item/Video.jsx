import Content from 'shared/components/content';
import VideoPlayer from 'shared/components/video-player';
import { useBoolean } from 'shared/hooks/state';
import { Button, Icon } from 'shared/ui-components';

import './Video.scss';

export default function VideoItem({
    id,
    url,
    provider,
    script,
    className
}) {
    const [isScriptOpen, toggleScriptOpen] = useBoolean(false);

    return (
        <div className={className}>
            <VideoPlayer
                id={'video-' + id}
                className="VideoItem__player"
                src={url}
                provider={provider}
                options={{
                    stretching: 'fill'
                }}
                controls
            />

            {script &&
                <div className="VideoItem__script">
                    <Button
                        icon={<Icon>{isScriptOpen ? 'subtitles_off' : 'subtitles'}</Icon>}
                        content={isScriptOpen ? 'Закрыть текст к видео' : 'Показать текст к видео'}
                        variant="plain"
                        size="sm"
                        onClick={toggleScriptOpen}
                    />

                    {isScriptOpen &&
                        <Content content={script} html />
                    }
                </div>
            }
        </div>
    );
}