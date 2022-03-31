import classnames from 'classnames';
import {
    Box,
    Button,
    Flex,
    Segment,
    Text
} from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import Icon from 'shared/components/material-icon';
import AudioPlayer from 'shared/components/audio-player';

import './index.scss';

export default function AudioContent({ audio, className, ...props }) {
    const [isScriptOpen, toggleScriptOpen] = useBoolean(false);

    const classNames = classnames('audio-content', className);

    return (
        <Segment as="section" className={classNames} {...props}>
            <Flex space="between">
                <AudioPlayer
                    src={audio.src}
                    width="100%"
                />

                {audio.script &&
                    <Button
                        icon={<Icon>{isScriptOpen ? 'subtitles_off' : 'subtitles'}</Icon>}
                        iconOnly
                        text
                        onClick={toggleScriptOpen}
                    />
                }
            </Flex>

            {audio.script && isScriptOpen &&
                <Text as="article" className="audio-script" dangerouslySetInnerHTML={{ __html: audio.script }} />
            }
        </Segment>
    );
}