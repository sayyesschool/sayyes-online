import React, { useCallback, useState } from 'react';
import {
    Button,
    Card,
    Chip,
    Icon,
    Layout,
    Typography
} from 'mdc-react';

import { useLocalVideo } from 'shared/hooks/twilio';

import './index.scss';

export default function WaitingRoom({ isConnecting, onConnect, ...props }) {
    const previewVideoRef = useLocalVideo();

    const [isAudioOn, setAudioOn] = useState(true);
    const [isVideoOn, setVideoOn] = useState(true);

    const handleConnect = useCallback(() => {
        onConnect({ audio: isVideoOn, video: isVideoOn });
    }, [isAudioOn, isVideoOn]);

    return (
        <div className="waiting-room">
            <header>
                <Typography type="headline4" align="center">Вход в класс</Typography>
            </header>

            <Layout row>
                <Card outlined>
                    <video ref={previewVideoRef} className="media media--preview" />

                    <Card.Actions>
                        <Card.ActionButtons>
                            <Card.Action button>
                                <Chip
                                    icon={<Icon>{isAudioOn ? 'mic' : 'mic_off'}</Icon>}
                                    text={isAudioOn ? 'Отключить звук' : 'Включить звук'}
                                    outlined
                                    onClick={() => setAudioOn(v => !v)}
                                />
                            </Card.Action>

                            <Card.Action button>
                                <Chip
                                    icon={<Icon>{isVideoOn ? 'videocam' : 'videocam_off'}</Icon>}
                                    text={isVideoOn ? 'Отключить видео' : 'Включить видео'}
                                    outlined
                                    onClick={() => setVideoOn(v => !v)}
                                />
                            </Card.Action>
                        </Card.ActionButtons>

                        <Card.ActionButtons>
                            <Button
                                label="Присоединиться"
                                disabled={isConnecting}
                                unelevated
                                onClick={handleConnect}
                            />
                        </Card.ActionButtons>
                    </Card.Actions>
                </Card>

                <div>
                    <img src="https://static.sayes.ru/images/cat/cat-laptop.png" />
                </div>
            </Layout>
        </div>
    );
}