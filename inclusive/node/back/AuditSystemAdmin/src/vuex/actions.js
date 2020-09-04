import Api from "@/api/api.js"

const actions = {
  async jrjgChange ({ commit }) {
    let userInfo = []
    return new Promise((resolve, reject) => {
      commit("loadingChange", true)
      Api.sysMenugetGetMenu().then((res) => {
        if (response.status === 200) {
          commit(jrjgChange, { userInfo })
        } else {
          commit(jrjgChange, [])
        }
        commit("loadingChange", false)
      }).catch(err => {
        commit("loadingChange", false)
        reject(err)
      })
    })
  },
  async fzjgChange ({ commit }) {
    let userInfo = []
    this.$store.commit("loadingChange", true)
    return new Promise((resolve, reject) => {
      Api.sysMenugetGetMenu().then((res) => {
        commit("loadingChange", false)
        if (response.status === 200) {
          commit(fzjgChange, { userInfo })
        } else {
          commit(fzjgChange, [])
        }
      }).catch(err => {
        commit("loadingChange", false)

        reject(err)
      })
    })
  },
  async sysCodegetCode ({ commit }, data) {
    commit("loadingChange", true)
    let datadata = {
      "codeType": data
    }
    return new Promise((resolve, reject) => {
      Api.sysCodegetCode(datadata).then((res) => {
        commit("loadingChange", false)
        if (res.code === 0) {
          let result = res.content[0].sysCodeVoList
          commit("sysCodegetCode", { data, result })
        } else {
          commit("SatueCHANGE", data, [])
        }
      }).catch(err => {
        commit("loadingChange", false)
        reject(err)
      })
    })
  },
  //获取所有下拉角色
  async GetsysRoleGetAllRole ({ commit }) {
    let userInfo = []
    return new Promise((resolve, reject) => {
      commit("loadingChange", true)
      Api.sysRoleGetAllRole().then((res) => {
        commit("loadingChange", false)
        let result = res.content
        if (res.code === 0) {
          commit("sysRoleGetAllRole", result)
        } else {
          commit("sysRoleGetAllRole", [])
        }
      }).catch(err => {
        commit("loadingChange", false)
        reject(err)
      })
    })
  },
  async productTypegetAllType ({ commit }) {
    let userInfo = []
    return new Promise((resolve, reject) => {
      commit("loadingChange", true)
      Api.productTypegetAllType().then((res) => {
        commit("loadingChange", false)
        if (res.code === 0) {
          let result = res.content
          commit("productTypegetAllType", result)
        } else {
          commit("productTypegetAllType", [])
        }
      }).catch(err => {
        commit("loadingChange", false)
        reject(err)
      })
    })
  },
  async sysDeptgetPageDept ({ commit }) {
    let query = {
      content: {
        deptName: null,
        status: null,
      },
      pager: {
        pageSize: 10000,
        currentPage: 1
      }
    }
    return new Promise((resolve, reject) => {
      commit("loadingChange", true)
      Api.sysDeptgetPageDept(query).then((res) => {
        commit("loadingChange", false)
        if (res.code === 0) {
          let result = res.content.list
          commit("sysDeptgetPageDept", result)
        } else {
          commit("sysDeptgetPageDept", [])
        }
      }).catch(err => {
        commit("loadingChange", false)
        reject(err)
      })
    })
  },

  async sysCompanygetAllMechanism ({ commit }) {
    let userInfo = []
    return new Promise((resolve, reject) => {
      commit("loadingChange", true)
      Api.sysCompanygetAllMechanism().then((res) => {
        commit("loadingChange", false)
        let result = res.content
        if (res.code === 0) {
          commit("sysCompanygetAllMechanism", result)
        } else {
          commit("sysCompanygetAllMechanism", [])
        }
      }).catch(err => {
        commit("loadingChange", false)
        reject(err)
      })
    })
  },
  async sysMenugetSelectMenu ({ commit }) {
    let userInfo = []
    return new Promise((resolve, reject) => {
      commit("loadingChange", true)
      Api.sysMenugetSelectMenu().then((res) => {
        commit("loadingChange", false)
        let result = res.content
        if (res.code === 0) {
          commit("sysMenugetSelectMenu", result)
        } else {
          commit("sysMenugetSelectMenu", [])
        }
      }).catch(err => {
        commit("sysMenugetSelectMenu", false)
        reject(err)
      })
    })
  },
  async sysCompanygetFirstGradeMechanism ({ commit }) {
    let userInfo = []
    return new Promise((resolve, reject) => {
      commit("loadingChange", true)
      Api.sysCompanygetFirstGradeMechanism().then((res) => {
        commit("loadingChange", false)
        let result = res.content
        if (res.code === 0) {
          commit("FirstGradeMechanismChange", result)
        } else {
          commit("FirstGradeMechanismChange", [])
        }
      }).catch(err => {
        commit("loadingChange", false)
        reject(err)
      })
    })
  },
  async dklxChange ({ commit }) {
    commit("loadingChange", true)
    let userInfo = []
    return new Promise((resolve, reject) => {
      Api.sysMenugetGetMenu().then((res) => {
        commit("loadingChange", false)
        if (response.status === 200) {
          commit(dklxChange, { userInfo })
        } else {
          commit(dklxChange, [])
        }
      }).catch(err => {
        commit("loadingChange", false)
        reject(err)
      })
    })
  },

  async dkztChange ({ commit }) {
    commit("loadingChange", false)
    let userInfo = []
    return new Promise((resolve, reject) => {
      Api.sysMenugetGetMenu().then((res) => {
        commit("loadingChange", false)
        if (response.status === 200) {
          commit(dkztChange, { userInfo })
        } else {
          commit(dkztChange, [])
        }
      }).catch(err => {
        commit("loadingChange", false)
        reject(err)
      })
    })
  },
  async jglxChange ({ commit }) {
    let userInfo = []
    commit("loadingChange", false)
    return new Promise((resolve, reject) => {
      Api.sysMenugetGetMenu().then((res) => {
        commit("loadingChange", false)
        if (response.status === 200) {
          commit(jglxChange, { userInfo })
        } else {
          commit(jglxChange, [])
        }
      }).catch(err => {
        commit("loadingChange", false)
        reject(err)
      })
    })
  },
  async zcdzChange ({ commit }) {
    let userInfo = []
    return new Promise((resolve, reject) => {
      commit("loadingChange", false)
      Api.sysMenugetGetMenu().then((res) => {
        commit("loadingChange", false)
        if (response.status === 200) {
          commit(zcdzChange, { userInfo })
        } else {
          commit(zcdzChange, [])
        }
      }).catch(err => {
        commit("loadingChange", false)
        reject(err)
      })
    })
  },
  async jydzChange ({ commit }) {
    commit("loadingChange", false)
    let userInfo = []
    return new Promise((resolve, reject) => {
      Api.sysMenugetGetMenu().then((res) => {
        commit("loadingChange", false)
        if (response.status === 200) {
          commit(jydzChange, { userInfo })
        } else {
          commit(jydzChange, [])
        }
      }).catch(err => {
        commit("loadingChange", false)
        reject(err)
      })
    })
  },
  async setListMenu ({ commit }) {
    commit("loadingChange", false)
    let userInfo = []
    return new Promise((resolve, reject) => {
      Api.setListMenu().then((res) => {
        commit("loadingChange", false)
        if (res.code === 0) {
          commit('setListMenu', res.content)
        } else {
          commit('setListMenu', [])
        }
      }).catch(err => {
        commit("loadingChange", false)
        reject(err)
      })
    })
  },
  // async jglxChange ({ commit }) {
  //   commit("loadingChange", false)
  //   let userInfo = []
  //   return new Promise((resolve, reject) => {
  //     Api.sysMenugetGetMenu().then((res) => {
  //       commit("loadingChange", false)
  //       if (response.status === 200) {
  //         commit(jglxChange, { userInfo })
  //       } else {
  //         commit(jglxChange, [])
  //       }
  //     }).catch(err => {
  //       commit("loadingChange", false)
  //       reject(err)
  //     })
  //   })
  // },



  async dkzqChange ({ commit }) {
    let userInfo = []
    return new Promise((resolve, reject) => {
      commit("loadingChange", false)
      Api.sysMenugetGetMenu().then((res) => {
        commit("loadingChange", false)
        if (response.status === 200) {
          commit(dkzqChange, { userInfo })
        } else {
          commit(dkzqChange, [])
        }
      }).catch(err => {
        commit("loadingChange", false)
        reject(err)
      })
    })
  },
}

export default actions

