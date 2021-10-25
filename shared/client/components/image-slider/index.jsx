import { useCallback, useState } from 'react';
import classnames from 'classnames';
import {
    IconButton
} from 'mdc-react';

import './index.scss';

export default function ImageSlider({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = useCallback(() => {
        setCurrentIndex(index => index > 0 ? index - 1 : index);
    }, []);

    const handleNext = useCallback(() => {
        setCurrentIndex(index => index < images.length - 1 ? index + 1 : index);
    }, []);

    return (
        <div className="image-slider">
            <div className="image-slider__images">
                {images?.map((src, index) =>
                    <img
                        key={index}
                        className={classnames('image-slider__image', { 'image-slider__image--active': index === currentIndex })}
                        src={src}
                    />
                )}
            </div>

            <IconButton
                className="image-slider__button image-slider__button--prev"
                icon="chevron_left"
                onClick={handlePrev}
            />

            <IconButton
                className="image-slider__button image-slider__button--next"
                icon="chevron_right"
                onClick={handleNext}
            />

            <div className="image-slider__nav">
                <span className="image-slider__label"><input value={currentIndex + 1} /> из {images.length}</span>
            </div>
        </div>
    );
}