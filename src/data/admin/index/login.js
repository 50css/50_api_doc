{
	"接口中文名称": "登录",
	"请求参数": [
		{
			"参数名": "username",
			"必选": "是",
			"类型": "string",
			"说明": "用户名"
		}, {
			"参数名": "password",
			"必选": "是",
			"类型": "string",
			"说明": "密码"
		}
	],
	"排除的请求参数": ["token","timestamp"],
	"返回参数": [
		{
			"参数名": "token",
			"必选": "是",
			"类型": "string",
			"说明": "登录凭据"
		}
	]
}