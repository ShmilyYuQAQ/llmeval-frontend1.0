const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 配置 Nodemailer
const transporter = nodemailer.createTransport({
  service: 'datumdata',
  auth: {
    user: "langyahaiping@datumdata.com", // 你的 Gmail 邮箱
    pass: "LyHP@ddc.263", // 你的 Gmail 应用专用密码
  },
});

// 处理表单提交
app.post('/submit', async (req, res) => {
  const { title, name, email, content } = req.body;

  // 验证输入
  if (!title || !name || !email || !content) {
    return res.status(400).json({ message: '所有字段均为必填项' });
  }

  // 邮件内容
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'langyahaiping@datumdata.com',
    subject: `新联系表单提交：${title}`,
    text: `
      标题: ${title}
      姓名: ${name}
      电子邮件: ${email}
      内容:
      ${content}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: '提交成功' });
  } catch (error) {
    console.error('发送邮件错误:', error);
    res.status(500).json({ message: '发送邮件失败，请稍后再试' });
  }
});

// 启动服务器
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});