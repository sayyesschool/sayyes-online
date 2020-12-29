import React from 'react';
import Video from 'twilio-video';
import {
    Card,
    Typography
} from 'mdc-react';

export default function UnsupportedBrowserWarning({ children }) {
    if (!Video.isSupported) {
        return (
            <div className="unsupported-browser-warning">
                <Card>
                    <Typography type="headline6" className={classes.heading}>Browser or context not supported</Typography>

                    <Typography> Please open this application in one of the <a href="https://www.twilio.com/docs/video/javascript#supported-browsers" target="_blank" rel="noopener">supported browsers</a>.</Typography>
                </Card>
            </div>
        );
    }

    return children;
}
