import { Button } from "@/components/ui/button";
import { URLProps } from "@/types";
import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getJoinedDate } from "@/lib/utils";
import ProfileLink from "@/components/shared/ProfileLink";
import Stats from "@/components/shared/Stats";
import { getUserInfo } from "@/lib/actions/user.action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfilePicture from "@/components/shared/sidebar/ProfilePicture";
import UserSkills from "@/components/shared/UserSkills";
import AddSkill from "@/components/shared/AddSkill";
import { getAllSkills } from "@/lib/actions/skill.action";
import { getAllLevels } from "@/lib/actions/level.action";
import AddProject from "@/components/shared/forms/AddProject";
import { getAllRols } from "@/lib/actions/role.action";
import { getAllProjects } from "@/lib/actions/project.action";
import UserProjects from "@/components/shared/UserProjects";
import { ScrollArea } from "@/components/ui/scroll-area";
const testDate = new Date(2024, 3);
const Page = async ({ params, searchParams }: URLProps) => {
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const userId = session?.user?._id;
  const userInfo = await getUserInfo({ userId: params.id });

  console.log(userInfo);
  console.log(userId);

  const { skills: allSkills } = await getAllSkills();
  const { levels: allLevels } = await getAllLevels();
  const { roles: allRoles } = await getAllRols();
  const { projects: allProjects } = await getAllProjects();

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <ProfilePicture picture={userInfo.user.picture} />
          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">
              {userInfo.user.name}
            </h2>
            <p className="paragraph-regular text-dark200_light800">
              @{userInfo.user.userName}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {userInfo.user.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={userInfo.user.location}
                />
              )}

              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={getJoinedDate(userInfo.user.joinedAt)}
              />

              {userInfo.user.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={userInfo.user.portfolioWebsite}
                  title="Portfolio"
                />
              )}
            </div>
            {userInfo.user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {userInfo.user.bio}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          {userId == userInfo.user._id && (
            <Link href="/profile/edit">
              <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                Edit Profile
              </Button>
            </Link>
          )}
        </div>
      </div>
      <Stats
        totalQuestions={userInfo.totalQuestions}
        totalAnswers={7}
        totalAnnouncements={14}
        totalTrainning={0}
        totalKnowlegde={3}
      />
      <div className="flex">
        <div>
          <div className="flex justify-between space-x-12 max-sm:mb-5 max-sm:w-full sm:mt-10 px-5">
            <h2 className="text-xl font-semibold mt-2 ">Skills</h2>
            <AddSkill
              userId={userId}
              userInfoId={JSON.stringify(userInfo.user._id)}
              skills={JSON.stringify(allSkills)}
              levels={JSON.stringify(allLevels)}
            />
          </div>
          <ScrollArea className="h-80">
            <UserSkills userId={params.id} />
          </ScrollArea>
        </div>
        <div>
          <div className="flex justify-between space-x-12 max-sm:mb-5 max-sm:w-full sm:mt-10 px-5">
            <h2 className="text-xl font-semibold mt-2 ">Projects</h2>
            <AddProject
              userId={userId}
              userInfoId={JSON.stringify(userInfo.user._id)}
              projects={JSON.stringify(allProjects)}
              roles={JSON.stringify(allRoles)}
            />
          </div>
          <ScrollArea className="h-80">
            <UserProjects userId={params.id} />
          </ScrollArea>
        </div>
      </div>
      <div className="mt-10 flex justify-between gap-4">
        <div className="mt-10 flex gap-10">
          <Tabs defaultValue="top-posts" className="flex-1">
            <TabsList className="inline-flex flex-wrap justify-start  background-light800_dark400 min-h-[42px] p-1 ">
              <TabsTrigger value="top-posts" className="tab">
                Top Posts
              </TabsTrigger>
              <TabsTrigger value="answers" className="tab">
                Answers
              </TabsTrigger>
              <TabsTrigger value="announcements" className="tab">
                Announcements
              </TabsTrigger>
              <TabsTrigger value="trainning" className="tab">
                Trainning
              </TabsTrigger>
              <TabsTrigger value="knowlegde" className="tab">
                Knowlegde
              </TabsTrigger>
            </TabsList>
            <TabsContent value="top-posts">POSTS</TabsContent>
            <TabsContent value="answers">ANSWERS</TabsContent>
            <TabsContent value="announcements">announcements</TabsContent>
            <TabsContent value="trainning">trainning</TabsContent>
            <TabsContent value="knowlegde">knowlegde</TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Page;
