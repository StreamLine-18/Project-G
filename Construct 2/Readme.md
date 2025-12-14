# 🎮 Tutorial Game Construct 2 - Edukasi Lingkungan

Kumpulan tutorial membuat game dengan tema lingkungan dan konteks Indonesia menggunakan Construct 2.

---

## 🏔️ Misi 1: Ekspedisi Gunung Merapi

**Genre:** Platformer  
**Konteks:** Mitigasi bencana gunung meletus dan evakuasi mandiri  
**Tujuan:** Karakter harus mencapai pos evakuasi sebelum tertimpa awan panas!

![Preview Game](./Assets/Misi-1-Merapi/preview.png)

---

### 🛠️ Langkah 1: Setup Project & Layout

1. Buka **Construct 2/3** dan buat **New Project**
2. Atur **Layout Size**: 1280 x 720
3. Tambahkan **Background** (gambar gunung berapi)
4. Buat **Layer** baru untuk UI (skor, timer)

---

### 🎮 Langkah 2: Membuat Karakter dengan Platformer Behavior

#### A. Tambah Sprite Player

1. Insert New Object → **Sprite** → Beri nama `Player`
2. Gambar karakter atau import gambar
3. Klik kanan pada `Player` → **Behaviors** → Add → **Platformer**

#### B. Buat Tanah (Platform)

1. Insert New Object → **Tiled Background** → Beri nama `Ground`
2. Klik kanan pada `Ground` → **Behaviors** → Add → **Solid**

#### C. Buat Pos Evakuasi

1. Insert New Object → **Sprite** → Beri nama `SafeZone`
2. Letakkan di ujung kanan layout

---

### 🪨 Langkah 3: Rintangan - Batu Menggelinding

1. Insert New Object → **Sprite** → Beri nama `Boulder`
2. Add Behavior → **Bullet** (untuk bergerak otomatis)
3. Atur **Speed**: 200, **Angle**: 0 (ke kanan)

#### Event Sheet:

```
Event: System → On start of layout
Action: Boulder → Set Bullet Speed to 200

Event: Player → On collision with Boulder
Action: System → Restart layout
```

---

### 🌋 Langkah 4: Jurang (Pit Detection)

1. Buat **Sprite** bernama `DeathZone` di bawah layout (tidak terlihat)

#### Event Sheet:

```
Event: Player → On collision with DeathZone
Action: System → Restart layout
       Player → Set Position to (X: 100, Y: 300)  // Posisi awal
```

---

### 🏆 Langkah 5: Kondisi Menang

#### Event Sheet:

```
Event: Player → On collision with SafeZone
Action: System → Go to layout "WinScreen"
       // Atau tampilkan Text "Selamat! Kamu Berhasil Evakuasi!"
```

---

## 🚀 IMPROVEMENT CHALLENGE - Tingkat Lanjut

### ⚡ Challenge 1: Auto-Scroll & Awan Panas

**Tujuan:** Kamera bergerak otomatis, pemain harus tetap di layar atau Game Over!

#### Langkah:

1. Buat **Sprite** bernama `HotCloud` (awan panas) di sisi kiri layar
2. Add Behavior → **Anchor** (agar mengikuti kamera)

#### Event Sheet:

```
Event: System → Every tick
Action: System → Scroll to X: Self.ScrollX + 2  // Kamera bergerak ke kanan

Event: Player.X < ScrollX - 300  // Jika player tertinggal di kiri
Action: System → Restart layout
       Text → Set text to "Tertimpa Awan Panas!"
```

---

### 🎭 Challenge 2: Collectibles - Masker Wajib

**Tujuan:** Kumpulkan semua masker sebelum pintu evakuasi terbuka!

#### Langkah:

1. Buat **Sprite** bernama `Mask`
2. Buat **Global Variable** → `MaskCollected = 0`
3. Buat **Global Variable** → `TotalMasks = 5`  (sesuaikan jumlah)

#### Event Sheet:

```
Event: Player → On collision with Mask
Action: Mask → Destroy
       System → Add 1 to MaskCollected
       Audio → Play "pickup_sound"

Event: System → MaskCollected = TotalMasks
Action: SafeZone → Set Visible to True
       SafeZone → Enable Solid behavior
       Text → Set text to "Pintu Evakuasi Terbuka!"

// Saat belum semua masker terkumpul
Event: Player → On collision with SafeZone
       System → MaskCollected < TotalMasks
Action: Text → Set text to "Kumpulkan semua masker dulu! (" & MaskCollected & "/" & TotalMasks & ")"
```

---

### 👥 Challenge 3: NPC yang Harus Digendong

**Tujuan:** Bantu penduduk desa mencapai pos evakuasi!

