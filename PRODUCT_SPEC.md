# MATSYA SATHI — PRODUCT SPECIFICATION

## Project

Matsya Sathi is a software + hardware system designed for

Goa's near-shore fishermen.

The software has two main users:

1. Fisherman
2. Fisherman's family

The app should be Konkani-first but also support English.

---

# PRIMARY SOFTWARE FEATURES

## Fisherman

1. Fisherman dashboard
2. Today's sea conditions
3. Government scheme eligibility
4. Four-question scheme matching flow
5. Scheme recommendations
6. Required documents
7. Relevant government office
8. Sathi Beacon status
9. Start trip
10. Trip status
11. Last known location
12. SOS emergency
13. Safe return

## Family

1. Family dashboard
2. Connected fisherman/boat
3. Trip status
4. Last known location
5. Last check-in time
6. Connectivity status
7. Battery status
8. Emergency alerts
9. SOS status
10. Safe return notification
11. Trip timeline

---

# IMPORTANT DEMO FLOW

The main demo should demonstrate:

DEPARTURE

→ CHECK-IN

→ SOS

→ EMERGENCY RESPONSE

→ SAFE RETURN

The application should allow these states to be simulated

for demonstration purposes.

---

# DESIGN

The application should look like a real civic-tech product,

not a generic AI-generated dashboard.

Avoid:

- excessive gradients
- glassmorphism
- excessive rounded cards
- neon colors
- unnecessary AI imagery
- unnecessary chatbot
- excessive animations
- "Powered by AI" labels everywhere

Use:

- clean typography
- strong hierarchy
- simple navigation
- large touch targets
- high readability
- professional spacing
- subtle animations
- accessible contrast
- mobile-first design

The target user may have limited technical literacy,

so the interface should be extremely simple.

---

# BRAND

Name: Matsya Sathi

Meaning: Fisherman's companion

Location/context:

Goa

Primary language:

Konkani

Secondary language:

English

---

# DEMO MODE

Create a hidden/demo control mechanism that can simulate:

1. Departure
2. Check-in
3. GSM weak
4. LoRa relay active
5. SOS
6. Safe return
7. Reset demo

The simulation should update the fisherman and family

interfaces consistently.

---

# IMPORTANT

This is a prototype for a college innovation event.

Do NOT pretend that hardware communication is already

fully implemented.

Hardware inputs can initially be simulated.

The frontend should be structured so that the simulated

hardware can later be replaced by real hardware/API data.

# UX PRINCIPLES

Matsya Sathi must be designed for real small-scale fishermen

and their families in coastal Goa.

The user may:

- have limited literacy
- be more comfortable speaking than typing
- have limited experience with smartphones
- use the application outdoors
- have poor network connectivity

Therefore the interface must communicate visually and verbally,

not depend entirely on reading.

---

# VOICE-FIRST ACCESSIBILITY

Voice is a core UX feature, not an optional chatbot.

The application should support:

1. Text-to-speech
2. Voice input
3. "Listen" buttons
4. Spoken navigation guidance
5. Simple voice confirmations

Every important information section should have a visible:

🔊 Listen

button.

The user should be able to hear:

- sea conditions
- scheme information
- eligibility
- required documents
- trip status
- emergency status

The assistant should feel like a helpful local companion,

NOT like a futuristic AI robot.

Do not create a generic ChatGPT-style interface.

---

# SATHI GUIDE

Sathi is the user's digital companion.

Sathi should help the user understand the application.

Examples:

"आज समुद्राची परिस्थिती सुरक्षित आहे."

"तुमच्यासाठी दोन सरकारी योजना उपलब्ध आहेत."

"तुमच्या बोटीचा प्रवास सुरू झाला आहे."

"तुमचा SOS संदेश पाठवला आहे."

Sathi should use short, natural sentences.

Sathi should not overwhelm the user with long text.

---

# LOW-LITERACY MODE

Create a Simple Mode designed for users who may not

read comfortably.

Characteristics:

- very large buttons
- simple icons
- minimal text
- one action per screen
- strong visual states
- voice guidance
- no unnecessary menus
- no typing wherever possible

Use icons together with text rather than text alone.

Examples:

🌊

"आज समुद्र कसा आहे?"

📄

"सरकारी मदत"

👨‍👩‍👧

"माझं कुटुंब"

🚨

"मदत हवी"

---

# NAVIGATION

Primary navigation:

Home

Schemes

Sea

Family

Emergency SOS must always remain easily accessible.

Avoid deep navigation structures.

A user should reach the most important action

within one or two taps.

---

# HOME EXPERIENCE

The Home screen should answer:

1. Am I safe to go to sea today?
2. What government benefits can I get?
3. Is my family able to see me?
4. What should I do in an emergency?

The home screen should not feel like a software dashboard.

It should feel like a personal daily companion.

---

# DESIGN LANGUAGE

The visual identity should be inspired by Goa's coastal environment.

Use:

- deep ocean blue
- sea teal
- warm yellow/sand accent
- off-white
- subtle wave motifs

The design must feel:

- trustworthy
- warm
- local
- calm
- practical
- professional

Avoid:

- neon gradients
- excessive glassmorphism
- futuristic AI imagery
- robot characters
- excessive rounded cards
- excessive shadows
- excessive animations
- generic SaaS dashboard layouts
- unnecessary "AI powered" labels

---

# TYPOGRAPHY

Use highly readable fonts.

Devanagari must be properly supported.

Text must remain readable outdoors.

Important numbers and safety states should be visually dominant.

---

# VISUAL COMMUNICATION

Prefer:

ICON + SHORT TEXT + VOICE

over:

LONG TEXT

Important states should be immediately recognizable.

Examples:

🟢 SAFE

🟡 CAUTION

🔴 EMERGENCY

Do not rely on color alone.

Use icons and text as well.

---

# DEMO PRIORITY

The most important demo experience is:

DEPARTURE

↓

CHECK-IN

↓

TRIP ACTIVE

↓

GSM/CONNECTIVITY CHANGE

↓

SOS

↓

EMERGENCY RESPONSE

↓

SAFE RETURN

The UI should make these state transitions extremely obvious.

The fisherman and family interfaces must reflect

the same simulated state.

---

# PROTOTYPE PRINCIPLE

This is a college innovation prototype.

Prioritize:

- polished UI
- realistic interactions
- believable demo states
- accessibility
- clear storytelling

Hardware communication may initially be simulated.

Do not claim real hardware integration when it is simulated.

The frontend architecture should make it possible

to replace simulated data with real API/hardware data later.