# 🎮 One-Day Hackathon: Build It. Level Up. Own the Stage!

## Tutorial Game Scratch - Edukasi Lingkungan

Kumpulan tutorial membuat game sederhana dengan tema lingkungan menggunakan Scratch.

---

## 📋 Cheat Sheet

Bingung dengan blok-blok Scratch? Pakai cheat sheet ini aja!

👉 **[Buka Cheat Sheet Scratch](https://docs.google.com/spreadsheets/d/1NqdYrbG9VKvDrrg8JA7r3VzbRfJ23HXrBRyyHl649rs/edit?gid=0#gid=0)**

---

## 🌊 Misi 1: Siaga Banjir (Evakuasi Kampung)

**Genre:** Endless Runner  
**Tujuan:** Bantu karakter berlari menyelamatkan diri dari banjir sambil menghindari sampah yang hanyut.

### 🛠️ Langkah 1: Persiapan Aset

- Pilih **Sprite Utama** (Orang/Karakter)
- Pilih **Background** (Perkotaan atau Sungai)
- Pilih **Sprite Rintangan** (Kayu, Sampah, atau Batu)

### 💻 Langkah 2: Logika Gravitasi (Agar bisa jatuh)

Masukan kode ini di **Sprite Utama**:

> **Logika:** "Jika tidak menyentuh tanah, karakter harus turun ke bawah."

```
Ketika Bendera Hijau diklik
Set y ke -100 (Posisi awal di tanah)
Selamanya:
    Jika <TIDAK menyentuh warna [Warna Tanah]?> maka:
        Ubah y sebesar -5
```

### 🏃 Langkah 3: Membuat Lompatan

Masukan kode ini di **Sprite Utama**:

> **Logika:** "Jika Spasi ditekan, karakter naik ke atas sebentar, lalu turun."

```
Ketika tombol [Spasi] ditekan
Ulangi 10 kali:
    Ubah y sebesar 10
```

### 🚧 Langkah 4: Rintangan Bergerak

Masukan kode ini di **Sprite Rintangan**:

> **Logika:** "Muncul di kanan layar, jalan ke kiri, jika mentok kiri, kembali ke kanan."

```
Ketika Bendera Hijau diklik
Selamanya:
    Pergi ke x: 240 y: -120 (Pojok Kanan Bawah)
    Meluncur 2 detik ke x: -240 y: -120 (Pojok Kiri Bawah)
```


### ☠️ Langkah 5: Game Over

Masukan kode di **Sprite Utama**:

```
Ketika Bendera Hijau diklik
Selamanya:
    Jika <menyentuh [Sprite Rintangan]?> maka:
        Katakan "Awas Banjir!" selama 2 detik
        Berhentikan semua
```

### 🏆 Langkah 6: Sistem Skor (Waktu Bertahan)

Masukan kode di **Sprite Utama**:

> **Logika:** "Skor bertambah setiap detik selama pemain masih hidup."

```
Ketika Bendera Hijau diklik
Set [Skor] ke 0
Selamanya:
    Tunggu 1 detik
    Ubah [Skor] sebesar 1
```

---

## 🔥 Misi 2: Patroli Hutan Kalimantan

**Genre:** Shooter / Clicker  
**Tujuan:** Padamkan api yang muncul secara acak sebelum hutan habis terbakar!

### 🛠️ Langkah 1: Persiapan Aset

- Pilih **Sprite Crosshair** (Bisa gambar lingkaran atau selang air)
- Pilih **Sprite Api**
- Pilih **Background** (Hutan)

### 🎯 Langkah 2: Menggerakkan Semprotan Air

Masukan kode ini di **Sprite Crosshair**:

> **Logika:** "Sprite ini selalu menempel pada mouse."

```
Ketika Bendera Hijau diklik
Selamanya:
    Pergi ke [Mouse-pointer]
```

### 🔥 Langkah 3: Memunculkan Api Secara Acak

Masukan kode ini di **Sprite Api**:

> **Logika:** "Muncul di posisi sembarang, tunggu sebentar, lalu pindah lagi."

```
Ketika Bendera Hijau diklik
Selamanya:
    Pergi ke x: (Pilih acak -200 hingga 200) y: (Pilih acak -150 hingga 150)
    Tampilkan
    Tunggu 2 detik
    Sembunyikan
    Tunggu 1 detik
```


### 💧 Langkah 4: Memadamkan Api

Masukan kode ini di **Sprite Api**:

> **Logika:** "Jika diklik, api hilang dan skor bertambah."

```
Ketika sprite ini diklik
Mulai suara [Splash/Air]
Sembunyikan
Ubah [Skor] sebesar 1
```

### ☠️ Langkah 5: Game Over (Nyawa Habis)

Masukan kode ini di **Stage/Background**:

> **Logika:** "Pemain punya 3 nyawa. Jika api menghilang sendiri (tidak diklik), nyawa berkurang."

```
Ketika Bendera Hijau diklik
Set [Nyawa] ke 3
Selamanya:
    Jika <[Nyawa] < 1> maka:
        Katakan "Hutan Terbakar! Game Over" selama 2 detik
        Berhentikan semua
```

Tambahkan di **Sprite Api** (setelah `Tunggu 2 detik`):

```
Ketika Bendera Hijau diklik
Selamanya:
    Pergi ke x: (Pilih acak -200 hingga 200) y: (Pilih acak -150 hingga 150)
    Tampilkan
    Tunggu 2 detik
    Jika <terlihat?> maka:  (Jika api belum dipadamkan)
        Ubah [Nyawa] sebesar -1
    Sembunyikan
    Tunggu 1 detik
```

---

## ♻️ Misi 3: Pilahan Sampah Nusantara

**Genre:** Catching Game  
**Tujuan:** Tangkap sampah yang jatuh dan masukkan ke tong yang benar.

### 🛠️ Langkah 1: Persiapan Aset

- Pilih **Sprite Tong Organik** (Warna Hijau)
- Pilih **Sprite Tong Anorganik** (Warna Kuning)
- Pilih **Sprite Sampah Organik** (Contoh: Apel, Daun, Tulang)
- Pilih **Sprite Sampah Anorganik** (Contoh: Botol Plastik, Kaleng, Kertas)


### 🗑️ Langkah 2: Menggerakkan Tong Sampah

Masukan kode ini di **Sprite Tong Organik**:

> **Logika:** "Tekan panah kanan/kiri untuk bergerak."

```
Ketika Bendera Hijau diklik
Pergi ke x: -100 y: -150
Selamanya:
    Jika <tombol [Panah Kanan] ditekan?> maka:
        Ubah x sebesar 10
    Jika <tombol [Panah Kiri] ditekan?> maka:
        Ubah x sebesar -10
```

Masukan kode ini di **Sprite Tong Anorganik**:

> **Logika:** "Tong kedua mengikuti tong pertama di sebelahnya."

```
Ketika Bendera Hijau diklik
Selamanya:
    Pergi ke x: ([x position] dari [Tong Organik] + 80) y: -150
```

### ⬇️ Langkah 3: Sampah Jatuh

Masukan kode ini di **Sprite Sampah**:

> **Logika:** "Mulai dari atas langit (Y tinggi), lalu turun terus menerus."

```
Ketika Bendera Hijau diklik
Pergi ke x: (Pilih acak -200 hingga 200) y: 180
Selamanya:
    Ubah y sebesar -5
    Jika <posisi y < -170> maka: (Jika jatuh ke tanah)
        Pergi ke x: (Pilih acak -200 hingga 200) y: 180
```

### ✅ Langkah 4: Logika Skor (Benar/Salah)

Masukan kode ini di **Sprite Sampah Organik** (Apel, Daun):

> **Logika:** "Jika dimasukkan ke tong yang BENAR = skor +1, jika SALAH = nyawa -1."

```
Ketika Bendera Hijau diklik
Selamanya:
    Jika <menyentuh [Tong Organik]?> maka:  (BENAR)
        Mulai suara [Pop]
        Ubah [Skor] sebesar 1
        Pergi ke x: (Pilih acak -200 hingga 200) y: 180
    Jika <menyentuh [Tong Anorganik]?> maka:  (SALAH)
        Mulai suara [Buzz]
        Ubah [Nyawa] sebesar -1
        Pergi ke x: (Pilih acak -200 hingga 200) y: 180
```


Masukan kode ini di **Sprite Sampah Anorganik** (Botol, Kaleng):

```
Ketika Bendera Hijau diklik
Selamanya:
    Jika <menyentuh [Tong Anorganik]?> maka:  (BENAR)
        Mulai suara [Pop]
        Ubah [Skor] sebesar 1
        Pergi ke x: (Pilih acak -200 hingga 200) y: 180
    Jika <menyentuh [Tong Organik]?> maka:  (SALAH)
        Mulai suara [Buzz]
        Ubah [Nyawa] sebesar -1
        Pergi ke x: (Pilih acak -200 hingga 200) y: 180
```

### ☠️ Langkah 5: Game Over

Masukan kode ini di **Stage/Background**:

```
Ketika Bendera Hijau diklik
Set [Nyawa] ke 3
Set [Skor] ke 0
Selamanya:
    Jika <[Nyawa] < 1> maka:
        Katakan "Game Over! Skor: " gabung [Skor]
        Berhentikan semua
```

---

## 📚 Cara Membuat Variabel di Scratch

1. Klik kategori **Variabel** (warna oranye) di panel blok
2. Klik tombol **"Buat Variabel"**
3. Ketik nama variabel (contoh: `Skor` atau `Nyawa`)
4. Pilih **"Untuk semua sprite"**
5. Klik **OK**
6. Variabel akan muncul di layar game secara otomatis

> 💡 **Tips:** Buat variabel `Skor` dan `Nyawa` sebelum menjalankan game!

---

## 📝 Catatan

- **Target:** Siswa SD Kelas 4-6 / SMP
- Semua kode ditulis dalam format **Scratch Block** (pseudocode Indonesia)
- Sesuaikan warna, suara, dan sprite sesuai kreativitas masing-masing
- Jangan lupa untuk membuat variabel **Skor** dan **Nyawa** sebelum menjalankan game

---

## 🔗 Referensi & Link

- [Scratch Official Website](https://scratch.mit.edu/)
- [Scratch Editor Online](https://scratch.mit.edu/projects/editor/)
- [Tutorial Scratch Bahasa Indonesia](https://scratch.mit.edu/ideas)
- [Asset Tambahan](https://www.flaticon.com/)

---

## 🎯 Tantangan Tambahan

| Misi | Tantangan |
|------|----------|
| Misi 1 | Tambahkan power-up "Perahu" yang membuat karakter kebal 5 detik |
| Misi 2 | Buat api muncul lebih cepat setiap 10 skor |
| Misi 3 | Tambahkan jenis sampah ke-3: **B3 (Bahan Berbahaya)** dengan tong merah |

---

**Build It. Level Up. Own the Stage! 🎮🔥**
