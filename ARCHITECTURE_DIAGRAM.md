# System Architecture Diagram

## 🔄 Authentication & Error Handling Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  1. User Action (Click Button, Submit Form)                         │
│                          ↓                                            │
│  2. Call API Service (fetch)                                        │
│                          ↓                                            │
│  ┌────────────────────────────────────────┐                         │
│  │ Service Layer                          │                         │
│  │ (login/index.js, register/index.js)    │                         │
│  │                                         │                         │
│  │ - POST request to /api/...             │                         │
│  │ - Include Authorization header         │                         │
│  │ - Handle HTTP errors                   │                         │
│  └────────────────────────────────────────┘                         │
│                          ↓                                            │
│  3. API Response Received                                           │
│                          ↓                                            │
│  ┌────────────────────────────────────────┐                         │
│  │ Error Handler (errorHandler.js)         │                         │
│  │                                         │                         │
│  │ - parseError(response)                  │                         │
│  │ - getErrorMessage()                     │                         │
│  │ - getErrorSeverity()                    │                         │
│  │ - isAuthError()                         │                         │
│  └────────────────────────────────────────┘                         │
│                          ↓                                            │
│  4. Show Toast Notification to User                                 │
│     (Success ✅ or Error ❌)                                         │
│                          ↓                                            │
│  5. Handle Special Cases:                                           │
│     - TOKEN_EXPIRED → Redirect to /login                            │
│     - VALIDATION_ERROR → Show field errors                          │
│     - SERVER_ERROR → Show retry option                              │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
                              ↑
                              │ HTTPS Request
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                         SERVER (Node.js/Next.js)                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  1. Receive API Request                                              │
│                          ↓                                            │
│  ┌────────────────────────────────────────┐                         │
│  │ Middleware: AuthUser                   │                         │
│  │                                         │                         │
│  │ - Extract Authorization header         │                         │
│  │ - Verify JWT token                     │                         │
│  │ - Return structured result              │                         │
│  │                                         │                         │
│  │ Response:                               │                         │
│  │ {                                       │                         │
│  │   success: true/false,                  │                         │
│  │   user: {...} (if success)              │                         │
│  │   error: "ERROR_CODE",                  │                         │
│  │   message: "User-friendly text"         │                         │
│  │ }                                       │                         │
│  └────────────────────────────────────────┘                         │
│                          ↓                                            │
│  2. Check Authentication Result                                      │
│     ├─ success: true → Continue                                     │
│     └─ success: false → Return auth error                           │
│                                                                       │
│  3. Process Request (if authenticated)                              │
│     - Validate data (Joi schema)                                    │
│     - Connect to database                                           │
│     - Execute business logic                                        │
│                          ↓                                            │
│  ┌────────────────────────────────────────┐                         │
│  │ API Response Utility (ApiResponse.js)   │                         │
│  │                                         │                         │
│  │ - ApiResponse.success(data, message)    │                         │
│  │ - ApiResponse.unauthorized(message)     │                         │
│  │ - ApiResponse.validationError(msg)      │                         │
│  │ - ApiResponse.conflict(message)         │                         │
│  │ - ApiResponse.serverError(message)      │                         │
│  │                                         │                         │
│  │ Returns:                                │                         │
│  │ {                                       │                         │
│  │   success: true/false,                  │                         │
│  │   message: "...",                       │                         │
│  │   errorCode: "CODE",                    │                         │
│  │   data: {...}                           │                         │
│  │ }                                       │                         │
│  └────────────────────────────────────────┘                         │
│                          ↓                                            │
│  4. Send Response to Client                                         │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Error Code Hierarchy

```
┌──────────────────────────────────────────┐
│          Error Types by Category         │
├──────────────────────────────────────────┤
│                                          │
│  🔐 AUTHENTICATION ERRORS (4xx)          │
│  ├─ MISSING_TOKEN (401)                  │
│  ├─ INVALID_TOKEN_FORMAT (401)           │
│  ├─ INVALID_TOKEN (401)                  │
│  ├─ TOKEN_EXPIRED (401)                  │
│  ├─ TOKEN_NOT_ACTIVE (401)               │
│  ├─ UNAUTHORIZED (401)                   │
│  └─ FORBIDDEN (403)                      │
│                                          │
│  ✔️ VALIDATION ERRORS (4xx)               │
│  ├─ VALIDATION_ERROR (422)               │
│  └─ CONFLICT (409)                       │
│                                          │
│  🔍 RESOURCE ERRORS (4xx)                │
│  └─ NOT_FOUND (404)                      │
│                                          │
│  ⚠️ SERVER ERRORS (5xx)                   │
│  └─ SERVER_ERROR (500)                   │
│                                          │
└──────────────────────────────────────────┘
```

---

## 🗂️ File Structure

