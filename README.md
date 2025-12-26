# Kashif Hisaab Kitaab Backend API

Complete MERN backend for the Finance Dashboard.

## Setup Instructions

1. **Install Dependencies**
```bash
cd backend
npm install
```

2. **Environment Variables**
Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kashif-hisab-kitab
NODE_ENV=development
```

3. **Start MongoDB**
Ensure MongoDB is running on your system.

4. **Run the Server**
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Server status

### Saudi Hisaab Kitaab
- `GET /api/saudi` - Get all Saudi entries
- `GET /api/saudi/:id` - Get single Saudi entry
- `POST /api/saudi` - Create new Saudi entry
- `PUT /api/saudi/:id` - Update Saudi entry
- `DELETE /api/saudi/:id` - Delete Saudi entry

### Special Hisaab Kitaab
- `GET /api/special` - Get all Special entries
- `GET /api/special/:id` - Get single Special entry
- `POST /api/special` - Create new Special entry
- `PUT /api/special/:id` - Update Special entry
- `DELETE /api/special/:id` - Delete Special entry

### Pakistani Hisaab Kitaab (Traders)
- `GET /api/traders` - Get all traders with banks and balances
- `GET /api/traders/:id` - Get single trader with banks
- `POST /api/traders` - Create new trader
- `PUT /api/traders/:id` - Update trader
- `DELETE /api/traders/:id` - Delete trader

### Banks
- `GET /api/traders/:traderId/banks` - Get all banks for a trader
- `GET /api/traders/:traderId/banks/:bankId` - Get single bank with entries
- `POST /api/traders/:traderId/banks` - Create new bank
- `PUT /api/traders/:traderId/banks/:bankId` - Update bank
- `DELETE /api/traders/:traderId/banks/:bankId` - Delete bank

### Bank Ledger
- `GET /api/traders/:traderId/banks/:bankId/ledger` - Get all ledger entries with running balance
- `GET /api/traders/:traderId/banks/:bankId/ledger/:entryId` - Get single ledger entry
- `POST /api/traders/:traderId/banks/:bankId/ledger` - Create new ledger entry
- `PUT /api/traders/:traderId/banks/:bankId/ledger/:entryId` - Update ledger entry
- `DELETE /api/traders/:traderId/banks/:bankId/ledger/:entryId` - Delete ledger entry

## Response Format

### Success Response
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## Features

- ✅ Server-side balance calculations
- ✅ Running balance for bank ledgers
- ✅ Input validation
- ✅ Error handling
- ✅ Optimized database queries
- ✅ MongoDB indexes for performance
- ✅ Clean JSON responses
- ✅ CORS enabled
- ✅ Request logging (development)

## Database Models

- **SaudiEntry**: Saudi Riyal transactions
- **SpecialEntry**: Special account transactions
- **Trader**: Trader information
- **Bank**: Bank accounts for traders
- **BankLedgerEntry**: Individual ledger entries

All balances are calculated server-side and stored in the database.

