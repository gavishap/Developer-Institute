// Set an interval to update the clock every 100 milliseconds
setInterval(() => {
    // Get the current time
    let currentTime = new Date();
    // Extract hours, minutes, and seconds from the current time
    let hour = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    // Determine if it's AM (0) or PM (1) based on the hour
    let amOrPm = hour >= 12 ? 1 : 0;
    // Convert hour to 12-hour format
    hour = hour % 12;
    // If hour is 0 (midnight or noon), set it to 12
    hour = hour ? hour : 12; // the hour '0' should be '12'
    
    // Add leading zero to single-digit hours, minutes, and seconds for uniformity
    hour = hour < 10 ? `0${hour}` : hour;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    
    // Create an array to hold the time components and AM/PM indicator
    let timeArray = [hour, minutes, seconds, amOrPm];
    
    // Select all digit elements in the document
    let digitDivs = Array.from(document.querySelectorAll(".digit"));
    
    // Join the time components into a string, then split into individual characters
    let timeString = timeArray.join("").split("");
    // Loop through each character in the time string
    for (const [i, timePart] of timeString.entries()) {
        // For each digit div, adjust the position of the list items to display the correct digit
        for (const e of digitDivs[i].querySelectorAll("li")) {
            // Move the list item vertically based on its value to show the correct digit
            e.style.top = `-${parseInt(timePart) * 50}px`;
        }
    }
}, 100); // End of the interval function

