import classnames from 'classnames';
import {
    Carousel,
    Image
} from '@fluentui/react-northstar';

import './index.scss';

export default function ImagesContent({ images, className }) {
    const classNames = classnames('images-content', className);

    if (images.length === 0) return null;

    return (
        <section className={classNames}>
            {images.length > 1 ?
                <Carousel
                    items={images.map(image => ({
                        key: image.id,
                        id: image.id,
                        content: (
                            <Image
                                src={image.src}
                                alt={image.alt || ''}
                                fluid
                            />
                        )
                    }))}
                    navigation={{
                        items: images.map(image => ({
                            key: image.id,
                            'aria-controls': image.id,
                        }))
                    }}
                />
                :
                <Image
                    src={images[0].src}
                    alt={images[0].alt || ''}
                    fluid
                />
            }
        </section>
    );
}