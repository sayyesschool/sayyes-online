import { Image, Text } from 'shared/ui-components';

import './Image.scss';

export default function ImageItem({
    url,
    alt = '',
    caption,
    className
}) {
    return (
        <div className={className}>
            {caption ?
                <figure>
                    <Image src={url} alt={alt} />

                    <Text as="figcaption" align="center" size="small">{caption}</Text>
                </figure>
                :
                <Image src={url} alt={alt} />
            }
        </div>
    );
}