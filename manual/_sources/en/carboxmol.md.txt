# CarboxMol Workbench — Commands, Codes & Macro Automation

**CarboxMol** is a universal 3D macromolecular crystallography workbench, real-space refinement engine, and interactive bioinorganic modeling platform. This document details all terminal commands, command-line arguments, terminal outputs, Python modeling APIs, and `.CXL` macro automation scripts.

---

## 1. CarboxMol Command-Line Interface (CLI)

The general invocation syntax is:

```bash
$ carboxmol [subcommand | PDB_CODE | file.cif] [options]
```

### Quick Commands
```bash
# 1. Launch 3D Workbench in default browser (port 8050)
$ carboxmol

# 2. Launch workbench preloading a specific PDB entry
$ carboxmol 4LGN

# 3. Launch on a custom port
$ carboxmol server --port 8080

# 4. Stereochemical & geometric validation
$ carboxmol validate 4LGN.pdb

# 5. Real-space idealization and refinement
$ carboxmol refine 4LGN.pdb -o refined.pdb --cycles 50

# 6. Detect bioinorganic metal coordination polyhedra (4-fold & 6-fold)
$ carboxmol metal 4LGN.pdb

# 7. Non-covalent interaction analysis (salt bridges, pi-stacking, LBHB)
$ carboxmol pli 4LGN.pdb

# 8. Execute a .CXL macro automation script
$ carboxmol script pipeline.cxl
```

---

## 2. Command: `carboxmol validate`

Performs comprehensive stereochemical and geometric validation on a macromolecular structure.

```bash
$ carboxmol validate 4LGN.pdb
```

#### Terminal Output Log:
```text
======================================================================
  CarboxMol Stereochemical Validation Report
  Target: 4LGN (Atoms: 1,642, Residues: 198)
======================================================================

[1] Ramachandran Backbone Dihedrals (phi / psi):
    - Preferred Regions : 97.4% (193 residues)
    - Allowed Regions   : 2.6% (5 residues)
    - Outliers          : 0.0% (0 residues)
    - Status            : PASS (High-resolution quality)

[2] Sidechain Rotamer Evaluator (chi1 / chi2 / chi3):
    - Favored Rotamers  : 96.1%
    - Poor Rotamers     : 3.9%
    - Outliers          : 0 (No severe sidechain strain)

[3] Steric Clashscore (Non-bonded overlap > 0.40 Å):
    - Total Clashes     : 0
    - Clashscore        : 0.00 / 1000 atoms (Clean packing)

[4] C-Beta Deviation (> 0.25 Å):
    - Outliers          : 0 (Proper chiral geometry)

[5] Carbox Anomalous Contact Audit:
    - Asp25 (A) ··· Asp25 (B) : d = 2.452 Å (CRITICAL: Low-Barrier H-Bond)
    - Restraint generated     : exte dist first resi 25 chain A atom OD2 second resi 25 chain B atom OD2 value 2.450 sigma 0.02

======================================================================
[+] Overall Stereochemical Quality: EXCELLENT (Score: 98.6 / 100)
```

---

## 3. Command: `carboxmol metal`

Inspects coordination polyhedra around transition metals ($\text{Zn}^{2+}, \text{Mg}^{2+}, \text{Ca}^{2+}, \text{Fe}^{2+}, \text{Mn}^{2+}, \text{Cu}^{2+}$) within a $3.10\,\text{Å}$ radius, classifying 4-fold (tetrahedral, square planar) and 6-fold (octahedral) geometries.

```bash
$ carboxmol metal 1CA2.pdb --cutoff 3.10
```

