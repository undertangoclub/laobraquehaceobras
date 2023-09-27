// 3page3.js

// Get user prompt from localStorage
const userPrompt = localStorage.getItem('userPrompt'); 

async function generateImage() {
    console.log("Button clicked");
    const loadingMessage = document.getElementById('loadingMessage');
    if (loadingMessage) {
        loadingMessage.style.display = 'block'; 
      }
  
    // Get user input
    //const userPrompt = localStorage.getItem('userPrompt');

    // Generate art
    const postOptions = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer 45627a92-21bf-4099-8534-6335d475fc5f'
      },
      body: JSON.stringify({
        height: 512,
        modelId: '6bef9f1b-29cb-40c7-b9df-32b51c1f67d3',
        prompt: userPrompt,
        width: 512,
        num_images: 1
      })
    };
  
    let generationId;
    try {
      const response = await fetch('https://cloud.leonardo.ai/api/rest/v1/generations', postOptions);
      const data = await response.json();
      console.log("Generation Data:", data);
      generationId = data.sdGenerationJob.generationId;
    } catch (err) {
      console.error("Error in generation:", err);
      return;
    }
  
    // Poll for generated images
    const getOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: 'Bearer 45627a92-21bf-4099-8534-6335d475fc5f'
      }
    };
  
    let imageUrls = [];
    const maxAttempts = 10;
    let attempts = 0;
  
    while (imageUrls.length === 0 && attempts < maxAttempts) {
      try {
        const response = await fetch(`https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`, getOptions);
        const data = await response.json();
        console.log("Image Data:", data);
  
        imageUrls = data.generations_by_pk.generated_images.map(img => img.url);
        if (imageUrls.length === 0) {
          attempts++;
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
        } else {
          displayImage(imageUrls[0]);
        }
      } catch (err) {
        console.error(err);
        return;
      }
  }
  document.getElementById("loading").style.display = "none";
}

  // Display image

  function displayImage(imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.onload = function() {
      document.body.appendChild(img);
      const storedImageUrl = localStorage.getItem('generatedImageUrl');
localStorage.setItem('generatedImageUrl', imageUrl);
      initializeWebGL(imageUrl);  // Call WebGL initialization here
    };
  }

function toggleLoading(isLoading) {
    // Show/hide loader
  }

generateImage();

const nextButton = document.getElementById("nextButton");
nextButton.addEventListener("click", function() {
  const storedImageUrl = localStorage.getItem('generatedImageUrl'); // Retrieve from localStorage
  if (storedImageUrl) {
    //localStorage.setItem('generatedImageUrl', storedImageUrl);
    // Navigate to next page 
    console.log("Redirecting to:", "/4page4/4page4.html");
    window.location.href = "111/4page4/4page4.html"; 
  } else {
    console.error('Image URL not found in localStorage.');
  }

});
