import Storage from "../../storage/index.js";
import { request } from "../request.js";
import Jwt from "../../jwt/index.js";

export const updateUser = async (body) => {
  const user = Jwt.getPayloadValue(Storage.get("accessToken"), "name");

  const response = await request(
    `/api/v1/social/profiles/${user}/media`,
    null,
    true,
    "PUT",
    body,
  );

  return response;
};
