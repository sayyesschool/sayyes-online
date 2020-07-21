import React, { useRef, useState, useCallback } from 'react';
import classnames from 'classnames';
import {
    Chip, ChipSet,
    LineRipple
} from 'mdc-react';

import './index.scss';

export default function ComboBox({
    value,
    defaultValue,
    label,
    disabled = false,
    alignEnd = false,

    className,
    element: Element = 'label',
    onChange = Function.prototype,
    ...props
}) {
    const inputRef = useRef();

    const handleInputFocus = useCallback(() => {
        console.log('Focus');
        // setFocused(true);
        // setTouched(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        console.log('Blur');
        //setFocused(false);
    }, []);

    const handleInputChange = useCallback(() => {
        console.log('Chnage');
        //onChange(event, inputRef.current.value);
    }, []);

    return (
        <div className="combo-box">
            <div className="combo-box__anchor">
                <input
                    type="hidden"
                    value={value}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    {...props}
                />

                <label>{label}</label>

                <ChipSet className="combo-box__chips">
                    <Chip text="Foo" />
                    <Chip text="Bar" />
                </ChipSet>

                <span
                    ref={inputRef}
                    className="combo-box__input"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    contentEditable={!disabled}
                />
            </div>

            <LineRipple />
        </div>
    );
}