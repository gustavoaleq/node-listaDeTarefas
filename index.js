const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json()); // to support JJSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/views"));

let tarefas = ["Arrumar o quarto", "Fazer compras no supermercado"];

app.post("/", (req, res) => {
  let novaTarefa = req.body.tarefa;
  tarefas.push(novaTarefa);
  res.render("index", { tarefasList: tarefas });
});

app.get("/", (req, res) => {
  res.render("index", { tarefasList: tarefas });
});

app.get("/deletar/:id", (req, res) => {
  tarefas = tarefas.filter(function (val, index) {
    if (index != req.params.id) {
      return val;
    }
  });
  res.render("index", { tarefasList: tarefas });
});

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000! 🏆");
});
