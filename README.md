# Carbox — Macromolecular Crystallographic Validation Platform

<p align="center">
  <img src="assets/carbox_logo.svg" alt="Carbox Logo" width="160" />
</p>

<p align="center">
  <strong>Structural Identification of Anomalous Carboxyl Protonation States, Low-Barrier Hydrogen Bonds, and Microenvironment Dielectric Shielding</strong>
</p>

<p align="center">
  <a href="https://project-carbox.github.io/"><img src="https://img.shields.io/badge/Live_Portal-project--carbox.github.io-00e5ff?style=flat-square&logo=githubpages" alt="Live Site" /></a>
  <a href="https://project-carbox.readthedocs.io/en/latest/"><img src="https://img.shields.io/badge/Docs-Read_the_Docs-0284c7?style=flat-square&logo=readthedocs&logoColor=white" alt="Read the Docs" /></a>
  <a href="https://colab.research.google.com/github/project-carbox/carbox/blob/main/notebooks/Carbox_Garib_Murshudov_4Stages_Colab.ipynb"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab" /></a>
  <a href="mailto:suleyman.hacizade1@gmail.com?subject=Private%20Data%20%26%20Repository%20Access%20Request%20-%20Project%20Carbox"><img src="https://img.shields.io/badge/Private_Data_Access-Request_via_Email-dc2626?style=flat-square&logo=gmail" alt="Request Access" /></a>
  <a href="mailto:suleyman.hacizade1@gmail.com"><img src="https://img.shields.io/badge/Contact-suleyman.hacizade1%40gmail.com-10b981?style=flat-square&logo=gmail" alt="Contact" /></a>
  <a href="https://github.com/project-carbox/carbox"><img src="https://img.shields.io/badge/Core_Engine-project--carbox/carbox-7c3aed?style=flat-square&logo=github" alt="Core Engine" /></a>
</p>

---

> [!IMPORTANT]
> ### 🔒 Private Data & Repository Access Notice (Məxfi Məlumatlar və Giriş İcazəsi)
> **English:** All raw crystallographic datasets, full 7,230-PDB screening matrices, electron density correlation profiles ($2mF_o - DF_c$), backend computational pipelines, and manuscript drafts housed in **`project-carbox/carbox`** are **strictly private**. If you are an academic researcher, peer reviewer, or institutional collaborator wishing to access the private repository, please contact **Suleiman M Hajizadeh** via email:  
> 📧 **[suleyman.hacizade1@gmail.com](mailto:suleyman.hacizade1@gmail.com?subject=Access%20Request%20-%20Project%20Carbox%20Private%20Data%20%26%20Repository)**
>
> **Azərbaycanca:** Bu tədqiqat platformasındakı bütün xam kristalloqrafik məlumat bazaları, 7,230 PDB strukturu üzrə tam skrininq matrisaları, elektron sıxlığı xəritələri və əsas hesablama boru xətləri (`carbox`) **məxfidir (private)**. Məlumatlara və ya qapalı tədqiqat repozitoriyasına tam giriş əldə etmək üçün elektron poçt vasitəsilə müraciət edə bilərsiniz.

---

## 🔬 Overview

**Carbox** (`project-carbox.github.io`) is the official public web showcase for the Carbox research platform. Designed and developed by **Suleiman M Hajizadeh**, this portal presents a computational validation framework inspired by the crystallographic refinement philosophy of **Prof. Garib N Murshudov** (MRC-LMB Cambridge) to evaluate atomic-resolution protein structures and distinguish genuine shared-proton Low-Barrier Hydrogen Bonds (LBHBs) from refinement artifacts, thermal disorder, and unmodeled cation complexes across the Protein Data Bank (PDB).

> *"If there is no electron density for atoms, they are mismodeled. If atoms are mismodeled, the distance between them is completely meaningless."*  
> — **Prof. Garib N Murshudov**, MRC Laboratory of Molecular Biology (Cambridge, Seminar 20 October 2026)

