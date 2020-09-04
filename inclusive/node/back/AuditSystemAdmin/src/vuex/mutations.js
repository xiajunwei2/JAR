
const mutations = {
  loadingChange (state, loading) {
    state.loading = loading;
    // state.loading = false; 
  },
  sysDeptgetPageDept (state, sysDeptgetPageDept) {
    state.option.sysDeptgetPageDept = sysDeptgetPageDept;
  },
  sysCompanygetAllMechanism (state, AllMechanism) {
    state.sysCodegetCode.AllMechanism = AllMechanism;
  },
  sysMenugetSelectMenu (state, sysMenugetSelectMenu) {
    state.sysCodegetCode.sysMenugetSelectMenu = sysMenugetSelectMenu;
  },
  setListMenu (state, ListMenu) {
    state.sysCodegetCode.leftListMenu = ListMenu;
  },
  FirstGradeMechanismChange (state, FirstGradeMechanism) {
    state.sysCodegetCode.AllFirstGradeMechanism = FirstGradeMechanism;
  },
  setUserInfor (state, setUserInfor) {
    state.userInfor = setUserInfor;
  },
  sysRoleGetAllRole (state, setAllRole) {
    state.sysCodegetCode.AllRole = setAllRole;
  },
  SatueCHANGE (state, { data, result }) {
    state.sysCodegetCode[data + "Satue"] = result;
  },
  setToken (state, setToken) {
    state.token = setToken
  },
  setCurrMenu (state, currMenu) {
    state.currMenu = currMenu;
  },
  isCollapseChange (state) {
    state.isCollapse = !state.isCollapse;
  },
  productTypegetAllType (state, getAllType) {
    state.getAllType = getAllType;
  },
  nowMueChange (state, nowMue) {
    state.nowMue = nowMue;
  },
  jrjgChange (state, jrjg) {
    state.option.jrjgOption = jrjg;
  },
  fzjgChange (state, jrjg) {
    state.option.fzjgOption = jrjg;
  },
  dklxChange (state, jrjg) {
    state.option.dklxOption = jrjg;
  },
  jglxChange (state, jrjg) {
    state.option.jglxOption = jrjg;
  },
  jydz (state, jydz) {
    state.option.jydzOption = jydz;
  },
  sysCodegetCode (state, { data, result }) {
    state.option[data] = result;
  },
}

export default mutations
