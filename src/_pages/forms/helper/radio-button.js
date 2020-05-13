import React from 'react'
import classNames from "classnames"

const RadioButton = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    content,
    className,
    ...props
}) => {
    return (
        <div>
            <input
                name={name}
                id={id}
                type="radio"
                value={content} // could be something else for output?
                checked={content === value || value}
                onChange={onChange}
                onBlur={onBlur}
                className={classNames("radio-button")}
                {...props}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export default RadioButton;