import { posts } from "../const/test-data/posts.js";
import { renderPosts } from "../helper/renderPosts.js";

renderPosts(posts, document.querySelector("#search-list"));
