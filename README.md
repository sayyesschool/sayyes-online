# SayYes

Project for the SayYes platform.

---

## 📦 Requirements

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (used to run MongoDB locally)
- `.env.local` and `ssl` files (see below)

---

## ⚙️ Environment Setup

### 1. Update the `hosts` file

Add the following lines to your system’s `hosts` file to enable local subdomains:

- **Windows:** `C:\Windows\System32\drivers\etc\hosts`
- **Linux/macOS:** `/etc/hosts`

```
# SayYes Local Domains

127.0.0.1 sayyes.local
127.0.0.1 api.sayyes.local
127.0.0.1 auth.sayyes.local
127.0.0.1 class.sayyes.local
127.0.0.1 club.sayyes.local
127.0.0.1 cms.sayyes.local
127.0.0.1 crm.sayyes.local
127.0.0.1 lk.sayyes.local
127.0.0.1 lms.sayyes.local
```

---

### 2. Request environment files

Ask the administrator or team lead for the following file:

- `.env.local`
- `ssl/local.cert`
- `ssl/local.key`

Do **not** commit this file to version control.

---

### 3. Install dependencies

- `npm install`

### 4. Run MongoDB with Docker

- `docker pull mongo:latest`
- `docker run --name sayyes-mongo -p 27017:27017 -d mongo`

### 5. Seed the database

After MongoDB is running, seed the local database:

- `npm run db-seed:local`

## 🚀 Running the Project

Start the development environment:

- `docker start sayyes-mongo`
- `npm run db-seed:local` (optionally)
- `npm run start:local`
- `npm run build:local`