import request from "@/utils/request";

export function getStat() {
  return request({
    url: `stat`,
    method: "get"
  });
}
