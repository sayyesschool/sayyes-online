import cn from 'classnames';

export const Tabs = ({ children }) => (
    <div className="tabs tabs--centered tabs--pills tabs--violet">
        <div className="tabs__nav">
            {children}
        </div>
    </div>
);

export const Tab = ({
    content,
    icon,
    active,
    onClick
}) => (
    <button
        className={cn('tab', { 'tab--active': active })} role="tab"
        onClick={onClick}
    >
        {icon &&
            <span className="tab__icon icon material-symbols-rounded" aria-hidden="true">{icon}</span>
        }

        <span className="tab__content">{content}</span>
    </button>
);