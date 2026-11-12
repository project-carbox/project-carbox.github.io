# ספריית Carbox המדעית — פקודות, קודים וממשק תכנות API

**Carbox** היא ספריית מחשוב מדעית ייעודית לקריסטלוגרפיה מקרו-מולקולרית ברזולוציה גבוהה. מסמך זה מספק מדריך מקיף לכל פקודות שורת הפקודה (CLI), הפרמטרים, פלטי המסוף, דוגמאות קוד Python והניסוחים המתמטיים.

---

## 1. ממשק שורת הפקודה (CLI)

תחביר השימוש הכללי:

```bash
$ carbox <command> [options]
```

להצגת רשימת פקודות המשנה הנתמכות או עזרה עבור פקודה ספציפית:

```bash
$ carbox --help
$ carbox <command> -h
```

### פקודות משנה מרכזיות
- **`analyze`**: ניתוח מבנה PDB יחיד או סריקה מסיבית על גבי מאות מבנים.
- **`validate`**: ביקורת אטומים חשודים והפקת אילוצי מרחק עבור Carbox Refinement.
- **`refine`**: עידון ורגולריזציה גיאומטרית של מגעים קרבוקסיליים חריגים.
- **`ligands`**: סריקת קרבוקסילטים של ליגנדים (HETATM) מול שיירי Asp/Glu.
- **`plot`**: הפקת גרפי פיזור והתפלגות באיכות פרסום (300 DPI).
- **`pdblist`**: משיכת רשימת מבנים ברזולוציה גבוהה מ-RCSB API v2.
- **`density`**: דגימת מפות צפיפות אלקטרונים (2Fo-Fc / Fo-Fc) וניתוח פיק פרוטון.
- **`macro`**: הפקת סקריפט מאקרו אוטומטי `.CXL` עבור CarboxMol.
- **`serve`**: הפעלת שרת ה-API וסטודיו ה-WebGL המקומי.

---

## 2. פקודה: `carbox analyze`

מנתחת קובץ PDB/mmCIF יחיד או מבצעת סריקה רחבה:

### דוגמה: ניתוח מבנה יחיד
```bash
$ carbox analyze -p 4LGN --max-distance 3.20 --water-burial 3.00 --verbose
```

#### פלט מסוף לדוגמה (Terminal Output):
```text
==============================================================
  Carbox – Anomalous Carboxyl Contact Analysis
  Version 0.4.5
  Mode: Single PDB Analysis | Target: 4LGN
==============================================================

[*] Loading mmCIF coordinate file: 4LGN
[+] Structure parsed successfully:
    - Macromolecule : HIV-1 Protease
    - Resolution    : 1.45 Å
    - Space Group   : P 21 21 21
    - Total Chains  : 2 (A, B)
    - Total Atoms   : 1,642

[*] Screening Asp and Glu carboxylate oxygens (OD1, OD2, OE1, OE2)...
[*] KD-Tree spatial indexing initialized (Cutoff d_OO ≤ 3.20 Å)...

[+] Found 1 anomalous carboxyl contact:
----------------------------------------------------------------------
  Pair ID           : 4LGN_A25_B25
  Residue 1         : Chain A | ASP 25 (OD2)
  Residue 2         : Chain B | ASP 25' (OD2)
  Distance (d_OO)   : 2.452 Å
  Water Burial (dw) : 4.120 Å (קבור לחלוטין בליבת האתר הפעיל)
  Local Dielectric  : eps_eff = 2.65
  pKa Perturbation  : Delta pKa = +4.85 (ערך pKa מחושב: 8.75)
  Verdict           : BURIED_LBHB (קשר מימן בעל מחסום נמוך)
  State Assignment  : פרוטון א-סימטרי יחיד (ASH 25 / ASP 25')
  Carbox Metric  : Delta(C-O) = 0.082 Å (אימות קבוצת הידרוקסיל מפורטת)
  Quantum PES Barrier: 0.78 kcal/mol (קריסה מתחת ל-ZPE = 3.35 kcal/mol)
----------------------------------------------------------------------

[+] Suggested Carbox Refinement Restraint:
    exte dist first resi 25 chain A atom OD2 second resi 25 chain B atom OD2 value 2.452 sigma 0.02

[+] Execution completed in 0.042 seconds.
```

### טבלת פרמטרים ואפשרויות
| אפשרות | סוג | ברירת מחדל | תיאור |
| :--- | :--- | :--- | :--- |
| `-p`, `--pdb` | `str` | `None` | קוד PDB בארבע אותיות (למשל `4LGN`) או נתיב לקובץ `.cif` / `.pdb`. |
| `--limit` | `int` | `None` | מספר המבנים לסריקה רחבה מ-RCSB. |
| `--resolution` | `float` | `2.00` | סף רזולוציית קריסטלוגרפיה מקסימלי באנגסטרום ($\text{Å}$). |
| `--max-distance` | `float` | `3.20` | סף מרחק מקסימלי בין חמצני קרבוקסיל $d_{O\cdots O}$ ($\text{Å}$). |
| `--water-burial` | `float` | `3.00` | מרחק למי הגביש הקרובים ביותר ($d_w$) לסיווג קבורה בממס. |
| `--min-occupancy`| `float` | `1.00` | סף תפוסה אטומית לסינון קונפורמציות מפוצלות. |
| `--exclude-metals`| `flag`| `True` | סינון חיוביים-כוזבים הנובעים מתיאום ליוני מתכת ($3.10\,\text{Å}$). |
| `-o`, `--output` | `str` | `None` | נתיב לקובץ פלט בפורמט CSV או JSON. |

