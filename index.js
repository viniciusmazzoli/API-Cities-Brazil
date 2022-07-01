import { promises as init } from "fs";

criarFuncao();

//Função para receber os dados
async function criarFuncao() {
    let dados = await init.readFile("./Estados.json");
    const estados = JSON.parse(dados)

    dados = await init.readFile("./Cidades.json");
    const cidades = JSON.parse(dados);


    for (var estado of estados) {

        const criarUf = cidades.filter(cidade => cidade.Estado == estado.ID)
        await init.writeFile(`./Estados/${estado.Sigla}.json`, JSON.stringify(criarUf))
    }
}

//Funçao para contar as siglas
async function contUF(uf) {

    let dados = await init.readFile(`./Estados/${uf}.json`);
    const cidades = await JSON.parse(dados);
    console.log("numero de cidades do estado " + cidades.length);

}

//Funçao Mais ou Menos Cidades
async function MaiorMenor() {
    const estados = JSON.parse(await init.readFile("./Estados.json"));
    var listaUf = [];


    for (var estado of estados) {
        var contar = await init.readFile(`./Estados/${estado.Sigla}.json`);
        contar = JSON.parse(contar)
        listaUf.push({ uf: estado.Sigla, count: contar.length });
    }

    listaUf.sort((a, b) => {
        if (a.count < b.count) return 1;
        else if (a.count > b.count) return -1;
        else return 0
    })
    listaUf = listaUf.splice(0, 5)
    console.log(listaUf)
}

//Funçao Para Listar A Regiao com seus Estados e Cidades
async function listarRegiao() {
    let dados = await init.readFile("./Estados.json");
    const estados = JSON.parse(dados)

    dados = await init.readFile("./Cidades.json");
    const cidades = JSON.parse(dados);

    dados = await init.readFile("./capitais.json")
    const capitais = JSON.parse(dados)


    estados.forEach(elementEstado => {
        var regiaoNome = null;
        var regiaoVetor = [];
        capitais.forEach(cap => {
            if (elementEstado.Nome === cap.Estado) {
                regiaoNome = cap.Região
            }
        });
        cidades.forEach(element => {
            if (element.Estado === elementEstado.ID) {
                regiaoVetor.push(element)
            }
        });
        init.writeFile(`./Regioes/${regiaoNome}/${elementEstado.Sigla}.json`, JSON.stringify(regiaoVetor, null, 2))
    });
}

criarFuncao()
contUF('MG')
MaiorMenor()
listarRegiao()


