document.addEventListener("DOMContentLoaded", function(event) {
    let symbols = [["X", "Y", "Z", "A", "B", "C"], ["A", "B", "C", "X", "Y", "Z"], ["A", "X", "B", "Y", "C", "Z"]];
    let spinButton = document.getElementById("spin-button");

    function symbolAdjust() {
        for (let i = 0; i <= 2; i++) {
            for (let j = 0; j <= 2; j++) {
                document.getElementById("${i},${j}").innerHTML = "YES";
            }
        }
    }

    spinButton.addEventListener("click", function(event) {
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
                }
            }
            let incrementInterval = setInterval(increment, 10); // every 10ms, "shift down" each column by 1 until it hits the randomly generated number for that column
        }
    })
})