import { Dialog, Text } from 'shared/components/ui';

export default function HelpDialog(props) {
    return (
        <Dialog title="How to start a meeting" {...props}>
            <Text>To start a meeting just click the <b>Start</b> button. You will be prompted to open the Zoom app. Click OK and the meeting should start automatically without the login or password.</Text>
            <Text>The meeting <em>might</em> not start automatically and you will be asked to sign in. Click the sign in button. The login is <i>club@sayes.ru</i> and the password is <i>h3*IL^B2myw*</i>. The Zoom app should open and the meeting should start.</Text>
            <Text>If you are still experiencing problems starting the meeting, just open up the Zoom app, and <b>log in to the club account</b> using the login and password provided above. Find your meeting and start it.</Text>
        </Dialog>
    );
}