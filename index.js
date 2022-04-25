import express from "express";
import path from 'path';

const __dirname=path.resolve(path.dirname(''));
const app=express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

let pesquisa = [];

const pokedex = [
	
	{
		id: 1,
		numero: 1,
		altura: '0.7 m',
		peso: '6.9 kg',
		categoria: 'Semente',
		nome: 'Bulbasaur',
		descricao:
			'Há uma semente de planta nas costas desde o dia em que este Pokémon nasce. A semente cresce lentamente.',
		tipo: 'Planta',
		habilidade: 'Chicote de Vinha',
		imagem:'/img/1.png'
	},
	{
		id: 2,
		numero: 4,
		altura: '0.6 m',
		peso: '8.5 kg',
		categoria: 'Lagarto',
		nome: 'Charmander',
		descricao:
			'Tem preferência por coisas quentes. Quando chove, diz-se que o vapor jorra da ponta de sua cauda.',
		tipo: 'Fogo',
		habilidade: 'Combustão',
		imagem:'/img/4.png'
	},
	{
		id: 3,
		numero: 7,
		altura: '0.5 m',
		peso: '9.0 kg',
		categoria:'Tartaruga',
		nome: 'Squirtle',
		descricao:
			'Quando retrai seu longo pescoço em sua concha, esguicha água com força vigorosa.',
		tipo: 'Água',
		habilidade: 'Jato de água',
		imagem:
			'/img/7.png',
	},
	{
		id: 4,
		numero: 25,
		altura: '0.4 m',
		peso: '6.0 kg',
		categoria:'Rato',
		nome: 'Pikachu',
		descricao:
			'Pikachu que pode gerar  uma eletricidade poderosa. Tem bolsas nas bochechas que são extra macias e super elásticas..',
		tipo: 'Elétrico',
		habilidade: 'Estática',
		imagem:
			'/img/25.png',
	}


];

export default pokedex;

class Pokemon {
  constructor(a, b, c , d, e, f, g, h){
    this.id = pokedex.length + 1,
    this.nome = a,
    this.tipo = b,
    this.imagem = c,
    this.descricao = d,
    this.altura = e,
    this.peso = f,
    this.categoria = g,
    this.habilidade = h
  }
}

app.get("/", (req, res) => {
  pesquisa = [];
  res.render("index", {pokedex, pesquisa});
});

app.get("/cadastro", (req, res) => {
  pesquisa = [];
  res.render("cadastro", {pokedex});
});

app.get("/detalhes/:id", (req, res) => {
  pesquisa = [];
  const id = +req.params.id;
  const pokemon = pokedex.find(pokemon => pokemon.id === id);

  res.render("detalhes", {pokemon});

});

app.post("/add", (req, res) => {
  const {nome, tipo, imagem, descricao, altura, peso, categoria, habilidade} = req.body;
  const pokemon = new Pokemon(nome, tipo, imagem, descricao, altura, peso, categoria, habilidade);
  const text = pokemon.nome.trim();
  pokemon.nome = text;
  let index = false;

  for(let poke of pokedex){
    if(poke.nome.toLowerCase() === pokemon.nome.toLowerCase()){
      index = true;
      break;
    }
  }

  if(index === false) {
    const nome = pokemon.nome[0].toUpperCase() + pokemon.nome.substring(1).toLowerCase();
    pokemon.nome = nome;
    pokedex.push(pokemon);
  }
  
  res.redirect("/");
});

app.post("/search", (req, res) => {
  pesquisa = [];
  const search = req.body;
  let index = false;

  if(search.nome !== ""){
    for(let poke of pokedex) {
      if(poke.nome.toLowerCase().includes(search.nome.toLowerCase())){
        pesquisa.push(poke);
        index = true;
      }
    }
  } 

  if (index == false) {
    pesquisa = [];
  } 

  res.render("index", {pokedex, pesquisa});
});



app.listen(port,() => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})

