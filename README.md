# 🌌 Immersive Cinematic Portfolio

A high-end, futuristic developer portfolio featuring a 3D cinematic overture, interactive glassmorphic UI, and mouse-reactive elements. Built with React 19, Three.js, and GSAP.

![Portfolio Screenshot](https://immersive-portfolio-phi.vercel.app/screenshot.png) 
<img width="1858" height="882" alt="image" src="https://github.com/user-attachments/assets/62b4c3b1-43fc-460b-aa8e-2f39da4e2306" />
<img width="1858" height="882" alt="image" src="https://github.com/user-attachments/assets/73dc75b1-8137-437f-b85b-470b2515d969" />



## ✨ Key Features

-   **🎬 Cinematic Overture**: A 3D cyberpunk room landing scene that transitions seamlessly into the main portfolio via a smooth portal zoom.
-   **🎨 Glassmorphic Design**: Modern, premium aesthetic with vibrant gradients, frosted glass effects, and subtle micro-animations.
-   **📦 3D Tech Stack**: An interactive 3D scene (using React Three Fiber) where skills are represented as floating spheres that react to mouse interaction.
-   **🖱️ Dynamic Interactivity**: 
    -   Custom reactive cursor system.
    -   Mouse-tracking background glow.
    -   Typewriter effect for a personal touch.
    -   Holographic podium and scanning laser effects.
-   **📱 Responsive & Fluid**: Fully optimized for various screen sizes with smooth scroll-reveal animations.

## 🛠️ Built With

-   **React 19** - UI Framework
-   **Three.js / React Three Fiber** - 3D Rendering
-   **GSAP (GreenSock)** - Complex timeline-based animations
-   **Framer Motion** - UI transitions and spring physics
-   **Vite** - Lightning-fast build tool
-   **CSS3** - Custom styling with variable-driven design system

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Shibinpk0/Immersive-Portfolio.git
    cd Immersive-Portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI and 3D components
│   ├── LandingScene.jsx # 3D Introduction
│   ├── TechScene.jsx    # Interactive Skill Balls
│   ├── AnimatedAvatar.jsx# Interactive Character
│   └── PortfolioHome.jsx# Main sections
├── assets/              # Static files (models, images)
├── App.jsx              # Main stage controller
├── index.css            # Global styles and design tokens
└── animations.css       # Keyframes and specialized animations
```

## 📝 Analysis & Architecture

The project follows a **Stage-Based Architecture**. 
1.  **Overture Stage**: Utilizes GSAP and Three.js to create a cinematic first impression without immediate scrolling.
2.  **Portfolio Stage**: Fades in the main dashboard where React handles the UI state and Framer Motion handles the entry/exit animations of components.
   
## 🔗 Links

-   **Live Site**: [https://immersive-portfolio-phi.vercel.app](https://immersive-portfolio-phi.vercel.app)
-   **GitHub Repository**: [https://github.com/Shibinpk0/Immersive-Portfolio](https://github.com/Shibinpk0/Immersive-Portfolio)

---
Designed & Built by **Shibin** 🚀


Performance is optimized through:
-   **Lazy Loading**: The heavy 3D `TechScene` is loaded only when needed.
-   **RAF Mouse Tracking**: Mouse movements are throttled using `requestAnimationFrame` to maintain 60fps.
