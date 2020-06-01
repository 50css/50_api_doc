document.getElementById('layout_table').style.minHeight = window.innerHeight + 'px';
var vm = new Vue({
	el: '#api_doc',
	data: {
		'projectData' : {}, //项目数据
		'thisApiPath' : location.hash.substr(1), //当前接口路径
		'thisApiData' : {}, // 当前接口数据
		'thisCategoryIndex' : 0, // 当前分类索引
		'thisApiIndex' : 0, // 当前接口索引
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
	},
	methods: {
		// 初始化接口参数
		initApiParameter: function(data) {
			var thisCategory = this.projectData.文档分类[this.thisCategoryIndex];
			var thisApi = thisCategory['接口定义'][this.thisApiIndex];
			//获取 接口路径 与 接口中文名称
			if(data['接口路径'] == undefined)data['接口路径'] = thisApi['接口路径'];
			if(data['请求URL'] == undefined)data['请求URL'] = this.projectData.接口URL前缀  + thisCategory.接口URL前缀  + data['接口路径'];

			// 公共的请求参数和业务请求参数合并
			var 请求参数 = this.projectData.公共的请求参数;
			if(thisCategory.公共的请求参数 != undefined) 请求参数 = 请求参数.concat(thisCategory.公共的请求参数);//合并分类的公共请求参数
			请求参数 = 请求参数.concat(data.请求参数);//合并业务请求参数

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

			data.请求参数 = 最终请求参数;

			// 公共的返回参数和业务返回参数合并
			var 返回参数 = this.projectData.公共的返回参数;
			if(thisCategory.公共的返回参数 != undefined) 返回参数 = 返回参数.concat(thisCategory.公共的返回参数);//合并数组
			data.返回参数 = 返回参数.concat(data.返回参数);//合并数组，会返回合并后的数组，两原数组都不受影响

			return data;
		},
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
						let href = li[i].querySelector('a').href;
						href = href.substr(href.indexOf('#') + 1);
						if(href == this.thisApiPath){
							li[i].className = 'on';
						}else{
							li[i].className = '';
						}
					}

				})
				.catch(function (error) {
					console.log('加载当前接口文档数据出错');
					console.log(error);
				});
			//axios end

		},
		switchDoc: function(event) {
			var self = this;
			setTimeout(function (){
				self.thisApiPath = location.hash.substr(1);
				self.setTheApiData();
			},20);
		},
	}
});