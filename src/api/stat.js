import request from "@/utils/request";

export function getStat() {
  return request({
    url: `system_info`,
    method: "get"
  });
}
