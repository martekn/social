import { profile } from "../const/test-data/profile.js";
import { SocialPost } from "../components/post/social-post.js";
import htmlUtilities from "../helper/html-utilities/index.js";
import { requestAll } from "../helper/api/request-all.js";
import { allPosts } from "../helper/api/request-object/all-posts.js";
import { userById } from "../helper/api/request-object/user-by-id.js";
import { postById } from "../helper/api/request-object/post-by-id.js";
import Storage from "../helper/storage/index.js";

const username = Storage.get("username");
const postId = new URLSearchParams(window.location.search).get("id");

if (!postId) {
  window.location.href = "/feed";
}

const renderPost = (post) => {
  const main = document.querySelector("main");

  if (post.status === "fulfilled") {
    const heading = htmlUtilities.createHTML(
      "h1",
      "mb-6 sr-only",
      `${post.value.author.name}'s post`,
    );
    const socialPost = new SocialPost(post.value, profile);
    main.append(...[heading, socialPost]);

    socialPost.showComments();
  } else {
    const error = new ErrorDialog(post.response, "post-error");
    main.append(error);
  }
};

const setupPostPage = async () => {
  try {
    const requests = [allPosts(), userById(username), postById(postId)];
    const [posts, user, post] = await requestAll(requests);

    const sidebar = document.querySelector("app-sidebar");
    sidebar.setup(posts, user);

    renderPost(post);
  } catch (error) {
    console.log(error);
  }
};

setupPostPage();
