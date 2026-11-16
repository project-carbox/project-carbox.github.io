# תיעוד Carbox (עברית)

**זיהוי מבני של מצבי פרוטונציה חריגים בקרבוקסילטים, קשרי מימן בעלי מחסום נמוך (LBHB) ומיסוך דיאלקטרי של המיקרו-סביבה במבני גביש מקרו-מולקולריים ברזולוציה גבוהה**

**מחברים:** סולימאן מ. חאג'יזאדה וגריב נ. מורשודוב  
*גרסה:* 0.4.5  
*פלטפורמה:* פלטפורמת Carbox לביולוגיה מבנית וחישובית  
\* *דוא"ל להתכתבות:* `suleyman.hacizade1@gmail.com`

---

## סקירה כללית

ספריית **Carbox** (`carbox`) הינה פלטפורמה מדעית וחישובית בביולוגיה מבנית וקריסטלוגרפיה מקרו-מולקולרית, שנועדה לזהות ולאמת מצבי פרוטונציה חריגים של קרבוקסילטים ($-\text{COOH} \cdots ^-\text{OOC}-$) וקשרי מימן בעלי מחסום נמוך (LBHB, $d_{O\cdots O} \le 2.55\,\text{Å}$):

- **סינון וסריקה מרחבית אוטומטית** של זוגות קרבוקסילטים קרובים ($d_{O\cdots O} \le 3.20\,\text{Å}$).
- **חישוב מדד קבורת מים ($d_w$)** והערכת מיסוך דיאלקטרי במיקרו-סביבה ($\varepsilon_{\text{eff}} \approx 2-4$).
- **משטח אנרגיה פוטנציאלית (PES) קוונטי חד-ממדי** וסימולציית העברת פרוטון בכיוון רגיל, הפוך ("פיות הפוכות") ודו-כיווני.
- **ביקורת אטום חשוד (`carbox.validate_atom`)** והפקת אילוצי מרחק חיצוניים עבור REFMAC5, Servalcat ו-Phenix.
- **מנוע גרפים טופולוגי עצמאי** ללא תלויות חיצוניות (`carbox.graph`).


---

## התקנה

### דרישות קדם
- Python 3.9 ומעלה (נבדק ותואם עד Python 3.14)
- `gemmi`
- `numpy`, `scipy`

### התקנה מקוד המקור
```bash
git clone https://github.com/project-carbox/carbox.git
cd carbox
pip install -e .
```

### בדיקת התקנה
```bash
python -c "import carbox; print('Carbox version:', carbox.__version__)"
carbox --help
```

---

## ציטוט מדעי רשמי (2026)

בעת שימוש בחבילה במחקר אקדמי או תעשייתי, יש לצטט:

> **Suleiman M Hajizadeh & Garib N Murshudov (2026).**  
> *Carbox: Macromolecular Coordinate & Geometry Calculation Engine for Carboxyl Microenvironments and Stereochemical Validation.*  
> Institute of Molecular Biology (IMB), Baku & MRC Laboratory of Molecular Biology (LMB), Cambridge, UK.

### פורמט BibTeX
```bibtex
@software{HajizadehMurshudovCarbox2026,
  author    = {Hajizadeh, Suleiman M and Murshudov, Garib N},
  title     = {Carbox: Macromolecular Coordinate & Geometry Calculation Engine for Carboxyl Microenvironments and Stereochemical Validation},
  version   = {0.4.5},
  year      = {2026},
  url       = {https://project-carbox.github.io/}
}
```

---

## תוכן עניינים ומדריכים

- **[ספריית Carbox המדעית](carbox.md)**: יסודות מדעיים, סימולציית העברת פרוטון, ביקורת אטומים ומנוע גרפים.
- **[אילוצי עידון חיצוניים ל-Carbox Refinement](restraints.md)**: תחביר אילוצים (`exte dist`), פרוטונציה מפורשת (ASH/GLH) וזיקוק.
- **[ציטוט והפניות](citation.md)**: פרטי ציטוט מלאים לשנת 2026, פורמטי BibTeX, APA ו-RIS.
