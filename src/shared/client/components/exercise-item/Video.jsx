import { useBoolean } from 'shared/hooks/state';
import Content from 'shared/components/content';
import VideoPlayer from 'shared/components/video-player';
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
                controls
                options={{
                    stretching: 'fill'
                }}
            />

            {script &&
                <div className="VideoItem__script">
                    <Button
                        icon={<Icon>{isScriptOpen ? 'subtitles_off' : 'subtitles'}</Icon>}
                        content={isScriptOpen ? 'Закрыть скрипт' : 'Показать скрипт'}
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