import React from 'react';
import {
    Avatar,
    Icon,
    IconButton,
    Layout,
    List,
    TextField,
    Typography
} from 'mdc-react';

export default function Conversation({ messages }) {
    return (
        <section>
            <List avatarList twoLine>
                {messages.map(message =>
                    <>
                        <List.Item
                            graphic={<Avatar text="РС" />}
                            primaryText={message.user}
                            secondaryText={message.datetime}
                        />
                        <Typography className="message-content" variant="body2">{message.content}</Typography>
                    </>
                )}
            </List>

            <Layout>
                <TextField />

                <IconButton
                    icon={<Icon>send</Icon>}
                />
            </Layout>
        </section>
    );
}