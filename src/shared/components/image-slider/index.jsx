import { useCallback, useState } from 'react';

import IconButton from 'shared/ui-components/icon-button';
import classnames from 'shared/utils/classnames';

import './index.scss';

export default function ImageSlider({ images = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = useCallback(() => {
        setCurrentIndex(index => index > 0 ? index - 1 : images.length - 1);
    }, []);

    const handleNext = useCallback(() => {
        setCurrentIndex(index => index < images.length - 1 ? index + 1 : 0);
    }, []);

    return (
        <div className="image-slider">
            <div className="image-slider__wrapper">
                <div className="image-slider__images">
                    {images?.map((image, index) =>
                        <img
                            key={image.id}
                            className={classnames('image-slider__image', {
                                'image-slider__image--active': index === currentIndex
                            })}
                            src={image.url}
                        />
                    )}
                </div>

                <IconButton
                    className="image-slider__button image-slider__button--prev"
                    icon="chevron_left"
                    flat
                    onClick={handlePrev}
                />

                <IconButton
                    className="image-slider__button image-slider__button--next"
                    icon="chevron_right"
                    flat
                    onClick={handleNext}
                />
            </div>

            <div className="image-slider__nav">
                <span className="image-slider__label">{currentIndex + 1} из {images.length}</span>
            </div>
        </div>
    );
}