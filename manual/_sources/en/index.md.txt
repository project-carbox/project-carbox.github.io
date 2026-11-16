# Carbox Documentation

**Structural Identification of Anomalous Carboxyl Protonation States, Low-Barrier Hydrogen Bonds, and Microenvironment Dielectric Shielding in High-Resolution Macromolecular Crystal Structures**

**Authors:** Suleiman M Hajizadeh & Garib N Murshudov  
*Version:* 0.4.5  
*Platform:* Carbox Computational Structural Biology Platform  
\* *Corresponding author:* `suleyman.hacizade1@gmail.com`

---

## Overview

**Carbox** (`carbox`) is an advanced computational biology and macromolecular crystallographic validation library designed to resolve anomalous carboxylate protonation ($-\text{COOH} \cdots ^-\text{OOC}-$) and Low-Barrier Hydrogen Bonds (LBHB, $d_{O\cdots O} \le 2.55\,\text{Å}$) in high-resolution protein crystal structures:

- **Automated screening and spatial proximity analysis** of carboxyl pairs ($d_{O\cdots O} \le 3.20\,\text{Å}$).
- **Water burial index ($d_w$)** and microenvironment dielectric shielding ($\varepsilon_{\text{eff}} \approx 2-4$) estimation.
- **Quantum-mechanical 1D potential energy surface (PES)** and proton transfer simulation with forward, reverse ("əks ağız"), and bidirectional shuttle modes.
- **Suspicious atom audit (`carbox.validate_atom`)** with automated external distance restraints generation for REFMAC5, Servalcat, and Phenix.
- **Native, zero-dependency topological graph engine (`carbox.graph`)** for macromolecular carboxyl network tracing.


---

## Installation

### Prerequisites
- Python 3.9+ (tested through Python 3.14)
- `gemmi` (crystallographic core library)
- `numpy`, `scipy`

### Installing from Source
```bash
git clone https://github.com/project-carbox/carbox.git
cd carbox
pip install -e .
```

### Verifying Installation
```bash
python -c "import carbox; print('Carbox version:', carbox.__version__)"
carbox --help
```

---

## References & Citation (2026)

When using Carbox in your academic or industrial research, please cite:

> **Suleiman M Hajizadeh & Garib N Murshudov (2026).**  
> *Carbox: Macromolecular Coordinate & Geometry Calculation Engine for Carboxyl Microenvironments and Stereochemical Validation.*  
> Institute of Molecular Biology (IMB), Baku & MRC Laboratory of Molecular Biology (LMB), Cambridge, UK.

### BibTeX
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

## Documentation Contents

- **[Carbox Scientific Library](carbox.md)**
  - Scientific formulations & $pK_a$ perturbation
  - Spatial screening algorithms ($d_{O\cdots O} \le 3.20\,\text{Å}$)
  - Quantum proton transfer & reverse mouth simulation
  - Suspicious atom validation & restraint generation
  - Native graph engine (`carbox.graph`)
  - Python API Reference
- **[Carbox Refinement Restraints](restraints.md)**
  - Restraint formatting (`exte dist`)
  - ASH and GLH neutral carboxylate parameterization
  - REFMAC5 and Servalcat refinement execution
- **[Citation & Authorship](citation.md)**
  - Full author affiliations and BibTeX / APA / RIS formats
