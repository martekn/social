import { getReactionCount } from "./get-reaction-count.js";

/**
 * Sort an array of posts by their popularity, calculated based on reactions and comments.
 *
 * @param {Array} posts - An array of posts to be sorted by popularity.
 * @returns {Array} A new array of posts sorted by their calculated popularity in descending order.
 */
export const sortPopularPosts = (posts) => {
  const postsWithCount = posts.map((post) => {
    const reactionCount = getReactionCount(post);

    const popularityCount = reactionCount + post._count.comments;
    post._count.popularity = popularityCount;
    return post;
  });

  return postsWithCount.sort(
    (a, b) => a._count.popularity < b._count.popularity,
  );
};
