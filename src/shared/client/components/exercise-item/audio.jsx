import { useContext } from 'react';

import MediaContext from 'shared/contexts/media';
import { useBoolean } from 'shared/hooks/state';
import AudioPlayer from 'shared/components/audio-player';
import Content from 'shared/components/content';
import { Button, Icon } from 'shared/ui-components';

import './audio.scss';

export default function AudioItem({ url, script, className }) {
    const context = useContext(MediaContext);

    const [isScriptOpen, toggleScriptOpen] = useBoolean(false);

    return (
        <div className={className}>
            <AudioPlayer
                ref={context.audioPlayerRef}
                className="AudioItem__player"
                src={url}
                crossOrigin="anonymous"
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
                        <Content content={script} html />
                    }
                </div>
            }
        </div>
    );
}