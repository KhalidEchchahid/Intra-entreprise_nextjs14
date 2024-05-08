import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUsers } from "@/lib/actions/user.action";
import { getTimeStamp } from "@/lib/utils";
import Link from "next/link";

const UserTable = async () => {
  const result = await getAllUsers();
  return (
    <Table>
      <TableHeader className="bg-slate-200 text-lg">
        <TableRow>
          <TableHead>User Name</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Joined at</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <>
          {result.users.map((user) => (
            <TableRow key={user._id} className="hover:bg-slate-100">
             
                <TableCell className="font-medium">
                <Link href={`/profile/${user._id}`}>
                  {user.userName}
                  </Link>
                  </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">
                  {getTimeStamp(user.joinedAt)}
                </TableCell>
             
            </TableRow>
          ))}
        </>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Users</TableCell>
          <TableCell className="text-right">{result.users.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default UserTable;
