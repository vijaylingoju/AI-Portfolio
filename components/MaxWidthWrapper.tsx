"use client"
import React from 'react'

type Props = {
    children: React.ReactNode
}

const MaxWidthWrapper = (props: Props) => {
    return (
        <div className="container md:max-w-7xl md:mx-auto px-2">{props.children}</div>
    )
}

export default MaxWidthWrapper