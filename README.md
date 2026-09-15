# ورقة العمل التفاعلية: مهام نظام التشغيل (Operating System Tasks)

تطبيق ويب تعليمي تفاعلي حديث مخصص لطلاب المرحلة الثانوية لشرح وتطبيق وتقييم **المهام الأربعة الأساسية لنظام التشغيل**:
1. **إدارة العمليات (Process Management)**
2. **إدارة الذاكرة الرئيسية (Memory Management)**
3. **إدارة أجهزة الإدخال والإخراج (I/O Management)**
4. **إدارة الملفات والمجلدات (File Management)**

---

## 🌟 المميزات الرئيسية

- **أوراق عمل تفاعلية**: أسئلة تفاعلية فورية مع تصحيح تلقائي وتغذية راجعة وشرح تعليمي فوري.
- **بطاقات الاستذكار السريع (Flashcards)**: مراجعة ذكية وسريعة للمفاهيم الأساسية مع إمكانية تحديد المفاهيم المتقنة.
- **اختبار تشخيصي شامل وموقوت**: قياس دقيق لمستوى استيعاب الطالب في كل مهمة من المهام الأربعة مع تقرير أداء تحليلي.
- **شهادة إتقان قابلة للتخصيص والطباعة**: إصدار شهادة تفوق باسم الطالب ونتيجته.
- **جاهزية الطباعة والتصدير (Print / PDF Ready)**:
  - طباعة ورقة عمل الطالب للاختبارات الصفية والورقية.
  - طباعة نموذج إجابة المعلم المعتمد مع الشروحات.
- **تصميم عصري ومتجاوب بالكامل**: متوافق مع كافة الشاشات (الحواسب، الأجهزة اللوحية، والهواتف الذكية) مع دعم كامل للغة العربية (RTL).

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **Lucide Icons**
- **Canvas Confetti & Motion**

---

## 🚀 طريقة التشغيل محلياً (Getting Started)

### 1. استنساخ المشروع (Clone Repository)
```bash
git clone https://github.com/USERNAME/REPO_NAME.git
cd REPO_NAME
```

### 2. تثبيت الحزم والمكتبات (Install Dependencies)
```bash
npm install
```

### 3. تشغيل خادم التطوير (Run Development Server)
```bash
npm run dev
```
افتح المتصفح على الرابط: `http://localhost:3000`

### 4. بناء المشروع للإنتاج (Build for Production)
```bash
npm run build
```

---

## 📁 هيكلية المشروع (Project Structure)

```text
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── App.tsx                      # المكون الرئيسي للتطبيق
│   ├── main.tsx                     # نقطة الدخول
│   ├── index.css                    # تنسيقات Tailwind CSS
│   ├── types.ts                     # تعريفات الأنواع (TypeScript Interfaces)
│   ├── data/
│   │   └── curriculumData.ts        # بيانات المنهج، الأسئلة، والبطاقات
│   └── components/
│       ├── Header.tsx               # الترويسة وشريط التنقل
│       ├── WorksheetView.tsx        # عرض ورقة العمل التفاعلية
│       ├── ComprehensiveExam.tsx    # الاختبار الشامل الموقوت
│       ├── FlashcardsStudy.tsx      # بطاقات المراجعة السريعة
│       ├── CertificateModal.tsx     # نافذة إصدار شهادة الإتقان
│       ├── PrintableWorksheet.tsx   # ورقة العمل المجهزة للطباعة
│       └── PrintTeacherKeyModal.tsx # نموذج إجابة المعلم المعتمد
```

---

## 📄 الترخيص (License)
هذا المشروع متاح للاستخدام التعليمي والتطويري.
