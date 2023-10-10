import { posts } from "../const/test-data/posts.js";
import { renderPosts } from "../helper/renderPosts.js";
import { profile } from "../const/test-data/profile.js";
import { tags } from "../const/test-data/tags.js";

const sidebar = document.querySelector("app-sidebar");
sidebar.renderFollowing(profile.following);
sidebar.renderTags(tags);

renderPosts(posts, document.querySelector("#posts-list"), profile);
