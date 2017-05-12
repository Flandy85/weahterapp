<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="dist/css/style.css">
    <title>Open Weather</title>
</head>
<body>
    <div class="header">
        <h1>Get current waether</h1>
    </div>
    <div class="weather-search">
        <p>Enter city name:</p>
        <span id="error"></span>
        <input id="city-name" type="text" name="city" placeholder="City name">
        <button id="search-btn">Search city</button>
    </div>
    <div id="weather-info">
    </div>

    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="dist/js/bundle.js" type="text/javascript"></script>
</body>
</html>