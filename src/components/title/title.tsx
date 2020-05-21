import React from 'react'
import './title.css'

interface Props {
    title: string
}

const Title: React.FC<Props> =  (props) => {
    return (
        <div className="title">{ props.title }</div>
    )
}

export default Title
