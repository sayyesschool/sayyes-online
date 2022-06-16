import classnames from 'classnames';
import {
    Button,
    Flex,
    Text
} from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import Icon from 'shared/components/icon';
import AudioPlayer from 'shared/components/audio-player';

import './index.scss';

export default function AudioContent({ audio, className, ...props }) {
    const [isScriptOpen, toggleScriptOpen] = useBoolean(false);

    const classNames = classnames('audio-content', className);

    return (
        <div className={classNames} {...props}>
            <Flex space="between">
                <AudioPlayer
                    src={audio?.url}
                    width="100%"
                />

                {audio?.script &&
                    <Button
                        icon={<Icon>{isScriptOpen ? 'subtitles_off' : 'subtitles'}</Icon>}
                        iconOnly
                        text
                        onClick={toggleScriptOpen}
                    />
                }
            </Flex>

            {audio?.script && isScriptOpen &&
                <>
                    <Text size="small">Скрипт:</Text>
                    <Text as="article" className="audio-script" dangerouslySetInnerHTML={{ __html: audio.script }} />
                </>
            }
        </div>
    );
}