import { Fragment } from 'react';
import { textToJsx, htmlToJsx } from 'shared/libs/exercise';

export default function FIBExerciseContent({ exercise }) {
    return (
        <form autoComplete="off">
            {exercise.items.map((item, index) =>
                item.html ?
                    <Fragment key={index}>
                        {htmlToJsx(item.text)}
                    </Fragment>
                    :
                    <p key={index}>{textToJsx(item.text)}</p>
            )}
        </form>
    );
}