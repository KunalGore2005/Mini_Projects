let toggle = 1;
let p1sum = 0;
let p2sum = 0;
let moving = false;

const snakesLadders = {
    1: 38, 4: 14, 8: 30, 21: 42, 28: 76,
    32: 10, 36: 6, 48: 26, 50: 67, 62: 18,
    71: 92, 80: 99, 88: 24, 95: 56, 97: 78
};

const resetBtn = document.getElementById("resetButton");
resetBtn.addEventListener("click", () => {
    location.reload();
});
const diceBtn = document.getElementById("diceButton");
diceBtn.addEventListener("click", async () => {
    if (moving) return;
    let dice = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice").innerText = dice;
    moving = true;
    diceBtn.disabled = true;
    if (toggle % 2 !== 0) {
        document.getElementById("toggle").innerText = "Blue's Turn";
        await playTurn("p1", 0, dice);
    }
    else {
        document.getElementById("toggle").innerText = "Red's Turn";
        await playTurn("p2", 55, dice);
    }
    toggle++;
    moving = false;
    diceBtn.disabled = false;
});

async function playTurn(player, correction, dice) {
    let current = (player === "p1") ? p1sum : p2sum;
    let target = current + dice;
    if (target > 100) return;
    const el = document.getElementById(player);
    el.style.transition = "all linear 0.25s";

    // Step-by-step movement
    while (current < target) {
        current++;
        moveToken(el, current, correction);
        await sleep(250);
    }

    // Save position
    if (player === "p1") p1sum = current;
    else p2sum = current;

    //Snake or Ladder
    if (snakesLadders[current]) {
        await sleep(300);

        let finalPos = snakesLadders[current];

        el.style.transition = "all linear 0.6s";
        moveToken(el, finalPos, correction);

        await sleep(600);

        if (player === "p1") p1sum = finalPos;
        else p2sum = finalPos;
    }

    // Win check
    if ((player === "p1" ? p1sum : p2sum) === 100) {
        alert(player === "p1" ? "Blue Won !!" : "Red Won !!");
        location.reload();
    }
}

function moveToken(el, pos, correction) {
    if (pos < 1) return;

    let row = Math.ceil(pos / 10);
    let col = pos % 10;
    if (col === 0) col = 10;

    let left;
    if (row % 2 === 1) {
        left = (col - 1) * 62;
    }
    else {
        left = (10 - col) * 62;
    }

    let top = -(row - 1) * 62 - correction;
    el.style.left = left + "px";
    el.style.top = top + "px";
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}