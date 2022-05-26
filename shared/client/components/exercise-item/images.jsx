import ImageSlider from 'shared/components/image-slider';

export default function ExerciseImagesItem({ item = {} }) {
    return (
        <ImageSlider
            images={item.images}
        />
    );
}