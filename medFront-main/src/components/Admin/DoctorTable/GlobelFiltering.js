import React from 'react'
import './GlobelFiltering.css'
export const GlobelFiltering = ({filter, setFilter}) => {
    return (
        <div className='globalFiltering'>
            <input value={filter || ''}  placeholder='Filter Table'
            onChange={(e)=>setFilter(e.target.value)} />
        </div>
    )
}
