# סביבת העבודה CarboxMol — פקודות, קודים ואוטומציית מאקרו

**CarboxMol** היא סביבת עבודה קריסטלוגרפית תלת-ממדית מתקדמת, מנוע זיקוק מרחב ממשי, ופלטפורמת מידול ביו-אי-אורגנית. מסמך זה מפרט את כל פקודות שורת הפקודה, הפרמטרים, פלטי המסוף, ממשקי התכנות של Python, וסקריפטים של מאקרו בשפת `.CXL`.

---

## 1. ממשק שורת הפקודה (CLI)

תחביר השימוש הכללי:

```bash
$ carboxmol [subcommand | PDB_CODE | file.cif] [options]
```

### פקודות נפוצות
```bash
# 1. הפעלת סטודיו ה-3D בדפדפן ברירת המחדל (פורט 8050)
$ carboxmol

# 2. פתיחה מיידית של מבנה PDB מבוקש
$ carboxmol 4LGN

# 3. הפעלה בפורט מותאם אישית
$ carboxmol server --port 8080

# 4. אימות וביקורת סטריאוכימית וגיאומטרית
$ carboxmol validate 4LGN.pdb

# 5. זיקוק ורגולריזציה גיאומטרית במרחב הממשי
$ carboxmol refine 4LGN.pdb -o refined.pdb --cycles 50

# 6. זיהוי פאוני קואורדינציה של מתכות מעבר (4 ו-6 קואורדינציות)
$ carboxmol metal 4LGN.pdb

# 7. ניתוח אינטראקציות לא-קוולנטיות (גשרי מלח, LBHB, צימוד פאי)
$ carboxmol pli 4LGN.pdb

# 8. הרצת סקריפט מאקרו אוטומטי .CXL
$ carboxmol script pipeline.cxl
```

---

## 2. פקודה: `carboxmol validate`

מבצעת אימות סטריאוכימי מלא על גבי דיאגרמת רמצ'נדרן, רוטמרים, התנגשויות סטריות ומגעי קרבוקסילט חריגים:

```bash
$ carboxmol validate 4LGN.pdb
```

#### פלט מסוף לדוגמה:
```text
======================================================================
  CarboxMol Stereochemical Validation Report
  Target: 4LGN (Atoms: 1,642, Residues: 198)
======================================================================

[1] Ramachandran Backbone Dihedrals (phi / psi):
    - אזורים מועדפים  : 97.4% (193 שיירים)
    - אזורים מותרים   : 2.6% (5 שיירים)
    - חריגים (Outliers): 0.0% (0 שיירים)
    - סטטוס           : PASS (איכות ברזולוציה גבוהה)

[2] Sidechain Rotamers (רוטמרים של שרשרת הצד):
    - רוטמרים תקינים  : 96.1%
    - רוטמרים לקויים  : 3.9%

[3] Steric Clashscore (מדד התנגשויות סטריות):
    - סך התנגשויות    : 0 (ציון התנגשות: 0.00 / 1000 אטומים)

[4] Carbox Anomalous Contact Audit:
    - Asp25 (A) ··· Asp25 (B) : d = 2.452 Å (קריטי: קשר מימן בעל מחסום נמוך)
    - אילוץ שנוצר             : exte dist first resi 25 chain A atom OD2 second resi 25 chain B atom OD2 value 2.450 sigma 0.02

======================================================================
[+] ציון איכות סטריאוכימי כללי: מצוין (ציון: 98.6 / 100)
```

---

## 3. פקודה: `carboxmol metal`

מנתחת את ספרת הקואורדינציה סביב מתכות מעבר ($\text{Zn}^{2+}, \text{Mg}^{2+}, \text{Ca}^{2+}, \text{Fe}^{2+}, \text{Mn}^{2+}, \text{Cu}^{2+}$) ומסווגת גיאומטריות 4-קואורדינטיביות (טטרהדרלי, ריבועי מישורי) ו-6-קואורדינטיביות (אוקטהדרלי):

```bash
$ carboxmol metal 1CA2.pdb --cutoff 3.10
```

