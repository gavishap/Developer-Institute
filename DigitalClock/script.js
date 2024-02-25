// Set an interval to update the clock every 100 milliseconds
setInterval(() => {
    // Get the current time
    let currentTime = new Date();
    // Extract hours, minutes, and seconds from the current time
    let hour = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    // Determine if it's AM (0) or PM (1) based on the hour
    let amOrPm = (hour >= 12) ? 1 : 0;
    // Convert hour to 12-hour format
    hour = hour % 12;
    // If hour is 0 (midnight or noon), set it to 12
    hour = (hour)? hour : 12; // the hour '0' should be '12'
    
    // Add leading zero to single-digit hours, minutes, and seconds for uniformity
    hour = (hour < 10) ? `0${hour}` : hour;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;
    
    // Create an array to hold the time components and AM/PM indicator
    let timeArray = [hour, minutes, seconds, amOrPm];
    
    // First, we need to find all the elements that represent digits on the clock.
    // We do this by looking for all elements with the class name 'digit'.
    const digitElements = document.getElementsByClassName("digit");
    
    // Next, we need to prepare the time in a way that we can work with it easily.
    // We'll turn the time into a string without any separators (like ':') and then split it into individual characters.
    const timeCharacters = timeArray.join("").split("");
    
    // Now, we're going to go through each character of our time.
    for (let i = 0; i < timeCharacters.length; i++) {
        // Each character represents a part of the time (hour, minute, second, or AM/PM indicator).
        const timeCharacter = timeCharacters[i];
        
        // We need to find the corresponding digit element for this character.
        const digitElement = digitElements[i];
        
        // Inside each digit element, there are list items ('li') for each possible digit (0-9).
        // We need to move these list items to show the correct digit.
        const listItems = digitElement.getElementsByTagName("li");
        
        // We go through each list item and move it based on the current time character.
        for (let j = 0; j < listItems.length; j++) {
            const listItem = listItems[j];
            // We calculate the position by multiplying the character (converted to a number) by 50.
            // This moves the list item to show the correct digit.
            listItem.style.top = `-${parseInt(timeCharacter) * 50}px`;
        }
    }
}, 100); // End of the interval function

