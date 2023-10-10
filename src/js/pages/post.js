import { profile } from "../const/test-data/profile.js";
import { tags } from "../const/test-data/tags.js";

const sidebar = document.querySelector("app-sidebar");
sidebar.renderFollowing(profile.following);
sidebar.renderTags(tags);
