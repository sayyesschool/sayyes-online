import cn from 'classnames';

import Icon from 'shared/custom-components/icon';

import './Button.scss';

export default function Button({
    content,
    icon,
    full,
    className,
    ...props
}) {
    return (
        <button className={cn('btn', { 'btn--full': full }, className)} {...props}>
            {icon && <Icon name={icon} />}
            {content}
        </button>
    );
}