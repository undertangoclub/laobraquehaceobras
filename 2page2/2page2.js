/* The code you provided is written in JavaScript and it is adding an event listener to the
"DOMContentLoaded" event of the document object. This event is fired when the initial HTML document
has been completely loaded and parsed. */
document.addEventListener("DOMContentLoaded", function() {
    const nextButton = document.getElementById("nextButton");
    nextButton.addEventListener("click", function() {
      // Get user input
      const userPrompt = document.getElementById("userPrompt").value;
      
      // You can store this value in local storage or pass it to the next page
      localStorage.setItem("userPrompt", userPrompt);
  
      // Navigate to the next page
      window.location.href = "3page3.html";// Assuming the next page is named "3page3.html"
    });
  });
  
  // Save user input to localStorage
const userPrompt = document.getElementById('userPrompt').value;
localStorage.setItem('userPrompt', userPrompt);
