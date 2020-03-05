import request from "@/utils/request";

export function getBlessingsNum() {
  return request({
    url: `blessing/count`,
    method: "get"
  });
}

export function getBlessings(data) {
  return request({
    url: `blessing`,
    method: "get",
    params: data
  });
}

export function postBlessing(data) {
  return request({
    url: `blessing`,
    method: "post",
    data
  });
}
