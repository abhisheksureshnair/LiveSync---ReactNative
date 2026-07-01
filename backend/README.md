# LiveSync Backend

JavaScript/Node.js API backend for the LiveSync React Native app.

## Run

```sh
cd backend
npm install
npm run dev
```

The API starts on `http://localhost:8000` by default.

For Android Emulator, configure the app API URL as:

```js
http://10.0.2.2:8000
```

For iOS Simulator, use:

```js
http://localhost:8000
```

## Demo Login

```json
{
  "phoneNumber": "1234567890",
  "otp": "1234"
}
```

## Main Endpoints

- `GET /health`
- `POST /api/auth/request-otp`
- `POST /api/auth/verify-otp`
- `POST /api/update/check`
- `GET /api/profile`
- `GET /api/children`
- `GET /api/children/:childId/location`
- `GET /api/children/:childId/history`
- `GET /api/children/:childId/reports/weekly`
- `GET /api/children/:childId/controls`
- `PATCH /api/children/:childId/controls`
- `GET /api/children/:childId/geofences`
- `POST /api/children/:childId/geofences`
- `DELETE /api/children/:childId/geofences/:geofenceId`
- `GET /api/notifications`
- `PATCH /api/notifications/:notificationId/read`
- `DELETE /api/notifications`
- `POST /api/assistant/message`

Most app routes require:

```http
Authorization: Bearer <token-from-verify-otp>
```
