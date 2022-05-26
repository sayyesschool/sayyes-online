import { Image, Text } from '@fluentui/react-northstar';

export default function ExerciseImageItem({ item = {} }) {
    return (
        item.image?.caption ?
            <figure>
                <Image src={item.image?.url} alt={item.image?.alt || 'Изображение'} />

                <Text as="figcaption" align="center" size="small">{item.image?.caption}</Text>
            </figure>
            :
            <Image src={item.image?.url} alt={item.image?.alt || 'Изображение'} />
    );
}