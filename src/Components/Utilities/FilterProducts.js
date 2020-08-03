import React from 'react';

export default (props) => {
  return (
    <div className="filter-products-container">
      <div className="filter-products-single-filter"  onClick={() => props.handleFilterClick('all')}>
        All
      </div>

      <div className="filter-products-single-filter"  onClick={() => props.handleFilterClick('hoodies')}>
        Hoodies
      </div>

      <div className="filter-products-single-filter"  onClick={() => props.handleFilterClick('sweats')}>
        Sweats
      </div>

      <div className="filter-products-single-filter"  onClick={() => props.handleFilterClick('hats')}>
        Hats
      </div>
    </div>
  )
}