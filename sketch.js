//script.js

//script paso 2

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
// Function to display images on the webpage
function displayImages(imageUrls) {
  const imageContainer = document.getElementById('imageContainer');
  imageContainer.innerHTML = ''; // Clear previous images

  imageUrls.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Generated Art';
    img.id = 'generatedImage';  // Asignar el ID aquí
    img.style.width = '100px';
    img.style.height = '100px';
    imageContainer.appendChild(img);
  });
}


// Attach event listener to button
document.getElementById('generateButton').addEventListener('click', generateAndDisplayArt);

// Función para actualizar el brillo y el contraste de la imagen
function updateImageFilter() {
  const brightness = document.getElementById('brightness').value;
  const contrast = document.getElementById('contrast').value;
  
  // Obtener la imagen clonada por su nuevo ID
  const filteredImage = document.getElementById('filteredImage');
  
  if (filteredImage) {
    filteredImage.style.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
  }
}


// Agregar event listeners a los controles deslizantes
const brightnessSlider = document.getElementById('brightness');
const contrastSlider = document.getElementById('contrast');

brightnessSlider.addEventListener('input', updateImageFilter);
contrastSlider.addEventListener('input', updateImageFilter);


//paso6

// Función para generar una nota aleatoria
function randomNote() {
  const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88]; // Notas correspondientes a C4, D4, E4, F4, G4, A4, B4
  return notes[Math.floor(Math.random() * notes.length)];
}

// Función para generar y tocar una melodía aleatoria
function generateMelody() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Configurar el oscilador para tocar una nota aleatoria
  oscillator.type = 'sine';

  // Iniciar el oscilador
  oscillator.start();

  // Cambiar la nota cada 0.5 segundos
  let time = audioContext.currentTime;
  for (let i = 0; i < 4; i++) {  // 4 notas en 2 segundos
    oscillator.frequency.setValueAtTime(randomNote(), time);
    time += 0.5;
  }

  // Detener el oscilador después de 2 segundos
  oscillator.stop(audioContext.currentTime + 2);
}


// Añadir un event listener al botón para generar la melodía
const generateMelodyButton = document.getElementById('generateMelody');
generateMelodyButton.addEventListener('click', generateMelody);


//paso7chatgpt

// Paso 7: Obtener respuesta de ChatGPT
function askChatGPT() {
  console.log("askChatGPT function called");
  document.getElementById('hiddenText').style.display = 'block';
  console.log("Hidden text should now be visible");
  // Get the user's question from the input
  const userQuestion = document.getElementById('userPrompt').value;
  // Set up the options for the POST request
  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'  // Replace with your actual API key
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userQuestion }],
      temperature: 0.7
    })
  };
  fetch('https://api.openai.com/v1/chat/completions', postOptions)
    .then(response => response.json())
    .then(data => {
      // Display the answer on the webpage
      const answer = data.choices[0].message.content.trim();
      document.getElementById('gptAnswer').innerText = answer;
  
    })
    .catch(error => {
      console.error('Error communicating with OpenAI API:', error);
    });
}

// Add an event listener to the "Preguntar a ChatGPT" button
const askGptButton = document.getElementById('askGptButton');
askGptButton.addEventListener('click', askChatGPT);

// Hide the "Paso 8" text initially

