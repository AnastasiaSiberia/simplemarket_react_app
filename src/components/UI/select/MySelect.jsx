import React from 'react';
import classes from './select.module.css'
const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <select
            className={classes.select}
            value={value}
            onChange={event => onChange(event.target.value)}
            data
        >
            <option disabled value="">
                {defaultValue}
            </option>
            {options.map(option =>
                <option className={classes.dropdown} key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default MySelect;