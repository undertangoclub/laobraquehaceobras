//script.js

async function generateAndDisplayArt() {
    console.log("Button clicked");
  
    // Get user input
    const userPrompt = document.getElementById('userPrompt').value || 'random complete';
  
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
          displayImages(imageUrls);
        }
      } catch (err) {
        console.error("Error in fetching images:", err);
      }
    }
  }
  
  // Function to display images on the webpage
  function displayImages(imageUrls) {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = ''; // Clear previous images
  
    imageUrls.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'Generated Art';
      img.style.width = '100px';
      img.style.height = '100px';
      imageContainer.appendChild(img);
    });
  }
  
  // Attach event listener to button
  document.getElementById('generateButton').addEventListener('click', generateAndDisplayArt);
  

  // Function to toggle the visibility of the shader
function toggleShader() {
    const shader = document.getElementById("shader");
    shader.style.display = shader.style.display === "none" ? "block" : "none";
}

// Add event listener to the button
const generateButton = document.getElementById("generateButton");
generateButton.addEventListener("click", toggleShader);
