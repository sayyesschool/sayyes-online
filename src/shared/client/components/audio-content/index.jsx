import classnames from 'classnames';

import { useBoolean } from 'shared/hooks/state';
import AudioPlayer from 'shared/components/audio-player';
import TextContent from 'shared/components/text-content';
import { Button, Flex, Text } from 'shared/ui-components';

import './index.scss';

export default function AudioContent({ audio, className, ...props }) {
    const [isScriptOpen, toggleScriptOpen] = useBoolean(false);

    const classNames = classnames('AudioContent', className);

    return (
        <div className={classNames} {...props}>
            <Flex gap="smallest">
                <AudioPlayer
                    src={audio?.url}
                />

                {audio?.script &&
                    <Button
                        icon={isScriptOpen ? 'subtitles_off' : 'subtitles'}
                        color="neutral"
                        size="small"
                        variant="plain"
                        onClick={toggleScriptOpen}
                    />
                }
            </Flex>

            {audio?.script && isScriptOpen &&
                <div className="AudioContent__text">
                    <Text type="body2">Скрипт:</Text>
                    <TextContent content={audio.script} />
                </div>
            }
        </div>
    );
}