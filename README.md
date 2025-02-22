# Next.js Application

## Overview
This project is a **Next.js** application built with **React, Redux, WebSocket, Yjs, Material-UI (MUI), and Bootstrap**.
It supports **real-time collaboration, server-side rendering (SSR), static site generation (SSG), and API routes**, making it highly optimized for performance.

## Tech Stack
| Technology      | Version   |
|---------------|-----------|
| **Node.js**   | 20.17.0|
| **npm**       | 9.7.2 |
| **Next.js**   | 14.2.21 |
| **React**     | 18.3.1|
| **Redux**     | 5.x |
| **WebSocket** | Latest |
| **Yjs**       | Latest |
| **MUI**       | 5.x |
| **Bootstrap** | 5.x |

## Features
- 🚀 **Built with Next.js** for fast performance
- 🎨 **Material-UI (MUI) & Bootstrap** for a responsive and modern UI
- 🔄 **Redux for state management**
- 🔗 **WebSocket integration** for real-time communication
- 📝 **Yjs for collaborative editing**
- 🌐 **API routes** for backend functionalities
- ⚡ **Server-side rendering (SSR) and static site generation (SSG)**
- 🔒 **Environment variable support**

## Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
```sh
Create a .env.local file in the root directory and add the necessary environment variables:


### 4️⃣ Run the Application
```sh
npm run dev
```

# Next.js Deployment Guide

## 🚀 Deploying Next.js Without Vercel (Linux & Windows)

This guide explains how to deploy a **Next.js** application on **Linux** and **Windows** using **Node.js** without Vercel.

---

## 📦 Installation

### **1️⃣ Install Dependencies**
Ensure you have **Node.js** installed. Then, run:

```sh
npm install
```

### **2️⃣ Build the Application**
Run:

```sh
npm run build
```

This will generate an optimized `.next` directory.

### **3️⃣ Start the Server**
Run:

```sh
npm run start
```

By default, Next.js will run on **http://localhost:3000**.

---

## 🖥 Deploying on Linux Server

### **1️⃣ Install PM2 (Process Manager)**
PM2 helps keep your app running even after closing the terminal.

```sh
npm install -g pm2
```

### **2️⃣ Start Next.js with PM2**
```sh
npm run build
npm install -g pm2
pm2 start npm --name "next-app" -- start
```

### **3️⃣ Make PM2 Start on Reboot**
```sh
pm2 save
pm2 startup
```

---

## 🖥 Deploying on Windows

1. Open **PowerShell as Administrator**.
2. Navigate to your project folder:
   ```sh
   cd C:\path\to\your\project
   ```
3. Start the Next.js app:
   ```sh
   npm run start
   ```

---

## 🌍 Accessing Your App Remotely

- If deploying on a server, allow traffic on port 3000:
  ```sh
  sudo ufw allow 3000/tcp
  ```
- Use **nginx or Apache** as a reverse proxy to serve it on a custom domain.

Need help setting up **nginx** or **Apache**? Let us know! 🚀

This README now includes:
✅ **Node.js, npm, and Next.js versions**
✅ **Installation steps**
✅ **Redux, WebSocket, Yjs setup**
✅ **Deployment guide**

Let me know if you need any updates! 🚀

