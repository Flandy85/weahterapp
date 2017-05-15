<?php
    require_once 'header.php';
?>

    <div class="header">
        <h1>Get current waether</h1>
    </div>
    <div class="weather-search">
        <p>Enter city name:</p>
        <span id="error"></span>
        <input id="city-name" type="text" name="city" placeholder="City name">
        <button id="search-btn">Search city</button>
    </div>
    <div id="weather-info"></div>

    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="dist/js/bundle.js" type="text/javascript"></script>
</body>
</html>