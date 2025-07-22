graph TD
    subgraph "User Registration"
        A1["Start"] --> A2{"Navigate to /register"};
        A2 --> A3["User enters name, mobile, PIN"];
        A3 --> A4{"Client-side validation"};
        A4 -- "Invalid" --> A5["Show error message"];
        A4 -- "Valid" --> A6["POST to api/auth/register"];
        subgraph "Backend"
            A7{"Validate data & check if mobile exists"};
            A7 -- "Invalid" --> A8["Return error"];
            A7 -- "Valid" --> A9["Hash PIN & save user"];
            A9 --> A10["Return success"];
        end
        A6 --> A7;
        A10 --> A11{"Redirect to /auth/signin"};
        A11 --> A12["End"];
    end

    subgraph "User Login"
        B1["Start"] --> B2{"Navigate to /auth/signin"};
        B2 --> B3["User enters mobile & PIN"];
        B3 --> B4["POST to api/auth/login"];
        subgraph "Backend "
            B5{"Find user & verify PIN"};
            B5 -- "Invalid" --> B6["Return error"];
            B5 -- "Valid" --> B7["Generate JWT token"];
            B7 --> B8["Return token"];
        end
        B4 --> B5;
        B8 --> B9["Client stores token in localStorage"];
        B9 --> B10{"Redirect to / (Home)"};
        B10 --> B11["End"];
    end

    subgraph "Profile Management"
        C1["Start"] --> C2{"User clicks Profile icon"};
        C2 --> C3{"Is token in localStorage?"};
        C3 -- "No" --> C4["Redirect to /auth/signin"];
        C3 -- "Yes" --> C5["Navigate to /profile"];
        C5 --> C6["Fetch user from api/auth/me with token"];
        subgraph "Backend  "
            C7{"Verify JWT"};
            C7 -- "Invalid" --> C8["Return 401 Error"];
            C7 -- "Valid" --> C9["Return user data"];
        end
        C6 --> C7;
        C8 --> C10["Client clears token & redirects to /auth/signin"];
        C9 --> C11["Display user profile data"];
        C11 --> C12["End"];
        C10 --> C12;
    end

    subgraph "Scheme Filtering"
        D1["Start"] --> D2{"User changes filters on Schemes page"};
        D2 --> D3["Update filters state"];
        D3 --> D4["POST to api/schemes/filter with criteria"];
        subgraph "Backend   "
            D5{"Query database for schemes matching filters"};
            D5 --> D6["Return JSON of matching schemes"];
        end
        D4 --> D5;
        D6 --> D7["Update UI with filtered schemes"];
        D7 --> D8["End"];
    end

    subgraph "User Logout"
        E1["Start"] --> E2{"User clicks Logout"};
        E2 --> E3["Remove token from localStorage"];
        E3 --> E4{"Redirect to /auth/signin"};
        E4 --> E5["End"];
    end 