import request from "@/utils/request";

export function login(data) {
  return request({
    url: "student/session",
    method: "post",
    data
  });
}

export function logout() {
  return request({
    url: "session",
    method: "delete"
  });
}

export function getUserInfo() {
  return request({
    url: "session",
    method: "get"
  });
}
