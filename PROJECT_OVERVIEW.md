# Project Overview

This document provides a high-level overview of the main flows in the project, including textual explanations and diagrams for each major feature. You can view the diagrams as Mermaid code blocks below, or export them as images using the [Mermaid Live Editor](https://mermaid.live/).

---

## 1. User Registration

**Flow Explanation:**
- User navigates to the registration page and enters their details.
- Client validates the input.
- If valid, sends a registration request to the backend.
- Backend checks for existing user, hashes the PIN, and saves the user.
- On success, user is redirected to the sign-in page.

**Diagram:**
```mermaid
graph TD
    A1["Start"] --> A2{"Navigate to /register"}
    A2 --> A3["User enters name, mobile, PIN"]
    A3 --> A4{"Client-side validation"}
    A4 -- "Invalid" --> A5["Show error message"]
    A4 -- "Valid" --> A6["POST to api/auth/register"]
    subgraph "Backend"
        A7{"Validate data & check if mobile exists"}
        A7 -- "Invalid" --> A8["Return error"]
        A7 -- "Valid" --> A9["Hash PIN & save user"]
        A9 --> A10["Return success"]
    end
    A6 --> A7
    A10 --> A11{"Redirect to /auth/signin"}
    A11 --> A12["End"]
```

**Image Placeholder:**
> ![Registration Flow Diagram](images/registration_flow.png)
> *(Export the above Mermaid diagram as an image if needed)*

---

## 2. User Login

**Flow Explanation:**
- User navigates to the sign-in page and enters their credentials.
- Client sends a login request to the backend.
- Backend verifies the user and PIN, generates a JWT token, and returns it.
- Client stores the token and redirects to the home page.

**Diagram:**
```mermaid
graph TD
    B1["Start"] --> B2{"Navigate to /auth/signin"}
    B2 --> B3["User enters mobile & PIN"]
    B3 --> B4["POST to api/auth/login"]
    subgraph "Backend "
        B5{"Find user & verify PIN"}
        B5 -- "Invalid" --> B6["Return error"]
        B5 -- "Valid" --> B7["Generate JWT token"]
        B7 --> B8["Return token"]
    end
    B4 --> B5
    B8 --> B9["Client stores token in localStorage"]
    B9 --> B10{"Redirect to / (Home)"}
    B10 --> B11["End"]
```

**Image Placeholder:**
> ![Login Flow Diagram](images/login_flow.png)
> *(Export the above Mermaid diagram as an image if needed)*

---

## 3. Profile Management

**Flow Explanation:**
- User clicks the profile icon.
- If a token is present, navigates to the profile page.
- Profile page fetches user info using the token.
- If the token is invalid, user is redirected to sign-in and the token is cleared.
- If valid, user profile data is displayed.

**Diagram:**
```mermaid
graph TD
    C1["Start"] --> C2{"User clicks Profile icon"}
    C2 --> C3{"Is token in localStorage?"}
    C3 -- "No" --> C4["Redirect to /auth/signin"]
    C3 -- "Yes" --> C5["Navigate to /profile"]
    C5 --> C6["Fetch user from api/auth/me with token"]
    subgraph "Backend  "
        C7{"Verify JWT"}
        C7 -- "Invalid" --> C8["Return 401 Error"]
        C7 -- "Valid" --> C9["Return user data"]
    end
    C6 --> C7
    C8 --> C10["Client clears token & redirects to /auth/signin"]
    C9 --> C11["Display user profile data"]
    C11 --> C12["End"]
    C10 --> C12
```

**Image Placeholder:**
> ![Profile Management Diagram](images/profile_management.png)
> *(Export the above Mermaid diagram as an image if needed)*

---

## 4. Scheme Filtering

**Flow Explanation:**
- User changes filters on the schemes page.
- Client updates the filter state and sends a request to the backend.
- Backend queries the database for matching schemes and returns them.
- UI updates with the filtered schemes.

**Diagram:**
```mermaid
graph TD
    D1["Start"] --> D2{"User changes filters on Schemes page"}
    D2 --> D3["Update filters state"]
    D3 --> D4["POST to api/schemes/filter with criteria"]
    subgraph "Backend   "
        D5{"Query database for schemes matching filters"}
        D5 --> D6["Return JSON of matching schemes"]
    end
    D4 --> D5
    D6 --> D7["Update UI with filtered schemes"]
    D7 --> D8["End"]
```

**Image Placeholder:**
> ![Scheme Filtering Diagram](images/scheme_filtering.png)
> *(Export the above Mermaid diagram as an image if needed)*

---

## 5. User Logout

**Flow Explanation:**
- User clicks the logout button.
- Client removes the token from localStorage and notifies other components.
- User is redirected to the sign-in page.

**Diagram:**
```mermaid
graph TD
    E1["Start"] --> E2{"User clicks Logout"}
    E2 --> E3["Remove token from localStorage"]
    E3 --> E4{"Redirect to /auth/signin"}
    E4 --> E5["End"]
```

**Image Placeholder:**
> ![Logout Flow Diagram](images/logout_flow.png)
> *(Export the above Mermaid diagram as an image if needed)*

---

*To export diagrams as images, copy the Mermaid code block into [Mermaid Live Editor](https://mermaid.live/) and use the export function.* 