---

## 3. פקודה: `carbox validate`

ביקורת אטום יחיד במבנה לזיהוי התנגשויות סטריות, חריגות פקטור B והפקת אילוצי מרחק:

```bash
$ carbox validate -p 4LGN.cif --atom "A:25:OD2" --clash-cutoff 2.40 --out-restraints restraints.txt
```

---

## 4. העברת פרוטון קוונטית: `simulate_proton_transfer`

Carbox ממדלת את תנועת הפרוטון בין החמצנים באמצעות פוטנציאל מורס כפול מצומד:

### קוד Python: סימולציה קדימה, אחורה ("פיות הפוכות") ודו-כיווני

```python
import numpy as np
from carbox.simulation.proton_transfer import simulate_proton_transfer

# קואורדינטות אטומיות של חמצני הקרבוקסיל
coord_donor = (10.12, 14.50, 22.30)     # Asp25 OD2
coord_acceptor = (10.12, 14.50, 24.75)  # Glu102 OE2 (d = 2.45 Å)

# 1. סימולציה קדימה (Asp25 -> Glu102)
res_fwd = simulate_proton_transfer(
    coord1=coord_donor,
    coord2=coord_acceptor,
    donor_label="Asp25:OD2",
    acceptor_label="Glu102:OE2",
    direction="forward",
    num_steps=50
)
print("מחסום אנרגיה קדימה :", res_fwd.barrier_height_kcal, "kcal/mol")
print("משטר קשר מימן     :", res_fwd.hbond_regime)

# 2. סימולציה בכיוון הפוך ("פיות הפוכות": Glu102 -> Asp25)
# החלפת פיות החמצן וחישוב מחסום האנרגיה ההפוך
res_rev = simulate_proton_transfer(
    coord1=coord_donor,
    coord2=coord_acceptor,
    donor_label="Asp25:OD2",
    acceptor_label="Glu102:OE2",
    direction="reverse",
    num_steps=50
)
print("מחסום אנרגיה הפוך   :", res_rev.barrier_height_kcal, "kcal/mol")
print("הסתברות מנהור       :", res_rev.tunneling_probability)

# 3. סימולציה דו-כיוונית של תנועת הלוך-חזור
res_bidi = simulate_proton_transfer(
    coord1=coord_donor,
    coord2=coord_acceptor,
    direction="bidirectional",
    num_steps=40
)
print("נקודות במסלול התנועה:", len(res_bidi.trajectory))
```

---

## 5. מנוע גרפים טופולוגי: `carbox.graph`

קוד Python עצמאי לחלוטין לבניית רשתות מולקולריות וחישוב פריסה מרחבית:

```python
import carbox.graph as cg

# יצירת גרף מגעים לא-מכוון
G = cg.MolecularGraph()

# הוספת שיירים ומשקולות מרחק
G.add_node("Asp25", resn="ASP", chain="A", pka=8.75)
G.add_node("Asp25_prime", resn="ASP", chain="B", pka=3.90)
G.add_node("Thr26", resn="THR", chain="A")
G.add_node("Wat501", resn="HOH", chain="A")

# הוספת קשתות מגע
G.add_edge("Asp25", "Asp25_prime", weight=2.45, interaction="LBHB")
G.add_edge("Asp25", "Thr26", weight=2.85, interaction="H-bond")
G.add_edge("Thr26", "Wat501", weight=2.72, interaction="Solvation")

# 1. מציאת מסלול קצר ביותר (דייקסטרה)
path = cg.shortest_path(G, "Asp25_prime", "Wat501", weight="weight")
print("נתיב חוט הפרוטונים:", path)

# 2. מדדי מרכזיות
deg_cent = cg.degree_centrality(G)
print("מרכזיות דרגה:", deg_cent)

# 3. זיהוי מעגלים מינימליים
cycles = cg.cycle_basis(G)
print("מעגלים וטבעות שזוהו:", cycles)

# 4. פריסת קפיצים דו-ממדית (Fruchterman-Reingold)
layout_coords = cg.spring_layout(G, iterations=50, seed=42)
for node, (x, y) in layout_coords.items():
    print(f"צומת {node:12s} -> קואורדינטת פריסה: ({x:+.3f}, {y:+.3f})")
```

---

## 6. שילוב עם Carbox Refinement ו-Carbox Refinement

```bash
$ carbox refine \
    --model model.cif \
    --hklin data.mtz \
    --restraints carbox_restraints.txt \
    --hydrogen all \
    --ncycle 10 \
    -o refined_carbox
```
