## Tugas week 9 lanjutan mini project, menambahkan authentifikasi pada express
## Fitur utama
- registrasi user baru
- login user dan generate token
- proteksi endpoint "movies" hanya bisa diakses user login
- middleware logger, validate, dan error handler
## Contoh Uji API
### Register
![Output Program](1_Registrasi.png)

### Login
![Output Program](2_Login.png)

### Akses Film Menggunakan Token
![Output Program](3_useToken.png)

### Akses Film Tidak Menggunakan Token
![Output Program](4_notUse.png)

## Kesimpulan
Dengan menambahkan autentikasi JWT, API menjadi lebih aman dan hanya dapat diakses oleh pengguna yang memiliki token valid.
