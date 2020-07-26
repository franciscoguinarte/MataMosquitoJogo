
let altura = 1; //altura da tela
let largura = 1; // largura da tela 
let vidas = 1; // vidas do jogo
let criaMosquitoTempo = 1500; // variável de tempo que determina a dificuldade do jogo
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

// Bloco condicional que determina dificuldade do jogo, recebendo value do campo de dificuldade e 
// alterando o tempo de jogo 

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

/**
 * Função posição randômica é o coração da aplicação, onde o alvo é gerado aleatóriamente ,
 * onde as vidas são contadas, onde o alvo é eliminado e ajustado
 */

function posicaoRandomica() {
	if (document.getElementById('mosquito')) {
		//verifica se existe um mosquito na tela e o remove, buscando o elemento por ID e utilizando o .remove()
		//para remover o elemento da DOM, caso o mesmo não seja removido pelo clique
		document.getElementById('mosquito').remove();

		if (vidas > 3) {
			window.location.href = "fim_de_jogo.html"; // Aqui, caso chegue a gastar 3 vidas, utiliza-se o 
			//.location.href para redirecionar para a pagina de game over
		} else {
			document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
			// aqui, caso o jogador ainda tenha vidas, o elemento é alterado e o numero de
			// vidas perdidas é aumentado 
			vidas++;
		}

	}
	// Determinando as coordenadas aleatórias
	let posicaoX = Math.floor(Math.random() * largura) - 90;
	/* utiliza-se o math.floor para aproximar para baixo o valor gerado randomicamente
	* pela função math.random(), que é multiplicado pelas dimensões da tela
	* e subtraido de 90, que é o limite do tamanho da imagem do mosquito maior, determinado no style
	* para que a imagem fique ajustada na tela e não "transborde"
	*/
	let posicaoY = Math.floor(Math.random() * altura) - 90;
	posicaoX = posicaoX <= 0 ? 0 : posicaoX;
	posicaoY = posicaoY <= 0 ? 0 : posicaoY;

	// console.log(posicaoX, posicaoY);
	// console.log(posicaoX, posicaoY);


	// criando elemento html

	let mosquito = document.createElement('img'); // criação do elemento alvo


	mosquito.src = 'imagens/mosquito.png' // determinado a fonte da imagem
	mosquito.className = tamanhoAleatorio(); // determina o nome da class da imagem a partir do tamanho do alvo
	mosquito.style.left = posicaoX + 'px'; // posição do alvo no eixo X
	mosquito.style.top = posicaoY + 'px'; //  posição do alvo no eixo Y
	mosquito.style.position = 'absolute'; // determinação da posição como absolute
	mosquito.style.transform = ladoAleatorio(); // determinada a rotação do alvo, se a imagem está espelhada p esquerda ou direita
	mosquito.id = 'mosquito'; // determinado o ID do elemento

	mosquito.onclick = function () {
		// mais uma vez, a função utilizada para remover o alvo, só que agora utilizando o clique do mouse
		this.remove();
	}

	document.body.appendChild(mosquito); // exporta elemento para o DOM HTML


}

function tamanhoAleatorio() {
	// Geração de numeros aleatórios entre 1 e 3, para determinar tamanho do alvo, retornando a string de
	// determinação da class no CSS, para ser renderizada com width e height diferentes
	let classe = Math.floor(Math.random() * 3);
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
	// função que gera dois numeros aleatoruis entre 0 e 1, caso 0 o alvo receberá um "espelhamento"
	let refletir = Math.floor(Math.random() * 2);

	if (refletir == 0) {
		return 'rotateY(180deg)';
	}


}
