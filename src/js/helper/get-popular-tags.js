/**
 * Get the most popular tags from a list of posts.
 * @param posts - The array of posts containing tags.
 * @returns An array of the most popular tags.
 */
export const getPopularTags = (posts) => {
  /**
   * Filter posts with tags.
   */
  const postsWithTags = posts.filter((post) => {
    if (post.tags.length > 0) {
      return post.tags;
    }
  });

  /**
   * Map and flatten the array of tags from posts.
   */
  const tags = postsWithTags.map((post) => post.tags).flat();

  /**
   * Count the occurrences of each tag.
   */
  const tagCounter = {};

  for (const tag of tags) {
    if (tag === "" || tag === "#") {
      continue;
    }

    if (tagCounter[tag]) {
      tagCounter[tag] += 1;
    } else {
      tagCounter[tag] = 1;
    }
  }

  /**
   * Sort the tags by popularity and return the top 5.
   */
  const popularTags = Object.entries(tagCounter)
    .sort((a, b) => a[1] < b[1])
    .slice(0, 5)
    .map((counter) => counter[0]);

  return popularTags;
};
