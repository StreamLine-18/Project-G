# 🎮 One-Day Hackathon: Build It. Level Up. Own the Stage!

## Tutorial Game Scratch - Edukasi Lingkungan

Kumpulan tutorial membuat game sederhana dengan tema lingkungan menggunakan Scratch.

---

## 📋 Cheat Sheet

Bingung dengan blok-blok Scratch? Pakai cheat sheet ini aja!

👉 **[Buka Cheat Sheet Scratch](https://docs.google.com/spreadsheets/d/1NqdYrbG9VKvDrrg8JA7r3VzbRfJ23HXrBRyyHl649rs/edit?gid=0#gid=0)**
**[Masuk ke Aplikasi Scratch](https://scratch.mit.edu/projects/editor/?tutorial=getStarted)**

---

## 📖 Daftar Istilah

| Istilah | Arti |
|---------|------|
| **Sprite** | Gambar/karakter yang bisa bergerak di game |
| **Stage** | Latar belakang/background game |
| **Costume** | Tampilan/gambar sprite (bisa punya banyak) |
| **Block** | Perintah yang bisa disusun untuk membuat program |
| **Variable** | Tempat menyimpan angka atau teks (seperti skor) |
| **Forever** | Blok pengulangan yang jalan terus-menerus |
| **If-Then** | Blok kondisi "Jika...maka..." |
| **Broadcast** | Mengirim pesan ke sprite lain |

---

## 🌊 Misi 1: Siaga Banjir (Evakuasi Kampung)

**Genre:** Endless Runner  
**Tujuan:** Bantu karakter berlari menyelamatkan diri dari banjir sambil menghindari sampah yang hanyut.

---

### 🛠️ Langkah 1: Persiapan Aset

- Pilih **Sprite** untuk karakter utama (Orang)
- Pilih **Backdrop** untuk latar belakang (Perkotaan/Sungai)
- Pilih **Sprite** untuk rintangan (Kayu, Sampah, Batu)

---

### 💻 Langkah 2: Logika Gravitasi

Masukan kode ini di **Sprite Utama**:

> **Logika:** Jika tidak menyentuh tanah, karakter jatuh ke bawah.

```
when green flag clicked                    (Saat bendera hijau diklik)
set y to -100                              (Atur posisi Y ke -100)
forever                                    (Selamanya/ulangi terus)
    if <not <touching color [Warna Tanah]?>> then    (Jika TIDAK menyentuh warna tanah)
        change y by -5                     (Turunkan Y sebesar 5)
    end
end
```


---

### 🏃 Langkah 3: Membuat Lompatan

Masukan kode ini di **Sprite Utama**:

> **Logika:** Jika tombol Spasi ditekan, karakter lompat ke atas.

```
when [space] key pressed                   (Saat tombol spasi ditekan)
repeat 10                                  (Ulangi 10 kali)
    change y by 10                         (Naikkan Y sebesar 10)
end
```

---

### 🚧 Langkah 4: Rintangan Bergerak

Masukan kode ini di **Sprite Rintangan**:

> **Logika:** Muncul di kanan, gerak ke kiri, lalu kembali ke kanan.

```
when green flag clicked                    (Saat bendera hijau diklik)
forever                                    (Selamanya)
    go to x: 240 y: -120                   (Pergi ke pojok kanan bawah)
    glide 2 secs to x: -240 y: -120        (Meluncur 2 detik ke kiri)
end
```

---

### ☠️ Langkah 5: Game Over

Masukan kode ini di **Sprite Utama**:

```
when green flag clicked                    (Saat bendera hijau diklik)
forever                                    (Selamanya)
    if <touching [Rintangan]?> then        (Jika menyentuh rintangan)
        say "Awas Banjir!" for 2 seconds   (Katakan selama 2 detik)
        stop [all]                         (Berhentikan semua)
    end
end
```

---

### 🏆 Langkah 6: Sistem Skor

Masukan kode ini di **Sprite Utama**:

> **Logika:** Skor bertambah setiap detik selama pemain masih hidup.

```
when green flag clicked                    (Saat bendera hijau diklik)
set [Skor] to 0                            (Set variabel Skor ke 0)
forever                                    (Selamanya)
    wait 1 seconds                         (Tunggu 1 detik)
    change [Skor] by 1                     (Tambah Skor sebesar 1)
end
```

---

## 🔥 Misi 2: Patroli Hutan Kalimantan

**Genre:** Shooter / Clicker  
**Tujuan:** Padamkan api yang muncul secara acak sebelum hutan habis terbakar!

---

### 🛠️ Langkah 1: Persiapan Aset

- Pilih **Sprite** untuk crosshair/selang air
- Pilih **Sprite** untuk api
- Pilih **Backdrop** hutan

---

### 🎯 Langkah 2: Menggerakkan Crosshair

Masukan kode ini di **Sprite Crosshair**:

> **Logika:** Sprite selalu mengikuti posisi mouse.

```
when green flag clicked                    (Saat bendera hijau diklik)
forever                                    (Selamanya)
    go to [mouse-pointer]                  (Pergi ke posisi mouse)
end
```

---

### 🔥 Langkah 3: Memunculkan Api Secara Acak

Masukan kode ini di **Sprite Api**:

> **Logika:** Muncul di posisi acak, tunggu, lalu pindah lagi.

```
when green flag clicked                    (Saat bendera hijau diklik)
forever                                    (Selamanya)
    go to x: (pick random -200 to 200) y: (pick random -150 to 150)
                                           (Pergi ke posisi acak)
    show                                   (Tampilkan sprite)
    wait 2 seconds                         (Tunggu 2 detik)
    if <visible?> then                     (Jika masih terlihat/belum diklik)
        change [Nyawa] by -1               (Kurangi nyawa)
    end
    hide                                   (Sembunyikan sprite)
    wait 1 seconds                         (Tunggu 1 detik)
end
```

---

### 💧 Langkah 4: Memadamkan Api

Masukan kode ini di **Sprite Api**:

> **Logika:** Jika diklik, api hilang dan skor bertambah.

```
when this sprite clicked                   (Saat sprite ini diklik)
start sound [Water Drop]                   (Mainkan suara air)
hide                                       (Sembunyikan sprite)
change [Skor] by 1                         (Tambah skor)
```

---

### ☠️ Langkah 5: Game Over

Masukan kode ini di **Stage**:

> **Logika:** Jika nyawa habis, game over.

```
when green flag clicked                    (Saat bendera hijau diklik)
set [Nyawa] to 3                           (Set nyawa ke 3)
set [Skor] to 0                            (Set skor ke 0)
forever                                    (Selamanya)
    if <[Nyawa] < 1> then                  (Jika nyawa kurang dari 1)
        say "Hutan Terbakar! Game Over"    (Tampilkan pesan)
        stop [all]                         (Berhentikan semua)
    end
end
```


---

## ♻️ Misi 3: Pilah Sampah Nusantara

**Genre:** Catching Game  
**Tujuan:** Tangkap sampah yang jatuh dan masukkan ke tong yang benar.

---

### 🛠️ Langkah 1: Persiapan Aset

- **Sprite Tong Organik** (Warna Hijau)
- **Sprite Tong Anorganik** (Warna Kuning)
- **Sprite Sampah Organik** (Apel, Daun, Tulang)
- **Sprite Sampah Anorganik** (Botol Plastik, Kaleng, Kertas)

---

### 🗑️ Langkah 2: Menggerakkan Tong Sampah

Masukan kode ini di **Sprite Tong Organik**:

> **Logika:** Tekan panah kanan/kiri untuk bergerak.

```
when green flag clicked                    (Saat bendera hijau diklik)
go to x: -100 y: -150                      (Posisi awal)
forever                                    (Selamanya)
    if <key [right arrow] pressed?> then   (Jika panah kanan ditekan)
        change x by 10                     (Gerak ke kanan)
    end
    if <key [left arrow] pressed?> then    (Jika panah kiri ditekan)
        change x by -10                    (Gerak ke kiri)
    end
end
```

Masukan kode ini di **Sprite Tong Anorganik**:

> **Logika:** Tong kedua mengikuti tong pertama di sebelahnya.

```
when green flag clicked                    (Saat bendera hijau diklik)
forever                                    (Selamanya)
    go to x: ([x position] of [Tong Organik]) + 80 y: -150
                                           (Ikuti posisi tong organik + 80)
end
```

---

### ⬇️ Langkah 3: Sampah Jatuh

Masukan kode ini di **Sprite Sampah**:

> **Logika:** Mulai dari atas, lalu jatuh ke bawah.

```
when green flag clicked                    (Saat bendera hijau diklik)
go to x: (pick random -200 to 200) y: 180  (Posisi acak di atas)
forever                                    (Selamanya)
    change y by -5                         (Turun ke bawah)
    if <y position < -170> then            (Jika sudah di bawah)
        go to x: (pick random -200 to 200) y: 180
                                           (Kembali ke atas, posisi acak)
    end
end
```

---

### ✅ Langkah 4: Logika Skor

Masukan kode ini di **Sprite Sampah Organik** (Apel, Daun):

> **Logika:** Tong benar = +1 skor, tong salah = -1 nyawa.

```
when green flag clicked                    (Saat bendera hijau diklik)
forever                                    (Selamanya)
    if <touching [Tong Organik]?> then     (Jika menyentuh tong organik - BENAR)
        start sound [Pop]                  (Suara benar)
        change [Skor] by 1                 (Tambah skor)
        go to x: (pick random -200 to 200) y: 180
    end
    if <touching [Tong Anorganik]?> then   (Jika menyentuh tong anorganik - SALAH)
        start sound [Buzz]                 (Suara salah)
        change [Nyawa] by -1               (Kurangi nyawa)
        go to x: (pick random -200 to 200) y: 180
    end
end
```

Masukan kode ini di **Sprite Sampah Anorganik** (Botol, Kaleng):

```
when green flag clicked                    (Saat bendera hijau diklik)
forever                                    (Selamanya)
    if <touching [Tong Anorganik]?> then   (Jika menyentuh tong anorganik - BENAR)
        start sound [Pop]                  (Suara benar)
        change [Skor] by 1                 (Tambah skor)
        go to x: (pick random -200 to 200) y: 180
    end
    if <touching [Tong Organik]?> then     (Jika menyentuh tong organik - SALAH)
        start sound [Buzz]                 (Suara salah)
        change [Nyawa] by -1               (Kurangi nyawa)
        go to x: (pick random -200 to 200) y: 180
    end
end
```

---

### ☠️ Langkah 5: Game Over

Masukan kode ini di **Stage**:

```
when green flag clicked                    (Saat bendera hijau diklik)
set [Nyawa] to 3                           (Set nyawa ke 3)
set [Skor] to 0                            (Set skor ke 0)
forever                                    (Selamanya)
    if <[Nyawa] < 1> then                  (Jika nyawa habis)
        say (join "Game Over! Skor: " [Skor])
        stop [all]                         (Berhentikan semua)
    end
end
```


---

## 📚 Cara Membuat Variable di Scratch

1. Klik kategori **Variables** (warna oranye) di panel blok
2. Klik tombol **"Make a Variable"**
3. Ketik nama variable (contoh: `Skor` atau `Nyawa`)
4. Pilih **"For all sprites"**
5. Klik **OK**
6. Variable akan muncul di layar game secara otomatis

> 💡 **Tips:** Buat variable `Skor` dan `Nyawa` sebelum menjalankan game!

---

## 📝 Catatan Penting

- **Target:** Siswa SD Kelas 4-6 / SMP
- Kode ditulis dalam format **Scratch Block** (Bahasa Inggris) dengan penjelasan Indonesia
- Sesuaikan warna, suara, dan sprite sesuai kreativitas masing-masing
- Jangan lupa membuat variable **Skor** dan **Nyawa** sebelum menjalankan game

---

## 🔗 Link Berguna

| Link | Keterangan |
|------|------------|
| [Scratch Editor](https://scratch.mit.edu/projects/editor/) | Buat game langsung di browser |
| [Scratch Ideas](https://scratch.mit.edu/ideas) | Tutorial dan inspirasi |
| [Flaticon](https://www.flaticon.com/) | Gambar/icon gratis |

---

## 🎯 Tantangan Tambahan

| Misi | Tantangan |
|------|-----------|
| Misi 1 | Tambahkan power-up "Perahu" yang membuat karakter kebal 5 detik |
| Misi 2 | Buat api muncul lebih cepat setiap 10 skor |
| Misi 3 | Tambahkan jenis sampah ke-3: **B3 (Bahan Berbahaya)** dengan tong merah |

---

**Build It. Level Up. Own the Stage! 🎮🔥**


