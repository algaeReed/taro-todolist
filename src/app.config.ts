export default defineAppConfig({
  pages: [
    'pages/area/area',
    'pages/index/index',
    'pages/progress/progress'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示'
    }
  },
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "TODO"
      },{
        "pagePath": "pages/area/area",
        "text": "附近"
      },{
        "pagePath": "pages/progress/progress",
        "text": "报告"
      }]
  },
})
