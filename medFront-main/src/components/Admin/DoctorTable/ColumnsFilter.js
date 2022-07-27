import React from 'react'
import './ColumnsFilter.css'
function ColumnsFilter({column}) {
    const {filterValue, setFilter} = column;

    return (
      
          <input value={filterValue || ''}  className='input__columnFilter'
            onChange={(e)=>setFilter(e.target.value)} />
      
    )
}

export default ColumnsFilter
