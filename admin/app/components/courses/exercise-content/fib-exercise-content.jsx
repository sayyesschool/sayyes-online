import React from 'react';
import { textToJsx, htmlToJsx } from 'shared/utils/exercise';

export default function FIBExerciseContent({ exercise }) {
    return exercise.items.map(item =>
        <React.Fragment key={item.id}>
            {item.html ?
                htmlToJsx(item.text) :
                textToJsx(item.text)
            }
        </React.Fragment>
    );
}