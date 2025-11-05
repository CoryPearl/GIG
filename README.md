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
    git clone <repository_url>
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

Configuration options are currently not explicitly defined. Further information will be available as the project evolves. However, using Google GenAI usually requires an API key. Set this key as an environment variable or directly within the code during initialization. Example setting the API key as an environment variable:

```bash
export GOOGLE_API_KEY=YOUR_API_KEY
```

Then in your code:

```javascript
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
```

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
