# GIG

## Project Overview

Project Recommender analyzes your GitHub repositories to understand your coding interests, tech stack, and past project types. Using this data, it generates fresh, creative project ideas tailored to your experience — helping you find your next great build. Whether you’re looking to improve your portfolio, learn new technologies, or take on a challenge, Project Recommender gives you smart, personalized inspiration based on your own code.

## Key Features & Benefits

- Connects directly to your GitHub profile
- Analyzes repositories, languages, and topics
- Uses AI to generate unique project ideas
- Suggests both small practice projects and larger portfolio builds

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

- **Node.js:** A JavaScript runtime environment. Check your Node.js version with `node -v`.
- **npm (Node Package Manager):** Usually comes with Node.js. Check the version with `npm -v`.

This project depends on the following npm packages:

- `@google/genai`
- `glob`
- `node-which`
- `openai`
- `rimraf`

## Installation & Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone <https://github.com/CoryPearl/GIG.git>
    cd GIG
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

## Usage Examples & API Documentation

Due to the lack of project-specific information, general usage examples are provided. To use the Google Gen AI SDK:

1.  **Import the SDK:**

    ```javascript
    const { GoogleGenerativeAI } = require('@google/generative-ai');

    // or if using ES modules:
    // import { GoogleGenerativeAI } from '@google/generative-ai';
    ```

2.  **Initialize the API with your API key:**

    ```javascript
    const genAI = new GoogleGenerativeAI(YOUR_API_KEY); // Replace YOUR_API_KEY with your actual API key
    ```

Refer to the [Google Gen AI JavaScript SDK documentation](https://googleapis.github.io/js-genai/) for detailed information on API usage, models, and parameters.

## Configuration Options

### Environment Variables

This project requires several environment variables to be set. Create a `.env` file in the `server-assets/` directory with the following variables:

#### GitHub OAuth Setup

1. **Create a GitHub OAuth App:**
   - Go to GitHub Settings → Developer settings → OAuth Apps → New OAuth App
   - Fill in the application details:
     - **Application name:** Your app name (e.g., "GIG Project Recommender")
     - **Homepage URL:** `http://localhost:3000` (or your preferred URL)
     - **Authorization callback URL:** `http://YOUR_IP_ADDRESS:3000/callback`
       - Replace `YOUR_IP_ADDRESS` with your local machine's IP address
       - To find your IP address, run `ifconfig` (Mac/Linux) or `ipconfig` (Windows) and look for your IPv4 address
       - **Note:** The callback URL must match exactly what the server uses. The server automatically detects your IP and constructs the callback URL as `http://${YOUR_IP}:3000/callback`
   - Click "Register application"

2. **Get your GitHub OAuth credentials:**
   - After creating the OAuth app, you'll receive a **Client ID** and **Client Secret**
   - Copy these values - you'll need them for your `.env` file

3. **Required GitHub Environment Variables:**
   ```bash
   GITHUB_CLIENT_ID=your_github_client_id_here
   GITHUB_CLIENT_SECRET=your_github_client_secret_here
   SESSION_SECRET=your_random_session_secret_here
   ```
   - `GITHUB_CLIENT_ID`: The Client ID from your GitHub OAuth App
   - `GITHUB_CLIENT_SECRET`: The Client Secret from your GitHub OAuth App
   - `SESSION_SECRET`: A random string used to encrypt sessions (can be any secure random string)

#### Google Gemini API Setup

You'll also need a Google Gemini API key:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

**Example `.env` file structure:**

Create `server-assets/.env` with:
```
GITHUB_CLIENT_ID=abc123def456ghi789
GITHUB_CLIENT_SECRET=xyz789uvw456rst123
SESSION_SECRET=my-super-secret-session-key-12345
GEMINI_API_KEY=your-gemini-api-key-here
```

**Important Notes:**
- Never commit your `.env` file to version control
- The callback URL in your GitHub OAuth app must match: `http://YOUR_IP_ADDRESS:3000/callback`
- If your IP address changes, you'll need to update the callback URL in your GitHub OAuth app settings
- The server runs on port 3000 by default and will display your detected IP address in the console when it starts

## Contributing Guidelines

Contributions are welcome! To contribute to this project, please follow these steps:

1.  **Fork the repository.**
2.  **Create a new branch for your feature or bug fix:** `git checkout -b feature/your-feature-name`
3.  **Make your changes and commit them:** `git commit -am 'Add some feature'`
4.  **Push to the branch:** `git push origin feature/your-feature-name`
5.  **Create a new Pull Request.**

## License Information

License information is currently not specified.

## Acknowledgments

This project utilizes the `@google/genai` package, which is gratefully acknowledged.