#### Langkah:

1. Buat **Sprite** bernama `Villager`
2. Buat **Boolean Variable** di `Villager` → `IsRescued = False`

#### Event Sheet:

```
Event: Player → On collision with Villager
       Villager → IsRescued = False
Action: Villager → Set IsRescued to True
       Villager → Pin to Player (Position & Angle)
       Text → Set text to "Penduduk bergabung!"

Event: Villager → IsRescued = True
       Player → On collision with SafeZone
Action: System → Add 100 to Score
       Text → Set text to "Evakuasi Berhasil! +100 Poin"
       System → Go to layout "WinScreen"

// Jika sampai tanpa NPC
Event: Villager → IsRescued = False
       Player → On collision with SafeZone
Action: Text → Set text to "Jangan tinggalkan penduduk!"
```

---

## 🚌 Misi 2: Juragan TransJakarta (Busway)

**Genre:** Top-Down / Traffic Control  
**Konteks:** Kemacetan Jakarta & disiplin berlalu lintas  
**Tujuan:** Kendalikan lalu lintas agar bus tidak menabrak pengendara liar!

![Preview Game](./Assets/Misi-2-Busway/preview.png)

---

### 🛠️ Langkah 1: Setup Layout

1. **Layout Size**: 1920 x 1080 (landscape lebar)
2. **Background**: Jalan dengan jalur busway (garis kuning)
3. Buat **3 Lane**: Jalur kiri (motor), Jalur tengah (busway), Jalur kanan (motor)

---

### 🚍 Langkah 2: Bus dengan Bullet Behavior

1. Insert New Object → **Sprite** → Beri nama `Bus`
2. Add Behavior → **Bullet**
3. Atur **Speed**: 150, **Angle**: 0

#### Event Sheet:

```
Event: System → On start of layout
Action: Bus → Set Bullet enabled
       Bus → Set Bullet Speed to 150
```

---

### 🏍️ Langkah 3: Motor yang Nyeberang Acak

1. Buat **Sprite** → `Motorcycle`
2. Add Behavior → **Bullet**

#### Event Sheet:

```
Event: System → Every 2 seconds
Action: System → Create object Motorcycle at (X: -100, Y: choose(200, 400, 600))
       Motorcycle → Set Bullet Angle to 0
       Motorcycle → Set Bullet Speed to random(100, 200)

// Motor yang keluar layar dihapus
Event: Motorcycle.X > LayoutWidth + 100
Action: Motorcycle → Destroy
```

---

### 🚦 Langkah 4: Palang Pintu / Lampu Merah (Klik untuk Berhenti)

1. Buat **Sprite** → `TrafficGate`
2. Buat **Boolean Variable** di `TrafficGate` → `IsClosed = False`

#### Event Sheet:

```
Event: Mouse → On click on TrafficGate
       TrafficGate → IsClosed = False
Action: TrafficGate → Set IsClosed to True
       TrafficGate → Set animation to "closed"
       
Event: Mouse → On click on TrafficGate
       TrafficGate → IsClosed = True
Action: TrafficGate → Set IsClosed to False
       TrafficGate → Set animation to "open"

// Motor berhenti saat palang tertutup
Event: Motorcycle → Is overlapping TrafficGate
       TrafficGate → IsClosed = True
Action: Motorcycle → Set Bullet Speed to 0

// Motor jalan lagi saat palang terbuka
Event: Motorcycle → Is overlapping TrafficGate
       TrafficGate → IsClosed = False
Action: Motorcycle → Set Bullet Speed to 150
```

---

### 💥 Langkah 5: Collision (Tabrakan = Game Over)

#### Event Sheet:

```
Event: Bus → On collision with Motorcycle
Action: System → Restart layout
       Audio → Play "crash_sound"
       Text → Set text to "TABRAKAN! Skor: " & Score
```

---

## 🚀 IMPROVEMENT CHALLENGE - Tingkat Lanjut

### 🚏 Challenge 1: Sistem Penumpang di Halte

**Tujuan:** Bus harus berhenti 3 detik di halte untuk menaikkan penumpang!

#### Langkah:

1. Buat **Sprite** → `BusStop`
2. Buat **Instance Variable** di `Bus` → `IsAtStop = False`

#### Event Sheet:

```
Event: Bus → Is overlapping BusStop
       Bus → IsAtStop = False
Action: Bus → Set IsAtStop to True
       Bus → Set Bullet Speed to 0
       System → Wait 3 seconds
       Bus → Set Bullet Speed to 150
       Bus → Set IsAtStop to False
       System → Add 10 to Score
       Text → Set text to "Penumpang Naik! +10"
```

---

