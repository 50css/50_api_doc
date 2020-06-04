{
	"接口中文名称": "家长列表",
	"请求参数": [
		{
			"参数名": "status",
			"必选": "否",
			"类型": "int",
			"中文参数名": "状态id"
		}, {
			"参数名": "keywowrd",
			"必选": "否",
			"类型": "string",
			"中文参数名": "搜索关键字"
		}, {
			"参数名": "page",
			"必选": "否",
			"类型": "int",
			"中文参数名": "页数"
		}, {
			"参数名": "page_size",
			"必选": "否",
			"类型": "int",
			"中文参数名": "每页记录数"
		}
	],
	"返回参数": [
		{
			"参数名": "total",
			"必选": "是",
			"类型": "int",
			"中文参数名": "记录总数"
		},{
			"参数名": "list",
			"必选": "是|可空",
			"类型": "array",
			"中文参数名": "记录集"
		},{
			"参数名": "list.id",
			"必选": "是",
			"类型": "int",
			"中文参数名": "家长id"
		},{
			"参数名": "list.username",
			"必选": "是",
			"类型": "string",
			"中文参数名": "用户名 ",
			"说明": "16位以内"
		},{
			"参数名": "list.cn_name",
			"必选": "是",
			"类型": "string",
			"中文参数名": "中文姓名",
			"说明": "16位以内"
		},{
			"参数名": "list.nick_name",
			"必选": "是",
			"类型": "string",
			"中文参数名": "昵称或英文名",
			"说明": "32位以内"
		},{
			"参数名": "list.gender",
			"必选": "是",
			"类型": "int",
			"中文参数名": "性別"
		},{
			"参数名": "list.phone",
			"必选": "是",
			"类型": "string",
			"中文参数名": "手机号码",
			"说明": "16位以内"
		},{
			"参数名": "list.tel",
			"必选": "是",
			"类型": "string",
			"中文参数名": "住宅电话",
			"说明": "16位以内"
		},{
			"参数名": "list.address",
			"必选": "是",
			"类型": "string",
			"中文参数名": "详细地址",
			"说明": "50位以内"
		},{
			"参数名": "list.status",
			"必选": "是",
			"类型": "int",
			"中文参数名": "状态id"
		},{
			"参数名": "list.add_time",
			"必选": "是",
			"类型": "datetime",
			"中文参数名": "添加时间"
		},{
			"参数名": "list.last_time",
			"必选": "是|可空",
			"类型": "datetime",
			"中文参数名": "最后登录时间"
		},{
			"参数名": "list.ip",
			"必选": "是|可空",
			"类型": "string",
			"中文参数名": "最后登录ip"
		}
	]
}