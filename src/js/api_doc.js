document.getElementById('layout_table').style.minHeight = window.innerHeight + 'px';

var vm = new Vue({
	el: '#api_doc',
	data: {
		'projectData' : {}, //项目数据
		'thisApiPath' : location.hash.substr(1), //当前接口路径
		'thisApiData' : {}, // 当前接口数据
		'thisCategoryIndex' : 0, // 当前分类索引
		'thisApiIndex' : 0, // 当前接口索引
		'apiReDiv' : null, // 显示ajax结果的div
		'apiReTextarea' : null, // 显示ajax结果的textarea
		'apiReHtmlBox' : null, // 显示ajax概况或错误结果的div

		'scrollValue' : sessionStorage.getItem('滚屏值'),
		'tabIndex' : sessionStorage.getItem('选项卡下标'),
	},

	// created 是vue钩子 当本vue实例创建时此方法被调用 (用来进行一些初始化 )
	created : function (){
		// 加载项目数据
		axios.get('data/subject.js',{headers: {'Content-Type': 'application/json'}})
			.then((response) => {
				this.projectData = response.data;
				this.setTheApiData();
			}).catch(function (error) {
				console.log('加载项目数据 出错');
				console.log(error);
			});
		//axios end

		window.addEventListener('scroll',function(){
			sessionStorage.setItem('滚屏值',document.documentElement.scrollTop);
		});
	},
	methods: {

		//恢复上次记忆的状态 滚屏到上次滚屏的位置和切换到上次的选项卡
		toSessionSave: function (){
			if(this.scrollValue)window.scrollTo(0,this.scrollValue);
			if(this.tabIndex)this.switchTab(this.tabIndex);
		},

		// this.getBom(); 获取 赋值需要的bod元素
		getBom : function (){
			this.apiReDiv = document.getElementById('api_test_return'); // 显示ajax结果的div
			this.apiReTextarea = document.querySelector('#api_test_return textarea'); // 显示ajax结果的textarea
			this.apiReHtmlBox = document.getElementById('apiReHtmlBox'); // 显示ajax概况或错误结果的div
		},

		// 初始化接口参数
		initApiParameter: function(data) {
			this.getBom();// 获取 赋值需要的bod元素
			this.apiReDiv.style.display = 'none';
			this.apiReTextarea.value = '';
			var thisCategory = this.projectData.文档分类[this.thisCategoryIndex];
			var thisApi = thisCategory['接口定义'][this.thisApiIndex];
			//获取 接口路径 与 接口中文名称

			var saveUrl = localStorage.getItem('接口域名');
			if(saveUrl) this.projectData.接口URL前缀 = saveUrl;

			if(data['接口路径'] == undefined)data['接口路径'] = thisApi['接口路径'];
			if(data['请求URL'] == undefined)data['请求URL'] = this.projectData.接口URL前缀  + thisCategory.接口URL前缀  + data['接口路径'];

			// 公共的请求参数和业务请求参数合并
			var 请求参数 = this.projectData.公共的请求参数;
			if(thisCategory.公共的请求参数 != undefined) 请求参数 = 请求参数.concat(thisCategory.公共的请求参数);//合并分类的公共请求参数
			请求参数 = 请求参数.concat(data.请求参数);//合并业务请求参数

			for (let i = 0; i < 请求参数.length; i++) {
				if(请求参数[i]['测试值'] == undefined)请求参数[i]['测试值'] = '';
				if(请求参数[i]['说明'] == undefined)请求参数[i]['说明'] = '';
				if(请求参数[i]['必选'] == undefined)请求参数[i]['必选'] = '';
			}

			var 最终请求参数 = [];
			if(data.排除的请求参数){
				for (let i = 0; i < 请求参数.length; i++) {
					if(inArray(请求参数[i]['参数名'],data.排除的请求参数) == false){
						最终请求参数.push(请求参数[i]);
					}
				}
			}else{
				最终请求参数 = 请求参数;
			}

			//赋值记住的toKen为预填值 此功能以后考虑做成插件形式
			let toKen = sessionStorage.getItem('toKen');
			if(toKen){
				for (let i = 0; i < 最终请求参数.length; i++) {
					if(最终请求参数[i].参数名 == 'token'){
						最终请求参数[i].测试值 = toKen;
					}
				}
			}

			// 生成TP验证规则代码开始 此功能以后考虑做成插件形式
			for (let i = 0; i < 最终请求参数.length; i++) {
				if(最终请求参数[i].参数名 != 'token'){
					let rule = [];
					if(最终请求参数[i]['验证规则'] == undefined){

						if(最终请求参数[i].必选 == '是'){
							rule.push('require');
						}
						if(最终请求参数[i].最大长度 != undefined){
							rule.push('max:' + 最终请求参数[i].最大长度);
						}
						if(最终请求参数[i].类型 == 'int'){
							rule.push('number');
						}
						if(rule.length > 0){
							最终请求参数[i]['验证规则'] = "'" + 最终请求参数[i].参数名 + "|" + 最终请求参数[i].参数中文名 + "' => '" + rule.join('|') + "',";
						}else{
							最终请求参数[i]['验证规则'] = '';
						}
					}
				}
			}
			// 生成TP验证规则代码结束
			
			data.请求参数 = 最终请求参数;

			// 公共的返回参数和业务返回参数合并
			var 返回参数 = this.projectData.公共的返回参数;
			if(thisCategory.公共的返回参数 != undefined) 返回参数 = 返回参数.concat(thisCategory.公共的返回参数);//合并数组
			返回参数 = 返回参数.concat(data.返回参数);//合并数组，会返回合并后的数组，两原数组都不受影响

			for (let i = 0; i < 返回参数.length; i++) {
				if(返回参数[i]['参数中文名'] == undefined)返回参数[i]['参数中文名'] = '';
			}
			data.返回参数 = 返回参数;

			// 生成mysql建表代码开始
			let createMysqlStr = '';
			if(data.生成sql != undefined){
				let tableName = data.生成sql;
				createMysqlStr = "DROP TABLE IF EXISTS `" + tableName + "`;\r\n";
				createMysqlStr += "CREATE TABLE `" + tableName + "` (\r\n";
				for (let i = 0; i < 返回参数.length; i++) {
					if(返回参数[i]['参数名'].substr(0,5) == 'data.'){
						let fieldName = 返回参数[i]['参数名'].substr(5);
						createMysqlStr += '    `' + fieldName + '` ';
						let len = 返回参数[i]['最大长度'];
						if(返回参数[i]['类型'] == 'int'){
							if(len == undefined)len = 10;
							createMysqlStr += 'int(' + len + ') unsigned ';
						}else if(返回参数[i]['类型'] == 'string'){
							if(len == undefined)len = 256;
							createMysqlStr += 'varchar(' + len + ')';
						}else if(返回参数[i]['类型'] == 'datetime'){
							createMysqlStr += 'datetime';
						}
						if(返回参数[i].必选 && 返回参数[i].必选.charAt(0) == '是'){
							createMysqlStr += ' NOT NULL ';
							if(fieldName == 'id') createMysqlStr += ' AUTO_INCREMENT ';
							if(返回参数[i]['类型'] == 'string') createMysqlStr += " DEFAULT '' ";
						}
						createMysqlStr += ' COMMENT "' + 返回参数[i]['参数中文名'];
						if(返回参数[i]['说明']) createMysqlStr += ' ' + 返回参数[i]['说明'];
						createMysqlStr += '",\r\n';
					}
				}
				let tableComment = data.表注释 == undefined ? '表注释' :  data.表注释;
				createMysqlStr += ' PRIMARY KEY (`id`)\r\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT="' + tableComment + '";';
			}
			createMysqlStr = createMysqlStr.replace(/  /g,' ');
			createMysqlStr = createMysqlStr.replace(/  /g,' ');
			createMysqlStr = createMysqlStr.replace(/  /g,' ');
			data.生成sql = createMysqlStr;
			// 生成mysql建表代码结束
			return data;
		},

		//设置当前接口文档数据
		setTheApiData : function(){
			//console.log('setTheApiData');
			document.title = this.projectData.项目名称;
			if(typeof this.projectData == 'string'){
				console.log('projectData 不是正确的json');
				return;
			}
			for (let i = 0; i < this.projectData.文档分类.length; i++) {
				for (let j = 0; j < this.projectData.文档分类[i].接口定义.length; j++) {
					//console.log(this.projectData.文档分类[i].接口定义[j]['接口路径'],this.thisApiPath);
					if(this.projectData.文档分类[i].接口定义[j]['接口路径'] == this.thisApiPath){
						this.thisCategoryIndex = i;
						this.thisApiIndex = j;

						let editPath = this.projectData.文档根目录路径 + '/admin/' + this.thisApiPath + '.js';
						for (let ii = 0; ii < 35; ii++) {
							editPath = editPath.replace('/','\\');
						}
						document.getElementById('editApiDoc').href = 'OpenEditor:' + editPath;
						break;
					}
				}
			}

			//axios start
			axios.get('data/admin/' + this.thisApiPath + '.js',{headers: {'Content-Type': 'application/json'}})
				.then((response) => {
					this.thisApiData = this.initApiParameter(response.data);
					document.title = this.projectData.项目名称 + ' ' + this.thisApiData.接口中文名称 + ' 接口文档';

					//给左侧菜单里当前接口加上on样式
					let li = document.querySelectorAll('.layout_table_left_td li li');
					for (let i = 0; i < li.length; i++) {
						let link = li[i].querySelector('a');
						if(link){
							let href = li[i].querySelector('a').href;
							href = href.substr(href.indexOf('#') + 1);
							if(href == this.thisApiPath){
								li[i].className = 'on';
							}else{
								li[i].className = '';
							}
						}
					}

					this.toSessionSave();//恢复上次记忆的状态 滚屏到上次滚屏的位置和切换到上次的选项卡
				})
				.catch(function (error) {
					console.log('加载当前接口文档数据出错');
					console.log(error);
				});
			//axios end

		},

		//切换接口文档
		switchDoc: function(event) {
			var self = this;
			if(event.target.parentNode.classNane == 'on')return;
			setTimeout(function (){
				self.thisApiPath = location.hash.substr(1);
				self.setTheApiData();
			},20);
		},

		//切换选项卡
		switchTab: function(event) {
			var ul,li,thisLi;
			if(typeof event == 'object'){
				thisLi = event.target;
				ul = thisLi.parentNode;
				li = ul.querySelectorAll('li');
			}else{
				ul = document.querySelector('.tab .tab_title');
				li = ul.querySelectorAll('li');
				thisLi = li[event];//如果 event 不是事件触的事件对角，那么它就是直接调用 switchTab 传来的选项卡下标

			}
			var tabItem = ul.parentNode.querySelectorAll('.tab_item');
			for (var i = 0; i < li.length; i++) {
				if(li[i] == thisLi){
					li[i].className = 'on';
					tabItem[i].className = 'tab_item show';
					sessionStorage.setItem('选项卡下标',i);
				}else{
					li[i].className = '';
					tabItem[i].className = 'tab_item';
				}
			}
		},

		//记住token 考虑做成插件
		saveToKen: function (){
			var toKen = window.prompt('请输入想要记住的token','');
			if(toKen == '' || toKen == undefined)return;
			sessionStorage.setItem('toKen',toKen);
		},
		//接口测试表单被提交
		apiTestSubmit: function (event){
			let textarea = this.apiReTextarea;
			let apiReHtmlBox = this.apiReHtmlBox;
			let form = event.target.form;
			event.returnValue = false;
			//console.log('接口测试表单被提交');

			let parameter = [];
			for (let i = 0; i < form.length; i++) {
				if(form[i].type != 'sbumit' && form[i].name != ''){
					parameter.push(form[i].name + '=' + form[i].value);
				}
			}

			// 用axios将接口测试表单数据提交  
			//let url = 'http://localhost:8111/1.php';
			let url = form.action;
			this.apiReDiv.style.display = 'block';

			let ajaxType = ''; // axios

			if(ajaxType != 'axios'){
				let time = [];
				time['开始创建ajax对象'] = new Date();
				apiReHtmlBox.innerHTML = '开始创建ajax对象';

				let http = new XMLHttpRequest();
				http.open('POST',url);
				http.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				//http.setRequestHeader('Content-type','application/json; charset=utf-8');
				http.send(parameter.join('&'));
				http.onreadystatechange = function(){
					switch(http.readyState){
						case 0:time['http请求已初始化'] = new Date();apiReHtmlBox.innerHTML = 'http请求已初始化';break;//console.log('http请求已初始化');
						case 1:time['http请求已打开']   = new Date();apiReHtmlBox.innerHTML = 'http请求已打开';break;//console.log('http请求已打开');
						case 2:time['http请求已发送']   = new Date();apiReHtmlBox.innerHTML = 'http请求已发送';break;//console.log('http请求已发送');
						case 3:time['http请求已响应']   = new Date();apiReHtmlBox.innerHTML = 'http请求已响应';break;//console.log('http请求已响应');
						case 4:
							time['http请求响应结束'] = new Date();

							let apiHttpInfo = ['http状态码=' + http.status];
							let lastTime = time['开始创建ajax对象'].getTime();
							let thisTime;
							apiHttpInfo.push('开始创建ajax对象=' + convertDate(time['开始创建ajax对象']));

							if(time['http请求已初始化']){
								thisTime = time['http请求已初始化'].getTime();
								apiHttpInfo.push('http请求已初始化=' + convertDate(time['http请求已初始化']) + ' 用时=' + (thisTime - lastTime) + '毫秒');
							}else{
								thisTime = lastTime;
							}

							if(time['http请求已打开']){
								lastTime = thisTime;
								thisTime = time['http请求已打开'].getTime();
								apiHttpInfo.push('http请求已打开=' + convertDate(time['http请求已打开']) + ' 用时=' + (thisTime - lastTime) + '毫秒');
							}
							if(time['http请求已发送']){
								lastTime = thisTime;
								thisTime = time['http请求已发送'].getTime();
								apiHttpInfo.push('http请求已发送=' + convertDate(time['http请求已发送']) + ' 用时=' + (thisTime - lastTime) + '毫秒');
							}
							if(time['http请求已响应']){
								lastTime = thisTime;
								thisTime = time['http请求已响应'].getTime();
								apiHttpInfo.push('http请求已响应=' + convertDate(time['http请求已响应']) + ' 用时=' + (thisTime - lastTime) + '毫秒');
							}
							if(time['http请求响应结束']){
								lastTime = thisTime;
								thisTime = time['http请求响应结束'].getTime();
								apiHttpInfo.push('http请求响应结束=' + convertDate(time['http请求响应结束']) + ' 用时=' + (thisTime - lastTime) + '毫秒');
							}

							apiHttpInfo = apiHttpInfo.join('<br>');
							if(http.status == 200){
								let jsonStr = formatJson(http.responseText);
								let arr = jsonStr.split('\r\n');
								let height = arr.length * 16;
								height = parseInt(height);
								if(height < 50)height = 50;
								textarea.value = jsonStr;
								textarea.style.height = height + 'px';
								textarea.style.display = '';
								apiReHtmlBox.innerHTML = apiHttpInfo;
							}else{
								textarea.style.display = 'none';
								apiReHtmlBox.innerHTML = apiHttpInfo + '<hr>' + http.responseText;
							}
						break;
						default :break;
					}
				}
			}else{
				apiReHtmlBox.innerHTML = 'axios开始';
				axios.post(url,parameter.join('&'))
					.then((response) => {
						apiReHtmlBox.innerHTML = 'axios 请求响应结束';
						let str;
						if (typeof response.data == 'object'){
							str = formatJson(response.data);
						}else{
							str = response.data;
						}
						this.apiReTextarea.value = str;
					}).catch(function (error) {
						apiReHtmlBox.innerHTML = '用axios将接口测试表单数据提交 出错，请按F12查看详细信息';
						console.log(error);
					});
				//axios end
			}
		}
	}
});