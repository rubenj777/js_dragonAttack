"use strict";

const game = {};

//////////////////// FONCTIONS /////////////////////////

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function requestInteger(message, min, max) {
  let nb;
  do {
    nb = parseInt(prompt(message));
  } while (isNaN(nb) || nb < min || nb > max);
  return nb;
}

function initializeGame() {
  game.difficulty = requestInteger(
    "Quel niveau de difficulté : 1. Facile, 2. Moyen, 3. Difficile ?",
    1,
    3
  );
  game.sword = requestInteger(
    "Quelle épée : 1. Bois, 2. Acier, 3. Excalibur",
    1,
    3
  );
  game.armor = requestInteger(
    "Quelle armure : 1. Cuivre, 2. Fer, 3. Magique",
    1,
    3
  );
  switch (game.difficulty) {
    case 1:
      game.hpKnight = getRandomInteger(200, 250);
      game.hpDragon = getRandomInteger(150, 200);
      break;
    case 2:
      game.hpKnight = getRandomInteger(200, 250);
      game.hpDragon = getRandomInteger(200, 250);
      break;
    case 3:
      game.hpKnight = getRandomInteger(150, 200);
      game.hpDragon = getRandomInteger(200, 250);
      break;
  }
  switch (game.sword) {
    case 1:
      game.swordRatio = 0.5;
      break;
    case 2:
      game.swordRatio = 1;
      break;
    case 3:
      game.swordRatio = 1.5;
      break;
  }
  switch (game.armor) {
    case 1:
      game.armorRatio = 1;
      break;
    case 2:
      game.armorRatio = 0.75;
      break;
    case 3:
      game.armorRatio = 0.5;
      break;
  }
  console.log(game);
}

function computeDragonDamagePoint() {
  let damageDragon;
  if (game.difficulty === 1) {
    damageDragon = Math.floor(getRandomInteger(10, 20) * game.armorRatio);
  } else {
    damageDragon = Math.floor(getRandomInteger(20, 30) * game.armorRatio);
  }
  return damageDragon;
}

function computePlayerDamagePoint() {
  let damagePlayer;
  if (game.difficulty === 1) {
    damagePlayer = Math.floor(getRandomInteger(25, 30) * game.swordRatio);
  } else if (game.difficulty === 2) {
    damagePlayer = Math.floor(getRandomInteger(15, 20) * game.swordRatio);
  } else {
    damagePlayer = Math.floor(getRandomInteger(5, 10) * game.swordRatio);
  }
  return damagePlayer;
}

function gameLoop() {
  let round = 1;
  document.querySelector("#game").innerHTML += `<h4>Points de vie de départ</h4>
    <table>
        <thead>
          <tr>
            <th>Personnage</th>
            <th>PV</th>
          </tr>
          <tr>
            <td>Chevalier</td>
            <td>${game.hpKnight}</td>
          </tr>
          <tr>
            <td>Dragon</td>
            <td>${game.hpDragon}</td>
          </tr>
        </thead>
      </table>`;
  do {
    let begin = Math.random();
    let damagePlayer = computePlayerDamagePoint();
    let damageDragon = computeDragonDamagePoint();
    if (begin < 0.5) {
      game.hpDragon -= damagePlayer;
      document.querySelector("#game").innerHTML += `<h4>Tour n°${round}</h4>
    <table>
        <thead>
          <tr>
            <th>Personnage</th>
            <th>PV</th>
          </tr>
          <tr>
            <td>Chevalier</td>
            <td>${game.hpKnight}</td>
          </tr>
          <tr>
            <td>Dragon</td>
            <td>${game.hpDragon}</td>
          </tr>
        </thead>
      </table>`;
    } else {
      game.hpKnight -= damageDragon;
      document.querySelector("#game").innerHTML += `<h4>Tour n°${round}</h4>
    <table>
        <thead>
          <tr>
            <th>Personnage</th>
            <th>PV</th>
          </tr>
          <tr>
            <td>Chevalier</td>
            <td>${game.hpKnight}</td>
          </tr>
          <tr>
            <td>Dragon</td>
            <td>${game.hpDragon}</td>
          </tr>
        </thead>
      </table>`;
    }
    round++;
    console.log(game);
  } while (game.hpKnight > 0 && game.hpDragon > 0);
  console.log(`Le combat a duré ${round} tours`);
}

function showGameWinner() {
  if (game.hpKnight > 0 && game.hpDragon < 0) {
    document
      .querySelector("#game")
      .insertAdjacentHTML(
        `afterbegin`,
        `<article><img src="img/knight.png" alt="" /><p>Vous avez tué le dragon !</p><p>Il vous restait ${game.hpKnight} points de vie.`
      );
  } else {
    document
      .querySelector("#game")
      .insertAdjacentHTML(
        `afterbegin`,
        `<article><img src="img/dragon.png" alt="" /><p>Le dragon a gagné, il a vous a carbonisé.</p><p>Il restait ${game.hpDragon} points de vie au dragon.`
      );
  }
}

function toggleWinner() {
  const article = document.querySelector("#game article");
  if (article == null) {
    alert("Le jeu n'est pas lancé !");
    return;
  }
  article.classList.toggle("hide");
}

function startGame() {
  document.querySelector("#game").innerHTML = "";
  initializeGame();
  gameLoop();
  showGameWinner();
}
