export default {
  secure: process.env.MAIL_SECURE,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe gobarber <noreply@gobarber.com>',
  },
};
