import * as API from "./axios.js";
let base = "/inclusive"
export default {
    //登录 
    login: (params, params1) => {
        return API.POST(`${params}`, params1)
    },
    //登录 
    getuser: params => {
        return API.POST(`${params}`)
    },
    //登录 
    loanInfogetProportionLoanTypes: params => {
        return API.POST(`${base}/loanInfo/getProportionLoanTypes`, params)
    },
    //登录 
    sysLoginlogin: params => {
        return API.POST(`${base}/sysLogin/login`, params)
    },
    //登录 
    sysMenugetManageMenu: params => {
        return API.POST(`${base}/sysMenu/getManageMenu`, params)
    },
    //登录 
    sysPostgetGetPost: params => {
        return API.POST(`${base}/sysPost/getGetPost`, params)
    },
    //登录 
    sysDeptdeleteDept: params => {
        return API.POST(`${base}/sysDept/deleteDept`, params)
    },
    //登录 
    sysLogingeneratorImgCode: () => {
        return API.POST(`${base}/sysLogin/generatorImgCode`)
    },
    //登录 
    sysUsergetLoginUser: params => {
        return API.POST(`${base}/sysUser/getLoginUser`, params)
    },
    // //登录 
    loanInfoexportMonthLoanInfo: params => {
        return API.POST(`${base}/loanInfo/exportMonthLoanInfo`, params)
        // return API.POST(`${base}/sysLogin/exportMonthLoanInfo`)
    },
    // //登录 
    loanInfoexportProductLoanInfo: params => {
        return API.POST(`${base}/loanInfo/exportProductLoanInfo`, params)
        // return API.POST(`${base}/sysLogin/generatorImgCode`)
    },
    // //登录 
    loanInfoexportLoanInfoList: params => {
        return API.POST(`${base}/loanInfo/exportLoanInfoList`, params)
        // return API.POST(`${base}/sysLogin/generatorImgCode`)
    },
    // //登录 
    sysRolesaveRole: params => {
        return API.POST(`${base}/sysRole/saveRole`, params)
        // return API.POST(`${base}/sysLogin/generatorImgCode`)
    },
    //登录 
    homePagegetDataStatistics: params => {
        return API.POST(`${base}/homePage/getDataStatistics`, params)
    },
    //登录 
    sysCompanygetMechanismPercentage: params => {
        return API.POST(`${base}/sysCompany/getMechanismPercentage`, params)
    },
    //登录 
    loanInfoloanInfoList: params => {
        return API.POST(`${base}/loanInfo/loanInfoList`, params)
    },
    //登录 
    sysDeptgetPageDept: params => {
        return API.POST(`${base}/sysDept/getPageDept`, params)
    },
    //登录 
    loanInfoMaterialgetLoanMaterial: params => {
        return API.POST(`${base}/loanInfoMaterial/getLoanMaterial`, params)
    },
    //登录 
    sysCodegetCode: params => {
        return API.POST(`${base}/sysCode/getCode`, params)
    },
    //登录 
    productTypegetAllType: params => {
        return API.POST(`${base}/productType/getAllType`, params)
    },
    //登录 
    loanInfoapprove: params => {
        return API.POST(`${base}/loanInfo/approve`, params)
    },
    //登录 
    sysCompanygetCompanyArea: () => {
        return API.POST(`${base}/sysCompany/getCompanyArea`)
    },
    //登录 
    sysCompanygetMechanismPercentage: params => {
        return API.POST(`${base}/sysCompany/getMechanismPercentage`, params)
    },
    //登录 
    loanInfogetLoanTrends: params => {
        return API.POST(`${base}/loanInfo/getLoanTrends`, params)
    },
    //登录 
    sysDeptgetGetDept: params => {
        return API.POST(`${base}/sysDept/getGetDept`, params)
    },
    //登录 
    sysRoledeleteRole: params => {
        return API.POST(`${base}/sysRole/deleteRole`, params)
    },
    //登录 
    sysRolegetRole: params => {
        return API.POST(`${base}/sysRole/getRole`, params)
    },
    //登录 
    getCompany: params => {
        return API.POST(`${base}/loanInfo/getCompany`, params)
    },
    //登录 
    loanInfogetPageApproveOrder: params => {
        return API.POST(`${base}/loanInfo/getPageApproveOrder`, params)
    },
    //登录 
    productInfooperate: params => {
        return API.POST(`${base}/productInfo/operate`, params)
    },
    sysCompanygetMechanismDetail: params => {
        return API.POST(`${base}/sysCompany/getMechanismDetail`, params)
    },
    loanInfogetCompanyLoanInfo: params => {
        return API.POST(`${base}/loanInfo/getCompanyLoanInfo`, params)
    },
    //登录 
    homePagegetDynamicData: params => {
        return API.POST(`${base}/homePage/getDynamicData`, params)
    },
    //登录 
    approveGetLoanApproveStatus: params => {
        return API.POST(`${base}/approve/getLoanApproveStatus`, params)
    },
    //产品审核
    productInfoApprove: params => {
        return API.POST(`${base}/productInfo/approve`, params)
    },
    //机构用户详情
    sysUserGetMechanismUserDetail: params => {
        return API.POST(`${base}/sysUser/getMechanismUserDetail`, params)
    },
    //获取所有角色下拉选择数据
    sysRoleGetAllRole: params => {
        return API.POST(`${base}/sysRole/getAllRole`, params)
    },
    //产品分类管理==========================================================================
    //查询所有产品分类信息
    productTypegetAllType: params => {
        return API.POST(`${base}/productType/getAllType`, params)
    },
    //产品分类信息列表分页

    productTypeproductTypeList: params => {
        return API.POST(`${base}/productType/productTypeList`, params)
    },
    //添加或者编辑产品分类 
    productTypesaveOrUpdateProductType: params => {
        return API.POST(`${base}/productType/saveOrUpdateProductType`, params)
    },
    //产品管理==========================================================================
    //产品信息列表分页
    productInfoproductInfoList: params => {
        return API.POST(`${base}/productInfo/productInfoList`, params)
    },
    //产品信息详情信息
    productInfogetProductInfoDetail: params => {
        return API.POST(`${base}/productInfo/getProductInfoDetail`, params)
    },
    //增加或编辑产品信息
    productInfoaddOrUpdateProductInfo: params => {
        return API.POST(`${base}/productInfo/addOrUpdateProductInfo`, params)
    },
    //企业管理==========================================================================
    //企业信息列表
    sysCompanygetCompanyList: params => {
        return API.POST(`${base}/sysCompany/getCompanyList`, params)
    },
    //添加或者编辑机构
    sysCompanyaddOrUpdateCompany: params => {
        return API.POST(`${base}/sysCompany/addOrUpdateCompany`, params)
    },
    //机构信息列表
    sysCompanygetMechanismList: params => {
        return API.POST(`${base}/sysCompany/getMechanismList`, params)
    },
    //获取所有一级机构
    sysCompanygetFirstGradeMechanism: params => {
        return API.POST(`${base}/sysCompany/getFirstGradeMechanism`, params)
    },
    //根据一级机构获取二级机构
    sysCompanygetMechanismByFirst: params => {
        return API.POST(`${base}/sysCompany/getMechanismByFirst`, params)
    },
    //用户管理==========================================================================
    //用户信息列表
    sysUsergetUserList: params => {
        return API.POST(`${base}/sysUser/getUserList`, params)
    },
    //用户信息列表
    sysCompanygetAllMechanism: params => {
        return API.POST(`${base}/sysCompany/getAllMechanism`, params)
    },
    //用户信息列表
    productInfoexportProductInfoList: params => {
        return API.POST(`${base}/productInfoexport/ProductInfoList`, params)
    },
    //用户信息列表
    sysUserexportUserList: params => {
        return API.POST(`${base}/sysUser/exportUserList`, params)
    },
    //用户信息列表
    sysCompanyexportCompanyList: params => {
        return API.POST(`${base}/sysCompany/exportCompanyList`, params)
    },
    //添加或者编辑机构用户 
    sysUsergetGetUser: params => {
        return API.POST(`${base}/sysUser/getGetUser`, params)
    },
    sysCompanyexportMechanismList: params => {
        return API.POST(`${base}/sysCompany/exportMechanismList`, params)
    },
    sysUserresetPassword: params => {
        return API.POST(`${base}/sysUser/resetPassword`, params)
    },
    //添加或者编辑机构用户
    sysUseraddOrUpdateMechanismUser: params => {
        return API.POST(`${base}/sysUser/addOrUpdateMechanismUser`, params)
    },
    //分页账号管理信息
    sysUsergetPageAccount: params => {
        return API.POST(`${base}/sysUser/getPageAccount`, params)
    },
    //新增账号信息
    sysUsersaveOrUpdateAccount: params => {
        return API.POST(`${base}/sysUser/saveOrUpdateAccount`, params)
    },
    //删除账号信息
    sysUserdeleteAccount: params => {
        return API.POST(`${base}/sysUser/deleteAccount`, params)
    },
    //更改角色信息
    sysRoleUpdateRole: params => {
        return API.POST(`${base}/sysRole/updateRole`, params)
    },
    //岗位管理导出
    sysPostExportPagePost: params => {
        return API.POST(`${base}/sysPost/exportPagePost`, params)
    },
    //菜单管理==========================================================================
    //获取用户所有菜单信息
    sysMenugetListMenu: params => {
        return API.POST(`${base}/sysMenu/getListMenu`, params)
    },
    //获取选择的菜单信息
    sysMenugetSelectMenu: params => {
        return API.POST(`${base}/sysMenu/getSelectMenu`, params)
    },
    //获取某个菜单的信息
    sysUserGUeeegrstt: params => {
        return API.POST(`${base}/sysUser/GUeeegrstt`, params)
    },
    //获取某个菜单的信息
    sysMenugetGetMenu: params => {
        return API.POST(`${base}/sysMenu/getGetMenu`, params)
    },
    //修改某个菜单的信息
    sysMenuupdateMenu: params => {
        return API.POST(`${base}/sysMenu/updateMenu`, params)
    },
    //新增某个菜单的信息
    sysMenusaveMenu: params => {
        return API.POST(`${base}/sysMenu/saveMenu`, params)
    },
    //获取角色列表
    sysRolegetPageRole: params => {
        return API.POST(`${base}/sysRole/getPageRole`, params)
    },
    //获取部门列表
    sysDeptgetPageDept: params => {
        return API.POST(`${base}/sysDept/getPageDept`, params)
    },
    //获取月数据报表
    loanInfogetMonthLoanInfo: params => {
        return API.POST(`${base}/loanInfo/getMonthLoanInfo`, params)
    },
    //获取月度排名
    loanInfogetProductLoanInfo: params => {
        return API.POST(`${base}/loanInfo/getProductLoanInfo`, params)
    },
    //获取月度排名
    loanInfogetCompanyLoanInfo: params => {
        return API.POST(`${base}/loanInfo/getCompanyLoanInfo`, params)
    },
    //获取月度排名
    sysPostdeletePost: params => {
        return API.POST(`${base}/sysPost/deletePost`, params)
    },
    //获取月度排名
    sysPostsaveOrUpdatePost: params => {
        return API.POST(`${base}/sysPost/saveOrUpdatePost`, params)
    },
    //获取月度排名
    sysPostsaveOrUpdatePost: params => {
        return API.POST(`${base}/sysPost/saveOrUpdatePost`, params)
    },
    //获取月度排名
    sysPostgetPagePost: params => {
        return API.POST(`${base}/sysPost/getPagePost`, params)
    },
    //新增部门
    sysDeptSaveOrUpdateDept: params => {
        return API.POST(`${base}/sysDept/saveOrUpdateDept`, params)
    },
    //操作日志
    sysOperLog: params => {
        return API.POST(`${base}/sysOperLog/getOperateLogPage`, params)
    },
    //设置左边菜单
    setListMenu: params => {
        return API.POST(`${base}/sysMenu/getListMenu`, params)
    },
}
//调用方法
// API.login("/asm/list", params).then(res=>{

// })