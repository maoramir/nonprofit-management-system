# מערכת איסוף פרטים לרישום עמותה

אפליקציית `Next.js` בעברית מלאה ובכיוון `RTL` לאיסוף הפרטים הראשוניים הדרושים לרישום עמותה, במבנה אשף רב-שלבי:

1. שם העמותה
2. מייסדים
3. כתובת
4. פרטי עמותה
5. מסך סיכום

## הרצה מקומית

```bash
npm install
npm run dev
```

לאחר מכן יש לפתוח את `http://localhost:3000`.

## מבנה עיקרי

- `app/` תשתית האפליקציה ועמוד הבית
- `components/steps/` קומפוננטות נפרדות לכל שלב
- `components/ui/` רכיבי UI משותפים
- `components/wizard/` מעטפת האשף והניווט
- `contexts/registration-context.tsx` ניהול מצב גלובלי ושמירה ל-`localStorage`
- `lib/schemas.ts` סכמות ולידציה עם `zod`
- `lib/storage.ts` טעינה ושמירה זמנית
- `lib/api/registration.ts` נקודת חיבור עתידית לשרת / backend

## הרחבה עתידית

כדי לחבר backend בהמשך, מומלץ להתחיל מהקבצים:

- `lib/api/registration.ts`
- `contexts/registration-context.tsx`

אפשר בהמשך להוסיף:

- שליחת טיוטה לשרת
- התחברות משתמשים
- מסד נתונים
- ייצוא מסמכים מתקדם
