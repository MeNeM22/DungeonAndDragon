let xp = 0;
let health = 200;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "Slime Mogglin",
    level: 2,
    health: 60
  },
  {
    name: "Golem Gromak",
    level: 8,
    health: 120
  },
  {
    name: "Dragon Drakthar",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight golem", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
  
}

function goTown() {
  
  const caballero = document.getElementsByClassName("caballero")[0];
  caballero.style.top = "240px"
  caballero.style.left = "-150px"
  const pantalla = document.getElementById("pantalla")
  pantalla.style.backgroundImage="url(https://media.licdn.com/dms/image/v2/D4D12AQENHJv8LnEiig/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1731846202423?e=2147483647&v=beta&t=nOUr4iCGavPUD3UpmFI134eGLEFqPn0deSU7KTq3Hnk)";
  bye();
  update(locations[0]);
}

function goStore() {
  const caballero = document.getElementsByClassName("caballero")[0];
  caballero.style.top = "265px"
  caballero.style.left = "-150px"
  const pantalla =document.getElementById("pantalla")
  pantalla.style.backgroundImage="url(https://img.freepik.com/fotos-premium/imagen-pixel-art-ciudad-medieval-ciudad-esta-compuesta-variedad-edificios-incluidas-casas-tiendas-taberna_36682-184776.jpg)";
  update(locations[1]);
}

function goCave() {
  const caballero = document.getElementsByClassName("caballero")[0];
  caballero.style.top = "250px"
  caballero.style.left = "3px"
  const pantalla = document.getElementById("pantalla")
  pantalla.style.backgroundImage="url(https://img.freepik.com/fotos-premium/paisaje-tunel-natural-entrada-cueva-pixel-art-estilo-retro-juegos-ia-8-bits_985124-1548.jpg)";
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  const pantalla =document.getElementById("pantalla")
  pantalla.style.backgroundImage="url(https://www.shutterstock.com/image-vector/pixel-art-retro-game-level-600nw-2513324683.jpg)";
  const caballero = document.getElementsByClassName("caballero")[0];
  caballero.style.top = "205px";
  caballero.style.left = "-150px"
  const slime = document.getElementsByClassName("slime")[0];
  slime.style.display= "block";
  const stats = document.getElementById("monsterStats");
  stats.style.top = "35%"; // Cambia a donde quieres que aparezcan las estadísticas del slime
  stats.style.left = "62%"; // Ajusta la posición horizontal
  goFight();
}

function fightBeast() {
  fighting = 1;
  const pantalla = document.getElementById("pantalla")
  pantalla.style.backgroundImage="url(https://www.shutterstock.com/image-vector/pixel-art-retro-game-level-600nw-2513324693.jpg)";
  const caballero = document.getElementsByClassName("caballero")[0];
  caballero.style.top = "200px"
  caballero.style.left = "-150px"
  const golem = document.getElementsByClassName("golem")[0];
  golem .style.display= "block";
  const stats = document.getElementById("monsterStats");
  stats.style.top = "26%"; // Cambia a donde quieres que aparezcan las estadísticas del slime
  stats.style.left = "60%"; // Ajusta la posición horizontal
  goFight();
}

function fightDragon() {
  fighting = 2;
  const pantalla = document.getElementById("pantalla")
  pantalla.style.backgroundImage="url(https://img.itch.zone/aW1nLzEyMTkxMTQwLnBuZw==/original/ALYiiE.png)";
  const dragon = document.getElementsByClassName("dragon")[0];
  dragon.style.display= "block";
  const stats = document.getElementById("monsterStats");
  stats.style.top = "13%"; // Cambia a donde quieres que aparezcan las estadísticas del slime
  stats.style.left = "58%"; // Ajusta la posición horizontal
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  
  if (health <= 0){
    healthText.innerText = 0;
    goldText.innerText = 0;
    lose();
  }else{
    healthText.innerText = health;
  }
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(xp / 10) + 1;    
    updateBarHealth();
  } else {
    text.innerText += " You miss.";
  }
  if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  updateBarHealth();
  bye();
  update(locations[4]);
}

function lose() {
  update(locations[5]);
  const pantalla =document.getElementById("pantalla")
  pantalla.style.backgroundImage="url(https://media.licdn.com/dms/image/v2/D4D12AQENHJv8LnEiig/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1731846202423?e=2147483647&v=beta&t=nOUr4iCGavPUD3UpmFI134eGLEFqPn0deSU7KTq3Hnk)";
  const slime = document.getElementsByClassName("slime")[0];
  bye();
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 200;
  gold = 60;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  updateBarHealth();
  bye();
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}

function updateBarHealth() {
  const barHealth = document.querySelector("#barhealth");
  // Asegúrate de que el valor de `monsterHealth` esté correctamente calculado.
  const healthPercent = (monsterHealth /  monsters[fighting].health) * 100;
  // Actualiza el ancho de la barra de salud en función del porcentaje.
  barHealth.style.width = healthPercent + '%'; 
  
  // Cambiar el color de la barra de salud según el porcentaje.
  if (healthPercent <= 25) {
    barHealth.style.backgroundColor = 'red';  // Rojo cuando la salud es baja
  } else if (healthPercent <= 50) {
    barHealth.style.backgroundColor = 'orange';  // Naranja cuando la salud está moderada
  } else {
    barHealth.style.backgroundColor = 'green';  // Verde cuando la salud es alta
  }
}


function bye(){
  const barHealth = document.querySelector("#barhealth");
  barHealth.style.width = "100%";
  const dragon = document.getElementsByClassName("dragon")[0];
  dragon.style.display= "none";
  const golem = document.getElementsByClassName("golem")[0];
  golem .style.display= "none";
  const slime = document.getElementsByClassName("slime")[0];
  slime.style.display= "none";
}

