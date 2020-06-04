{
	"接口中文名称": "学生列表",
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
			"参数名": "id",
			"必选": "是",
			"类型": "int",
			"中文参数名": "学生id"
		},{
			"参数名": "list.cn_name",
			"必选": "是",
			"类型": "string",
			"中文参数名": "中文姓名",
			"说明": " 16位以内"
		},{
			"参数名": "list.nick_name",
			"必选": "是",
			"类型": "string",
			"中文参数名": "昵称或英文名",
			"说明": " 32位以内"
		},{
			"参数名": "list.gender",
			"必选": "是",
			"类型": "int",
			"中文参数名": "性別"
		},{
			"参数名": "list.birth_year", 
			"必选": "是",
			"类型": "int",
			"中文参数名": "出生年份"
		},{
			"参数名": "list.phone",
			"必选": "是",
			"类型": "string",
			"中文参数名": "手机号码 ",
			"说明": " 16位以内"
		},{
			"参数名": "list.address",
			"必选": "是",
			"类型": "string",
			"中文参数名": "详细地址",
			"说明": " 50位以内"
		},{
			"参数名": "list.school",
			"必选": "是",
			"类型": "string",
			"中文参数名": "现就读学校",
			"说明": "50位以内"
		},{
			"参数名": "list.grade",
			"必选": "是",
			"类型": "int",
			"中文参数名": "年级"
		},{
			"参数名": "list.grade_rem",
			"必选": "是",
			"类型": "string",
			"中文参数名": "其它年级备注"
		},{
			"参数名": "list.relationship",
			"必选": "是",
			"类型": "int",
			"中文参数名": "与家长关系"
		},{
			"参数名": "list.relationship_rem",
			"必选": "是",
			"类型": "string",
			"中文参数名": "与家长关系备注"
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
		}
	]
}