const express = require("express")
const app = express()
app.get("/unabbreviate", (req, res) => {
  const { valor } = req.query
  const util = require("util-stunks")
  res.json({ result: util.unabbreviate(valor) })
  })
app.get("/abbreviate", (req, res) => {
  const { valor } = req.query
  const util = require("util-stunks")
  if (!valor) {
    res.json({ error: { message: "Você precisa inserir um valor para ser abreviado." } })
  } else {
  res.json({ result: util.abbreviate(valor) })
  }
})
app.get("/relativeTime", (req, res) => {
  const { time, ms } = req.query;
  const utilStunk = require("util-stunks")
  if (!ms) { res.json({ result: { error: { message: 'Escolha uma opção válida, true ou false "/relativeTime?time=TEMPO_EM_MILISEGUNDOS\&ms=true ou false"' } } }) } else {
      if (ms != "false" && ms != "true") { res.json({ error: { message: `Errado, Escolha apenas false ou true "/relativeTime?time=${time}&ms=true/false"` } }) } else {
      if (ms == "false") { res.json({ result: utilStunk.relativeTime(time, {removeMs:true}) }) } else { res.json({ result: utilStunk.relativeTime(time, {removeMs:false}) }) }
      }
  }
})
app.get("/", (req, res) => {
  res.json({ rotas: "Exibindo rotas logo abaixo...",
  unabbreviate: "Essa rota, Ela serve para desabreviar um número, Por exemplo: /unabbreviate?valor=1K, Retornará 1000",
  abbreviate: "Essa rota, Ela já serve para abreviar algum número, Por exemplo: /abbreviate?valor=1000, Retornará 1000",
  relativeTime: "Essa rota, Ela já é um pouco diferente, Ela serve para deixar um tempo em relativo, Exemplo: /relativeTime?time=TEMPO_EM_MILISEGUNDOS, Lembrando! Você também pode remover aqueles Milisegundos, Basta utilizar /relativeTime?time=TEMPO_EM_MILISEGUNDOS?ms=false/true!",
  translate: "Essa rota, Ela serve para traduzir palavras da linguagem inserida para a linguagem selecionada, Exemplo de uso: /translate?from=pt&to=en&text=Olá%20Mundo!, Retornará Hello World!",
  reverse: "Essa rota, Ela serve para reverter palavras, Exemplo: /reverse?text=Olá, Retornará álO.",
  hug: "Essa rota, Ela já randomiza imagens aleatórias de abraços com personagens animados."
           })
})
app.get("/translate", (req, res) => {
  const {from, to, text} = req.query;
  const translate = require("@iamtraction/google-translate")
  translate(text, { from: from, to: to}).then((tr) => {
    res.json({ output: tr.text })
  })
})
app.get("/reverse", (req, res) => {
  const {text} = req.query
  const result = text.split("").reverse().join("")
  res.json({ result: result})
})
app.get("/hug", async (req, res) => {
  const axios = require("axios")
  const fetch = require("node-fetch")
  fetch(`https://some-random-api.com/animu/hug`)
  .then(res => res.json())
  .then(json => {
    res.json({ url: json.link })
  })
  console.log(req.count)
})
app.listen()
