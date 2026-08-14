<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:1A1A2E,50:6D28D9,100:C9A227&height=200&section=header&text=BookACine&fontSize=60&fontColor=FFFFFF&animation=fadeIn&fontAlignY=35&desc=Movie%20Booking%20Website&descAlignY=58&descSize=20&descColor=E5C158" width="100%"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React.js-1A1A2E?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Spring%20Boot-1A1A2E?style=for-the-badge&logo=springboot&logoColor=6DB33F"/>
  <img src="https://img.shields.io/badge/Java-1A1A2E?style=for-the-badge&logo=openjdk&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-1A1A2E?style=for-the-badge&logo=mysql&logoColor=4479A1"/>
  <img src="https://img.shields.io/badge/REST%20API-1A1A2E?style=for-the-badge&logoColor=C9A227"/>
</p>

<p align="center">
  <b>A full-stack movie ticket booking platform</b> — browse listings, pick a showtime, select seats, and book in real time.
</p>

---

### 🎬 About

BookACine is a web-based movie booking system built to manage movie listings, user accounts, and end-to-end ticket booking operations. It was designed with real-world usability in mind — real-time seat availability, secure transactions, and a smooth booking flow from search to confirmation.

**Timeline:** February 2025 – May 2025

---

### ✨ Features

- 🔍 **Movie search & listings** — browse currently showing movies
- 🕒 **Showtime selection** — pick from available slots per movie
- 💺 **Real-time seat selection** — live seat availability and booking updates
- 🔐 **User authentication** — secure sign-up and login
- 🎟️ **Booking history tracking** — view past and upcoming bookings
- ⚡ **RESTful integration** — frontend and backend fully connected via REST APIs for real-time data sync

---

### 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Bootstrap |
| **Backend** | Java, Spring Boot |
| **Database** | MySQL |
| **API Layer** | REST API |
| **Testing** | Postman |

---

### 🏗️ Architecture

```
┌─────────────────┐         REST API          ┌──────────────────┐
│  React.js + BS   │ ───────────────────────▶  │  Spring Boot     │
│  (Frontend)       │ ◀─────────────────────── │  (Backend)        │
└─────────────────┘        JSON / HTTP          └──────────────────┘
                                                          │
                                                          ▼
                                                   ┌──────────────┐
                                                   │    MySQL      │
                                                   │  (Database)   │
                                                   └──────────────┘
```

- **Frontend** — responsive React.js UI styled with Bootstrap for a seamless experience across devices
- **Backend** — Spring Boot services handling booking workflows, CRUD operations, and business logic
- **Database** — MySQL for managing users, movies, showtimes, and transactions

---

### 🚀 Getting Started

#### Prerequisites
- Java 17+ and Maven
- Node.js and npm
- MySQL Server

#### Backend Setup
```bash
git clone https://github.com/soumodipadhikary574-eng/bookacine.git
cd bookacine/backend

# Configure your MySQL credentials in application.properties
mvn spring-boot:run
```

#### Frontend Setup
```bash
cd bookacine/frontend
npm install
npm start
```

The app will be available at `http://localhost:3000` with the backend running on `http://localhost:8080`.

---

### 📌 Key Highlights

- Focused on **system scalability, performance optimization, and secure transaction handling** for real-world usability
- Backend built with **CRUD-driven REST APIs** to handle booking workflows cleanly
- Frontend and backend **fully integrated** for real-time movie availability, seat selection, and booking updates

---

### 👤 Author

**Soumodip Adhikary**

<p align="left">
  <a href="https://www.linkedin.com/in/soumodip-adhikary" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-1A1A2E?style=for-the-badge&logo=linkedin&logoColor=C9A227"/></a>
  <a href="mailto:soumodipadhikary574@gmail.com"><img src="https://img.shields.io/badge/-Email-1A1A2E?style=for-the-badge&logo=gmail&logoColor=C9A227"/></a>
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:C9A227,50:6D28D9,100:1A1A2E&height=100&section=footer"/>
</p>
