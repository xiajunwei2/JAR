import Vue from 'vue';
import {
	Pagination,
	Dialog,
	Autocomplete,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Menu,
	Submenu,
	MenuItem,
	MenuItemGroup,
	Input,
	InputNumber,
	Radio,
	RadioGroup,
	RadioButton,
	Checkbox,
	CheckboxButton,
	CheckboxGroup,
	Switch,
	Select,
	Option,
	OptionGroup,
	Button,
	ButtonGroup,
	Table,
	TableColumn,
	DatePicker,
	TimeSelect,
	TimePicker,
	Popover,
	Tooltip,
	Breadcrumb,
	BreadcrumbItem,
	Form,
	FormItem,
	Tabs,
	TabPane,
	Tag,
	Tree,
	Alert,
	Slider,
	Icon,
	Row,
	Col,
	Upload,
	Progress,
	Spinner,
	Badge,
	Card,
	Rate,
	Steps,
	Step,
	Carousel,
	CarouselItem,
	Collapse,
	CollapseItem,
	Cascader,
	ColorPicker,
	Transfer,
	Container,
	Header,
	Aside,
	Main,
	Footer,
	Timeline,
	TimelineItem,
	Link,
	Divider,
	Image,
	Calendar,
	Backtop,
	PageHeader,
	CascaderPanel,
	Loading,
	MessageBox,
	Message,
	Notification
} from 'element-ui';

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Spinner);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.use(ColorPicker);
Vue.use(Transfer);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Link);
Vue.use(Divider);
Vue.use(Image);
Vue.use(Calendar);
Vue.use(Backtop);
Vue.use(PageHeader);
Vue.use(CascaderPanel);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.prototype.openLoading = function() {
	const loading = this.$loading({ // 声明一个loading对象
		lock: true, // 是否锁屏
		text: '正在加载...', // 加载动画的文字
		spinner: 'el-icon-loading', // 引入的loading图标
		background: 'rgba(0, 0, 0, 0.3)', // 背景颜色
		target: '.sub-main', // 需要遮罩的区域
		body: true,
		customClass: 'mask' // 遮罩层新增类名
	})
	setTimeout(function() { // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
		loading.close(); // 关闭遮罩层
	}, 5000)
	return loading;
}
// const rLoading = this.openLoading();
// rLoading.close();

// this.$alert('这是一段内容', '标题名称', {
// 	confirmButtonText: '确定',
// 	callback: action => {
// 		this.$message({
// 			type: 'info',
// 			message: `action: ${ action }`
// 		});
// 	}
// });

// this.$notify({
// 	title: '偏移',
// 	message: '这是一条带有偏移的提示消息',
// 	 position: 'bottom-right',
// 	offset: 100
// });

// let that = this;
// this.$prompt('驳回理由', '提示', {
// 	inputPlaceholder: '请输入驳回理由',
// 	confirmButtonText: '确定',
// 	cancelButtonText: '取消',
// 	inputErrorMessage: '输入不能为空',
// 	inputValidator: (value) => { // 点击按钮时，对文本框里面的值进行验证
// 		if (!value) {
// 			return '输入不能为空';
// 		}
// 	},
// 	callback: function(action, instance) {
// 		if (action === 'confirm') {
// 			new Promise((resolve, reject) => { // 点击确定，进行的异步操作
// 				audit({
// 					id: row.id,
// 					status: row.status,
// 					cause: instance.inputValue
// 				}).then(res => {
// 					if (res.code === 'R0000') {
// 						that.$message({
// 							type: 'success',
// 							message: '驳回成功'
// 						});
// 					}
// 				})
// 			}).then((error) => {
// 				console.log(error);
// 			})
// 		} else {
// 			that.$message({
// 				type: 'info',
// 				message: '取消驳回'
// 			});
// 		}
// 	}
// })



// this.$msgbox({
//   title:'',
//   message: errorMsg,
//   showClose: true,
//   center: false,
//   showConfirmButton: false,
//   type: 'warning'
// })

// this.$alert('这是一段内容', '标题名称', {
// 	confirmButtonText: '确定',
// 	callback: action => {
// 		this.$message({
// 			type: 'info',
// 			message: `action: ${ action }`
// 		});
// 	}
// });

// this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
// 	confirmButtonText: '确定',
// 	cancelButtonText: '取消',
// 	type: 'warning',
// 	center: true
// }).then(() => {
// 	this.$message({
// 		type: 'success',
// 		message: '删除成功!'
// 	});
// }).catch(() => {
// 	this.$message({
// 		type: 'info',
// 		message: '已取消删除'
// 	});
// });
