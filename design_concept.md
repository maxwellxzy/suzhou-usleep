# Design Concept: Suzhou Gusu Usleep Medical Center

## Brand Identity
- **Name**: Suzhou Gusu Usleep Medical Center (苏州姑苏优眠医学中心)
- **Core Value**: Professional, Scientific, Holistic (Physical + Mental), Trustworthy.
- **Visual Theme**: "Scientific Serenity" (科学宁静)
    - **Keywords**: Clean, Breathable, Precision, Warmth.
    - **Palette**: 
        - Primary: **Deep Ocean Blue** (Trust, Medical, Sleep depth)
        - Secondary: **Soft Lavender/Lilac** (Calming, Psychological relief)
        - Accent: **Clinical White** (#FFFFFF) and **Light Gray** (#F8F9FA) for backgrounds.
        - Text: **Dark Slate** (Not pure black, for softness).
    - **Typography**:
        - Headings: A modern Serif (e.g., *Playfair Display* or *Noto Serif SC*) to denote authority and expertise.
        - Body: Clean Sans-serif (e.g., *Inter* or *Noto Sans SC*) for high readability.

## Structure & Layout
1.  **Header**: 
    -   Logo (Left)
    -   Nav: Home, Experts, Technology, Services, About Us, Contact.
    -   CTA: "Book Consultation" (Right, Pill shape).

2.  **Hero Section**:
    -   *Visual*: A calm, high-quality full-width image (possibly a composite of the "Environment" images or a generic abstract "Sleep" canvas background).
    -   *Canvas Effect*: Subtle "Brainwave" or "Particle flow" animation in the background using Canvas API to represent "Neural Modulation" (Core tech).
    -   *Content*: "Build a healthy and wise spiritual world" (构建健康智慧的精神世界).

3.  **Core Advantages (3 Columns)**:
    -   Advanced Technology (Icon: Brain/Chip)
    -   Top Experts (Icon: Doctor)
    -   Comprehensive Service (Icon: Hands/Heart)

4.  **Expert Showcase (Carousel/Grid)**:
    -   Clean cards with Doctor photos (from docs).
    -   Name, Title, and "Good at..." tags.
    -   Hover effect: Slight lift + "View Profile" button.

5.  **Technology Spotlight**:
    -   Alternating layout (Image Left, Text Right / Image Right, Text Left).
    -   Showcase SAINT, TMS, fNIRS with the high-res images provided.
    -   "Scientific, Evidence-based" vibe.

6.  **Services (Tabs/Grid)**:
    -   Sleep Disorders, Anxiety/Depression, Adolescent, etc.
    -   Icon-heavy or Photo-heavy cards.

7.  **Footer**:
    -   Address, Contact, Links.
    -   Clean, dark background.

## Technical Strategy
- **Framework**: React + Vite.
- **Styling**: Vanilla CSS (Variables + Flexbox/Grid) for maximum control and "Clean" code. *Note: Will confirm Tailwind preference.*
- **Animation**: CSS Transitions for hover states. Canvas API for Hero background.
- **Assets**: Map hashed filenames from `full.md` to semantic names (e.g., `doctor_wu.jpg`, `device_tms.jpg`) during implementation.

## Brainstorming Q&A (Internal)
- *Constraint*: Frontend only.
- *Solution*: Use a JSON file or hardcoded array for data (Doctors, Services) to simulate dynamic content.
