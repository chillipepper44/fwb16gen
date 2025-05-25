# 🧾 FWB / FHL Generator (Internal Tool)

เครื่องมือนี้ใช้สำหรับช่วยกรอกและสร้างข้อความ **FWB/16** และ **FHL/4**  

สร้างขึ้นเพื่อใช้งานภายในเท่านั้น  
ไม่ใช่ระบบเชิงพาณิชย์ และไม่ได้รับการรับประกันความถูกต้องในทุกกรณี

---

## ✅ ฟีเจอร์ที่มี

- แบบฟอร์มกรอกข้อมูลพร้อม validation พื้นฐาน
- สร้างข้อความในรูปแบบ:
  - FWB/16 (DMK)
  - FWB/16 (HKT + Agent Info)
  - FHL/4 (DMK)
  - FHL/4 (HKT)
- รองรับปุ่ม Generate / Copy / Clear
- มี Navigation เมนูในทุกหน้า
- ใช้ **HTML / JavaScript (Modules) / CSS** เท่านั้น
- รองรับการ deploy บน GitHub Pages

---

## 📂 โครงสร้างหลัก

```
├── index.html             # หน้าเลือกประเภท
├── fwb.html               # FWB DMK
├── fwbhkt.html            # FWB HKT
├── fhl.html               # FHL DMK
├── fhlhkt.html            # FHL HKT

├── components/
│   └── nav.html

├── scripts/
│   ├── autoload.js
│   ├── navloader.js
│   ├── fwb.js
│   ├── fwbhkt.js
│   ├── fhl.js
│   ├── fhlhkt.js
│   └── utils.js

├── styles/
│   └── styles.css

├── assets/
│   ├── favicon.svg
│   ├── favicon-96x96.png
│   └── favicon.ico

└── README.md
```

---

## 🔧 วิธีใช้งาน

1. เปิดหน้า `index.html` ในเบราว์เซอร์
2. เลือกรูปแบบที่ต้องการ
3. กรอกข้อมูล แล้วกด `Generate`
4. กด `Copy` เพื่อนำข้อความไปใช้งาน

> หากใช้งานผ่าน GitHub Pages → [คลิกที่นี่](https://chillipepper44.github.io/fwb16gen/)

---

## 🧪 หมายเหตุ

- หากพบว่าฟอร์มไม่โหลด ให้ตรวจสอบว่าเปิดด้วย `Live Server` หรือผ่าน `https://` เท่านั้น
- หาก favicon ไม่แสดง อาจต้องกด `Ctrl + Shift + R` เพื่อเคลียร์ cache

---

พัฒนาโดยเพื่อใช้งานส่วนตัวเท่านั้น  
**ห้ามนำไปใช้งานจริงโดยไม่ได้ตรวจสอบความถูกต้อง**