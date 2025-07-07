# Test Aplikasi

## Quick Test

1. **Akses aplikasi:** http://localhost:3000
2. **Klik "Daftar di sini"**
3. **Isi form registrasi:**
   - Nama: Admin Test
   - Email: admin@test.com
   - Password: 123456
4. **Submit form**
5. **Seharusnya redirect ke dashboard dengan:**
   - ✅ Navbar horizontal di atas dengan user info & search
   - ✅ Sidebar vertikal di kiri dengan menu navigation
   - ✅ User avatar dan dropdown di navbar kanan atas
   - ✅ Notifikasi bell icon dengan badge
   - ✅ Mobile responsive (hamburger menu di mobile)

## UI Features yang Baru

### Navbar (Header)
- **Search bar** - untuk pencarian global
- **Notification bell** - dengan badge counter
- **User dropdown** - berisi profile, settings, logout
- **Mobile hamburger** - toggle sidebar di mobile

### Sidebar 
- **Logo** di atas
- **Menu navigation** - Dashboard, Users, Settings
- **Responsive** - slide in/out di mobile

### Layout
- **Sticky navbar** - tetap di atas saat scroll
- **Full height sidebar** - dari atas sampai bawah
- **Content area** - di kanan sidebar, di bawah navbar

## Database Check

Buka Prisma Studio untuk melihat data:
```bash
npm run db:studio
```

## API Test

Test register via API:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"123456"}'
```

## Migration Commands (seperti Laravel)

```bash
npm run db:migrate          # php artisan migrate
npm run db:reset           # php artisan migrate:fresh
npm run db:studio          # seperti phpMyAdmin
```

## Test Mobile Responsive

1. Buka DevTools (F12)
2. Toggle device mode (Ctrl+Shift+M)
3. Pilih mobile device (iPhone/Android)
4. Test hamburger menu dan responsive layout

Sekarang dashboard sudah lengkap dengan navbar + sidebar seperti admin panel modern! 🚀