#### פלט מסוף לדוגמה:
```text
======================================================================
  CarboxMol Bioinorganic Metal Coordination Engine
  Target: 1CA2 (Carbonic Anhydrase II)
======================================================================

[*] סריקת מבנה לאיתור יוני מתכת...
[+] זוהה מרכז מתכתי קטליטי יחיד:

----------------------------------------------------------------------
Metal Center #1: ZN 301 (Chain A)
  - יסוד                : Zinc (Zn II)
  - מספר קואורדינציה    : 4
  - סיווג גיאומטרי      : FOUR_FOLD_TETRAHEDRAL
  - ציון קואורדינציה    : 0.985 (סימטריה טטרהדרלית כמעט מושלמת)
  - סטיית זווית RMSD    : 3.2° (ביחס ל-109.47° אידיאלי)
  - מרחק ממוצע          : 2.048 Å

  ליגנדים מתאמים:
    1. Chain A | HIS 94  (NE2) : d = 2.035 Å  [קשר קואורדינטיבי]
    2. Chain A | HIS 96  (NE2) : d = 2.051 Å  [קשר קואורדינטיבי]
    3. Chain A | HIS 119 (ND1) : d = 2.042 Å  [קשר קואורדינטיבי]
    4. Chain A | HOH 401 (O)   : d = 2.064 Å  [הידרוקסיד/מים קטליטיים]

  אילוצי Carbox Refinement / Carbox Refinement שנוצרו:
    exte dist first resi 301 chain A atom ZN second resi 94  chain A atom NE2 value 2.035 sigma 0.02
    exte dist first resi 301 chain A atom ZN second resi 96  chain A atom NE2 value 2.051 sigma 0.02
    exte dist first resi 301 chain A atom ZN second resi 119 chain A atom ND1 value 2.042 sigma 0.02
    exte dist first resi 301 chain A atom ZN second resi 401 chain A atom O   value 2.064 sigma 0.03
----------------------------------------------------------------------

[+] שיוך צבעים בסטודיו:
    - לפי יסוד      : #818cf8 (אבץ - כחול סגול)
    - לפי גיאומטריה : #c084fc (טטרהדרלי - לבנדר)
```

---

## 4. פקודה: `carboxmol refine`

עידון גיאומטרי במרחב הממשי באמצעות שיפוע צמוד (Conjugate Gradient) לקביעת עמדות אטומים אידיאליות:

```bash
$ carboxmol refine 4LGN.pdb --target-dist 2.45 --cycles 50 --out 4LGN_regularized.pdb
```

---

## 5. ממשק תכנות Python API: ביקורת אטום ישירה

```python
from carboxmol.core.structure import Structure
from carboxmol.modeling.metal import find_all_metal_coordination_sites

# טעינת מודל
st = Structure.from_file("4LGN.cif")

# 1. הפעלת ביקורת על אטום ספציפי
atom = st.get_atom(chain_id="A", resi=25, atom_name="OD2")
audit = atom.audit_with_carbox(st)

print("שם אטום:", atom.name, "בשייר:", atom.resi)
print("חומרת חריגה:", audit.severity)
print("אבחנות:", audit.diagnoses)
for r in audit.suggested_restraints:
    print("הנחיית אילוץ ל-Carbox Refinement:", r)

# 2. ניתוח תיאום מתכות
sites = find_all_metal_coordination_sites(st, cutoff=3.10)
for site in sites:
    print(f"מתכת: {site.element} ({site.chain}:{site.resi})")
    print(f"מספר קואורדינציה: {site.coordination_number} ({site.geometry})")
```

---

## 6. שפת מאקרו CXL לאוטומציה של מחקר

```cxl
# ======================================================================
# סקריפט אוטומציה לפרוטונציה ואילוצים (.CXL)
# ======================================================================

# 1. טעינת קובץ המבנה
LOAD "4LGN.cif"

# 2. בחירת צמד הקרבוקסילטים הקטליטי
SELECT :25.A.OD2, :25.B.OD2 AS active_dyad

# 3. ביקורת גיאומטרית מול מנוע Carbox
MEASURE DISTANCE active_dyad
AUDIT active_dyad

# 4. הטלת אילוץ מרחק חיצוני לקשר LBHB
RESTRAIN DISTANCE active_dyad VALUE 2.450 SIGMA 0.02

# 5. סימולציית העברת פרוטון בכיוון הפוך ("פיות הפוכות")
SIMULATE PROTON active_dyad DIRECTION reverse STEPS 50

# 6. עידון גיאומטרי במרחב הממשי
REFINE SELECTION active_dyad METHOD conjugate_gradient CYCLES 100

# 7. שמירת התוצאות
SAVE "4LGN_carbox_refined.cif"
EXPORT RESTRAINTS "4LGN_refmac.txt"
```
