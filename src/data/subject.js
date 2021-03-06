{
	"项目名称": "补习平台",
	"接口URL前缀": "http://localhost:8111/index.php/",
	"文档根目录路径": "D:/web/xiang_gang_jia_jiao/doc/api_doc/data",
	"默认的请求方式": "POST",
	"默认的返回数据格式": "JSON",
	"公共的请求参数":  [
		{
			"参数名": "token",
			"必选": "是",
			"类型": "string",
			"参数中文名": "登录凭据",
			"最大长度": "16",
			"测试值": "ruI4PbdWjuwZNINU"
		}
	],
	"公共的返回参数": [
		{
			"参数名": "code",
			"必选": "是",
			"类型": "int",
			"参数中文名": "状态码"
		},
		{
			"参数名": "message",
			"必选": "否",
			"类型": "string",
			"参数中文名": "状态说明"
		}
	],
	"文档分类": [{
		"分类编号": 1,
		"分类数据目录": 1,
		"分类名称": "后台接口",
		"接口URL前缀": "admin/",
		"公共的请求参数":  [],
		"接口定义": [
			{
				"接口路径": "index/login",
				"接口中文名称": "登录"
			},
			{
				"接口路径": "admin/myEdit",
				"接口中文名称": "个人资料修改"
			},
			{
				"接口路径": "",
				"接口中文名称": "#"
			},
			{
				"接口路径": "system/getDictionaries",
				"接口中文名称": "获取系统字典"
			},
			{
				"接口路径": "tags/index",
				"接口中文名称": "标签列表"
			},
			{
				"接口路径": "tags/add",
				"接口中文名称": "添加标签"
			},
			{
				"接口路径": "tags/edit",
				"接口中文名称": "修改标签"
			},
			{
				"接口路径": "tags/del",
				"接口中文名称": "删除标签"
			},
			{
				"接口路径": "",
				"接口中文名称": "#"
			},
			{
				"接口路径": "group/index",
				"接口中文名称": "管理员组列表"
			},
			{
				"接口路径": "group/add",
				"接口中文名称": "添加管理员组"
			},
			{
				"接口路径": "group/edit",
				"接口中文名称": "修改管理员组"
			},
			{
				"接口路径": "group/del",
				"接口中文名称": "删除管理员组"
			},
			{
				"接口路径": "",
				"接口中文名称": "#"
			},
			{
				"接口路径": "admin/index",
				"接口中文名称": "管理员列表"
			},
			{
				"接口路径": "admin/add",
				"接口中文名称": "添加管理员"
			},
			{
				"接口路径": "admin/edit",
				"接口中文名称": "修改管理员"
			},
			{
				"接口路径": "admin/del",
				"接口中文名称": "删除管理员"
			}
		]
	},
	{
		"分类编号": 2,
		"分类名称": "前端门户接口",
		"接口定义": []
	}]
}