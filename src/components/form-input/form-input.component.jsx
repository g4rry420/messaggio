import React from 'react'

import "./form-input.styles.css"

export default function FormInput({handleChange, addClass, ...otherProps}) {
    return (
        <div className="form-group">
            <input onChange={handleChange} {...otherProps}
                className={`form-control login-form-input ${addClass}`}  required />
        </div>
    )
}
