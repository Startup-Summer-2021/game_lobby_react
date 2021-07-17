import React, { useState } from 'react';

export default function Input({ value, onchange }) {
    return (
        <input className="form__input" type={"text"} value={value} onChange={onchange} />
    )
}