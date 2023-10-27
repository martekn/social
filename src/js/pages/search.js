import { renderPosts } from "../helper/render-posts.js";
import Storage from "../helper/storage/index.js";
import { requestAll } from "../helper/api/request-all.js";
import { allPosts } from "../helper/api/request-object/all-posts.js";
import { allUsers } from "../helper/api/request-object/all-users.js";
import { postsByTag } from "../helper/api/request-object/posts-by-tag.js";
import { userById } from "../helper/api/request-object/user-by-id.js";
import { renderFilterButtons } from "../helper/render-filter-buttons.js";
import { sortPopularPosts } from "../helper/sort-popular-posts.js";
import { DialogAlert } from "../components/alerts/dialog-alert.js";
import { renderUserSearch } from "../helper/render-user-search.js";

const sidebar = document.querySelector("app-sidebar");
const searchList = document.querySelector("#search-list");
const username = Storage.get("username");
const searchParams = new URLSearchParams(window.location.search);
const searchQuery = searchParams.get("search") ?? "";
let actionQuery = searchParams.get("action")?.toLowerCase() ?? "latest";

const userRequests = [allUsers(), allPosts(), userById(username)];
const postsByTagRequests = [
  postsByTag(searchQuery),
  allPosts(),
  userById(username),
];
const allPostsRequests = [allPosts(), userById(username)];

const getLatestPosts = async () => {
  const [posts, user] = await requestAll(allPostsRequests);
  if (posts.status === "rejected") {
    return {
      postsToRender: posts,
      allPosts: posts,
      loggedInUser: user,
      isPosts: true,
    };
  }

  if (!searchQuery) {
    return {
      postsToRender: posts,
      allPosts: posts,
      loggedInUser: user,
      isPosts: true,
    };
  }
  const filteredPosts = searchPosts(posts.value);
  return {
    postsToRender: {
      value: filteredPosts,
      status: posts.status,
      response: posts.response ?? "",
    },
    allPosts: posts,
    loggedInUser: user,
    isPosts: true,
  };
};

const getPopularPosts = async () => {
  const [posts, user] = await requestAll(allPostsRequests);
  if (posts.status === "rejected") {
    return {
      postsToRender: posts,
      allPosts: posts,
      loggedInUser: user,
      isPosts: true,
    };
  }

  posts.value = sortPopularPosts(posts.value);

  if (!searchQuery) {
    return {
      postsToRender: posts,
      allPosts: posts,
      loggedInUser: user,
      isPosts: true,
    };
  }
  const filteredPosts = searchPosts(posts.value);
  return {
    postsToRender: {
      value: filteredPosts,
      status: posts.status,
      response: posts.response ?? "",
    },
    allPosts: posts,
    loggedInUser: user,
    isPosts: true,
  };
};

const getPostsByTags = async () => {
  if (!searchQuery) {
    const [posts, user] = await requestAll(allPostsRequests);
    if (posts.status === "rejected") {
      return {
        postsToRender: posts,
        allPosts: posts,
        loggedInUser: user,
        isPosts: true,
      };
    }

    const filteredPosts = posts.value.filter((post) => {
      const updatedTags = [];
      for (const tag of post.tags) {
        if (tag === "" || tag === "#") {
          continue;
        }
        updatedTags.push(tag);
      }
      post.tags = updatedTags;

      return post.tags.length > 0;
    });

    return {
      postsToRender: {
        value: filteredPosts,
        status: posts.status,
        response: posts.response ?? "",
      },
      allPosts: posts,
      loggedInUser: user,
      isPosts: true,
    };
  }

  const [posts, allPosts, user] = await requestAll(postsByTagRequests);

  return {
    postsToRender: posts,
    allPosts: allPosts,
    loggedInUser: user,
    isPosts: true,
  };
};

const getUsers = async () => {
  const [allUsers, posts, user] = await requestAll(userRequests);
  if (allUsers.status === "rejected") {
    return {
      usersToRender: allUsers,
      allPosts: posts,
      loggedInUser: user,
      isPosts: false,
    };
  }

  if (!searchQuery) {
    return {
      usersToRender: allUsers,
      loggedInUser: user,
      allPosts: posts,
      isPosts: false,
    };
  }
  const filteredUsers = searchUsers(allUsers.value);
  return {
    usersToRender: {
      value: filteredUsers,
      status: allUsers.status,
      response: allUsers.response ?? "",
    },
    loggedInUser: user,
    allPosts: posts,
    isPosts: false,
  };
};

