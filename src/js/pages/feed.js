import { renderPosts } from "../helper/render-posts.js";
import { requestAll } from "../helper/api/request-all.js";
import { allPosts } from "../helper/api/request-object/all-posts.js";
import { followingPosts } from "../helper/api/request-object/following-posts.js";
import { userById } from "../helper/api/request-object/user-by-id.js";
import { userPosts } from "../helper/api/request-object/user-posts.js";
import { DialogAlert } from "../components/alerts/dialog-alert.js";
import { sortPopularPosts } from "../helper/sort-popular-posts.js";
import Storage from "../helper/storage/index.js";

const sidebar = document.querySelector("app-sidebar");
const username = Storage.get("username");
const requests = [
  allPosts(),
  followingPosts(),
  userById(username),
  userPosts(username),
];

const renderFeedPage = async () => {
  try {
    const [allPosts, feedPosts, user, userPosts] = await requestAll(requests);
    sidebar.setup(allPosts, user);

    const postList = document.querySelector("#posts-list");
    document.querySelector("app-loader").remove();

    if (
      feedPosts.status === "fulfilled" &&
      user.status === "fulfilled" &&
      allPosts.status === "fulfilled"
    ) {
      if (feedPosts.value.length > 0) {
        const userPostsArray =
          userPosts.status === "fulfilled" ? userPosts.value : [];
        const feedPostsArray =
          feedPosts.status === "fulfilled" ? feedPosts.value : [];

        const posts = [...feedPostsArray, ...userPostsArray].sort(
          (a, b) => a.created < b.created,
        );
        renderPosts(posts, postList, user.value);
      } else {
        renderPosts(sortPopularPosts(allPosts.value), postList, user.value);
      }
    } else {
      const errorMessage =
        "Sorry, we couldn't load the feed at the moment. Please check your internet connection and try again. If the problem persists, please contact our support team for assistance.";
      const error = new DialogAlert(errorMessage, "feed-error", "error");
      document.querySelector("main").append(error);
    }
  } catch (error) {
    console.log(error);
  }
};

renderFeedPage();
