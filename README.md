# 🔌 Quran API

REST API untuk menampilkan data Al-Quran dari database Supabase.

## 📋 Features

- Get semua surah
- Get detail surah dengan ayat-ayatnya
- CORS enabled
- Fast response

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Running

```bash
npm start
```

API akan berjalan di `http://localhost:3000`

## 📚 API Endpoints

### 1. Get All Surah

**Endpoint:**
```
GET /api/surah
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Al-Fatihah",
    "name_no_diacratic": "Al-Fatihah",
    "ayah_count": 7
  },
  ...
]
```

### 2. Get Surah Detail with Ayat

**Endpoint:**
```
GET /api/surah/:id
```

**Parameters:**
- `id` (number) - Surah ID (1-114)

**Response:**
```json
{
  "surah": {
    "id": 1,
    "name": "Al-Fatihah",
    "name_no_diacratic": "Al-Fatihah",
    "ayah_count": 7
  },
  "ayah": [
    {
      "surah_id": 1,
      "ayah_number": 1,
      "text_arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "text_no_diacratic": "Bismillah ar-Rahman ar-Rahim"
    },
    ...
  ]
}
```

## 🔧 Configuration

### Environment Variables

Tidak memerlukan `.env` karena menggunakan hardcoded Supabase credentials.

**Untuk production, gunakan `.env`:**

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_key
PORT=3000
```

### CORS Configuration

Edit `index.js` untuk mengubah CORS allowed origins:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend-domain.com'
  ]
}));
```

## 🗄️ Database Schema

### Table: surah

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Surah ID (1-114) |
| name | TEXT | Nama surah (dengan diacritic) |
| name_no_diacratic | TEXT | Nama surah (tanpa diacritic) |
| ayah_count | INTEGER | Jumlah ayat dalam surah |

### Table: ayah

| Column | Type | Description |
|--------|------|-------------|
| surah_id | INTEGER | ID Surah (FK) |
| ayah_number | INTEGER | Nomor ayat |
| text_arabic | TEXT | Teks ayat dalam bahasa Arab |
| text_no_diacratic | TEXT | Teks ayat tanpa diacritic |

## 📦 Dependencies

```json
{
  "express": "^5.1.0",
  "cors": "^2.8.5",
  "@supabase/supabase-js": "^2.84.0"
}
```

## 🧪 Testing

### Manual Test dengan cURL

```bash
# Get all surah
curl http://localhost:3000/api/surah

# Get surah 1 detail
curl http://localhost:3000/api/surah/1

# Get surah 2 detail
curl http://localhost:3000/api/surah/2
```

### Test dengan Postman

1. Import sebagai GET request
2. URL: `http://localhost:3000/api/surah` atau `http://localhost:3000/api/surah/1`
3. Send request

## 🚀 Deployment

### Deploy ke Vercel

1. Connect repository ke Vercel
2. Vercel akan auto-detect Node.js
3. Deploy!

### Deploy ke Railway

1. Connect GitHub repository
2. Select `quran-api` folder
3. Deploy!

### Deploy ke Render

1. Create new Web Service
2. Connect GitHub repository
3. Select `quran-api` folder
4. Deploy!

## 🔐 Security

- CORS enabled dengan whitelist
- Input validation pada route parameters
- Error handling
- No sensitive data in responses

## 📊 Performance

- Response time: < 100ms
- Supabase database caching
- Connection pooling

## 🐛 Troubleshooting

### Port already in use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

### Database connection error

1. Check Supabase credentials
2. Verify network connection
3. Check Supabase service status

### CORS error in frontend

Update CORS origins in `index.js` dengan domain frontend Anda

## 📝 API Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad request |
| 404 | Not found |
| 500 | Server error |

## 🔄 Rate Limiting

Tidak ada rate limiting saat ini. Untuk production, consider menambahkan:

```bash
npm install express-rate-limit
```

## 📚 Resources

- [Express Documentation](https://expressjs.com)
- [Supabase Documentation](https://supabase.com/docs)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## 📞 Support

Email: info@quranapp.com

---

**Happy coding! 🚀**
