
function dayDateMonth(weekDay, monthDay, thisMonth) {
    // Retrieves the day of the week from the function theDay
    let day = theDay(weekDay);
    let date = theDate(monthDay);
    let month = theMonth(thisMonth);

    $('#date').html(day + ' ' + month + '/' + date);

    // Update every 10 seconds
    let updateDate = setTimeout(dayDateMonth, 10000);
}

// Returns the day of the week to the variable day
function theDay(weekDay) {
    let day;
    switch (new Date().getDay()) {
        case 0: day = "Söndag"; break;
        case 1: day = "Måndag"; break;
        case 2: day = "Tisdag"; break;
        case 3: day = "Onsdag"; break;
        case 4: day = "Torsdag"; break;
        case 5: day = "Fredag"; break;
        case  6: day = "Lördag";
    }
    return day;
}

// Returns the day of the month to the variable date
function theDate(monthDay) {
    let d = new Date();
    let date = d.getDate();
    return date;
}

// Returns the month to the variable month
function theMonth(thisMonth) {
    let m = new Date();
    let mm = m.getMonth();
    let month = mm + 1;

    if(month < 10) {
        month = '0' + month;
        return month;
    } else {
        return month;
    }
}

dayDateMonth();