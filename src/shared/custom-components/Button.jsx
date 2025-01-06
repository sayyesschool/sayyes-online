import cn from 'classnames';

export const Button = ({
    content,
    full,
    className,
    ...props
}) => (
    <button className={cn('btn', { 'btn--full': full }, className)} {...props}>
        {content}
    </button>
);