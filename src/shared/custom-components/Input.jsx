import cn from 'classnames';

export const Input = ({
    invalid,
    ...props
}) => (
    <input className={cn('input', { 'input--invalid': invalid })} {...props} />
);