import { profile } from "../const/test-data/profile.js";
import { tags } from "../const/test-data/tags.js";
import { posts } from "../const/test-data/posts.js";
import { SocialPost } from "../components/post/social-post.js";
import htmlUtilities from "../helper/html-utilities/index.js";

const post = posts[2];

const sidebar = document.querySelector("app-sidebar");
sidebar.renderFollowing(profile.following);
sidebar.renderTags(tags);
const main = document.querySelector("main");
const heading = htmlUtilities.createHTML(
  "h1",
  "mb-6",
  `${post.author.name}'s post`,
);
const socialPost = new SocialPost(post, profile);

main.append(...[heading, socialPost]);

socialPost.showComments();
