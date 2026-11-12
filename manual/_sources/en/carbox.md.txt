# Carbox Scientific Library — Commands, Codes & API Reference

**Carbox** is a high-throughput computational biology and crystallographic analysis engine for macromolecular structures. This documentation provides a comprehensive guide to all command-line tools, arguments, terminal outputs, Python code examples, and mathematical formulations.

---

## 1. Command-Line Interface (CLI)

The basic usage syntax is:

```bash
$ carbox <command> [options]
```

To view all supported subcommands or get help for a specific command:

```bash
$ carbox --help
$ carbox <command> -h
```

### Supported Subcommands
- **`analyze`**: Single PDB analysis or bulk screening across thousands of PDB structures.
- **`validate`**: Audit specific suspicious atoms and output Carbox Refinement external restraints.
- **`refine`**: Geometry refinement and regularization of anomalous carboxyl contacts.
- **`ligands`**: Screen small-molecule HETATM ligand carboxylates against Asp/Glu sidechains.
- **`plot`**: Generate publication-quality 300 DPI distribution plots and scatter charts.
- **`pdblist`**: Query RCSB Search API v2 for structures matching resolution criteria.
- **`density`**: Sample 2Fo-Fc / Fo-Fc electron density and evaluate proton peak heights.
- **`macro`**: Generate a `.CXL` macro automation script for CarboxMol.
- **`serve`**: Launch the local CarboxMol WebGL Studio and API server.

---

## 2. Command: `carbox analyze`

Analyzes a single PDB code or mmCIF file, or performs bulk screening over a set of entries.

### Example: Single Structure Analysis
```bash
$ carbox analyze -p 4LGN --max-distance 3.20 --water-burial 3.00 --verbose
```

