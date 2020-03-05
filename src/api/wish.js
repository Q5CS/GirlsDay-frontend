import request from "@/utils/request";

export function uploadPic(data) {
  return request({
    data,
    url: "upload/image",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    transformRequest: [
      function(data) {
        return data;
      }
    ]
  });
}

export function getWishes(data) {
  return request({
    url: `wish`,
    method: "get",
    params: data
  });
}

export function getMyWishes() {
  return request({
    url: `myWish`,
    method: "get"
  });
}

export function getMyClaimedWishes() {
  return request({
    url: `myClaimedWish`,
    method: "get"
  });
}

export function getWish(id) {
  return request({
    url: `wish/${id}`,
    method: "get"
  });
}

export function saveWish(data) {
  return request({
    url: data.id ? `wish/${data.id}` : `wish`,
    method: data.id ? "put" : "post",
    data
  });
}

export function deleteWish(id) {
  return request({
    url: `wish/${id}`,
    method: "delete"
  });
}

export function claimWish(id) {
  return request({
    url: `wish/${id}/claim`,
    method: "post"
  });
}

export function unClaimWish(id) {
  return request({
    url: `wish/${id}/claim`,
    method: "delete"
  });
}

export function completeWish(id) {
  return request({
    url: `wish/${id}/complete`,
    method: "post"
  });
}
