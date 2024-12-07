// Helper function to reduce numbers to below 23
function reduceToBelow23(num) {
    while (num >= 23) {
        num = num.toString().split('').reduce((sum, digit) => sum + Number(digit), 0);
    }
    return num;
}

// Function to calculate daily and hourly MVP
function calculateDailyMVP() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const P = reduceToBelow23(day);
    const V = reduceToBelow23(day + month);
    const M = reduceToBelow23(day + month + year);

    const hoursBinary = hours.toString(2).padStart(8, '0');
    const minutesBinary = minutes.toString(2).padStart(8, '0');
    const hoursAscii = String.fromCharCode(hours);
    const minutesAscii = String.fromCharCode(minutes);

    return `
        <p>MVP = ${M} - ${V} - ${P}</p>
        <p>M = ${M}, V = ${V}, P = ${P}</p>
        <p>Hours (Binary): ${hoursBinary}, Minutes (Binary): ${minutesBinary}</p>
        <p>Hours (ASCII): ${hoursAscii}, Minutes (ASCII): ${minutesAscii}</p>
    `;`i think it is important for me first that i ensure iit makes sense 
    so i want it to be like 11pm, 6am, 2pm ...`
}
`how would i like the output 
Date - day/month/year
MVP = X - X - X
Time - XX:XX

at 11pm - 
at 6am - 
at 2pm - 


`

// Function to calculate monthly MVP sequences
function calculateMonthlyMVP(year) {
    let output = '';
    for (let month = 1; month <= 12; month++) {
        const V = reduceToBelow23(month+1);
        const M = reduceToBelow23(month + year);
        const P = reduceToBelow23(month);

        output += `<p>Month ${month}: MVP = ${M} - ${V} - ${P}</p>`;
    }
    return output;
}

// Function to calculate yearly numerology
function calculateYearNumerology(year) {
    const rootNumber = reduceToBelow23(year);
    return `<p>Year ${year}: Root Number = ${rootNumber}</p>`;
}

// Function to get astronomy data
function getAstronomyData() {
    const now = new Date();
    const latitude = 34.0; // Replace with your latitude
    const longitude = 36.0; // Replace with your longitude

    const sunData = SunCalc.getTimes(now, latitude, longitude);
    const moonData = SunCalc.getMoonIllumination(now);

    return `
        <p>Sunrise: ${sunData.sunrise.toLocaleTimeString()}</p>
        <p>Sunset: ${sunData.sunset.toLocaleTimeString()}</p>
        <p>Moon Phase: ${(moonData.phase * 100).toFixed(1)}%</p>
    `;
}

// Display content based on the page
document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const pageType = contentDiv.dataset.page;

    if (pageType === 'daily') {
        contentDiv.innerHTML = calculateDailyMVP();
        const astronomyDiv = document.getElementById('astronomy');
        astronomyDiv.innerHTML = getAstronomyData();
    } else if (pageType === 'monthly') {
        const year = new Date().getFullYear();
        contentDiv.innerHTML = calculateMonthlyMVP(year);
    } else if (pageType === 'yearly') {
        const year = new Date().getFullYear();
        contentDiv.innerHTML = calculateYearNumerology(year);
    }
});
