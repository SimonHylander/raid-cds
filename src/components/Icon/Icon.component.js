import React from 'react';

export const Icon = ({src, width, ...rest}) => {

  const preventDragHandler = (e) => {
    e.preventDefault();
  }

  return (
    <img className="icon"
         src={src} width={width}
         onDragStart={preventDragHandler}
         {...rest}
    />
  )
}