### 🌧️ Challenge 2: Hujan = Melambat

**Tujuan:** Saat hujan, semua kendaraan melambat!

#### Langkah:

1. Buat **Particle** untuk efek hujan
2. Buat **Global Variable** → `IsRaining = False`

#### Event Sheet:

```
Event: System → Every 15 seconds
Action: System → Toggle IsRaining
       
Event: System → IsRaining = True
Action: Bus → Set Bullet Speed to 100
       Motorcycle → Set Bullet Speed to 80
       Particles → Set visible
       
Event: System → IsRaining = False
Action: Bus → Set Bullet Speed to 150
       Motorcycle → Set Bullet Speed to 150
       Particles → Set invisible
```

---

### 🚔 Challenge 3: Tilang Elektronik

**Tujuan:** Klik motor yang masuk jalur busway untuk tilang!

#### Langkah:

1. Buat **Zone** deteksi jalur busway (invisible sprite)

#### Event Sheet:

```
Event: Motorcycle → Is overlapping BuswayZone
       Mouse → On click on Motorcycle
Action: Motorcycle → Destroy
       System → Add 5 to SecurityScore
       Audio → Play "ticket_sound"
       Text → Set text to "E-Tilang! +5 Keamanan"
```

---

## ☀️ Misi 3: Energi Surya Pelosok Desa

**Genre:** Puzzle / Physics  
**Konteks:** Elektrifikasi desa 3T dengan panel surya  
**Tujuan:** Putar cermin agar cahaya matahari mengenai panel surya!

![Preview Game](./Assets/Misi-3-Solar/preview.png)

---

### 🛠️ Langkah 1: Setup Layout

1. **Background**: Pemandangan desa (rumah tanpa listrik)
2. Buat **Sprite** → `Sun` (matahari di kiri atas)
3. Buat **Sprite** → `Mirror` (cermin yang bisa diputar)
4. Buat **Sprite** → `SolarPanel` (target akhir)
5. Buat **Sprite** → `House` (rumah dengan animasi lampu mati/nyala)

---

### 💡 Langkah 2: Simulasi Cahaya dengan Line of Sight

#### Metode Sederhana: Menggunakan Bullet + Raycast

1. Buat **Sprite** kecil → `LightRay` (titik cahaya)

#### Event Sheet:

```
Event: System → Every 0.1 seconds
Action: System → Create object LightRay at Sun (ImagePoint "RayOrigin")
       LightRay → Set Bullet Speed to 500
       LightRay → Set Bullet Angle to 0  // Arah kanan
```

---

### 🪞 Langkah 3: Cermin yang Bisa Diputar

1. Pilih `Mirror` → Add **Drag & Drop** Behavior (opsional)
2. Buat **Instance Variable** di `Mirror` → `Rotation = 0`

#### Event Sheet:

```
Event: Mouse → On click on Mirror
Action: Mirror → Rotate 45 degrees clockwise

// Atau dengan keyboard
Event: Keyboard → On R pressed
       Mouse cursor → Is over Mirror
Action: Mirror → Rotate 45 degrees
```

---

### 🔆 Langkah 4: Pemantulan Cahaya

#### Event Sheet:

```
Event: LightRay → On collision with Mirror
Action: LightRay → Set Bullet Angle to Mirror.Angle + 90  // Pantulkan
       
// Jika cahaya mengenai panel
Event: LightRay → On collision with SolarPanel
Action: LightRay → Destroy
       SolarPanel → Set animation to "active"
       House → Set animation to "lights_on"
       System → Add 100 to Score
       Text → Set text to "Panel Aktif! Listrik Menyala!"
```

---

### 🎯 Langkah 5: Win Condition

#### Event Sheet:

```
// Buat Global Variable: HousesPowered = 0, TotalHouses = 3

Event: SolarPanel → Animation "active" is playing
       SolarPanel → Variable IsPowered = False
Action: System → Add 1 to HousesPowered
       SolarPanel → Set IsPowered to True

Event: System → HousesPowered = TotalHouses
Action: System → Go to layout "WinScreen"
       Text → Set text to "Semua Rumah Teraliri Listrik!"
```

---

## 🚀 IMPROVEMENT CHALLENGE - Tingkat Lanjut

### ☁️ Challenge 1: Awan Bergerak Menghalangi

**Tujuan:** Simpan energi di baterai saat ada matahari, pakai saat berawan!

#### Langkah:

1. Buat **Sprite** → `Cloud` (bergerak horizontal)
2. Buat **Global Variable** → `BatteryCharge = 0` (max 100)

#### Event Sheet:

