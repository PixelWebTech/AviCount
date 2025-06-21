
let players = JSON.parse(localStorage.getItem("players") || "[]");
const colors = ["#e74c3c", "#f39c12", "#2ecc71", "#3498db", "#9b59b6", "#16a085", "#d35400"];
let colorIndex = 0;

function save() {
  localStorage.setItem("players", JSON.stringify(players));
}

function addPlayer() {
  const name = document.getElementById("playerName").value.trim();
  if (!name) return;
  players.push({ name, score: 0, color: colors[colorIndex % colors.length] });
  colorIndex++;
  document.getElementById("playerName").value = "";
  save();
  render();
}

function increment(index) {
  players[index].score++;
  save();
  render();
}
function decrement(index) {
  players[index].score--;
  save();
  render();
}
function resetPlayer(index) {
  players[index].score = 0;
  save();
  render();
}
function deletePlayer(index) {
  players.splice(index, 1);
  save();
  render();
}
function sortPlayers() {
  players.sort((a, b) => b.score - a.score);
  render();
}
function resetAll() {
  if (confirm("Tout réinitialiser ?")) {
    players.forEach(p => p.score = 0);
    save();
    render();
  }
}

function render() {
  const container = document.getElementById("players");
  container.innerHTML = "";
  players.forEach((player, i) => {
    const el = document.createElement("div");
    el.className = "player";
    el.innerHTML = `
      <div class="color-bar" style="background:${player.color}"></div>
      <div class="info">
        <strong>${player.name}</strong>
        <div class="score">${player.score}</div>
      </div>
      <div>
        <button onclick="increment(${i})">+</button>
        <button onclick="decrement(${i})">-</button>
        <button onclick="resetPlayer(${i})">♻️</button>
        <button onclick="deletePlayer(${i})">❌</button>
      </div>
    `;
    container.appendChild(el);
  });
}

render();
