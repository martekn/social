import { posts } from "../const/test-data/posts.js";
import { renderPosts } from "../helper/renderPosts.js";
import { profile } from "../const/test-data/profile.js";

renderPosts(posts, document.querySelector("#search-list"), profile);
