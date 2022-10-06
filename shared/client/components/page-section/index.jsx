import classnames from 'classnames';

import { Flex, Header, Icon, Surface } from 'shared/ui-components';

import './index.scss';

export default function PageSection({
    title,
    description,
    icon,
    actions,
    compact,
    flat,
    ghost,
    outlined,
    className,
    children,
    ...props
}) {
    const classNames = classnames('page-section', {
        'page-section--compact': compact,
        'page-section--flat': flat,
        'page-section--ghost': ghost,
        'page-section--outlined': outlined
    }, className);

    return (
        <Surface as="section" className={classNames} {...props}>
            {(title || description) &&
                <Flex as="header" className="page-section__header" space="between" vAlign="center">
                    {icon &&
                        <Icon className="page-header__icon">{icon}</Icon>
                    }

                    <Header
                        as="h3"
                        content={title}
                        description={description}
                    />

                    <Flex>
                        {actions}
                    </Flex>
                </Flex>
            }

            <div className="page-section__content">
                {children}
            </div>
        </Surface>
    );
}