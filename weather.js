/*
 * Author: Rico Krenn
 * Created on: Mon Nov 24 2025 11:11:01 AM
 * Description: gets data from OpenWeather and saves them
 * File: weather.js
 * Workspace: 120_node.js
 */

import fs from "fs";
import cron from "node-cron";
const API_KEY = "d9036dc4fe7af4138023b340ca53b248";
const CITY = "Zurich";
const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;
async function getWeather() {
    try {
        const res = await fetch(URL);
        const data = await res.json();
        if (data.cod !== 200) {
            console.error(":x: API Error:", data.message);
            return;
        }
        const record = {
            timestamp: new Date().toISOString(),
            temp: data.main.temp,
            humidity: data.main.humidity
        };
        let existing = [];
        if (fs.existsSync("weather.json")) {
            existing = JSON.parse(fs.readFileSync("weather.json"));
        }
        existing.push(record);
        fs.writeFileSync("weather.json", JSON.stringify(existing, null, 2));
        console.log(":white_tick: Saved:", record);
    } catch (err) {
        console.error(":x: Fetch error:", err);
    }
}
// RUN IMMEDIATELY ON STARTUP
getWeather();
cron.schedule("0 * * * *", () => {
    console.log(":hourglass_flowing_sand: Running hourly weather fetch…");
    getWeather();
});
