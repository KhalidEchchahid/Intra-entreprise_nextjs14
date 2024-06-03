import { SidebarLink } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const dashboardNavbarLinks = [
  {
    route: "/dashboard/users",
    label: "Users",
  },
  {
    route: "/dashboard/skills",
    label: "Skills",
  },
  {
    route: "/dashboard/categories",
    label: "Categories",
  },
];





export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: "/assets/icons/announcement.svg",
    route: "/announcement",
    label: "Announcement",
  },
  {
    imgURL: "/assets/icons/trainning.svg",
    route: "/trainning",
    label: "Trainning",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/assets/icons/eye.svg",
    route: "/events",
    label: "Events",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];

//     export const BADGE_CRITERIA = {

//         QUESTION_COUNT: {
//             BRONZE: 10,
//             SILVER: 50,
//             GOLD: 100,
//             },
//             ANSWER_COUNT: {
//             BRONZE: 10,
//             SILVER: 50,
//             GOLD: 100,
//             },
//             QUESTION_UPVOTES: {
//             BRONZE: 10,
//             SILVER: 50,
//             GOLD: 100,
//             },
//             ANSWER_UPVOTES: {
//             BRONZE: 10,
//             SILVER: 50,
//             GOLD: 100,
//             },
//             TOTAL_VIEWS: {
//             BRONZE: 1000,
//             SILVER: 10000,
//             GOLD: 100000,
//             },
//             };




export const adminSidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/admin",
    label: "Main Dashboard",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/admin/users",
    label: "users",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/admin/skills",
    label: "Skills",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/admin/projects",
    label: "Projects",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/admin/categories",
    label: "Categories",
  },
  
];


export const eventDefaultValues = {
  title: '',
  description: '',
  instructor: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  url: '',
}