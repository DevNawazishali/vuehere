export default {// 同步函数，遵循Vue同步规则
  val(state, opts) {
    state[opts.key] = opts.data;
  },
  setAccount(state, val) {
    state.account = val;
  },
  setisWallet(state, val) {
    state.isWallet = val;
  },
  setUserOpened(state, val) {
    state.userOpened = val;
  },
  setUserOpenedCodeId(state, val) {
    state.userOpenedCodeId = val;
  },
  setUsers(state, val) {
    state.users = val;
  },
};