```
Event: Cloud → Is overlapping Sun
Action: Sun → Set Variable "IsBlocked" to True
       
Event: Sun → IsBlocked = False
       LightRay → On collision with SolarPanel
Action: System → Add 10 to BatteryCharge (capped at 100)
       Text → Set text to "Baterai: " & BatteryCharge & "%"

Event: Sun → IsBlocked = True
       System → Every 1 second
Action: System → Subtract 5 from BatteryCharge
       
Event: BatteryCharge <= 0
Action: House → Set animation to "lights_off"
       Text → Set text to "Baterai Habis!"
```

---

### 🔢 Challenge 2: Batas Cermin (Resource Management)

**Tujuan:** Gunakan maksimal 5 cermin untuk menyalakan semua rumah!

#### Event Sheet:

```
// Global Variable: MirrorsUsed = 0, MaxMirrors = 5

Event: System → On start of layout
Action: Text → Set text to "Cermin Tersisa: " & (MaxMirrors - MirrorsUsed)

Event: Mouse → On click (layout)
       System → MirrorsUsed < MaxMirrors
Action: System → Create object Mirror at Mouse.X, Mouse.Y
       System → Add 1 to MirrorsUsed

Event: System → MirrorsUsed >= MaxMirrors
Action: Text → Set text to "Cermin Habis! Atur Posisi dengan Bijak!"
```

---

### 🗺️ Challenge 3: Level Design - Peta Indonesia

**Tujuan:** Setiap pulau = level berbeda dengan tantangan unik!

#### Struktur:

1. **Layout 1**: Papua (banyak gunung, cermin harus lebih tinggi)
2. **Layout 2**: Jakarta (gedung tinggi menghalangi, butuh banyak pantulan)
3. **Layout 3**: Kalimantan (hutan lebat, awan sering lewat)

#### Event Sheet (Global):

```
Event: System → On start of layout
Action: System → Go to layout "LevelSelect"
       
// Di layout LevelSelect, buat Button untuk setiap pulau
Event: Mouse → On click on ButtonPapua
Action: System → Go to layout "Level_Papua"
```

---

## 📚 Panduan Umum Construct 2

### 🎨 Behaviors yang Sering Digunakan

| Behavior | Fungsi | Digunakan di |
|----------|--------|--------------|
| **Platformer** | Karakter bisa lompat & jalan | Misi 1 |
| **Bullet** | Objek bergerak otomatis | Misi 1, 2, 3 |
| **Solid** | Objek tidak bisa ditembus | Semua Misi |
| **Drag & Drop** | Objek bisa digeser mouse | Misi 3 |
| **Pin** | Objek menempel ke objek lain | Misi 1 (NPC) |

---

## 🔧 Tips Debugging

1. **Gunakan Text Object** untuk debug variabel:
   ```
   Text → Set text to "Player X: " & Player.X & " Y: " & Player.Y
   ```

2. **Browser Console** (F12) untuk lihat error

3. **Preview Mode**: Tekan F5 untuk test langsung di browser

4. **Debug Mode**: Buka Layout → Preview → Debug untuk lihat variabel real-time

---

## 📝 Catatan

- **Target:** Siswa SMP Kelas 8-9 / SMA
- **Software:** Construct 2 (Desktop)
- Setiap misi punya **Base Case** (dasar) dan **Improvement Challenge** (pengembangan)
- Dorong siswa untuk **eksplorasi behaviors** dan **event sheets** sendiri

---

## 🔗 Referensi & Link

- [Construct 2 Official](https://www.scirra.com/construct2)
- [Construct 2 Manual](https://www.scirra.com/manual)
- [Construct 2 Tutorials](https://www.scirra.com/tutorials)
- [Free Assets](https://opengameart.org/)
- [Kenney Assets](https://kenney.nl/)

---

## 🎯 Tantangan Tambahan

| Misi | Tantangan Ekstra |
|------|------------------|
| Misi 1 | Buat sistem **stamina** (pemain tidak bisa lompat terus-menerus) |
| Misi 2 | Tambahkan **TransJakarta Koridor** berbeda dengan rute berbeda |
| Misi 3 | Buat **Day/Night Cycle** (panel hanya aktif saat siang) |

---

## 🏆 Kriteria Penilaian Workshop

| Aspek | Bobot | Kriteria |
|-------|-------|----------|
| **Fungsionalitas** | 40% | Game berjalan tanpa bug, semua fitur base case berfungsi |
| **Kreativitas** | 30% | Implementasi improvement challenge, visual menarik |
| **Problem Solving** | 20% | Logika event sheet efisien, penggunaan behaviors tepat |
| **Konteks Indonesia** | 10% | Kesesuaian tema dengan realitas Indonesia |

---

**Selamat Berkarya! 🎮🇮🇩**