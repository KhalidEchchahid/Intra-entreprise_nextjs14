import React from 'react'

interface Params {
    userId : string ;
    user : string ;
}
const Profile = ({userId , user} : Params) => {
    const parsedUser = JSON.parse(user);
    
  return (
    <div>
      profile Form Edit
    </div>
  )
}

export default Profile
