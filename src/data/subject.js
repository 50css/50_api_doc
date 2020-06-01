{
	"项目名称": "补习平台",
	"接口URL前缀": "http://xx.com/index.php/",
	"默认的请求方式": "POST",
	"默认的返回数据格式": "JSON",
	"公共的请求参数":  [
		{
			"参数名": "to_ken",
			"必选": "是",
			"类型": "string",
			"说明": "用户凭据"
		},{
			"参数名": "time_stamp",
			"必选": "是",
			"类型": "string",
			"说明": "时间戳 1970年至当前的秒数"
		}
	],
	"公共的返回参数": [
		{
			"参数名": "status",
			"必选": "是",
			"类型": "int",
			"说明": "状态码"
		},{
			"参数名": "msg",
			"必选": "否",
			"类型": "string",
			"说明": "状态说明"
		}
	],
	"文档分类": [{
		"分类编号": 1,
		"分类数据目录": 1,
		"分类名称": "后台接口",
		"接口URL前缀": "admin/",
		"公共的请求参数":  [],
		"接口定义": [{
			"接口路径": "index/login",
			"接口中文名称": "登录"
		},{
			"接口路径": "admin/edit_my",
			"接口中文名称": "修改密码"
		},{
			"接口路径": "admin/index",
			"接口中文名称": "管理员列表"
		},{
			"接口路径": "admin/add",
			"接口中文名称": "添加管理员"
		},{
			"接口路径": "admin/edit",
			"接口中文名称": "修改管理员"
		},{
			"接口路径": "admin/del",
			"接口中文名称": "删除管理员"
		}]
	},{
		"分类编号": 2,
		"分类名称": "前端门户接口",
		"接口定义": []
	}]
}