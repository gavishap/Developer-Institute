// Initialize the move count to 0
let MovesCount = 0;
// Define a function to generate random positions for the tiles
function randomPos() {
    // Initialize an empty array to hold the positions
    let arr = [];
    // Loop until the array has 9 unique positions
    while (arr.length < 9) {
        // Generate a random position by concatenating two random numbers
        let r = `${Math.floor(Math.random() * 3) + 1}${Math.floor(Math.random() * 3) + 1}`;
        // If the generated position is not already in the array, add it
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    // Return the array of positions
    return arr;
}

// Generate a random position for each tile
let RandomPos = randomPos();

// Loop through each tile and set its grid area based on the random positions generated
for (let i = 0; i < document.getElementsByClassName("tile").length; i++) {
    document.getElementsByClassName("tile")[i].style.gridArea = `${RandomPos[i][0]}/${RandomPos[i][1]}`;
}
// Define a function to move a tile
function MoveMe(tile) {
    // Select the empty tile
    let EmptyTile = document.querySelector(".emtile");
    // Calculate the possible moves based on the current and empty tile positions
    let Possibilities = [
        parseInt(RandomPos[tile][0]) + 1 === parseInt(RandomPos[8][0]) && parseInt(RandomPos[tile][1]) === parseInt(RandomPos[8][1]),
        parseInt(RandomPos[tile][0]) - 1 === parseInt(RandomPos[8][0]) && parseInt(RandomPos[tile][1]) === parseInt(RandomPos[8][1]),
        parseInt(RandomPos[tile][1]) + 1 === parseInt(RandomPos[8][1]) && parseInt(RandomPos[tile][0]) === parseInt(RandomPos[8][0]),
        parseInt(RandomPos[tile][1]) - 1 === parseInt(RandomPos[8][1]) && parseInt(RandomPos[tile][0]) === parseInt(RandomPos[8][0]),
    ];
    // Check if the move is possible and execute it
    if (Possibilities[0] || Possibilities[1] || Possibilities[2] || Possibilities[3]) {
        // Increment the move count
        MovesCount++;
        // Swap the positions of the empty tile and the moved tile
        // Set the grid area of the empty tile to the position of the tile that is being moved.
        // This effectively moves the empty tile to the position of the tile that the user wants to move.
        EmptyTile.style.gridArea = `${RandomPos[tile][0]}/${RandomPos[tile][1]}`;
        // Find all elements with the class "tile" and set the grid area of the tile being moved to the position of the empty tile.
        // This effectively moves the tile to the position where the empty tile was.
        document.querySelectorAll(".tile")[tile].style.gridArea = `${RandomPos[8][0]}/${RandomPos[8][1]}`;
        // Update the positions in the RandomPos array
        let CurrentTile = RandomPos[tile];
        RandomPos[tile] = RandomPos[8];
        RandomPos[8] = CurrentTile;
        // Define the needed positions to win the game
        let NeededPos = ["11", "12", "13", "21", "22", "23", "31", "32", "33"];
        // Check if the current positions match the winning positions
        if (RandomPos.join(".") === NeededPos.join(".")) {
            // Log the victory message
            console.log("Game Beated");
            // Display the victory screen
            document.querySelector(".blscreen").style.display = 'flex';
            // Update the move count on the victory screen
            document.querySelector(".MovesCount").innerHTML = MovesCount;
            // Determine the number of stars based on the move count
            let stars = 0;
            if (MovesCount < 100) {
                stars = 3;
            } else if (MovesCount < 200) {
                stars = 2;
            } else if (MovesCount < 300) {
                stars = 1;
            } else {
                stars = 0;
            }
            // Loop to change the color of the stars (though this part seems to have an error as it should loop through each star)
            for (let i = 0; i < 2; i++) {
                document.getElementsByTagName("path").style.fill = "yellow";
            }
        }
    }
}
