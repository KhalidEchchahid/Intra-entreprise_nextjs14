import React from "react";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import Signin from "@/components/shared/Signin";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

const Login = async () => {
  const session: Session | null = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  } else {
    return (
      <main className="flex min-h-screen w-full items-center justify-center">
        <Signin />
      </main>
    );
  }
};

export default Login;
