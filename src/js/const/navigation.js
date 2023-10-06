export const navigation = [
  {
    name: "Home",
    href: "/feed/",
    type: "link",
    icon: {
      default: "bi bi-house",
      active: "bi bi-house-fill",
    },
  },
  {
    name: "Search",
    href: "/search/",
    type: "link",
    icon: {
      default: "bi bi-search",
      active: "bi bi-search",
    },
  },
  {
    name: "Create post",
    id: "create-post",
    href: null,
    type: "button",
    icon: {
      default: "bi bi-plus-square",
      active: null,
    },
  },
  {
    name: "Profile",
    href: "/profile/",
    type: "link",
    icon: {
      default: "bi bi-person",
      active: "bi bi-person-fill",
    },
  },
  {
    name: "Log out",
    id: "logout",
    href: "/",
    type: "button",
    icon: {
      default: "bi bi-box-arrow-right",
      active: null,
    },
  },
];
