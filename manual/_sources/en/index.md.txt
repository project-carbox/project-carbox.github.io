# Carbox & CarboxMol Documentation

**Structural Identification of Anomalous Carboxyl Protonation States, Low-Barrier Hydrogen Bonds, and Microenvironment Dielectric Shielding in High-Resolution Macromolecular Crystal Structures**

**Authors:** Suleiman M Hajizadeh & Garib N Murshudov  
*Version:* 0.4.5  
*Platform:* Carbox Computational Structural Biology Platform  
\* *Corresponding author:* `suleyman.hacizade1@gmail.com`

---

## Overview

**Carbox & CarboxMol** is a state-of-the-art computational biology and macromolecular crystallography suite designed to resolve one of structural biology's most persistent blind spots: anomalous carboxylate protonation ($-\text{COOH} \cdots ^-\text{OOC}-$) and Low-Barrier Hydrogen Bonds (LBHB, $d_{O\cdots O} \le 2.55\,\text{Å}$).

The suite is divided into two focused systems:

1. **`Carbox` (`carbox`)** — The high-throughput computational biology library:
   - Automated screening and spatial proximity analysis of carboxyl pairs ($d_{O\cdots O} \le 3.20\,\text{Å}$).
   - Water burial index ($d_w$) and microenvironment dielectric shielding ($\varepsilon_{\text{eff}} \approx 2-4$) estimation.
   - Quantum-mechanical 1D potential energy surface (PES) and proton transfer simulation with forward, reverse ("əks ağız"), and bidirectional shuttle modes.
   - Suspicious atom audit (`carbox.validate_atom`) with automated Carbox Refinement external distance restraints generation.
   - Native, zero-dependency topological graph engine (`carbox.graph`).

2. **`CarboxMol` (`carboxmol`)** — The 3D macromolecular crystallography workbench & modeling engine:
   - High-performance atomic data model (`Structure`, `Model`, `Chain`, `Residue`, `Atom`).
   - Transition and divalent metal coordination sphere analysis ($\text{Zn}^{2+}, \text{Mg}^{2+}, \text{Ca}^{2+}, \text{Fe}^{2+}/\text{Fe}^{3+}, \text{Mn}^{2+}, \text{Cu}^{2+}$) with 4-fold (tetrahedral, square planar) and 6-fold (octahedral) geometry classification.
   - Native Carbox Crystallographic Language (`.CXL`) macro scripting engine.
   - Real-space geometric regularization and refinement.
   - WebGL 3D Studio and headless terminal CLI.

---

## Installation

### Prerequisites
- Python 3.9+ (tested through Python 3.14)
- `gemmi` (crystallographic core library)
- `numpy`, `scipy`

### Installing from Source
```bash
git clone https://github.com/project-carbox/carbox.git
cd Carbox
pip install -e .
```

### Verifying Installation
```bash
python -c "import carbox, carboxmol; print('Carbox version:', carbox.__version__)"
carbox --help
carboxmol --help
```

---

## References & Citation (2026)

When using Carbox or CarboxMol in your academic or industrial research, please cite:

> **Suleiman M Hajizadeh & Garib N Murshudov (2026).**  
> *Carbox & CarboxMol: Automated Identification, Quantum Simulation, and Refinement of Anomalous Carboxyl Protonation States in Macromolecular Crystallography.*  
> Carbox Computational Structural Biology Platform.

### BibTeX
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

## Documentation Contents

- **[Carbox Scientific Library](carbox.md)**
  - Scientific formulations & $pK_a$ perturbation
  - Spatial screening algorithms ($d_{O\cdots O} \le 3.20\,\text{Å}$)
  - Quantum proton transfer & reverse mouth simulation
  - Suspicious atom validation & restraint generation
  - Native graph engine (`carbox.graph`)
  - Python API Reference
- **[CarboxMol Workbench & Modeling Engine](carboxmol.md)**
  - Core atomic hierarchy
  - Transition metal coordination & 4-fold geometry
  - CXL macro scripting engine
  - Real-space refinement
  - Command-line interface
- **[Carbox Refinement Restraints](restraints.md)**
  - Restraint formatting (`exte dist`)
  - ASH and GLH neutral carboxylate parameterization
  - Carbox Refinement pipeline execution
- **[Citation & Authorship](citation.md)**
  - Full author affiliations and BibTeX / APA / RIS formats
