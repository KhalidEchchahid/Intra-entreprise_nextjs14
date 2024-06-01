import Widget from '@/components/adminShared/Widget'
import React from 'react'
import { MdBarChart, MdDashboard } from 'react-icons/md'
import { IoDocuments } from 'react-icons/io5';
import { IoMdHome } from 'react-icons/io';

const page = () => {
  return (
    <div>
    {/* Card widget */}

    <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
      <Widget
        icon={<MdBarChart className="h-7 w-7" />}
        title={'Users'}
        subtitle={'340'}
      />
      <Widget
        icon={<IoDocuments className="h-6 w-6" />}
        title={'Announcements'}
        subtitle={'642'}
      />
      <Widget
        icon={<MdBarChart className="h-7 w-7" />}
        title={'Trainnings'}
        subtitle={'574'}
      />
      <Widget
        icon={<MdDashboard className="h-6 w-6" />}
        title={'Questions'}
        subtitle={'1,000'}
      />
      <Widget
        icon={<MdBarChart className="h-7 w-7" />}
        title={'Answers'}
        subtitle={'145'}
      />
      <Widget
        icon={<IoMdHome className="h-6 w-6" />}
        title={'Projects'}
        subtitle={'2433'}
      />
    </div>

  </div>
  )
}

export default page