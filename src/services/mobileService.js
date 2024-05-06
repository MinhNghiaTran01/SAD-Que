import {get} from '../utils/request'
export const getAllMobile = async (option) => {
  try{
    const res = await get(option)
    const data = await res.json()
    return data
  }
  catch(err){
    console.log(err)
    return []
  }
}