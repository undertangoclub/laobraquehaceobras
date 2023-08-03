window.addEventListener("DOMContentLoaded", () => {
  // Function to create the 9 squares
  function createSquares() {
      const container = document.getElementById("grid-container");
      const squareSize = Math.min(window.innerWidth, window.innerHeight) / 3;

      for (let i = 0; i < 9; i++) {
          const square = document.createElement("div");
          square.classList.add("square");
          square.style.width = `${squareSize}px`;
          square.style.height = `${squareSize}px`;
          container.appendChild(square);
      }
  }

  // Call the function to create squares
  createSquares();
});

