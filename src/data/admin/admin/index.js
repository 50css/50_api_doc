{
	"接口中文名称": "管理员列表",
	"生成sql" : true,
	"请求参数": [
		{
			"参数名": "data.group_id",
			"必选": "是",
			"类型": "int",
			"参数中文名": "管理员组id"
		},
		{
			"参数名": "status",
			"必选": "否",
			"类型": "int",
			"参数中文名": "状态id"
		},
		{
			"参数名": "keywowrd",
			"必选": "否",
			"类型": "string",
			"参数中文名": "搜索关键字"
		},
		{
			"参数名": "page",
			"必选": "否",
			"类型": "int",
			"参数中文名": "页码"
		},
		{
			"参数名": "page_size",
			"必选": "否",
			"类型": "int",
			"参数中文名": "每页记录数"
		}
	],
	"返回参数": [
		{
			"参数名": "total",
			"必选": "是",
			"类型": "int",
			"参数中文名": "记录总数"
		},
		{
			"参数名": "per_page",
			"必选": "是",
			"类型": "int",
			"参数中文名": "总页数"
		},
		{
			"参数名": "current_page",
			"必选": "是",
			"类型": "int",
			"参数中文名": "当页码"
		},
		{
			"参数名": "last_page",
			"必选": "是",
			"类型": "int",
			"参数中文名": "未页页码"
		},
		{
			"参数名": "total",
			"必选": "是",
			"类型": "int",
			"参数中文名": "记录总数"
		},
		{
			"参数名": "data",
			"必选": "是|可空",
			"类型": "array",
			"参数中文名": "记录集"
		},
		{
			"参数名": "data.id",
			"必选": "是",
			"类型": "int",
			"参数中文名": "管理员ID"
		},
		{
			"参数名": "data.username",
			"必选": "是",
			"类型": "string",
			"最大长度": 40,
			"参数中文名": "用户名"
		},
		{
			"参数名": "data.password",
			"必选": "是",
			"类型": "string",
			"最大长度": 32,
			"参数中文名": "密码",
			"说明": "为32位的小写MD5加密密码"
		},
		{
			"参数名": "data.nick_name",
			"必选": "是",
			"类型": "string",
			"最大长度": 20,
			"参数中文名": "用户昵称"
		},
		{
			"参数名": "data.group_id",
			"必选": "是",
			"类型": "int",
			"参数中文名": "管理员组id"
		},
		{
			"参数名": "data.email",
			"必选": "是",
			"类型": "string",
			"最大长度": 256,
			"参数中文名": "电子邮箱"
		},
		{
			"参数名": "data.status",
			"必选": "是",
			"类型": "int",
			"参数中文名": "用户状态",
			"说明": "0=停用 1=正常"
		},
		{
			"参数名": "data.add_time",
			"必选": "是",
			"类型": "datetime",
			"参数中文名": "添加时间日期"
		},
		{
			"参数名": "data.up_time",
			"必选": "是",
			"类型": "datetime",
			"参数中文名": ""
		},
		{
			"参数名": "data.last_time",
			"必选": "是",
			"类型": "datetime",
			"参数中文名": "最近一次登陆系统时间"
		},
		{
			"参数名": "data.ip",
			"必选": "是",
			"类型": "string",
			"最大长度": 50,
			"参数中文名": "最后登录IP"
		}
	]
}