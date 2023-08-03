<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3x3 Rectangles Fitting the Screen</title>
    <style>
        /* CSS styling for the rectangles */
        
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
        }
        
        .grid-container {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 20px;
            padding: 20px;
        }
        
        .rectangle {
            background-color: #cccccc;
            border: 2px solid #000000;
            padding-top: calc(100% * 1.25/3); /* Set the aspect ratio of the rectangles (1.25:3) */
        }

        .text-box-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
        }

        .text-box {
            width: 200px;
            padding: 10px;
            border: 1px solid #000000;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="grid-container">
        <!-- Add rectangles here -->
        <div class="rectangle"></div>
        <div class="rectangle"></div>
        <div class="rectangle"></div>
        <div class="rectangle"></div>
        <div class="rectangle"></div>
        <div class="rectangle"></div>
        <div class="rectangle"></div>
        <div class="rectangle"></div>
        <div class="rectangle"></div>
    </div>

    <div class="text-box-wrapper">
        <input type="number" class="text-box" id="inputNumber" min="1" max="111" placeholder="Enter a number (1-111)">
    </div>

    <script>
        const inputNumber = document.getElementById("inputNumber");

        inputNumber.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                const value = parseInt(inputNumber.value);

                if (value >= 1 && value <= 111) {
                    // Redirect to a specific place based on the input value
                    // Replace the "#" with the desired URL or anchor name
                    window.location.href = "#" + value;
                }
            }
        });
    </script>
</body>
</html>
