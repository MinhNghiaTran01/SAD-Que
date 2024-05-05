import React from 'react'
import { post } from '../utils/request'


export const sendUser = async (value,option) => {
  try{
    const res = await post(value,option)
    const data = await res.json()
    return data
  }
  catch(err){
    console.log(err)
    return []
  }
}