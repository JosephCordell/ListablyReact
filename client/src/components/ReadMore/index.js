import React, { useState } from 'react'
import "./style.css"

export default function ReadMore({ text }) {
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore)
    }
    return (
        <React.Fragment>
            {isReadMore ? text.slice(0, 150) : text}
                <span onClick={toggleReadMore} className={(text.length > 150 ? 'show': 'hide')}>
                    {isReadMore ? " ...read more" : ' show less'}
                </span>
        </React.Fragment>
    )
}
