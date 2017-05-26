<?php
    require_once 'header.php';
?>
    <main>
        <div class="weather-now">
            <p id="temp-now"></p>
        </div>

        <div class="date-container">
            <p id="city"></p>
            <p id="date"></p>
        </div>
        
        <div id="weather-info"></div>
        <div id="images"></div>
        
        <div class="weather-description">
           <div id="theDiv"></div>
           <p id="weather-wind"></p>
           <p id="weather-pressure"></p>    
        </div>

        <div class="forecast-toggle">
            <i id="show-forecast" class="fa fa-angle-down" aria-hidden="true"></i>
            <i id="hide-forecast" class="fa fa-angle-up" aria-hidden="true"></i>
        </div>
    </main>
    <aside>
        <div id="weather-forecast"></div>
    </aside>

<?php
    require_once 'footer.php';
?>