```
src/
├── middleware/
│   └── AuthUser.js ........................ Authentication middleware
│       ├─ Checks Authorization header
│       ├─ Verifies JWT token
│       ├─ Handles JWT errors
│       └─ Returns structured result
│
├── utils/
│   ├── apiResponse.js ..................... API response formatter
│   │   ├─ success()
│   │   ├─ unauthorized()
│   │   ├─ tokenExpired()
│   │   ├─ validationError()
│   │   ├─ conflict()
│   │   ├─ notFound()
│   │   ├─ forbidden()
│   │   └─ serverError()
│   │
│   └── errorHandler.js .................... Client-side error handler
│       ├─ getErrorMessage()
│       ├─ getErrorSeverity()
│       ├─ isAuthError()
│       └─ handleApiError()
│
├── app/api/
│   ├── login/
│   │   └── route.js ....................... Login API endpoint
│   ├── register/
│   │   └── route.js ....................... Register API endpoint
│   ├── cart/
│   │   ├── add-to-cart/
│   │   │   └── route.js (UPDATED EXAMPLE)
│   │   └── all-cart-items/route.js
│   ├── order/
│   │   ├── order-details/route.js
│   │   └── get-all-orders/route.js
│   └── stripe/
│       └── route.js
│
├── services/
│   ├── login/index.js
│   ├── register/index.js
│   └── ... (other services)
│
└── app/
    ├── login/page.js ...................... Login component
    ├── register/page.js ................... Register component
    └── ... (other pages)

Root/
├── ERROR_HANDLING_GUIDE.md ............... Full documentation
├── QUICK_REFERENCE.md ................... Quick examples
├── IMPROVEMENTS_SUMMARY.md .............. Summary of changes
└── BEFORE_AFTER_COMPARISON.md ........... Visual comparison
```

---

## 🔄 Request/Response Cycle Example

### Scenario: Adding Product to Cart

```
1️⃣  CLIENT REQUEST
    ┌─────────────────────────┐
    │ POST /api/cart/add-to-cart
    │
    │ Headers:
    │ - Authorization: Bearer <JWT_TOKEN>
    │
    │ Body:
    │ {
    │   userID: "123",
    │   productID: "456"
    │ }
    └─────────────────────────┘
                │
                ▼
2️⃣  SERVER RECEIVES REQUEST
    ┌─────────────────────────┐
    │ AuthUser middleware runs
    │
    │ ├─ Extract token from header ✓
    │ ├─ Verify JWT token ✓
    │ └─ Return:
    │    {
    │      success: true,
    │      user: { id, email, role, ... }
    │    }
    └─────────────────────────┘
                │
                ▼
3️⃣  PROCESS REQUEST
    ┌─────────────────────────┐
    │ ├─ Validate input ✓
    │ ├─ Check DB for duplicate ✓
    │ ├─ Add to cart ✓
    │ └─ SUCCESS!
    └─────────────────────────┘
                │
                ▼
4️⃣  SERVER RESPONSE
    ┌─────────────────────────┐
    │ Return ApiResponse.success()
    │
    │ {
    │   success: true,
    │   message: "Product added to cart!",
    │   data: { /* product */ }
    │ }
    │ HTTP 201 Created
    └─────────────────────────┘
                │
                ▼
5️⃣  CLIENT RECEIVES RESPONSE
    ┌─────────────────────────┐
    │ Service returns data
    │
    │ Component:
    │ ├─ Check response.success
    │ ├─ Show success toast
    │ └─ Update UI
    └─────────────────────────┘


⚠️  ERROR SCENARIO: Token Expired

1️⃣  CLIENT REQUEST (Same as above)
                │
                ▼
2️⃣  SERVER - AUTHUSER MIDDLEWARE
    ┌─────────────────────────┐
    │ ├─ Extract token ✓
    │ ├─ Verify JWT ✗
    │ └─ Catch error:
    │    error.name === "TokenExpiredError"
    │
    │ Return:
    │ {
    │   success: false,
    │   error: "TOKEN_EXPIRED",
    │   message: "Your session has expired..."
    │ }
    └─────────────────────────┘
                │
                ▼
3️⃣  SERVER RESPONSE
    ┌─────────────────────────┐
    │ Return ApiResponse.tokenExpired()
    │
    │ {
    │   success: false,
    │   message: "Your session has expired...",
    │   errorCode: "TOKEN_EXPIRED"
    │ }
    │ HTTP 401 Unauthorized
    └─────────────────────────┘
                │
                ▼
4️⃣  CLIENT RECEIVES ERROR
    ┌─────────────────────────┐
    │ Service returns error
    │
    │ Component:
    │ ├─ Check response.success (false)
    │ ├─ handleApiError(response)
    │ │  ├─ Get message
    │ │  ├─ Get code: "TOKEN_EXPIRED"
    │ │  └─ isAuthError = true
    │ ├─ Show error toast
    │ └─ Redirect to /login
    └─────────────────────────┘
```

---

## 💡 Key Points

1. **Single Point of Truth**: All middleware logic in one place
2. **Reusable Responses**: ApiResponse utility used across all routes
3. **Client Utilities**: Error handler provides UI-friendly messages
4. **Error Codes**: Specific codes allow targeted handling
5. **Logging**: Emoji indicators help during debugging
6. **Type Safety**: Structured responses prevent mistakes
7. **Documentation**: Multiple guides for different audiences

---

This architecture ensures:
- ✅ Consistent error handling
- ✅ Better user experience
- ✅ Easier debugging
- ✅ Maintainable codebase
- ✅ Professional error messages