#### Terminal Output Log:
```text
======================================================================
  CarboxMol Bioinorganic Metal Coordination Engine
  Target: 1CA2 (Carbonic Anhydrase II)
======================================================================

[*] Scanning structure for transition & divalent metal centers...
[+] Identified 1 catalytic metal center:

----------------------------------------------------------------------
Metal Center #1: ZN 301 (Chain A)
  - Element             : Zinc (Zn II)
  - Coordination Number : 4
  - Geometry Class      : FOUR_FOLD_TETRAHEDRAL
  - Coordination Score  : 0.985 (Near-ideal tetrahedral symmetry)
  - Angular RMSD        : 3.2° (Relative to ideal 109.47°)
  - Mean Distance       : 2.048 Å

  Coordinating Ligands:
    1. Chain A | HIS 94  (NE2) : d = 2.035 Å  [Covalent/Coordination]
    2. Chain A | HIS 96  (NE2) : d = 2.051 Å  [Covalent/Coordination]
    3. Chain A | HIS 119 (ND1) : d = 2.042 Å  [Covalent/Coordination]
    4. Chain A | HOH 401 (O)   : d = 2.064 Å  [Catalytic Hydroxide/Water]

  Suggested Restraints (Carbox Refinement / Carbox Refinement format):
    exte dist first resi 301 chain A atom ZN second resi 94  chain A atom NE2 value 2.035 sigma 0.02
    exte dist first resi 301 chain A atom ZN second resi 96  chain A atom NE2 value 2.051 sigma 0.02
    exte dist first resi 301 chain A atom ZN second resi 119 chain A atom ND1 value 2.042 sigma 0.02
    exte dist first resi 301 chain A atom ZN second resi 401 chain A atom O   value 2.064 sigma 0.03
----------------------------------------------------------------------

[+] Color Assignment:
    - By Element  : #818cf8 (Zinc Purple-Blue)
    - By Geometry : #c084fc (Tetrahedral Lavender)
```

---

## 4. Command: `carboxmol refine`

Performs fast real-space geometric regularization and conjugate-gradient minimization on a local coordinate file:

```bash
$ carboxmol refine 4LGN.pdb --target-dist 2.45 --cycles 50 --out 4LGN_regularized.pdb
```

#### Options:
| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `input` | `str` | *required* | Path to input `.pdb` or `.cif` coordinate file. |
| `-o`, `--out` | `str` | `refined.pdb` | Destination file for idealized coordinates. |
| `--cycles` | `int` | `50` | Maximum iterations for gradient descent minimization. |
| `--target-dist`| `float`| `2.45` | Target distance constraint for identified LBHB pairs ($\text{Å}$). |
| `--weight-geom`| `float`| `1.00` | Weight for ideal bond length and angle restraints. |

---

## 5. Python API: In-Object Atom Auditing

Every `Atom` object in the CarboxMol atomic hierarchy can audit itself directly via the native `Carbox` engine:

```python
from carboxmol.core.structure import Structure
from carboxmol.modeling.metal import find_all_metal_coordination_sites

# Load structure
st = Structure.from_file("4LGN.cif")

# 1. Audit specific atom
atom = st.get_atom(chain_id="A", resi=25, atom_name="OD2")
audit = atom.audit_with_carbox(st)

print("Atom:", atom.name, "in", atom.resi)
print("Severity:", audit.severity) # CRITICAL
print("Diagnoses:", audit.diagnoses)
for r in audit.suggested_restraints:
    print("Carbox Refinement Directive:", r)

# 2. Metal coordination analysis
sites = find_all_metal_coordination_sites(st, cutoff=3.10)
for site in sites:
    print(f"Metal: {site.element} at {site.chain}:{site.resi}")
    print(f"Coordination Number: {site.coordination_number} ({site.geometry})")
    print(f"Palette Colors: Element={site.element_color}, Geometry={site.geometry_color}")
```

---

## 6. CXL Macro Scripting Engine

CarboxMol features `.CXL` (Carbox Crystallographic Language), a declarative scripting language for reproducible structural biology pipelines:

```cxl
# ======================================================================
# Active Site Protonation & Restraint Pipeline (.CXL)
# ======================================================================

# 1. Ingest coordinate model
LOAD "4LGN.cif"

# 2. Select the catalytic carboxyl dyad
SELECT :25.A.OD2, :25.B.OD2 AS active_dyad

# 3. Geometric inspection
MEASURE DISTANCE active_dyad
AUDIT active_dyad

# 4. Impose LBHB external distance restraint
RESTRAIN DISTANCE active_dyad VALUE 2.450 SIGMA 0.02

# 5. Simulate reverse proton transfer ("Əks Ağız")
SIMULATE PROTON active_dyad DIRECTION reverse STEPS 50

# 6. Real-space geometry refinement
REFINE SELECTION active_dyad METHOD conjugate_gradient CYCLES 100

# 7. Save results
SAVE "4LGN_carbox_refined.cif"
EXPORT RESTRAINTS "4LGN_refmac.txt"
```

### Running CXL Scripts via CLI:
```bash
$ carboxmol script pipeline.cxl
```
