const express = require("express");
const app = express();

//express node has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. ei error ta dibe nicher code na dile
let cors = require("cors");
app.use(cors());
//jokhon client site theke data ashbe stringify e thake. body stringify theke json parser jonno nicher code likhbo na hle request undifined ashbe
app.use(express.json());
const port = process.env.PORT || 5000;

const users = [
  { id: 1, name: "Shamim", email: "shamim@gmail.com", phone: "018745157145" },
  { id: 2, name: "Ayman", email: "ayman@gmail.com", phone: "018745157145" },
  { id: 3, name: "Nazrul", email: "nazrul@gmail.com", phone: "018745157145" },
  { id: 4, name: "Atawor", email: "atawor@gmail.com", phone: "018745157145" },
  { id: 5, name: "Ripon", email: "ripon@gmail.com", phone: "018745157145" },
  { id: 6, name: "Mahin", email: "mahin@gmail.com", phone: "018745157145" },
  { id: 7, name: "Lakat", email: "lakat@gmail.com", phone: "018745157145" },
];

app.get("/", (req, res) => {
  res.send(
    "Hi Folks !!! I am Shamim Bhuiyan.I am from Bangladesh. I'm Fornted Developer."
  );
});

app.get("/users", (req, res) => {
  console.log("Query", req.query);
  //filter by search query parameter
  if (req.query.name) {
    const search = req.query.name.toLowerCase();
    const matched = users.filter((user) =>
      user.name.toLowerCase().includes(search)
    );
    res.send(matched);
  } else {
    res.send(users);
  }
});

app.get("/user/:id", (req, res) => {
  console.log(req.params);
  //   const id = req.params.id; [eta string e ache se jonno et k parse int convert kre felbo]
  const id = parseInt(req.params.id);
  //   const user = users[id];  [eta dibo na, nicher jei user ta declare korbo oi ta dibo]

  const user = users.find((u) => u.id == id);
  res.send(user);
});

//post data to server
app.post("/user", (req, res) => {
  console.log("Request", req.body);
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.send("Post Success", user);
});

app.get("/fruits", (req, res) => {
  res.send(["Mango", "Orange", "Apple"]);
});

//multi layer korte caile nicher vabe korbo.
app.get("/fruits/mango/fazle", (req, res) => {
  res.send("sour sour mango ,i don't like it.");
});

app.listen(port, () => {
  console.log("Here is my port", port);
});
