import { forwardRef, useCallback, useState } from 'react';
import classnames from 'classnames';

import AccordionItem from './AccordionItem';

const Accordion = forwardRef(({
    items,

    children,
    className,
    ...props
}, ref) => {
    const [activeItemIndexes, setActiveItemIndexes] = useState([0]);

    const handleItemClick = useCallback(itemIndex => {
        setActiveItemIndexes(indexes => {
            return indexes.includes(itemIndex) ?
                indexes.filter(i => i !== itemIndex)
                :
                indexes.concat(itemIndex);
        });
    }, []);

    const classNames = classnames('ui-Accordion', className);

    return (
        <div
            ref={ref}
            className={classNames}
            {...props}
        >
            {items?.map((item, index) =>
                <AccordionItem
                    open={activeItemIndexes.includes(index)}
                    onClick={() => handleItemClick(index)}
                    {...item}
                />
            )}

            {children}
        </div>
    );
});

export default Accordion;