import {
    Button,
    Typography
} from 'mdc-react';

export default function ExerciseItemsSection({ label = 'Элементы', children, onAddItem }) {
    return (
        <section className="exercise-items-section">
            <Typography className="elements-label">{label}</Typography>

            {children}

            <Button
                className="new-item-button"
                type="button"
                icon="add"
                label="Добавить элемент"
                outlined
                onClick={onAddItem}
            />
        </section>
    );
}