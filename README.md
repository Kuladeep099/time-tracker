Name: Malyam Kuladeep Aaradhya

Intern ID: CT06DG3165

Domain: Full Stack Web Development

Duration: 6 Weeks

Mentor: Neela Santhosh Kumar

Description

A lightweight and privacy-friendly Chrome Extension that helps you understand where your time goes online. It automatically tracks how much time you spend on different websites, classifies them as productive or unproductive, and provides a clear weekly productivity report.

Built with a full-stack architecture (Chrome Extension + Node.js + MongoDB), this tool gives you real insights into your browsing habits so you can improve focus and reduce distractions.

✨ Features

⏱️ Automatically tracks time spent on each website

✅ Classifies websites as Productive (e.g., GitHub, LeetCode) or Unproductive (e.g., YouTube, Facebook)

📊 Displays weekly productivity reports in a visual dashboard

🔐 Stores data locally and securely in MongoDB via a Node.js backend

📌 Works entirely in the background — no manual input needed

📂 Project Structure

client/ – Chrome Extension files

manifest.json

background.js – tracks time and sends to backend

dashboard.html / dashboard.js – visual report page

popup.html / popup.js – optional summary UI

assets/icon.png – extension icon

server/ – Backend API with Node.js & Express

index.js – main server logic

models/TimeEntry.js – MongoDB schema

🛠️ Tech Stack

Chrome Extension APIs (Manifest V3)

JavaScript (ES6+)

Node.js + Express

MongoDB + Mongoose

Chart.js (for dashboard graphs)

🚀 Getting Started

Clone the repo

Start MongoDB server

Run backend server (cd server && node index.js)

Load the client folder as an unpacked extension in chrome://extensions

Open websites and view dashboard.html to see your productivity stats!

