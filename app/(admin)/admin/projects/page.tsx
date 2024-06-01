import Project from '@/components/adminShared/forms/Project'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getAllProjects } from '@/lib/actions/project.action'
import React from 'react'


const page = async () => {

  const {projects} = await getAllProjects();
  return (
    <div>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Pojects and Roles</h1>
        <Project/>
      </div>
      <div className="mt-11">
      <Table>
      <TableHeader className="bg-slate-200 text-lg">
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        <>
          {projects.map((project) => (
            <TableRow key={project._id} className="hover:bg-slate-100">
                <TableCell className="font-medium">
                  {project.title}
                  </TableCell>
                <TableCell>{project.description}</TableCell>
            </TableRow>
          ))}
        </>
      </TableBody>
    </Table>
      </div>
    </div>
  )
}

export default page