---

## 🚀 Key Showcase Features

1. **The 4-Stage Precision Protocol**:
   - **Stage 1 (Geometric Mining & Burial)**: Euclidean distance scanning ($d(O \cdots O) \le 3.20$ Å, LBHB cutoff $\le 2.55$ Å) and solvent exclusion ($d(\text{water}) > 3.0$ Å).
   - **Stage 2 (Non-Parametric Pruning)**: Dual-tier filtering using non-parametric Tukey Interquartile Range (IQR, $\alpha \in \{1.5, 3.0\}$) on atomic $B$-factors and Fisher $z$-transformed Real-Space Correlation Coefficients (RSCC).
   - **Stage 3 (Biochemical Protonation Modeling)**: PROPKA 3 integration measuring electrostatic $\Delta \text{p}K_a \ge +2.0$ shifts in low dielectric pockets ($\varepsilon \approx 2\text{--}4$).
   - **Stage 4 (Golden Benchmark Library)**: Direct validation against 10–20 universally accepted catalytic and structural LBHBs before batch scaling.
2. **Interactive 3D Molecular Graphics**:
   - In-browser WebGL rendering using **3Dmol.js** (zero server requirements, lightweight, fast loading).
   - Interactive presets for `1KZK` (HIV-1 Protease), `1OEW` (Endothiapepsin), `2DSX` (Rubredoxin), and `1FKN` (BACE-1).
3. **Filterable Golden Benchmarks Table**:
   - Real-time search and filtering for sub-angstrom and atomic-resolution structures.
4. **Zero-Dependency Static Architecture**:
   - 100% static client-side frontend (HTML5, modern CSS3 Glassmorphism, Vanilla ES6+ JS).
   - Instant deployment on GitHub Pages.

---

## 👥 Author & Scientific Acknowledgment

- **Suleiman M Hajizadeh** (Author & Lead Developer)  
  *Institute of Molecular Biology, Ministry of Science and Education of the Republic of Azerbaijan*  
  *Western Caspian University, Baku, Azerbaijan*

- **Prof. Garib N Murshudov** (Scientific Inspiration & Theoretical Reference)  
  *MRC Laboratory of Molecular Biology (LMB), Cambridge Biomedical Campus, Cambridge, United Kingdom*

---

## 📖 Citation

If you use the Carbox platform, benchmark datasets, or methodology in your research, please cite:

```bibtex
@software{HajizadehCarbox2026,
  author    = {Hajizadeh, Suleiman M},
  title     = {Carbox: Macromolecular Coordinate & Geometry Calculation Engine for Carboxyl Microenvironments and Stereochemical Validation},
  year      = {2026},
  url       = {https://project-carbox.github.io/}
}
```

---

## 📚 Documentation & Technical Manuals

Complete user documentation, crystallographic theory, API guides, and trilingual memoranda are hosted on **Read the Docs**:
- 📖 **Read the Docs Portal:** [https://project-carbox.readthedocs.io/en/latest/](https://project-carbox.readthedocs.io/en/latest/)
- **Trilingual Manuals:** English (`en`), Azerbaijani (`az`), and Hebrew (`he`).
- **Refinement Restraints:** Algorithmic guide for REFMAC5 & Servalcat restraint generation.
- **Validation Memoranda:** Comprehensive crystallographic review and benchmark validation records.

---

## 🔗 Related Repositories

- **Core Engine & Colab Notebook**: [`project-carbox/carbox`](https://github.com/project-carbox/carbox)
- **Documentation**: [https://project-carbox.readthedocs.io/en/latest/](https://project-carbox.readthedocs.io/en/latest/)
- **Desktop 3D Electron Density Suite**: [`carboxmol/carboxmol`](https://github.com/carboxmol/carboxmol)
- **Project Organization**: [`project-carbox`](https://github.com/project-carbox)
