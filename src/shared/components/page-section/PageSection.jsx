import { isValidElement } from 'react';

import { Button, Heading, Icon, IconButton, Surface, Text } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import styles from './PageSection.module.scss';

export default function PageSection({
    title,
    description,
    icon,
    actions,
    header,
    compact,
    plain,
    scrollable,

    children,
    className,
    ...props
}) {
    const classNames = cn(
        className,
        'PageSection',
        styles.root,
        compact && styles.compact,
        plain && styles.plain,
        scrollable && styles.scrollable
    );

    return (
        <Surface
            as="section"
            className={classNames}
            radius="lg"
            shadow={plain ? undefined : 'xs'}
            {...props}
        >
            <div className={styles.header}>
                {icon &&
                    <Icon className={styles.header_icon}>{icon}</Icon>
                }

                {(title || description) &&
                    <div className={styles.header_text}>
                        <Heading
                            as="h3"
                            type="h4"
                            content={title}
                        />

                        {description &&
                            <Text type="body2" content={description} />
                        }
                    </div>
                }

                {header}

                {actions &&
                    <div className={styles.header_actions}>
                        {Array.isArray(actions) ?
                            actions.filter(a => !!a).map(action =>
                                isValidElement(action)
                                    ? action
                                    : !action.content ?
                                        <IconButton
                                            key={action.key}
                                            {...action}
                                        />
                                        :
                                        <Button
                                            key={action.key}
                                            {...action}
                                        />
                            ) : actions
                        }
                    </div>
                }
            </div>

            <div className={styles.content}>
                {children}
            </div>
        </Surface>
    );
}