import { request } from "../request.js";

/**
 * Posts a comment to a social media post.
 *
 * @param {string} body - The content of the comment.
 * @param {number} id - The unique identifier of the post to which the comment will be added.
 * @returns {Promise} A Promise that resolves to the response from the server after posting the comment.
 */
export const postComment = async (body, id) => {
  const response = await request(
    `/api/v1/social/posts/${id}/comment`,
    null,
    true,
    "POST",
    body,
  );
  return response;
};
