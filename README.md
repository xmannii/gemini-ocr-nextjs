
<p align="center">
  <img src="/assets/banner.png" alt="Open Source OCR App Banner" width="100%" />
</p>

# 🖼️✨ Open Source OCR App

This is an open-source OCR (Optical Character Recognition) application built with Next.js, Vercel AI sdk, Tailwind CSS v4, and shadcn/ui. It allows users to upload an image and extract text from it using Google's Gemini AI. 🚀

## ✨ Features

-   📤 **Image Upload**: Simple interface to upload an image file (JPG, PNG).
-   🔍 **Text Extraction**: Uses Google's `gemini-2.5-flash` model to extract text from the image.
-   📱 **Responsive Design**: Built with Tailwind CSS and shadcn/ui for a modern and responsive user experience.
-   🌙 **Dark Mode**: Includes a dark mode theme.
-   🛠️ **API Route**: Provides an API endpoint for OCR processing.

## 🛠️ Tech Stack

-   [Next.js](https://nextjs.org/) – ⚛️ React framework for building server-rendered applications.
-   [Tailwind CSS v4](https://tailwindcss.com/) – 🎨 A utility-first CSS framework for rapid UI development.
-   [shadcn/ui](https://ui.shadcn.com/) – 🧩 A collection of re-usable components for React.
-   [Google AI SDK](https://ai.google.dev/) – 🤖 Powers the OCR functionality with the Gemini model.
-   [Vercel AI SDK](https://sdk.vercel.ai/docs) – 🔗 Used for seamless AI integration and API handling.

## 🚀 Getting Started

Follow these instructions to get a local copy up and running. 🏃‍♂️

### 📋 Prerequisites

-   🟢 Node.js (v18.x or later)
-   📦 pnpm (or npm/yarn)

### ⚡ Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/xmannii/gemini-ocr-nextjs.git
    cd gemini-ocr-nextjs
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of your project and add your Google AI API key:

    ```env
    GOOGLE_GENERATIVE_AI_API_KEY="YOUR_GOOGLE_AI_API_KEY"
    ```
    🔑 You can obtain a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```

🌐 The application should now be running at [http://localhost:3000](http://localhost:3000).

## 📝 Usage

1.  Open the application in your browser. 🌍
2.  Click the "Upload Image" button and select a JPG or PNG file. 🖼️
3.  The extracted text will be displayed in the text area on the right. 📝

## ⚙️ How It Works

The application sends the uploaded image to a Next.js API route (`/api/ocr`). This backend route processes the image and sends it to the Google Gemini API, which performs the OCR and returns the extracted text. The text is then streamed back to the frontend and displayed to the user. 🔄
