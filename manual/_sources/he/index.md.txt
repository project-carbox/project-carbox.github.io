# תיעוד Carbox ו-CarboxMol (עברית)

**זיהוי מבני של מצבי פרוטונציה חריגים בקרבוקסילטים, קשרי מימן בעלי מחסום נמוך (LBHB) ומיסוך דיאלקטרי של המיקרו-סביבה במבני גביש מקרו-מולקולריים ברזולוציה גבוהה**

**מחברים:** סולימאן מ. חאג'יזאדה וגריב נ. מורשודוב  
*גרסה:* 0.4.5  
*פלטפורמה:* פלטפורמת Carbox לביולוגיה מבנית וחישובית  
\* *דוא"ל להתכתבות:* `suleyman.hacizade1@gmail.com`

---

## סקירה כללית

חבילת התוכנה **Carbox & CarboxMol** מהווה מערכת מחשוב מתקדמת בביולוגיה מבנית וקריסטלוגרפיה מקרו-מולקולרית, שנועדה לפתור את אחת הסוגיות המורכבות ביותר: זיהוי ואימות של מצבי פרוטונציה חריגים של קרבוקסילטים ($-\text{COOH} \cdots ^-\text{OOC}-$) וקשרי מימן בעלי מחסום נמוך (LBHB, $d_{O\cdots O} \le 2.55\,\text{Å}$).

המערכת מחולקת לשתי פלטפורמות מרכזיות:

1. **`Carbox` (`carbox`)** — ספריית מחקר וחישוב מדעית:
   - סינון וסריקה מרחבית אוטומטית של זוגות קרבוקסילטים קרובים ($d_{O\cdots O} \le 3.20\,\text{Å}$).
   - חישוב מדד קבורת מים ($d_w$) והערכת מיסוך דיאלקטרי במיקרו-סביבה ($\varepsilon_{\text{eff}} \approx 2-4$).
   - משטח אנרגיה פוטנציאלית (PES) קוונטי חד-ממדי וסימולציית העברת פרוטון בכיוון רגיל, הפוך ("פיות הפוכות") ודו-כיווני.
   - ביקורת אטום חשוד (`carbox.validate_atom`) והפקת אילוצי מרחק חיצוניים עבור Carbox Refinement.
   - מנוע גרפים טופולוגי עצמאי ללא תלויות חיצוניות (`carbox.graph`).

2. **`CarboxMol` (`carboxmol`)** — סביבת עבודה, זיקוק גיאומטרי והדמיה תלת-ממדית:
   - מודל נתונים אטומי מהיר (`Structure`, `Model`, `Chain`, `Residue`, `Atom`).
   - ניתוח ספרת קואורדינציה של מתכות מעבר ומתכות דו-ערכיות ($\text{Zn}^{2+}, \text{Mg}^{2+}, \text{Ca}^{2+}, \text{Fe}^{2+}/\text{Fe}^{3+}, \text{Mn}^{2+}, \text{Cu}^{2+}$) וסיווג גיאומטרי 4-קואורדינטיבי (טטרהדרלי, ריבועי מישורי) ו-6-קואורדינטיבי (אוקטהדרלי).
   - שפת סקריפטים ומאקרו ייעודית `.CXL` (Carbox Crystallographic Language).
   - מנוע זיקוק במרחב הממשי (Real-Space Refinement) לתיקון עיוותים גיאומטריים.
   - סטודיו תלת-ממדי מבוסס WebGL וממשק שורת פקודה (CLI).

---

## התקנה

### דרישות קדם
- Python 3.9 ומעלה (נבדק ותואם עד Python 3.14)
- `gemmi`
- `numpy`, `scipy`

### התקנה מקוד המקור
```bash
git clone https://github.com/project-carbox/carbox.git
cd Carbox
pip install -e .
```

---

## ציטוט מדעי רשמי (2026)

בעת שימוש בחבילה במחקר אקדמי או תעשייתי, יש לצטט:

> **Suleiman M Hajizadeh & Garib N Murshudov (2026).**  
> *Carbox & CarboxMol: Automated Identification, Quantum Simulation, and Refinement of Anomalous Carboxyl Protonation States in Macromolecular Crystallography.*  
> Carbox Computational Structural Biology Platform.

### פורמט BibTeX
```bibtex
@article{Carbox2026,
  author    = {{Suleiman M Hajizadeh & Garib N Murshudov}},
  title     = {Structural Identification of Anomalous Carboxyl Protonation States, Low-Barrier Hydrogen Bonds, and Microenvironment Dielectric Shielding in High-Resolution Protein Crystal Structures},
  journal   = {Carbox & CarboxMol Macromolecular Crystallography Suite},
  year      = {2026},
  publisher = {Carbox Computational Structural Biology Platform},
  url       = {https://github.com/project-carbox/carbox}
}
```

---

## תוכן עניינים ומדריכים

- **[ספריית Carbox המדעית](carbox.md)**: יסודות מדעיים, סימולציית העברת פרוטון, ביקורת אטומים ומנוע גרפים.
- **[סביבת העבודה CarboxMol](carboxmol.md)**: מודל אטומי, תיאום מתכות 4-קואורדינטיביות, סקריפטים CXL ו-CLI.
- **[אילוצי עידון חיצוניים ל-Carbox Refinement ו-Carbox Refinement](restraints.md)**: תחביר אילוצים, פרוטונציה מפורשת (ASH/GLH) וזיקוק.
- **[ציטוט והפניות](citation.md)**: פרטי ציטוט מלאים לשנת 2026, פורמטי BibTeX, APA ו-RIS.
