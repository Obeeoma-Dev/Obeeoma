# Obeeoma web

Obeeoma is an AI-powered mental health support platform should be accessible through chat, voice sessions and self-help resources;
It won’t replace professional therapy but rather complement it by offering organizations more access and affordable guidance to stable mental health service for 24 hours around the clock.

# The structure of the application. 
src/
│
├─ pages/
│   ├─ Dashboard/
│   │   └─ Dashboard.js
│   ├─ AdminPanel/
│   │   └─ AdminPanel.js
│   ├─ Login/
│   │   └─ Login.js
│   └─ LandingPage/
│       └─ LandingPage.js
│
├─ components/
│   ├─ Layout/
│   │   └─ Sidebar.js
│   │   └─ Navbar.js
│   └─ Shared/
│       └─ Card.js
│
├─ routes/
│   ├─ PublicRoute.js
│   └─ ProtectedRoute.js
│
├─ services/
│   └─ API.js
│
└─ redux/
    └─ features/
        └─ auth/
            ├─ authSlice.js
            └─ authActions.js

- pages/ → Each main view (Dashboard, AdminPanel, Login, Landing).
- components/ → Shared UI pieces like Navbar, Sidebar, Cards.
- routes/ → Route wrappers for public/protected access.
- services/API.js → Axios instance or API helpers.
- redux/ → Auth logic for storing current user and token