export const caseStudies = {
  axiom: {
    title: "Axiom",
    tagline: "Personal macOS study infrastructure · Data engineering · Offline analytics",
    banner: "/assets/projects/Dashboard.webp",
    github: "https://github.com/Krriixh/Axiom",
    content: `
## Overview

As a developer constantly context-switching between different domains of knowledge, I needed a way to log and analyze my deep-work sessions without breaking my flow. Existing tools were either heavily gated behind cloud subscriptions or completely divorced from a local-first workflow. 

**Axiom** is a private, native macOS application I engineered to solve this fragmented study tracking. Built entirely as custom internal tooling, it allows me to define a hierarchical curriculum, log deep-work sessions directly from the system tray, and visualize my progress through zero-latency, offline-first analytics.

## Architecture & Data Engineering

\`\`\`mermaid
flowchart TD
    UI[React / Tailwind UI] -->|Tauri IPC| Rust(Rust Backend)
    Rust -->|Zero Latency| Local[(Local SQLite)]
    Local -->|Event Sync Queue| Cloud(Supabase LWW Sync)
    Cloud -->|PostgreSQL| Remote[(Remote DB)]
\`\`\`

### 1. Offline-First SQLite Foundation
To ensure zero-latency reads and absolute data ownership, Axiom's primary source of truth is a local SQLite database running via Tauri's Rust backend. This design eliminates the dreaded "loading spinner" common in cloud-first apps.
- **Hierarchical Schemas**: Curriculums are modeled as recursive trees (Subjects $\rightarrow$ Topics $\rightarrow$ Sub-topics), allowing infinite nesting.
- **Performant Aggregations**: The local SQLite engine runs complex window functions and date-math queries locally to compute daily heatmaps and session durations in under 5ms.

### 2. Cloud Sync Strategy (Supabase)
While the app operates 100% offline, I implemented a robust synchronization layer using Supabase.
- **Event Sourcing**: Local mutations are appended to a sync queue.
- **Conflict Resolution**: Last-write-wins (LWW) timestamp comparisons ensure the remote PostgreSQL database stays eventually consistent with the local state.

### 3. Native macOS Integration
Using Tauri instead of Electron drastically reduced the app's memory footprint (running at ~40MB RAM). The app embeds itself directly into the macOS system tray, allowing me to start and stop focus timers without ever minimizing my IDE.

## Impact & Takeaways
Axiom has completely overhauled my self-directed learning. By treating my own time as a data-engineering problem, I was able to build an infrastructure that has currently tracked hundreds of hours of deep work with zero data loss. It taught me the sheer power of local-first software and complex SQL modeling for hierarchical data.
    `
  },
  blackwood: {
    title: "Blackwood",
    tagline: "Native desktop guitar companion · Web Audio API · Stage-based curriculum",
    banner: "/assets/projects/Blackwood Dashboard.webp",
    github: "https://github.com/Krriixh/blackwood",
    content: `
## Overview

Learning a musical instrument as a self-taught adult requires immense structure. **Blackwood** is a personal, native desktop training suite I built to drive my own guitar progression from foundational chords to advanced mastery. Engineered exclusively for my own workflow, it acts as a digital instructor—complete with real-time mic-input chromatic tuning, ear training, and detailed practice analytics.

## Technical Implementation

\`\`\`mermaid
flowchart LR
    Mic[Microphone Input] -->|Web Audio API| Node(AudioWorkletNode)
    Node -->|YIN Algorithm| Pitch{Pitch Detection DSP}
    Pitch -->|Frequency| UI[React UI Tuner]
    Pitch -->|Analytics| DB[(Local Storage)]
\`\`\`

### 1. Web Audio API & DSP
The core of Blackwood is its real-time audio processing pipeline.
- **Chromatic Tuner**: I utilized the Web Audio API to stream microphone input, passing raw audio buffers through an implementation of the YIN pitch detection algorithm. This provides highly accurate, real-time frequency estimation, mapped to standard guitar tuning frequencies.
- **Latency Optimization**: By keeping the audio processing loop within a tightly optimized \`requestAnimationFrame\` and utilizing \`AudioWorklet\`, the tuner achieves near-instantaneous visual feedback.

### 2. Algorithmic Ear Training
I engineered a procedural ear training module that generates randomized intervals and chord progressions using synthesized web audio oscillators. It tracks my accuracy over time, algorithmically increasing the difficulty by introducing inversions or complex jazz voicings once a certain success threshold is met.

### 3. Desktop Architecture
Like Axiom, Blackwood is packaged using Tauri to ensure it runs seamlessly alongside my browser and DAW without eating up CPU cycles. The UI is built with React and TailwindCSS, utilizing heavy glassmorphism to create an immersive, stage-like environment.

## Impact
Blackwood is currently my daily driver for instrument practice. By digitizing the curriculum and turning pitch detection into a programmatic challenge, I bridged my passion for software engineering with my goal of musical mastery.
    `
  }
};
