export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/progress/progress'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "TODO"
      },{
      "pagePath": "pages/progress/progress",
      "text": "报告"
    }]
  },
})
