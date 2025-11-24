/*
 * Author: Rico Krenn
 * Created on: Mon Nov 24 2025 11:11:08 AM
 * Description: calculates average
 * File: weather-stats.js
 * Workspace: 120_node.js
 */

import fs from "fs";
function calculateStats() {
    if (!fs.existsSync("weather.json")) {
        console.log(":x: No weather.json file found.");
        return;
    }
    const data = JSON.parse(fs.readFileSync("weather.json"));
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yDate = yesterday.toISOString().split("T")[0];
    // Filter entries from yesterday
    const entries = data.filter(e => e.timestamp.startsWith(yDate));
    if (entries.length === 0) {
        console.log(`:warning: No data found for ${yDate}.`);
        return;
    }
    // Calculate averages
    const avgTemp = entries.reduce((s, e) => s + e.temp, 0) / entries.length;
    const avgHumidity =
        entries.reduce((s, e) => s + e.humidity, 0) / entries.length;
    console.log(`:bar_chart: Weather statistics for ${yDate}`);
    console.log(`→ Average Temperature: ${avgTemp.toFixed(2)} °C`);
    console.log(`→ Average Humidity: ${avgHumidity.toFixed(2)} %`);
}
calculateStats();
