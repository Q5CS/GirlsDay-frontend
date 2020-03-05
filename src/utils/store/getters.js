const getters = {
  token: state => state.user.token,
  userinfo: state => state.user.userinfo,
  wishes: state => state.user.wishes,
  claimedWishes: state => state.user.claimedWishes,
  stat: state => state.stat.stat
};
export default getters;