#### Terminal Output Log:
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
  Water Burial (dw) : 4.120 Å (Fully buried in catalytic core)
  Local Dielectric  : eps_eff = 2.65
  pKa Perturbation  : Delta pKa = +4.85 (Calculated pKa: 8.75)
  Verdict           : BURIED_LBHB (Low-Barrier Hydrogen Bond)
  State Assignment  : Asymmetric single proton (ASH 25 / ASP 25')
  Carbox Metric  : Delta(C-O) = 0.082 Å (Confirms protonated hydroxyl)
  Quantum PES Barrier: 0.78 kcal/mol (Collapses below ZPE = 3.35 kcal/mol)
----------------------------------------------------------------------

[+] Suggested Carbox Refinement Restraint:
    exte dist first resi 25 chain A atom OD2 second resi 25 chain B atom OD2 value 2.452 sigma 0.02

[+] Execution completed in 0.042 seconds.
```

### Example: Bulk Screening Mode
```bash
$ carbox analyze --limit 500 --resolution 1.80 --max-distance 3.20 --output results_500.csv
```

#### Options Reference:
| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `-p`, `--pdb` | `str` | `None` | 4-character PDB code (e.g. `4LGN`) or path to local `.cif` / `.pdb` file. |
| `--limit` | `int` | `None` | Number of high-resolution structures to screen from RCSB API. |
| `--resolution` | `float` | `2.00` | Maximum crystal diffraction resolution cutoff in Angstroms ($\text{Å}$). |
| `--max-distance` | `float` | `3.20` | Maximum inter-oxygen distance threshold $d_{O\cdots O}$ ($\text{Å}$). |
| `--water-burial` | `float` | `3.00` | Distance to nearest crystallographic water ($d_w$) for burial classification. |
| `--min-occupancy`| `float` | `1.00` | Minimum atomic occupancy to avoid disordered split conformations. |
| `--exclude-metals`| `flag`| `True` | Filter out false positives within $3.10\,\text{Å}$ of metal ions. |
| `-o`, `--output` | `str` | `None` | Path to save output CSV or JSON report. |
| `-v`, `--verbose`| `flag`| `False`| Print detailed geometric diagnostic logs. |

---

## 3. Command: `carbox validate`

Audits a specific atom or residue for geometric anomalies, clashes, B-factor outliers, and generates Carbox Refinement external distance restraints.

```bash
$ carbox validate -p 4LGN.cif --atom "A:25:OD2" --clash-cutoff 2.40 --out-restraints restraints.txt
```

#### Terminal Output Log:
```text
[CARBOX:AUDIT] Analyzing atom A:ASP 25:OD2 (Serial: 198)...
  - Coordination Check   : OK (Normal valence)
  - Steric Clash Scan    : OK (No non-bonded clashes < 2.40 Å)
  - Thermal B-Factor     : 11.20 Å² (Z-score Z_B = -0.42 sigma, Normal)
  - Inter-Carboxyl Contact: CRITICAL (Short contact to B:ASP 25:OD2, d = 2.452 Å)
  - Recommendation       : Re-parameterize as neutral ASH and impose LBHB restraint.

[CARBOX:RESTRAINTS] Written 1 restraint record to 'restraints.txt':
exte dist first resi 25 chain A atom OD2 second resi 25 chain B atom OD2 value 2.450 sigma 0.02
```

---

## 4. Quantum Proton Transfer: `simulate_proton_transfer`

Carbox simulates 1D quantum proton transfer along the donor–acceptor axis using a coupled Morse potential:

$$V(\xi) = D_e \left[ \left(1 - e^{-a(\xi - \xi_0)}\right)^2 + \left(1 - e^{-a(d_{O\cdots O} - \xi - \xi_0)}\right)^2 \right]$$

### Python Code: Forward, Reverse ("Əks Ağız"), and Bidirectional Simulation

```python
import numpy as np
from carbox.simulation.proton_transfer import simulate_proton_transfer

# Atomic coordinates of carboxyl oxygens
coord_donor = (10.12, 14.50, 22.30)     # Asp25 OD2
coord_acceptor = (10.12, 14.50, 24.75)  # Glu102 OE2 (d = 2.45 Å)

# 1. Forward simulation (Asp25 -> Glu102)
res_fwd = simulate_proton_transfer(
    coord1=coord_donor,
    coord2=coord_acceptor,
    donor_label="Asp25:OD2",
    acceptor_label="Glu102:OE2",
    direction="forward",
    num_steps=50
)
print("Forward Barrier :", res_fwd.barrier_height_kcal, "kcal/mol")
print("Regime          :", res_fwd.hbond_regime)

# 2. Reverse simulation ("Əks Ağız": Glu102 -> Asp25)
# Dynamically inverts the mouths, recalculating the reverse activation barrier
res_rev = simulate_proton_transfer(
    coord1=coord_donor,
    coord2=coord_acceptor,
    donor_label="Asp25:OD2",
    acceptor_label="Glu102:OE2",
    direction="reverse",
    num_steps=50
)
print("Reverse Barrier :", res_rev.barrier_height_kcal, "kcal/mol")
print("Reverse Tunneling:", res_rev.tunneling_probability)

# 3. Bidirectional round-trip simulation
res_bidi = simulate_proton_transfer(
    coord1=coord_donor,
    coord2=coord_acceptor,
    direction="bidirectional",
    num_steps=40
)
print("Trajectory Points:", len(res_bidi.trajectory)) # 40 forward + 39 return = 79 points
```

---

## 5. Topological Graph Engine: `carbox.graph`

Carbox features a 100% native, clean-room graph theory engine with zero external dependencies.

### Python Code: Constructing Molecular Networks & Spring Layout

```python
import carbox.graph as cg

# Create undirected molecular contact network
G = cg.MolecularGraph()

# Add residues and contact weights (inter-atomic distance in Angstroms)
G.add_node("Asp25", resn="ASP", chain="A", pka=8.75)
G.add_node("Asp25_prime", resn="ASP", chain="B", pka=3.90)
G.add_node("Thr26", resn="THR", chain="A")
G.add_node("Wat501", resn="HOH", chain="A")

# Add edges with attributes
G.add_edge("Asp25", "Asp25_prime", weight=2.45, interaction="LBHB")
G.add_edge("Asp25", "Thr26", weight=2.85, interaction="H-bond")
G.add_edge("Thr26", "Wat501", weight=2.72, interaction="Solvation")

# 1. Shortest path analysis (Dijkstra)
path = cg.shortest_path(G, "Asp25_prime", "Wat501", weight="weight")
print("Shortest proton wire path:", path)
# Output: ['Asp25_prime', 'Asp25', 'Thr26', 'Wat501']

# 2. Centrality metrics
deg_cent = cg.degree_centrality(G)
print("Degree Centrality:", deg_cent)

# 3. Minimum cycle basis detection
cycles = cg.cycle_basis(G)
print("Rings / Cycles detected:", cycles)

# 4. Force-directed 2D spring layout (Fruchterman-Reingold)
layout_coords = cg.spring_layout(G, iterations=50, seed=42)
for node, (x, y) in layout_coords.items():
    print(f"Node {node:12s} -> 2D Layout Pos: ({x:+.3f}, {y:+.3f})")
```

---

## 6. Carbox Refinement & Carbox Refinement External Restraints

Carbox outputs restraints strictly adhering to CCP4 Carbox Refinement syntax:

```text
exte dist first resi 25 chain A atom OD2 second resi 102 chain A atom OE2 value 2.450 sigma 0.02
```

### Running with Carbox Refinement:
```bash
$ carbox refine \
    --model model.cif \
    --hklin data.mtz \
    --restraints carbox_restraints.txt \
    --hydrogen all \
    --ncycle 10 \
    -o refined_carbox
```

### Output Files from Refinement:
- `refined_carbox.mmcif`: Refined coordinates with regularized LBHB geometry.
- `refined_carbox_diffmap.mtz`: Weighted $2F_o-F_c$ and $F_o-F_c$ electron density maps.
- `refined_carbox_diffmap.mrc`: Normalized real-space density grid.
