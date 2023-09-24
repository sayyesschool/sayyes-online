import linkify from 'linkify-it';

import { Link } from 'shared/ui-components';

export default function ChatMessageText({ text }) {
    const matches = linkify().match(text);

    if (!matches) return text;

    const results = [];
    let lastIndex = 0;

    matches.forEach((match, i) => {
        results.push(text.slice(lastIndex, match.index));
        results.push(
            <Link target="_blank" rel="noreferrer" href={match.url} key={i}>
                {match.text}
            </Link>
        );
        lastIndex = match.lastIndex;
    });

    results.push(text.slice(lastIndex, text.length));

    return results;
}