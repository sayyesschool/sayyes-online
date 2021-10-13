import React from 'react';
import classnames from 'classnames';
import {
    Card,
    IconButton,
    Typography
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import AudioPlayer from 'shared/components/audio-player';

import './index.scss';

export default function AudioContent({ audio, className, ...props }) {
    const [isScriptOpen, toggleScriptOpen] = useBoolean(false);

    const classNames = classnames('audio-content', className);

    return (
        <section className={classNames} {...props}>
            <Card outlined>
                <Card.Section primary>
                    <AudioPlayer
                        src={audio.url}
                        width="100%"
                    />

                    {audio.script &&
                        <IconButton
                            icon={isScriptOpen ? 'subtitles_off' : 'subtitles'}
                            onClick={toggleScriptOpen}
                        />
                    }
                </Card.Section>

                {audio.script && isScriptOpen &&
                    <Card.Section secondary>
                        <Typography type="overline" noMargin>Скрипт</Typography>

                        <article className="audio-script" dangerouslySetInnerHTML={{ __html: audio.script }} />
                    </Card.Section>
                }
            </Card>
        </section>
    );
}