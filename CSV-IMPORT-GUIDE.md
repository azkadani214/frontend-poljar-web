# Panduan Pembuatan File CSV Import Pengguna

Dokumen ini menjelaskan struktur dan format file CSV yang diperlukan untuk fitur **Import Masal Anggota** di sistem Poljar.

## Ringkasan Format

- **Format File**: `.csv` (Comma Separated Values)
- **Encoding**: UTF-8 (Disarankan)
- **Baris Pertama**: Harus berisi nama-nama kolom (Header).
- **Pemisah**: Gunakan tanda koma (`,`) sebagai pemisah antar kolom.

## Fitur Canggih Pratinjau (Preview)

Sistem kami kini mendukung fitur pratinjau yang komprehensif untuk meminimalisir kesalahan:

1. **Validasi Instan**: Setiap sel yang salah format (email, tanggal, dll) akan berwarna merah.
2. **Tooltip Error**: Arahkan kursor ke sel merah untuk melihat pesan kesalahan detail.
3. **Edit Langsung**: Anda bisa memperbaiki data langsung di dalam tabel pratinjau sebelum konfirmasi.
4. **Input Manual**: Klik tombol **+ TAMBAH BARIS** untuk menambah data baru secara manual tanpa perlu upload file CSV lagi.
5. **Konfirmasi Final**: Tombol konfirmasi hanya akan aktif jika semua data sudah valid.

## Daftar Kolom (Header)

| Nama Kolom   | Wajib  | Deskripsi                    | Format / Contoh                     |
| :----------- | :----: | :--------------------------- | :---------------------------------- | ------ | ------ |
| `name`       | **Ya** | Nama lengkap anggota.        | `Ahmad Fauzi`                       |
| `email`      | **Ya** | Alamat email aktif.          | `ahmad@example.com`                 |
| `phone`      | Tidak  | Nomor telepon atau WhatsApp. | `081234567890`                      |
| `gender`     | Tidak  | Jenis kelamin.               | `male` atau `female`                |
| `birth_date` | Tidak  | Tanggal lahir.               | `YYYY-MM-DD` (Contoh: `1995-10-15`) |
| `address`    | Tidak  | Alamat lengkap.              | `Jl. Merdeka No. 12`                |
| `bio`        | Tidak  | Deskripsi singkat.           | `Profil singkat anggota`            |
| `role`       | Tidak  | Slug peran. Pisah dengan `   | ` jika lebih dari satu.             | `admin | staff` |
| `division`   | Tidak  | Nama divisi.                 | `Teknologi`                         |
| `position`   | Tidak  | Nama jabatan.                | `Lead Developer`                    |
| `level`      | Tidak  | Tingkatan jabatan.           | `1`                                 |
| `period`     | Tidak  | Periode kepengurusan.        | `2024`                              |

---

## Contoh Data dalam CSV

```csv
name,email,phone,gender,birth_date,address,bio,role,division,position,level,period
Ahmad Fauzi,ahmad@example.com,081234567890,male,1995-10-15,Jl. Merdeka No. 12,Profil Saya,admin|staff,Teknologi,Lead Developer,1,2024
```

## Tips Penanganan Error:

- **Merah pada Nama/Email**: Data wajib diisi.
- **Merah pada Tanggal**: Pastikan formatnya tepat `Tahun-Bulan-Tanggal` (Contoh: 1990-12-31).
- **Merah pada Gender**: Hanya terima input `male` atau `female`.
- **Duplicate Email**: Walaupun valid di pratinjau, sistem backend akan menolak jika email sudah ada di database saat proses final.
