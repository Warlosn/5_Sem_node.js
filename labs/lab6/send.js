const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "ivan.grishin.bstu@gmail.com",
    pass: "",
  },
});

function send(mail) {
  const option = {
    from: "	ivan.grishin.bstu@gmail.com",
    to: "vanya.grishin.2000@list.ru",
    subject: "Send function",
    text: mail,
  };

  transport.sendMail(option, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}

module.exports = send;
