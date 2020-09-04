
const state = {
    // this.$store.state.sysCodegetCode.AllMechanismChange
    userInfor: null,
    loading: false,
    isCollapse: false,
    // getTime() {
    //     this.content.createdTimeUp = this.times[0];
    //     this.content.createdTimeDown = this.times[1];
    // },
    getAllType: null,//贷款类型
    // CPZT //产品状态
    nowMue: "/adminIndex",
    token: null,
    sysCodegetCode: {
        orderSatue: null,
        DKZQSatue: null,//贷款周期
        CPZTSatue: null,//产品状态
        DKZTSatue: null,//贷款周期
        ZCDZSatue: null,//注册地址
        JYDZSatue: null,//经营地址
        AllMechanism: null,//经融机构
        AllFirstGradeMechanism: null,//上级机构列表,
        sysMenugetSelectMenu: null,
        leftListMenu: [],
        AllRole: null,//所有角色下拉
    },
    cycle: [{
        label: "本周",
        value: "0"
    }, {
        label: "本月",
        value: "1"
    }, {
        label: "本季",
        value: "2"
    }, {
        label: "本年度",
        value: "3"
    }],
    option: {
        jrjgOption: [],
        fzjgOption: [],
        dklxOption: [],
        jglxOption: [],
        gwztOption: [
            {
                value: '',
                label: '岗位状态'
            },
            {
                value: '0',
                label: '启用'
            }, {
                value: '1',
                label: '禁用'
            },
        ],
        cdztOption: [
            {
                value: '',
                label: '菜单状态'
            },
            {
                value: '0',
                label: '启用'
            }, {
                value: '1',
                label: '禁用'
            },
        ],
        jsztOption: [
            {
                value: '',
                label: '角色状态'
            },
            {
                value: '0',
                label: '启用'
            }, {
                value: '1',
                label: '禁用'
            },
        ],
        flztOption: [
            {
                value: '',
                label: '分类状态'
            },
            {
                value: '0',
                label: '启用'
            }, {
                value: '1',
                label: '禁用'
            },
        ],
        rzztOption: [{
            value: '',
            label: '认证状态'
        },
        {
            value: '0',
            label: '已认证'
        }, {
            value: '1',
            label: '未认证'
        },
        ],
        qyqyztOption: [{
            value: '',
            label: '企业启用状态'
        },
        {
            value: '0',
            label: '启用'
        }, {
            value: '1',
            label: '停用'
        },
        ],
        yhzhlxOption: [{
            value: '',
            label: '用户账号类型'
        },
        {
            value: '0',
            label: '企业用户'
        }, {
            value: '1',
            label: '金融账号用户'
        },
        ],
        zhztOption: [{
            value: '',
            label: '账号状态'
        },
        {
            value: '0',
            label: '启用'
        }, {
            value: '1',
            label: '禁用'
        },
        ],
        jgztOption: [{
            value: '',
            label: '机构状态'
        },
        {
            value: '0',
            label: '启用'
        }, {
            value: '1',
            label: '禁用'
        },
        ],
        jgdjOption: [{
            value: '',
            label: '机构等级'
        },
        {
            value: '0',
            label: '一级机构'
        }, {
            value: '1',
            label: '二级机构'
        },
        ],
    }

}

export default state
