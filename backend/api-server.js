
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

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

app.use(bodyParser.json());

app.get('/api/account', (req, res) => {
  res.send(401
  //   {
  //   mid: 3,
  //   memberName: "홍길동",
  // }
  );
});

app.post('/api/account', (req, res) => {
  const loginId = req.body.loginId;
  const loginPw = req.body.loginPw;
  console.log('loginId :>> ', loginId);
  console.log('loginPw :>> ', loginPw);

  const member = members.find(m => m.loginId === loginId && m.loginPw === loginPw);
  if(member) {
    res.send(member);
  }
  res.send(404);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})