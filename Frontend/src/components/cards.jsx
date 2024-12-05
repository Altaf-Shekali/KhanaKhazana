import React from 'react'
import { Link } from 'react-router-dom';

function cards({ item }) {
 return(
 <>
    <div>
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src={item.image}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{item.name}</h2>
    <p className="text-semibold">{item.location}</p>
    <div className="card-actions justify-end">
      <Link to="/kitchen1"className="badge badge-outline hover:bg-blue-500 hover:text-white px-5 py-6 duration-200 text-semibold">Visit Now</Link>
    </div>
  </div>
</div>
    </div>
    
    
    </>
 )
}

export default cards
