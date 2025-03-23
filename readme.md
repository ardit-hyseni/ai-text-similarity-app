

# AI Text Similarity App

Welcome to the **AI Text Similarity App**! This repository is structured as a monorepo containing several packages that work together to deliver a full-featured text similarity application. The main packages include:

- **node-backend**: Server-side application handling API requests and business logic.
- **frontend**: Client-side application providing the user interface.
- **ai-service**: AI service responsible for handling text similarity computation and related tasks.

## Prerequisites

Before you begin, ensure you have the following tools installed on your machine:

- [Docker](https://docs.docker.com/)

## Setup & Installation

Follow the steps below to get all parts of the project up and running.

### 1. Clone the Repository

Clone the repository to your local machine:
```bash
git clone https://github.com/ardit-hyseni/ai-text-similarity-app.git .
```

Then run in a Bash terminal within the monorepo
```bash
docker build -t ai-text-similarity .
```

then, when done:
```bash
docker compose up -d
```

Attach a new VSCode Window to the remote container

### 2. Install Dependencies for Each Package

This repository is organized as a monorepo with three main packages. You will need to install dependencies for each one separately.


#### A. Python Backend

Create a Virtual Environment:

```bash
python3 -m venv /app/venv
```
Activate the Virtual Environment:

```bash
source /app/venv/bin/activate
```

Install Dependencies:

With the virtual environment activated, install your requirements:

bash
``pip install -r requirements.txt``

To run: 

```bash
python main.py
```

Wait for it to say ``Application startup complete``.

#### B. node-backend

1. **Navigate to the node-backend directory:**
   ```bash
   cd packages/node-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the Environment:**
   - Create a `.env` file (if required) by copying the example:
     ```bash
     cp .env.example .env
     ```
   - Adjust environment variables as needed.

4. **Start the server:**
   ```bash
   npm run dev
   ```

#### C. frontend

1. **Navigate to the frontend directory:**
   ```bash
   cd packages/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   or, if you prefer yarn:
   ```bash
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app should now be available at [http://localhost:3000](http://localhost:3000) (or per your configuration).


### 3. Running the Complete Application

After setting up each package, start each service in its own terminal window or use a process manager (such as [concurrently](https://www.npmjs.com/package/concurrently)) to run them side by side. A suggested order to start the services:

1. **Start the ai-service** (ensure it’s running before the backend if it’s a dependency).
2. **Start the node-backend.**
3. **Start the frontend.**

## Additional Tips

- **Custom Scripts:** Check each package's `package.json` for custom npm scripts.
- **Environment Customization:** Update your `.env` files as needed for your specific configuration.
- **Troubleshooting:** Refer to the documentation within each package directory for further assistance and common troubleshooting steps.
