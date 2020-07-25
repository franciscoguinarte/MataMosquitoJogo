
let altura = 1; //altura da tela
let largura = 1; // largura da tela 
let vidas = 1; // vidas do jogo
let criaMosquitoTempo = 1500; //
let tempo = 10; // tempo que será decrementado no cronômetro
let nivel = window.location.search; // dificuldade do jogo [usa o search p recuperar o parâmetro passado pela
//																		 html da pagina inicial, todos os valores após a interrogação]
nivel = nivel.replace("?", ''); // utiliza o método replace para retirar a interrogação

/* Variável wrapper que recebe uma função para fazer o cálculo do cronômetro:
		--> Primeiro é decrementado o tempo preestabelecido 
		--> Depois é testado se o tempo foi esgotado, ou seja, se é menor que zero
				<>if(true), usa-se a função clear interval para parar a contagem regressiva e a geração automática
				de mosquitos na tela, que também usa o tempo como referência para printar na tela o mosquito.
				Após isso, o jogador é redirecionado para a página de vitória

				<>else , o cronômetro é mostrado na tela sendo decrementado a partir do innerHTML do ID === 'cronometro'

		--> E o parâmetro 1000, refere-se ao tempo que a função vai ficar se repetindo, em milissegundos		
*/

let cronometro = setInterval(
	function () {
		tempo -= 1;

		if (tempo < 0) {
			clearInterval(cronometro);
			clearInterval(criaMosquito);
			window.location.href = 'vitoria.html';

		}
		else {
			document.getElementById("cronometro").innerHTML = tempo;
		}
	}
	, 1000);


if (nivel === 'normal') {
	//1500ms
	criaMosquitoTempo = 1500;
}
else if (nivel === 'dificil') {
	//1000ms
	criaMosquitoTempo = 1000;
}
else if (nivel === 'chucknorris') {
	//750ms
	criaMosquitoTempo = 750;
}

/**
 * A função tem como objetivo determinar os valores totais da dimensão do jogo, utilizando
 * a função da BOM window, que busca a tela de exibição do navegador total e os métodos innerHeight,
 * que determina a altura e innerWidth, que determina a largura ( eixo x e eixo y totais);
 * São armazenadas nas variáveis altura e largura
 * 
 */
function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight;
	largura = window.innerWidth;
}

ajustaTamanhoPalcoJogo(); // Chamada da função



function iniciarJogo() {
	alert(dificuldade);
	window.location.href = 'app.html';
}

//removendo o mosquito anterior (caso exista)
function posicaoRandomica() {
	if (document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove();

		// console.log("O elemento selecionado foi " + vidas);
		if (vidas > 3) {
			window.location.href = "fim_de_jogo.html";
		} else {
			document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
			vidas++;
		}

	}
	// Determinando as coordenadas aleatórias
	let posicaoX = Math.floor(Math.random() * largura) - 90;
	let posicaoY = Math.floor(Math.random() * altura) - 90;
	posicaoX = posicaoX <= 0 ? 0 : posicaoX;
	posicaoY = posicaoY <= 0 ? 0 : posicaoY;
	console.log(posicaoX, posicaoY);
	console.log(posicaoX, posicaoY);


	// criando elemento html

	let mosquito = document.createElement('img');


	mosquito.src = 'imagens/mosquito.png'
	mosquito.className = tamanhoAleatorio();
	mosquito.style.left = posicaoX + 'px';
	mosquito.style.top = posicaoY + 'px';
	mosquito.style.position = 'absolute';
	mosquito.style.transform = ladoAleatorio();
	mosquito.id = 'mosquito';
	mosquito.onclick = function () {
		this.remove();
	}
	document.body.appendChild(mosquito);


}
function tamanhoAleatorio() {
	let classe = Math.floor(Math.random() * 3);
	console.log(classe);

	switch (classe) {
		case 0:
			return 'mosquito1';
		case 1:
			return 'mosquito2';
		case 2:
			return 'mosquito3';

	}

}
function ladoAleatorio() {
	let refletir = Math.floor(Math.random() * 2);

	if (refletir == 0) {
		return 'rotateY(180deg)';
	}


}
