//variaveis recebendo um documento seletor através de classes e id .

const selecione = document.querySelector(".select");
const chave = document.querySelector(".escolhaChave");
const btn = document.querySelector("button");
const radiobtn = document.querySelector(".radio-button");
const codificar = document.querySelector("#codificar");
const decodificar = document.querySelector("#decodificar");

// Base64

//nesta função esta sendo selecionado a mensagem a ser codificada antes 
//mesmo do usauario escolher a base de codificação, nesse caso essa função 
//sera executada se a base escolhida for a base64, se o usuario escolher codificar a mensagem primeiro 
//então a mensagem sera codificada usando o metodo window btoa que e usado para codificar
//strings no formato base64 que ler os caracteres
// "A-Z", "a-z", "0-9", "+", "/" e "="
//
// para descodificar a mensagem sera usado o window atob que faz exatamente o contrario do primeiro metodo.

function base64() {
  let mensagem = document.querySelector("#mensagem").value;

  if (codificar.checked) {
    let codificado = btoa(mensagem);
    return codificado;
  }
   else if (decodificar.checked) {
    let decodificado = atob(mensagem);
    return decodificado;
  }
}

// Cifra de César
//
//nesta função tambem esta sendo chamada a mensagem digitada pelo usuario, enquanto o usuario não seleciona a chave
//de codificação a função não retorna nada, se a escolha for codificar então é chaamada a condição if que começa 
// no 0 e vai incrementar com o i++, o segundo if se for letra maiuscula começa no 65 que o A maiuculo na tabela ascii
//depois faz o valor selecionado na chave - 65 resto de 26 que é a quantidade de letras do alfabeto começando a contar 
// do 0 e soma com 65 novamente A maiusculo da tabela ascii, o else pega a letra selecionado da tabela usando base
//tabela ascii também só que aqui em letras minusculas na tabela ascii (a) minusculo é 97 pega o resto do alfabeto
//em contagem normal de 0 a 25 soma 97 que é o (a) na ascii. As letras de acordo com o digitado pelo usuario recebe 
// o incremento do for e aí cai na condição se as letras digitadas são maiusculas ou minusculas. 

function cifraCesar() {
  let msg = document.querySelector("#mensagem").value;
  let chave = parseInt(document.querySelector("#rangenumber").value);
  let saida = '';

  if (codificar.checked) {
    for (let i = 0; i < msg.length; i++) {
      if (msg[i] === msg[i].toUpperCase()) {
        saida += String.fromCharCode((msg.charCodeAt(i) + chave - 65) % 26 + 65); 
      } else {
        saida += String.fromCharCode((msg.charCodeAt(i) + chave - 97) % 26 + 97);
      }
    }
    return saida;

    //então se o usuario escolher decodificar, se a letra começa com (a na tabela = 97) minusculo 
    //e no maximo (z ascii = 122) o loop pega o que foi digitado compara com a tabela ascii soma 26 que é a quantidade 
    // de letras do alfabeto pega o resto de 26 e soma com 97 a primeira letra minuscula
    //o mesmo acontece com o segundo else if maior ou igual a 65 na tabela ascii (A maiusculo) ate menor ou igual 90
    // na tabela ascii 90 é (Z maiusculo). Na saida soma um novo valor vindo do usuario, executa mensagem fazendo 
    // o incrmento do (i)

  } else if (decodificar.checked) {
    for (let i = 0; i < msg.length; i++) {
      if (msg.charCodeAt(i) >= 97 && msg.charCodeAt(i) <= 122) {
        saida += String.fromCharCode((msg.charCodeAt(i) - 97 -  chave + 26) % 26 + 97);
      } else if (msg.charCodeAt(i) >= 65 && msg.charCodeAt(i) <= 90) {
        saida += String.fromCharCode((msg.charCodeAt(i) - 65 - chave + 26) % 26 + 65);
      } else {
        saida += String.fromCharCode(msg.charCodeAt(i));
      }
    }
    return saida;
  }
}

// Botão

// um evento para ouvir um click do botão codificar e do botão decodificar e recebe o mesmo
// valor (codifica ou decodifica) vindo do html com o innerHTML

radiobtn.addEventListener("click", function () {
  if (codificar.checked) {
    btn.innerHTML = "Codificar Mensagem!";
  } else if (decodificar.checked) {
    btn.innerHTML = "Decodificar Mensagem!";
  }
});

//também um evento que escuta um click, aqui com preventdefault a pagina não será carrega automaticamente
// innerText retorna o conteúdo de acordo com a opção de base de codificação ou decodificação escolhida 
//pelo usuario, com valor extratamente igual(===)

btn.addEventListener("click", function (event) {
  event.preventDefault();
  if (selecione.value === "base64") {
    resultado.innerText = base64();
  } else if (selecione.value === "cifra") {
    resultado.innerText = cifraCesar();
  }
});