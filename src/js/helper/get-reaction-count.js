/**
 * Get the total count of reactions for a given post.
 *
 * @param {Object} post - The post for which to calculate the total reaction count.
 * @returns {number} The total count of reactions for the post.
 */
export const getReactionCount = (post) => {
  let reactionCount = 0;

  for (const reaction of post.reactions) {
    reactionCount += reaction.count;
  }

  return reactionCount;
};
