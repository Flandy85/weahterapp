<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="dist/font-awesome-4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="dist/css/style.css">
    <title>The Lost Three Weatherapp</title>
</head>
<body>
    <div class="top-bar">
        <div class="top-bar__menu-icons">
            <i id="open-menu" class="fa fa-bars" aria-hidden="true"></i>
            <i id="close-menu" class="fa fa-times" aria-hidden="true"></i>
        </div>
        <div class="clock">
            <p>20:00</p>
        </div>
    </div>
    <div class="top-bar-spacer"></div>
    <div id="top-menu" class="top-menu">
        <p>Här skall övriga saker i menyn vara...</p>
        <div class="weather-search">
            <span id="error"></span>
            <input id="city-name" type="text" name="city" placeholder="Skriv in en stad">
            <button id="search-btn">Sök</button>
        </div>
    </div>