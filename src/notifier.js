const path = require('path');
const pug = require('pug');
const isProd = process.env.NODE_ENV === 'production';


module.exports = function (app) {
  // const mailconf = app.get('mail');
  const returnEmail = 'no-reply@os2geo.dk';
  const emailTemplates = 'email-templates';
  function getLink (type, hash) {
    var port = isProd ? '' : ':3000';
    var host = process.env.URL || 'localhost';
    var protocal = isProd ? 'https' : 'http';
    protocal += '://';
    return `${protocal}${host}${port}/${type}/${hash}`;
  }
  function sendEmail (email) {
    return app.service('email').create(email);
  }
  return {
    notifier: function (type, user, notifierOptions) { // eslint-disable-line no-unused-vars
      console.log(`-- Preparing email for ${type}`);
      var hashLink;
      var email;
      var emailAccountTemplatesPath = path.join(__dirname, emailTemplates);
      var templatePath;
      var compiledHTML;

      switch (type) {
      case 'resendVerifySignup': // send another email with link for verifying user's email addr

        hashLink = getLink('verify', user.verifyToken);
        templatePath = path.join(emailAccountTemplatesPath, 'verify-email.pug');

        compiledHTML = pug.renderFile(templatePath, {
          logo: '',
          name: user.name || user.email,
          hashLink,
          returnEmail
        });

        email = {
          from: returnEmail,
          to: user.email,
          subject: 'Confirm Signup',
          html: compiledHTML
        };

        return sendEmail(email);
      case 'sendResetPwd': // inform that user's email is now confirmed

        hashLink = getLink('reset', user.resetToken);
        templatePath = path.join(emailAccountTemplatesPath, 'reset-password.pug');

        compiledHTML = pug.renderFile(templatePath, {
          logo: '',
          name: user.name || user.email,
          hashLink,
          returnEmail
        });

        email = {
          from: returnEmail,
          to: user.email,
          subject: 'Reset Password',
          html: compiledHTML
        };

        return sendEmail(email);
      case 'resetPwd': // inform that user's email is now confirmed

        hashLink = getLink('reset', user.resetToken);

        templatePath = path.join(emailAccountTemplatesPath, 'password-was-reset.pug');

        compiledHTML = pug.renderFile(templatePath, {
          logo: '',
          name: user.name || user.email,
          hashLink,
          returnEmail
        });

        email = {
          from: returnEmail,
          to: user.email,
          subject: 'Your password was reset',
          html: compiledHTML
        };

        return sendEmail(email);
      }
    }
  };
};
