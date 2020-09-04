webpackJsonp([21],{"b+RK":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={components:{getCode:n("XxJE").a},computed:{addressLists:function(){return this.$store.state.addressLists},subAddLists:function(){return this.$store.state.subAddLists}},data:function(){return{inputStyle:{padding:"0.313vw","font-size":"0.729vw"},userProtocalShow:!1,formInfo:{busCounty:"九龙坡区",busProvince:"重庆市",name:"",password:"",regCounty:"九龙坡区",regProvince:"重庆市",tel:"",type:2,verifyCode:""},isRead:!1}},methods:{handleSubmit:function(){var t=this,e=!0;for(var n in this.formInfo)this.formInfo[n]||(e=!1);e?this.formInfo.password.length<6?this.$alert.error("密码为不少于六位数的字母组合!"):this.$api.user.registe(this.formInfo).then(function(e){e.err?t.$alert.success(e.err.message):(t.$alert.success("注册成功"),t.$router.push({name:"login",query:{tel:t.formInfo.tel}}))}):this.$alert.success("请将信息填写完整")}}},a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"register-wrapper text-center"},[n("p",{staticClass:"title"},[t._v("注册")]),t._v(" "),n("div",{staticClass:"form-container"},[n("div",{staticClass:"form-box"},[n("div",{staticClass:"form-item"},[n("span",{staticClass:"form-item-label required"},[t._v("企业名称")]),t._v(" "),n("my-input",{staticClass:"form-item-input",attrs:{placeholder:"请输入企业名称"},model:{value:t.formInfo.name,callback:function(e){t.$set(t.formInfo,"name",e)},expression:"formInfo.name"}})],1),t._v(" "),n("div",{staticClass:"form-item"},[n("span",{staticClass:"form-item-label required",staticStyle:{width:"4.427vw"}},[t._v("注册地址")]),t._v(" "),n("Select",{staticClass:"text-left jq-select",staticStyle:{width:"9.063vw","margin-right":"1.042vw"},attrs:{size:"large"},model:{value:t.formInfo.regProvince,callback:function(e){t.$set(t.formInfo,"regProvince",e)},expression:"formInfo.regProvince"}},t._l(t.addressLists,function(t){return n("Option",{key:t.name,attrs:{label:t.name,value:t.name}})}),1),t._v(" "),n("Select",{staticClass:"text-left jq-select",staticStyle:{width:"9.063vw"},attrs:{size:"large"},model:{value:t.formInfo.regCounty,callback:function(e){t.$set(t.formInfo,"regCounty",e)},expression:"formInfo.regCounty"}},t._l(t.subAddLists,function(t){return n("Option",{key:t.name,attrs:{label:t.name,value:t.name}})}),1)],1),t._v(" "),n("div",{staticClass:"form-item"},[n("span",{staticClass:"form-item-label required",staticStyle:{width:"4.427vw"}},[t._v("经营地址")]),t._v(" "),n("Select",{staticClass:"text-left jq-select",staticStyle:{width:"9.063vw","margin-right":"1.042vw"},attrs:{size:"large"},model:{value:t.formInfo.busProvince,callback:function(e){t.$set(t.formInfo,"busProvince",e)},expression:"formInfo.busProvince"}},t._l(t.addressLists,function(t){return n("Option",{key:t.name,attrs:{label:t.name,value:t.name}})}),1),t._v(" "),n("Select",{staticClass:"text-left jq-select",staticStyle:{width:"9.063vw"},attrs:{size:"large"},model:{value:t.formInfo.busCounty,callback:function(e){t.$set(t.formInfo,"busCounty",e)},expression:"formInfo.busCounty"}},t._l(t.subAddLists,function(t){return n("Option",{key:t.name,attrs:{label:t.name,value:t.name}})}),1)],1),t._v(" "),n("div",{staticClass:"form-item"},[n("span",{staticClass:"form-item-label required"},[t._v("手机号码")]),t._v(" "),n("my-input",{staticClass:"form-item-input",attrs:{placeholder:"请输入手机号码","max-length":11},model:{value:t.formInfo.tel,callback:function(e){t.$set(t.formInfo,"tel",e)},expression:"formInfo.tel"}})],1),t._v(" "),n("div",{staticClass:"form-item"},[n("span",{staticClass:"form-item-label required"},[t._v("验证码")]),t._v(" "),n("get-code",{attrs:{tel:t.formInfo.tel,"req-type":"register"},model:{value:t.formInfo.verifyCode,callback:function(e){t.$set(t.formInfo,"verifyCode",e)},expression:"formInfo.verifyCode"}})],1),t._v(" "),n("div",{staticClass:"form-item"},[n("span",{staticClass:"form-item-label required"},[t._v("密码")]),t._v(" "),n("my-input",{staticClass:"form-item-input",attrs:{type:"password",placeholder:"不少于6位数的字母组合","max-length":16},model:{value:t.formInfo.password,callback:function(e){t.$set(t.formInfo,"password",e)},expression:"formInfo.password"}})],1)]),t._v(" "),n("div",[t.isRead?n("Button",{staticClass:"jq-btn-red",staticStyle:{width:"100%"},on:{"on-click":t.handleSubmit}},[t._v("注册")]):n("Button",{staticClass:"jq-btn-grey btn-dis",staticStyle:{width:"100%"},attrs:{disabled:""}},[t._v("注册")])],1),t._v(" "),n("div",{staticClass:"margin-top"},[n("Checkbox",{staticStyle:{"font-weight":"300"},model:{value:t.isRead,callback:function(e){t.isRead=e},expression:"isRead"}},[t._v("\n    注册即表示同意"),n("span",{staticClass:"user-protocal",on:{click:function(e){t.userProtocalShow=!0}}},[t._v("《用户服务协议》")])])],1)]),t._v(" "),n("mask-layer",{staticClass:"text-left",attrs:{show:t.userProtocalShow,"title-name":"用户服务协议"},on:{close:function(e){t.userProtocalShow=!1}}},[n("div",{staticClass:"center-section",staticStyle:{padding:"0.521vw"},attrs:{slot:"content"},slot:"content"},[n("p",{staticStyle:{"text-indent":"2.083vw",margin:"1.042vw 0"}},[t._v("\n               欢迎阅读普惠金融平台服务协议(下称“本协议”)，请您在使用普惠金融平台时（下称“本平台”或“平台”）（phjr.cicba.cn）服务前认真阅读、充分理解全部协议内容。本协议内容包括但不限于协议正文及所有本平台已经发布的或将来可能发布的各类规则。所有内容为本协议不可分割\n               的组成部分，与本协议正文具有同等法律效力。除另行明确声明外，本平台提供的任何服务均受本协议约束。若您不接受以下条款，请您立即停止注册或主动停止使用本平台的服务。您一旦在本平台成功完成注册，即成为本平台用户，同时表示您充分理解并同意接受本平台的服务并受以\n               下条款的约束，并签署了本协议，本协议已在您与政务服务机构（下称“本机构”）之间产生法律效力，您使用本平台服务的全部活动将受到本协议的约束并应承担相应的责任和义务。")]),t._v(" "),n("h4",{staticClass:"margin-tb"},[t._v("一、用户权利和义务")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n              （1）中国境内注册成立并经营的具备民事行为能力且能独立承担民事责任的法人或自然人成为本平台用户。用户在本平台的操作者应为其法定代表人或被授权的股东，且该操作者应为持有中国有效身份证明的年满18周岁并具有完全民事行为能力的自然人。操作者在本平台的所有操作行为\n               的一切法律后果均由对应企业的法人用户承担。如您不符合前述主体资格，则您及您所代表的法人用户应承担因此而导致的一切后果，且本平台有权随时中止或终止您的用户资格。\n               ")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n              （2）用户账号持有人应当妥善地保存在本平台的用户名和密码并定期更换密码，不得以任何形式擅自转让或授权他人使用自己在本平台的用户帐号。通过您的用户名和密码编辑、发布的任何信息或做出的任何行为都将被视为您的真实意愿及操作行为。用户对其在本平台注册的用户名和密\n               码的安全性负全部责任，通过您的用户名和密码编辑、发布的任何信息或做出的任何行为都将被视为您的真实意愿及账号持有人的操作行为。对本平台或本机构原因造成的账号遗失（包括但不限于您的设备遭受他人攻击、遭受诈骗等）产生的任何损失，本平台及本机构不承担任何责任。\n               您亦不得以密码等信息丢失原因否认通过平台与本机构订立的所有合同的法律效力。\n               ")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n              （3）在注册时和使用本平台服务的所有期间，您应保证所提交的所有资料和信息真实、准确、完整，如有变更，应及时更新，如因您未及时更新信息和资料导致本平台无法提供服务，由此产生的法律责任和后果由您自行承担。\n               ")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n              （4）您不得利用虚假信息、他人信息和资料注册本平台，否则，由此引起的一切责任和后果均由您自行承担，本机构及本平台不因此承担任何法律责任，如因此给本机构或本平台造成损失，您应当承担赔偿责任。\n               ")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n              （5）您不得利用本平台或本平台服务从事任何不符合中国法律法规或侵犯他人权益的活动。本平台在发现您从事该等活动时，有权不经通知而立即停止您对本平台的全部或部分功能的使用。\n               ")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n              （6）用户应结合自身的财务状况、风险承受能力、风险识别能力等谨慎选择适用由本平台合作机构提供的金融服务产品，并自行承担因此产生的法律后果。\n               ")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n              （7）凡通过本平台及其链接的其它网站而获得的网上资料及内容，仅供您浏览和参考之用，请您对相关内容自行辨别及判断，本平台对上述资料及内容不承担任何责任。\n               ")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n              （8）您需要使用个人真实移动电话号码进行注册操作，在平台认为可能存在虚假盗用信息的情况时，我们有权暂停、终端或终止向您提供本平台下的全部或部分服务，并将注册资料移除或删除，且无需对您承担任何责任。\n               ")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n              （9）本平台有权基于单方独立判断，在认为可能发生危害交易安全等情形时，不经通知而暂停、中断或终止向您提供本协议项下的全部或部分服务，并将注册资料移除或删除，且无需对您承担任何责任。前述情形包括但不限于：\n               ")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v("  1) 本平台认为您提供的相关资料不具有真实性、有效性或完整性；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v("  2) 本平台发现您操作行为有违法之时；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v("  3) 本平台认为您的账户被冒用或其他本平台认为有风险之情形；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v("  4) 本平台认为您已经违反本协议中规定的各类规则；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v("  5) 其他本平台基于独立判断，认为将会导致交易风险的情形。")]),t._v(" "),n("h4",{staticClass:"margin-tb"},[t._v("二、平台服务")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n              （1）您在本平台按照平台服务流程确认的操作，将成为本平台进行相关操作（包括但不限于产品申请等）的不可撤销的指令。您同意相关指令的执行时间以本平台系统中进行实际操作的时间为准。您同意本平台有权依据本协议及本\n               平台相关纠纷处理规则等的约定对相关事项进行处理。您未能及时对操作进行修改、确认或未能及时提交相关申请所引起的任何纠纷或损失由您自行负责，本平台不承担任何责任。\n              ")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n              （2）您理解并同意本平台对您通过本平台进行的认证和申请等行为不承担任何责任。本平台无法也没有义务保证您在发出贷款申请后，能够实际获得贷款。因通过本平台进行的认证和申请等行为导致的损失由您自行承担，本平台不承担任何责任。\n              ")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n               （3）受限于不同的公司类型和企业规模，您须理解并同意本平台不保证必定能对相关产品做出精准匹配，但我们将尽可能地提升匹配精确度，将尽可能精准的产品推送至您的匹配结果中。\n              ")]),t._v(" "),n("h4",{staticClass:"margin-tb"},[t._v("三、平台权利与义务")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("（1）信息获取为了依法、合规地为您提供更好的服务，您同意并授权普惠金融平台获取您的下列信息：")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v(" 1) 与国家安全、国防安全直接相关的；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v(" 2) 与公共安全、公共卫生、重大公共利益直接相关的；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v(" 3) 与犯罪侦查、起诉、审判和判决执行等直接相关的；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v(" 4) 出于维护您或他人的生命、财产等重大合法权益但又很难得到您本人同意的；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v(" 5) 您的身份信息，包括但不限于企业名称、法定代表人、法定代表人证件类型及证件号码、法定代表人电话号码、企业经营地址、税号等；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v(" 6) 您访问本平台服务网站及其相关网站、移动设备客户端时，或使用本平台服务时的设备信息、位置信息和操作日志；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v(" 7) 您在申请、使用本平台相关服务时所提供及所形成的必要的信息和数据，包括但不限于您的相关账户认证信息和企业经营信息；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v(" 8) 您在本平台、平台关联机构、平台合作伙伴（包括但不限于本平台的关联机构、银行及金融机构、验证机构、电子证据存证服务机构等）处留存的和形成的与本平台服务相关的必要信息和数据，包括但不限于您的账户信息、企业经营信息、协议内容、行为数据等；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v(" 9) 您在行政机关、司法机关留存的任何信息，包括但不限于户籍信息/工商信息、诉讼信息、执行信息和违法犯罪信息等；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v(" 10) 从合法公开披露的信息中获取信息，例如：合法的新闻报道、政府信息公开等渠道；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v(" 11) 根据您的要求签订和履行合同所必需的；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v(" 12) 用于维护所提供服务的安全稳定运行所必需的；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v(" 13) 您在其他合法留存您信息的自然人、法人以及其他组织处留存的信息；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v(" 14) 法律法规规定的其他情形。")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n              （2）信息保护和存储本平台会采取各种合理必要的物理、电子和管理方面的安全措施来保护您的信息，以保障您的信息安全。例如，在技术开发环境当中，我们仅使用经过去标识化处理的信息进行统计分析。\n               为了保障您的信息安全，我们致力于使用各种安全技术及配套的管理体系来尽量降低您的信息被泄露、毁损、误用、非授权访问和更改的风险。例如，通过网络安全层软件（SSL）进行加密传输、信息加密存储\n               、严格限制数据中心的访问。传输和存储个人敏感信息时，我们将采用加密、权限控制、去标识化等安全措施。请务必保管好您的普惠金融平台登录名及其他身份要素。您在使用本平台服务时，我们会通过您的\n               登录名及其他身份要素来识别您的身份。一旦您泄露了前述信息，您可能会蒙受损失，并可能对您产生不利。如您发现普惠金融平台登录名及其他身份要素可能已经泄露时，请您立即和我们取得联系，以便我们\n               及时采取相应措施以避免和降低相关损失。在您终止使用普惠金融平台后，我们会停止对您信息的收集和使用，法律法规或监管部门另有规定的除外。如我们停止运营，我们将及时停止搜集您个人信息的活动，\n               将停止运营的通知以逐一送达或公告的形式通知您，并对所持有的您的个人信息进行删除或匿名化处理。\n            ")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("（3）信息的使用普惠金融平台会把您的信息用于以下用途：")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v("1) 为保护您的账户安全、防止欺诈，对您的身份进行识别、验证，本平台可能将您的信息提供给验证机构进行验证；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v("2) 向您提供、维护、改进本平台的各项服务；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v("3) 为了完成拟向您提供的服务而向平台的合作伙伴提供您的信息；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v("4) 出于业务合作、提升服务，对您的信息进行综合统计、分析等；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v("5) 记录并管理您访问和接受服务的状态、交易信息和历史记录。本平台会对\n                  您使用本平台服务的情况进行统计，并可能会与公众或第三方分享这些统计信息，以展示本平台的产品或服务的\n                  整体使用趋势，但这些统计信息不会包含您的任何身份识别信息，且该等信息将不会被复原；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v("6) 为使您知晓自己使用平台的各项服务的情况或了解平台的服务，向您发送服务状态的通知、营销活动及其他商业性电子信息；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v("7) 本平台可能会将来自某项服务的个人信息与来自其他服务所获得的信息结合起来，以便为您提供更加个性化的服务；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v("8) 根据法律法规或经您同意或授权的其他用途。")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n              （4）信息共享本平台承诺对您的信息进行严格保密。除法律法规及监管部门另有规定外，本平台仅在以下情形中与本平台合作伙伴共享您的信息。如果为了向您提供服务而需要将您的信息共享至本平台合作伙伴，\n              本平台将评估该合作伙伴获取共享及使用信息的合法性、正当性、必要性。\n             ")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v("1)某些产品或服务可能由平台合作伙伴提供或由本平台与合作伙伴共同提供，因此， 只有共享您的信息，才能提供您需要的产品或服务。例如：您通过本平台向银行等进行资金贷款申请时，\n                  根据其贷款产品要求需要通过本平台获取您的用户信息作为信用凭证，协助您完成贷款申请；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v("2)事先征得您书面同意的情况下，本平台会在法律法规允许且不违背公序良俗的范围内，依据您的授权范围与平台合作伙伴共享您的信息。")]),t._v(" "),n("h4",{staticClass:"margin-tb"},[t._v("四、特别声明")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n              （1）如果您因在第三方设备、移动通讯设备、公共共享环境或电脑被远程监控的情况下使用本平台提供的服务而造成包括但不限于信息泄露、数据丢失以及财产损失的，本平台不对此承担任何责任。\n               ")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n              （1）如果您因在第三方设备、移动通讯设备、公共共享环境或电脑被远程监控的情况下使用本平台提供的服务而造成包括但不限于信息泄露、数据丢失以及财产损失的，本平台不对此承担任何责任。\n               ")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n              （2）如果您将用户名或平台账户详细信息输入除本平台安全登陆系统外的其它任何服务系统，而造成包括但不限于经济、商誉、数据等方面的损失，本平台不承担任何责任。\n               ")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n              （3）在平台无过错行为时，由您的用户名及其他身份认证要素发生泄露而导致的所有损失，本平台不承担任何责任。\n               ")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n              （4）因以下情况，本平台没有正确执行或无法执行您在本平台提交的操作指令，本平台不承担任何责任：\n               ")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v("1)指令信息不明、存在乱码或不完整等；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v("2) 您所拥有的产品发生失效、过期、终止、作废等情况；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v("3) 不可抗力或意外事件；")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.604vw",margin:"0.521vw 0"}},[t._v("4) 其它平台无过错（包括故意和过失）的情况。")]),t._v(" "),n("h4",{staticClass:"margin-tb"},[t._v("五、不可抗力")]),t._v(" "),n("p",{staticStyle:{"text-indent":"2.083vw"}},[t._v("\n              互联网传输可能会受到干扰、中断、延迟、数据错误、病毒、木马、黑客攻击、系统不稳定、平台合作伙伴或第三方服务瑕疵、政府行为、网络服务平台或相关设备的定期或者不定期检修、维护，非本平台能控制的通讯设施、\n              硬件故障引致的数据及交易的不准确、不及时或者服务中断，本平台均不承担任何责任。\n              ")]),t._v(" "),n("h4",{staticClass:"margin-tb"},[t._v("六、协议签署及变更")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("（1）本平台有权根据需要不时地修改本协议或根据本协议制定、修改各类具体规则并在平台上公示，无需另行单独通知您。您应不时地关注本协议及具体规则的变更 ，若您在本协议及具体规\n              则内容变更后继续使用本服务的，表示您已充分阅读、理解并接受修改后的协议和具体规则内容，也将遵循修改后的协议和具体规则使用本平台的服务；同时，对您在协议和具体规则修订前通过本平台进行的业务操作及其效力，\n              视为您已同意并已按照本协议及有关规则进行了相应的授权和追认。若您不同意修改后的协议内容，您应立即停止使用本平台的服务。\n            ")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n               （2）通过自行或被授权方根据本协议及本平台有关规则、说明操作确认本协议后，本协议即在您和本平台之间产生法律效力。本协议不涉及您与本平台的其他用户之间因网上交易而产生的法律关系或法律纠纷。")]),t._v(" "),n("h4",{staticClass:"margin-tb"},[t._v("七、其他：")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("（1）如果您是本平台注册用户，本协议条款自您完成注册之日起生效，有效期至账户注销或者账户被关闭。")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("\n              （2）本协议的订立、执行、解释及争议解决均适用中华人民共和国法律（不包括香港、澳门、台湾地区）。本协议条款具有可分性，部分无效不影响其它部分效力。若您与本平台或本机构发生任\n              何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议向重庆市九龙坡区人民法院提起诉讼解决，且诉讼费、保全费、律师费、中介费等维权费用以及因第三方权利主张产生的费用等均由被告承担。")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("（3）本平台仅提供投融资信息服务，且不做任何背书，不对任何参与方提供担保责任。")]),t._v(" "),n("p",{staticStyle:{"text-indent":"1.042vw",margin:"0.521vw 0"}},[t._v("（4）除相关法律、法规明确规定外，本平台仅对本协议中列明范围内的责任负责。本平台保留对本协议及所有规则的最终解释权。")]),t._v(" "),n("p",{staticStyle:{"text-indent":"17.708vw"}},[t._v("版本生效日期：2020年06月20日")]),t._v(" "),n("br")])])],1)},staticRenderFns:[]};var v=n("C7Lr")(i,a,!1,function(t){n("w7Nu")},"data-v-75c8ebd1",null);e.default=v.exports},w7Nu:function(t,e){}});