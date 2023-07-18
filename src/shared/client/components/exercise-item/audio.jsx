import { useBoolean } from 'shared/hooks/state';
import AudioPlayer from 'shared/components/audio-player';
import TextContent from 'shared/components/text-content';
import { Button, Flex, Icon } from 'shared/ui-components';

import './audio.scss';

export default function AudioItem({ url, script, className }) {
    const [isScriptOpen, toggleScriptOpen] = useBoolean(false);

    return (
        <div className={className}>
            <AudioPlayer
                className="AudioItem__player"
                src={url}
            />

            {script &&
                <div className="AudioItem__script">
                    <Button
                        icon={<Icon>{isScriptOpen ? 'subtitles_off' : 'subtitles'}</Icon>}
                        content={isScriptOpen ? 'Закрыть скрипт' : 'Показать скрипт'}
                        variant="plain"
                        size="sm"
                        onClick={toggleScriptOpen}
                    />

                    {isScriptOpen &&
                        <TextContent content={script} />
                    }
                </div>
            }
        </div>
    );
}