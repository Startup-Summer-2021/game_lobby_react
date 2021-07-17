import React from 'react';

export default function Button({ text, onclick }) {
    return (
        <button className="button_slide slide_right" onClick={onclick}>{text}</button>
    )
}