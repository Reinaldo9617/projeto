let carros = [];
let tempoUltimoCarro = 0;
let intervaloCarro = 10000; // 10 segundos
let arvores = [];
let maxArvores = 15; // quantidade inicial de árvores
let arvoresCortadas = 0;
let nascenteSeca = false;
let temperatura = 25; // Temperatura inicial

function setup() {
  createCanvas(800, 400);
  // Adiciona as árvores iniciais no campo
  for (let i = 0; i < maxArvores; i++) {
    let x = 70 + i * 32;
    let y = height / 2 + 90;
    arvores.push({ x, y });
  }
}

function draw() {
  background(180, 220, 255);

  // Dividir tela ao meio
  stroke(0);
  line(width / 2, 0, width / 2, height);

  // CAMPO (lado esquerdo)
  drawCampo(0, 0, width / 2, height);

  // CIDADE (lado direito)
  drawCidade(width / 2, 0, width / 2, height);

  // Carros (lado da cidade)
  for (let carro of carros) {
    carro.x += carro.velocidade;
    drawCarro(carro.x, carro.y, carro.cor);
  }

  // Remove carros que saíram da tela
  carros = carros.filter(carro => carro.x < width);

  // Adiciona um novo carro a cada 10 segundos
  if (millis() - tempoUltimoCarro > intervaloCarro) {
    adicionarCarro();
    tempoUltimoCarro = millis();
    cortarArvore();
  }

  // Título
  noStroke();
  fill(30);
  textSize(32);
  textAlign(CENTER, TOP);
  text("Campo e Cidade", width / 2, 10);
}

function drawCampo(x, y, w, h) {
  // Céu
  noStroke();
  fill(135, 206, 235);
  rect(x, y, w, h / 2);

  // Grama
  fill(34, 139, 34);
  rect(x, h / 2, w, h / 2);

  // Sol
  fill(255, 255, 0);
  ellipse(x + w * 0.8, y + h * 0.2, 60, 60);

  // Montanhas
  fill(85, 107, 47);
  triangle(x + 30, h / 2, x + 120, y + 120, x + 210, h / 2);
  fill(107, 142, 35);
  triangle(x + 100, h / 2, x + 200, y + 80, x + 300, h / 2);

  // Casa simples
  fill(255, 235, 205);
  rect(x + 70, h / 2 + 50, 60, 40);
  fill(139, 69, 19);
  triangle(x + 65, h / 2 + 50, x + 100, h / 2 + 20, x + 130, h / 2 + 50);

  // Nascer d'água
  if (!nascenteSeca) {
    fill(0, 191, 255);
    ellipse(x + 40, h / 2 + 120, 28, 18);
    fill(0, 140, 210);
    textSize(14);
    textAlign(LEFT, CENTER);
    text("Nascente", x + 20, h / 2 + 140);
  } else {
    fill(110);
    textSize(14);
    textAlign(LEFT, CENTER);
    text("Nascente seca", x + 10, h / 2 + 140);
  }

  // Árvores restantes
  for (let arvore of arvores) {
    drawArvore(arvore.x, arvore.y);
  }

  // Vaca
  fill(255);
  ellipse(x + 180, h / 2 + 90, 35, 20); // corpo
  fill(0);
  ellipse(x + 190, h / 2 + 90, 10, 10); // cabeça
  fill(0);
  ellipse(x + 175, h / 2 + 100, 5, 5); // pata
  ellipse(x + 185, h / 2 + 100, 5, 5); // pata

  // Temperatura
  fill(255, 0, 0);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Temperatura: " + temperatura + "°C", x + 10, y + 10);
}

function drawArvore(x, y) {
  fill(139, 69, 19);
  rect(x - 4, y, 8, 28); // tronco
  fill(34, 139, 34);
  ellipse(x, y - 8, 30, 30); // copa
}

function drawCidade(x, y, w, h) {
  // Céu
  noStroke();
  fill(135, 206, 250);
  rect(x, y, w, h / 2);

  // Rua
  fill(70);
  rect(x, h * 0.7, w, 30);

  // Prédios
  fill(169, 169, 169);
  rect(x + 40, h / 2, 50, 100);
  rect(x + 110, h / 2 + 20, 40, 80);
  fill(120, 120, 200);
  rect(x + 170, h / 2 - 10, 60, 110);

  // Janelas
  fill(255, 255, 100);
  for (let i = 0; i < 3; i++) {
    rect(x + 50, h / 2 + 20 + i * 25, 15, 15);
    rect(x + 120, h / 2 + 30 + i * 15, 10, 10);
    rect(x + 185, h / 2 + 10 + i * 30, 15, 15);
  }
}

function adicionarCarro() {
  // Adiciona um carro do lado da cidade (no início da rua)
  let xInicial = width / 2 + 10;
  let yRua = height * 0.75;
  let cor = color(random(255), random(255), random(255));
  let velocidade = random(1, 3);
  carros.push({ x: xInicial, y: yRua, cor, velocidade });
}

function drawCarro(x, y, cor) {
  fill(cor);
  rect(x, y, 40, 15, 4);
  fill(0);
  ellipse(x + 10, y + 15, 10, 10);
  ellipse(x + 30, y + 15, 10, 10);
}

function cortarArvore() {
  // Corta (remove) uma árvore do início do array, se houver
  if (arvores.length > 0) {
    arvores.shift();
    arvoresCortadas++;
    // Aumenta a temperatura a cada 2 árvores cortadas
    if (arvoresCortadas % 2 === 0) {
      temperatura += 2;
    }
    if (arvoresCortadas === 10) {
      nascenteSeca = true; // Secou a nascente ao cortar a 10a árvore
    }
  }
}