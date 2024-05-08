import User from '@/components/shared/forms/User'
import { getAllUsers } from '@/lib/actions/user.action';
import React from 'react'

const page =  ()  =>  {

  return (
    <div>
        <h1 className="h1-bold text-dark100_light900">Create User</h1>
      <div className="mt-9">
        <User />
      </div>
    </div>
  )
}

export default page