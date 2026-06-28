document.addEventListener("DOMContentLoaded", function(event) {
    let symbols = [["🍒", "🍋", "💎", "🍉", "💰", "🍀"], ["🍉", "💰", "🍀", "🍒", "🍋", "💎"], ["🍒", "🍉", "🍋", "💰", "💎", "🍀"]];
    let payouts = [20, 30, 40, 50, 100, 200];
    let bet = 10;
    let balance = 200;
    let cost = 10;
    let spinButton = document.getElementById("spin-button");


    function getCombinations() {
        let currentCombinations = [];

        for (let y = 0; y < 3; y++) {
            let currentHorizontal = "";

            for (let x = 0; x < 3; x++) {
                // identifying the 3x HORIZONTAL combinations
                currentHorizontal += document.getElementById(`${x},${y}`).innerHTML;
            }

            currentCombinations.push(currentHorizontal);
            console.log(currentCombinations);
        }

        // identifying the 2x DIAGONAL combinations
        // 1: 0,0; 1,1; 2,2 => where x=y
        // 2: 0,2; 1,1; 2,0 => x increments opposite of y

        // 1st diagonal:
        let firstDiagonal = "";

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                if (x == y) {
                    firstDiagonal += document.getElementById(`${x},${y}`).innerHTML;
                }
            }
        }

        currentCombinations.push(firstDiagonal);

        // 2nd diagonal:
        let secondDiagonal = "";

        for (let x = 0; x < 3; x++) {
            for (let y = 2-x; y > -1; y--) {
                secondDiagonal += document.getElementById(`${x},${y}`).innerHTML;
                break;
            }
        }

        currentCombinations.push(secondDiagonal);

        console.log(currentCombinations);
    }

    spinButton.addEventListener("click", function(event) {
        if (balance < cost) {
            alert("You've gone bust! Come back when you're a little richer!");
        } else {
            balance -= cost;
            document.getElementById("balance").innerHTML = balance;
            let spinsCleared = 0;

            for (let x = 0; x <= 2; x++) {
                let ranNum = Math.ceil(Math.random()*100); // let keyword is important here! this ensures each variation of the loop has the ranNum and count locked in for that specific variation, isntead of being overwritten by the last generated instance
                let count = 0; // for that nice "animation", i want to increment the numbers of each column one by one with the help of this variable

                function increment() {
                    count += 1;

                    for (let y = 0; y <= 2; y++) {
                        let symNum = (count % 6) + y;
                        document.getElementById(`${x},${y}`).innerHTML = symbols[x][symNum % 6];
                    }

                    if (count == ranNum) {
                        clearInterval(incrementInterval);

                        spinsCleared += 1;
                        // after each symbol has been incremented, this is where you check for the symbols horizontally and diagonally
                        if (spinsCleared == 3) {
                            getCombinations();
                        }
                    }
                }
                let incrementInterval = setInterval(increment, 10); // every 10ms, "shift down" each column by 1 until it hits the randomly generated number for that column
            }
        }
    })
})