import {user} from '../../db/data'
import InterfaceUserProfile from './InterfaceUserProfile'
const UserProfile = () => {
  return (
    <InterfaceUserProfile {...user}/>
  )
}

export default UserProfile