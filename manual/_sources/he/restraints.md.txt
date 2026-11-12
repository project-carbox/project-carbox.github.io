# שילוב אילוצי עידון חיצוניים עם Carbox Refinement ו-Carbox Refinement

חבילת **Carbox ו-CarboxMol** תוכננה מראש לפעולה חלקה ומדויקת מול מנועי הזיקוק המובילים בעולם: **Carbox Refinement** ו-**Carbox Refinement**.

---

## 1. תחביר אילוצי מרחק חיצוניים

כאשר Carbox מזהה מגע קצר חריג ($d_{O\cdots O} \le 3.20\,\text{Å}$) או קשר מימן בעל מחסום נמוך ($d \le 2.55\,\text{Å}$), היא מייצרת רשומת אילוץ התואמת באופן מלא לתחביר CCP4 Carbox Refinement:

```text
exte dist first resi <resi_1> chain <chain_1> atom <atom_1> second resi <resi_2> chain <chain_2> atom <atom_2> value <dist> sigma <sigma>
```

### הנחיות פרמטרים
- **`value`**: מרחק מטרה מבוקש בין אטומים באנגסטרום ($\text{Å}$). לקשרי מימן סטנדרטיים: $2.60\,\text{Å}$, לקשרי LBHB אולטרה-קצרים: $2.42 - 2.48\,\text{Å}$.
- **`sigma`**: שגיאת תקן / משקל האילוץ. מומלץ: $\sigma = 0.02\,\text{Å}$ ברזולוציה גבוהה.

---

## 2. פרוטונציה מפורשת: ASH ו-GLH

- **`ASP` / `GLU`**: אניונים במצב דה-פרוטונציה מלא.
- **`ASH`**: חומצה אספרטית נייטרלית עם מימן מפורש ($\text{H}\delta_2$ קשור ל-$\text{O}\delta_2$).
- **`GLH`**: חומצה גלוטמית נייטרלית עם מימן מפורש ($\text{H}\varepsilon_2$ קשור ל-$\text{O}\varepsilon_2$).

Carbox מסוגלת לעדכן באופן אוטומטי את תוויות השיירים הללו בקובץ ה-mmCIF לקראת תהליך הזיקוק.

---

## 3. הרצה ב-Carbox Refinement

```bash
carbox refine \
  --model model.cif \
  --hklin data.mtz \
  --restraints carbox_restraints.txt \
  --output refined_model \
  --ncycle 10
```
