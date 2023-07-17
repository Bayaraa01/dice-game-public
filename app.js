//Тоглоомын бүх газар ашиглагдах глобаль хувьсагчид
//Шооны зургийг үзүүлэх элементийг DOM-с хайж олоод энд хадгална.
var activePlayer, scores, roundScore;
var diceDom = document.querySelector(".dice");

//Тоглоом эхлэн үед ажиллана.
initGame();

//Шинэ тоглоом эхлүүлэх функц
function initGame() {
  // Тоглогчийн ээлжийг хадгалах хувьсагч, 1-р тоглогчийг 0, 2-р тоглогчийг 1 гэж тэмдэглэе.
  activePlayer = 0;

  // Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
  scores = [0, 0];

  // Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
  roundScore = 0;

  //Програм эхлэхэд бэлтгэх
  document.getElementById("score-0").innerHTML = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //Тоглогчдын нэрийг буцааж гаргах
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  diceDom.style.display = "none";
}

//Roll Dice буюу шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function () {
  // 1-6 хүртэл санамсаргүй тоог гаргаж авах
  var diceNumber = Math.floor(Math.random() * 6) + 1;
  // Шооны зургийг веб дээр гаргах
  diceDom.style.display = "block";
  //Буусан санамсаргүй тоонд харгалзах шооны зургийг веб дээр гаргаж ирнэ.
  diceDom.src = "dice-" + diceNumber + ".png";

  //Буусан тоо нь 1-с ялгаатай бол идэвхитэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ.
  if (diceNumber !== 1) {
    //1-с ялгаатай тоо буусан бол тоглогчид нэмж өгнө.
    roundScore += diceNumber;
    document.getElementById("current-" + activePlayer).textContent = roundScore;
  } else {
    // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө.
    // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно.
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = "0";
    //Тоглогчийн ээлжийг сольно.
    switchToNextPlayer();
  }
});

//Hold товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function () {
  //Уг тоглогчийн цуглуулсан ээлжний оноог глобаль оноон дээр нь нэмж өгнө.
  scores[activePlayer] += roundScore;

  //Дэлгэц дээр оноог өөрчилнө
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];

  //Уг тоглогч хожсон эсэхийг шалгана.
  if (scores[activePlayer] >= 10) {
    document.getElementById("name-" + activePlayer).textContent = "Winner!!!";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
    diceDom.style.display = "none";
  } else {
    //Тоглогчийн ээлжийг сольно.
    switchToNextPlayer();
  }
});

//Энэ функц нь тоглох ээлжийг дараачийн тоглогч руу шилжүүлдэг.
function switchToNextPlayer() {
  //Хэрэв идэвхитэй тоглогч 0 байвал идэвхитэй тоглогчийг 1 болго.
  //Үгүй бол идэвхитэй тоглогчийг 0 болго.
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  //Улаан цэгийг шилжүүлэх
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //Шоог түр алга болгох
  diceDom.style.display = "none";
}

//Шинэ тоглоом эхлүүлэх товчны эвент листенер
document.querySelector(".btn-new").addEventListener("click", initGame);
