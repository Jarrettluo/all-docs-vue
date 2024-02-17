<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
<!--[![LinkedIn][linkedin-shield]][linkedin-url]-->


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Jarrettluo/document-sharing-site">
    <img src="https://github.com/Jarrettluo/document-sharing-site/blob/main/images/banner.png" alt="Logo" width="300" height="300">
  </a>

<h3 align="center">全文档</h3>

  <p align="center">
    支持全文检索的文档分享、存储系统。
    <br />
  </p>
</p>





<!-- ABOUT THE PROJECT -->

## 关于全文档

在小团队中往往会产生大量的协作文档。例如，我们会将各类文档放在网盘、svn等软件中，但是存在文档内的内容无法快速搜索的问题。因此，专门开发了一个用于存储ppt、word、png等文档的，支持私有部属的知识库的检索。


<p>体验地址：<a href="http://81.69.247.172/#/">http://81.69.247.172/#/</a></p>

> 管理员账号：admin123 管理员密码： admin123

### 开源地址

前端项目
<a href="https://github.com/Jarrettluo/all-docs-vue">
https://github.com/Jarrettluo/all-docs-vue.git
</a>

后端项目
<a href="https://github.com/Jarrettluo/all-docs">
https://github.com/Jarrettluo/all-docs
</a>

选择mongoDB作为主要的数据库，存储文档和文件。

后端技术：`SpringBoot` + `MongoDB` + `ES` + `Redis`

前端技术：`Vue` + `axios` + `iView` + `...`

- pdf 预览方案: `pdfjs-dist`

- docx预览方案（对doc支持非常差）：`docx-preview`

- ppt预览方案（后端生成pdf后预览）：`pdfjs-dist`

- excel预览方案：`vue-office/excel`

## 快速体验
> 在ubuntu 18.04 环境下测试通过
```shell
# 克隆项目
git clone https://github.com/Jarrettluo/all-docs.git

# 切换为管理员
su root

# 切换到工作目录
cd all-docs && cd docker

# 修改文件权限
chmod +x auto.sh

# 启动脚本
sudo ./auto.sh
```
注意：因为快速体验是采用默认参数进行安装，使用的版本也可能比较旧，因此建议不要在生产环境中使用。

## 开发者浏览
all-docs项目是一个前后端分离项目。
如果只是想启动前端项目可以采用如下步骤：
```shell
# 拉取项目
git clone https://github.com/Jarrettluo/all-docs-vue

# 切换分支(如果有必要的话，默认是master分支）
git checkout develop

# 找到 路径为：./src/api/request.js 并 修改request.js 
# 其中baseURL就是默认的用户地址
baseURL: 'http://81.69.247.172:8082/api/v1.0',

# 安装依赖
npm install 

# 其中服务
npm serve
```

成功以后控制台可以看到如下内容：
```shell
  App running at:
  - Local:   http://localhost:8080 
  - Network: http://ip:8080
```


作者开发环境如下，供参考：
```shell
$ node -v
v14.16.1

$ npm -v
6.14.12
```

### 项目部署

- [全文档在Windows环境下部署](https://github.com/Jarrettluo/document-sharing-site/blob/main/deploy/depoly_win_zh.md)
- [全文档在Linux环境下部署--待补充](https://github.com/Jarrettluo/document-sharing-site/blob/main/deploy/deploy_linux_zh.md)
- [全文档使用Docker部署--待补充](https://github.com/Jarrettluo/document-sharing-site/blob/main/deploy/deploy_docker_zh.md)
- [全文档使用Docker-Compose部署](https://github.com/Jarrettluo/document-sharing-site/blob/main/deploy/deploy_docker_compose_zh.md)


<!-- ROADMAP -->

## 路线图
暂无

<!-- CONTRIBUTING -->

## 提交代码

一起来贡献

1. `Fork` 该项目
2. 创建自己的分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的功能 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个PR

<!-- LICENSE -->

## 许可证

查看 `LICENSE` 文件。



<!-- CONTACT -->

## 联系我

欢迎加入微信交流群，一起玩😄，如果微信群二维码失效，可以加我微信拉你进群。

<img src="https://github.com/Jarrettluo/all-docs-vue/blob/main/images/WechatIMG349.jpg" alt="imGroup" width="200">

> 如果有二次开发或者私有部署需求，请联系我

(添加微信请备注"全文档")

<img src="https://github.com/Jarrettluo/all-docs-vue/blob/main/images/WechatIMG350.jpg" alt="imGroup" width="200">


Jarrett Luo - luojiarui2@163.com


<!-- ACKNOWLEDGEMENTS -->

## 致谢

感谢天南地北的朋友支持，让项目不断维护更新！

如果您觉得项目带给您一些启发或者帮助，欢迎大赏支持！

<img src="https://github.com/Jarrettluo/all-docs-vue/blob/main/images/WechatIMG351.jpg" alt="imGroup" width="200">


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Jarrettluo/document-sharing-site.svg?style=for-the-badge

[contributors-url]: https://github.com/Jarrettluo/document-sharing-site/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/Jarrettluo/document-sharing-site.svg?style=for-the-badge

[forks-url]: https://github.com/Jarrettluo/document-sharing-site/network/members

[stars-shield]: https://img.shields.io/github/stars/Jarrettluo/document-sharing-site.svg?style=for-the-badge

[stars-url]: https://github.com/Jarrettluo/document-sharing-site/stargazers

[issues-shield]: https://img.shields.io/github/issues/Jarrettluo/document-sharing-site.svg?style=for-the-badge

[issues-url]: https://github.com/Jarrettluo/document-sharing-site/issues

[license-shield]: https://img.shields.io/github/license/Jarrettluo/document-sharing-site.svg?style=for-the-badge

[license-url]: https://github.com/Jarrettluo/document-sharing-site/blob/master/LICENSE.txt

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

[linkedin-url]: https://linkedin.com/in/othneildrew

[product-screenshot]: images/screenshot.png