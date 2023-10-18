import Storage from "../../storage/index.js";
import { request } from "../request.js";

export const updateUser = async (body) => {
  const user = Storage.get("username");

  const response = await request(
    `/api/v1/social/profiles/${user}/media`,
    null,
    true,
    "PUT",
    body,
  );

  return response;
};
