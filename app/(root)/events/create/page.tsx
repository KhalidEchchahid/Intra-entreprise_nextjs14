import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EventForm from "@/components/shared/EventForm"
import { getServerSession } from "next-auth";

const CreateEvent = async() => {

     // I should get the userId from my session 
     const  session  = await getServerSession(authOptions);
     //@ts-ignore
     const userId = session?.user?._id;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Create Event</h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  )
}

export default CreateEvent