const getPostsWithMedia = async () => {
  const [posts, user] = await requestAll(allPostsRequests);
  if (posts.status === "rejected") {
    return {
      postsToRender: posts,
      allPosts: posts,
      loggedInUser: user,
      isPosts: true,
    };
  }

  posts.value = posts.value.filter((post) => post.media);

  if (!searchQuery) {
    return {
      postsToRender: posts,
      allPosts: posts,
      loggedInUser: user,
      isPosts: true,
    };
  }
  const filteredPosts = searchPosts(posts.value);
  return {
    postsToRender: {
      value: filteredPosts,
      status: posts.status,
      response: posts.response ?? "",
    },
    allPosts: posts,
    loggedInUser: user,
    isPosts: true,
  };
};

/**
 * Filters a list of posts based on a search query.
 *
 * @function
 * @param {Array} posts - An array of post objects to filter.
 * @returns {Array} - An array of filtered post objects that match the search query.
 */
const searchPosts = (posts) => {
  const searchValue = searchQuery.toLowerCase();
  const filteredPosts = posts.filter(
    ({ author: { name }, title, body, tags }) => {
      const nameMatch = name.toLowerCase().includes(searchValue);
      const titleMatch = title?.toLowerCase().includes(searchValue);
      const bodyMatch = body?.toLowerCase().includes(searchValue);
      const tagsMatch = tags.some((tag) => tag.toLowerCase() === searchValue);
      return nameMatch || titleMatch || bodyMatch || tagsMatch;
    },
  );

  return filteredPosts;
};

/**
 * Filters a list of users based on a search query.
 *
 * @function
 * @param {Array} users - An array of user objects to filter.
 * @returns {Array} - An array of filtered user objects that match the search query.
 */
const searchUsers = (users) => {
  const searchValue = searchQuery.toLowerCase();
  const filteredUsers = users.filter(({ name }) =>
    name.toLowerCase().includes(searchValue),
  );
  return filteredUsers;
};

/**
 * Handles the display of an alert message when an array is empty.
 *
 * This function creates a new alert using the provided message and appends it to the searchList
 *
 * @param {string} message - The message to be displayed in the alert.
 */
const handleEmptyArray = (message) => {
  const alert = new DialogAlert(message, "empty-array");
  searchList.append(alert);
};

const setupSearch = async () => {
  const fetchFunctions = {
    latest: getLatestPosts,
    popular: getPopularPosts,
    tags: getPostsByTags,
    people: getUsers,
    media: getPostsWithMedia,
  };

  renderFilterButtons();

  if (!(actionQuery in fetchFunctions)) {
    actionQuery = "latest";
  }

  try {
    const response = await fetchFunctions[actionQuery]();
    sidebar.setup(response.allPosts, response.loggedInUser);

    if (response.isPosts) {
      if (
        response.postsToRender.status === "fulfilled" &&
        response.loggedInUser.status === "fulfilled"
      ) {
        if (response.postsToRender.value.length === 0) {
          handleEmptyArray(`No posts matching search: ${searchQuery}`);
          return;
        }
        renderPosts(
          response.postsToRender.value,
          searchList,
          response.loggedInUser.value,
        );
      } else {
        throw new Error("Failed to load posts. Please try again later.");
      }
    } else {
      if (
        response.usersToRender.status === "fulfilled" &&
        response.loggedInUser.status === "fulfilled"
      ) {
        if (response.usersToRender.value.length === 0) {
          handleEmptyArray(`No user matching search: ${searchQuery}`);
          return;
        }

        renderUserSearch(
          response.usersToRender.value,
          searchList,
          response.loggedInUser.value,
        );
      } else {
        throw new Error("Failed to load users. Please try again later.");
      }
    }
  } catch (error) {
    console.log(error);
    document
      .querySelector("main")
      .append(new DialogAlert(error, "search-error", "error"));
  }
};

setupSearch();
