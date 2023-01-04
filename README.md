# NeteaseCloudMusicTools(网易云音乐云盘工具)

![](https://img.shields.io/github/license/tree-white/NeteaseCloudMusicTools)

网易云音乐云盘上传工具

解决Mac电脑网易云音乐不支持上传云盘问题，使用扫码登录方式，获取云盘数据，支持对云盘歌曲的"增/删/查"

后端接口采用开源项目 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)
本项目后端接口采用其推荐的 Vercel 部署，对接口不放心可自己部署
支持替换成自己部署的 Api 链接，在页面右上角设置中输入自己的接口域名即可。

免费服务器上传速度相对来说会比较慢，如果懂自己部署的，且刚好有公网IP可以参试自己部署后替换接口即可。

同样也支持自己写接口，请求参数同样按照 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 接口文档配置即可

该项目里面包含了 plugin.json 该文件用于 utools 插件配置使用，不用可以自行删除

# 安装/运行

```bash
# 拉取项目
git clone https://github.com/tree-white/NeteaseCloudMusicTools.git
# 进入项目
cd NeteaseCloudMusicTools
# 安装依赖
yarn
# 启动项目
yarn dev
# 打包项目
yarn build
```

# 功能图

登录界面

![扫码登录](https://image.treewhite.com/i2/2023/01/04/63b4f92e970db.png)
![账密登录](https://image.treewhite.com/i2/2023/01/04/63b4f931ec6aa.png)
![验证码登录](https://image.treewhite.com/i2/2023/01/04/63b4f9308f6e3.png)
配置

![自定义配置](https://image.treewhite.com/i2/2023/01/04/63b4f92b8b73b.png)
界面

![界面](https://image.treewhite.com/i2/2022/12/27/63aab148b8d29.png)
![上传](https://image.treewhite.com/i2/2022/12/27/63aab165e8b2f.png)

# License
[MIT](https://github.com/tree-white/NeteaseCloudMusicTools/blob/master/LICENSE)
