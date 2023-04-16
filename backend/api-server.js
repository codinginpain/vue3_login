
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const members = [
  {
    id: 3,
    name: "도서관",
    loginId: "library",
    loginPw: "lib",
  },
  {
    id: 4,
    name: "어린이",
    loginId: "kids",
    loginPw: "kid",
  },
];

app.use(cookieParser());
app.use(bodyParser.json());


app.get('/api/account', (req, res) => {
  if(req.cookies && req.cookies.account) {
    const member = JSON.parse(req.cookies.account);
    if(member.id) {
      return res.send(member);
    }
  }
  res.send(401);
});

app.post('/api/account', (req, res) => {
  const loginId = req.body.loginId;
  const loginPw = req.body.loginPw;
  console.log('loginId :>> ', loginId);
  console.log('loginPw :>> ', loginPw);

  const member = members.find(m => m.loginId === loginId && m.loginPw === loginPw);
  if(member) {
    const token = jwt.sign(
      {
        id:member.id,
        name: member.name 
      }, 
      "salt123456774",  //salt
      {
        expiresIn: "15m", //15minutes
        issuer: "codinginpain"
      }
    );
    res.cookie("token", token);
    res.send(member);
  }
  res.send(404);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})