const menu = [
  {
    path: "/user/login",
    name: "Login",
    component: () => import("@/views/User/Login"),
    meta: {
      name: "登录"
    }
  },
  {
    path: "/user/me",
    name: "Me",
    component: () => import("@/views/User/Me"),
    meta: {
      name: "个人信息",
      hideNav: true,
      requireAuth: true
    }
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home"),
    meta: {
      name: "首页",
      hideNav: true,
      requireAuth: true
    }
  },
  {
    path: "/bless",
    name: "Bless",
    component: () => import("@/views/Bless"),
    meta: {
      name: "祝福",
      hideNav: true,
      requireAuth: true
    }
  },
  {
    path: "/wish/new",
    name: "NewWish",
    component: () => import("@/views/Wish/Edit"),
    meta: {
      name: "许愿",
      hideNav: false,
      requireAuth: true
    }
  },
  {
    path: "/wish/edit/:id",
    name: "EditWish",
    component: () => import("@/views/Wish/Edit"),
    meta: {
      name: "修改心愿",
      hideNav: false,
      requireAuth: true
    }
  },
  {
    path: "/wish/detail/:id",
    name: "WishDetail",
    component: () => import("@/views/Wish/Detail"),
    meta: {
      name: "心愿详询",
      hideNav: false,
      requireAuth: true
    }
  },
  {
    path: "/wish/myWish",
    name: "MyWish",
    component: () => import("@/views/Wish/MyWish"),
    meta: {
      name: "我的心愿",
      hideNav: false,
      requireAuth: true
    }
  },
  {
    path: "/wish/myClaimedWish",
    name: "myClaimedWish",
    component: () => import("@/views/Wish/MyClaimedWish"),
    meta: {
      name: "我的任务",
      hideNav: false,
      requireAuth: true
    }
  }
];

export { menu };
