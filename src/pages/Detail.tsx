import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailItem from '../components/detailItems/DetailItem';


const Detail = () => {
  const { type, id } = useParams();

  
  return (
    <DetailItem type={type} id={id}/>
  )
}

export default Detail