<template>
  <footer class="footer">
    
    <div class="footer-links">
      <a href="/about-us" target="_blank" style="color: white; text-decoration: none;">关于我们</a>
      <span style="margin: 0 10px;">|</span>
      <a href="/cooperate" style="color: white; text-decoration: none;">商务合作</a>
      <span style="margin: 0 10px;">|</span>
      <a href="/opinion" style="color: white; text-decoration: none;">意见反馈</a>
      <br>
      <br>
      <span>Copyright ©南开大学, All Rights Reserved</span>
      <span style="margin: 0 10px;">|</span>
      <a href="https://beian.miit.gov.cn" target="_blank" class="beian-link">
        粤ICP备16101032号-4
      </a>
      <span style="margin: 0 10px;">|</span>
      <a href="mailto:langyahaiping@datumdata.com" class="email-link" style="color: white; text-decoration: none; vertical-align: middle;">
        电子邮箱：langyahaiping@datumdata.com
      </a>
      <a class="wechat-link" style="color: white; text-decoration: none; display: inline-block; text-align: center; margin-top: 50px;">
        <img src="/images/wechat.jpg" alt="微信公众号" style="width: 80px; height: 80px; display: block; margin: 0 auto 4px auto;" />
        官方微信公众号
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: purple;
  color: white;
  text-align: center;
  padding: 1rem;
  height:100px;
  position: relative; /* 新增 */
}
.footer-links {
  margin-top: 20px;
  position: relative; /* 新增 */
}
.wechat-link {
  position: absolute;
  right: 150px;
  top: -75px;
  background: transparent;
}
.footer-row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}
.beian-link {
  color: white;
  text-decoration: none;
}
.email-link:hover {
  text-decoration: underline;
}
.beian-link:hover {
  text-decoration: underline;
}
</style>