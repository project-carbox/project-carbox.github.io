# Carbox - Macromolecular Crystallographic Validation Platform

Structural Identification of Anomalous Carboxyl Protonation States, Low-Barrier Hydrogen Bonds, and Microenvironment Dielectric Shielding

- Web Portal: [https://project-carbox.github.io/](https://project-carbox.github.io/)
- Documentation: [https://project-carbox.readthedocs.io/en/latest/](https://project-carbox.readthedocs.io/en/latest/)
- Core Repository: [https://github.com/project-carbox/carbox](https://github.com/project-carbox/carbox)
- Contact: [suleyman.hacizade1@gmail.com](mailto:suleyman.hacizade1@gmail.com)

## Private Data and Repository Access Notice

**English:** All raw crystallographic datasets, 7,230-PDB screening matrices, electron density correlation profiles (2mFo-DFc), backend computational pipelines, and manuscript drafts in `project-carbox/carbox` are private. Academic researchers, peer reviewers, and collaborators wishing to request access may contact Suleiman M. Hajizadeh at [suleyman.hacizade1@gmail.com](mailto:suleyman.hacizade1@gmail.com?subject=Access%20Request%20-%20Project%20Carbox%20Private%20Data%20%26%20Repository).

**Azərbaycanca:** Bu tədqiqat platformasındakı bütün xam kristalloqrafik məlumat bazaları, 7,230 PDB strukturu üzrə tam skrininq matrisaları, elektron sıxlığı xəritələri və əsas hesablama boru xətləri (`carbox`) məxfidir (private). Məlumatlara və ya qapalı tədqiqat repozitoriyasına giriş əldə etmək üçün elektron poçt vasitəsilə müraciət edə bilərsiniz.

## Overview

`project-carbox.github.io` is the web portal for the Carbox research platform. Developed by Suleiman M. Hajizadeh, this portal presents a computational validation framework based on the crystallographic refinement principles of Prof. Garib N. Murshudov (MRC-LMB Cambridge) to evaluate atomic-resolution protein structures and distinguish shared-proton Low-Barrier Hydrogen Bonds (LBHBs) from refinement artifacts, thermal disorder, and unmodeled metal complexes across the Protein Data Bank (PDB).

> "If there is no electron density for atoms, they are mismodeled. If atoms are mismodeled, the distance between them is completely meaningless."
> - Prof. Garib N. Murshudov, MRC Laboratory of Molecular Biology (Cambridge, Seminar 20 October 2026)

## Key Components

1. **Four-Stage Validation Protocol**:
   - Stage 1 (Geometric Mining and Burial): Euclidean distance scanning (`d(O...O) <= 3.20 A`, LBHB cutoff `<= 2.55 A`) and solvent exclusion (`d(water) > 3.0 A`).
   - Stage 2 (Non-Parametric Filtering): Filtering via Tukey Interquartile Range (IQR, alpha in {1.5, 3.0}) on atomic B-factors and Fisher z-transformed Real-Space Correlation Coefficients (RSCC).
   - Stage 3 (Protonation Modeling): Empirical PROPKA shift evaluation measuring electrostatic delta pKa >= +2.0 in low-dielectric pockets (epsilon ~ 2-4).
   - Stage 4 (Benchmark Library): Validation against reference catalytic and structural LBHBs (`1KZK`, `1OEW`, `2DSX`, `1FKN`).
2. **Interactive 3D Molecular Viewer**:
   - Browser-based WebGL rendering using 3Dmol.js with presets for `1KZK` (HIV-1 Protease), `1OEW` (Endothiapepsin), `2DSX` (Rubredoxin), and `1FKN` (BACE-1).
3. **Benchmark Data Table**:
   - Searchable and filterable table of sub-angstrom and atomic-resolution reference structures.

## Author and Scientific Acknowledgment

- **Suleiman M. Hajizadeh** (Author and Developer)  
  Institute of Molecular Biology, Ministry of Science and Education of the Republic of Azerbaijan; Western Caspian University, Baku, Azerbaijan
- **Prof. Garib N. Murshudov** (Scientific Inspiration and Theoretical Reference)  
  MRC Laboratory of Molecular Biology (LMB), Cambridge Biomedical Campus, Cambridge, United Kingdom

## Citation

```bibtex
@software{HajizadehCarbox2026,
  author    = {Hajizadeh, Suleiman M},
  title     = {Carbox: Macromolecular Coordinate & Geometry Calculation Engine for Carboxyl Microenvironments and Stereochemical Validation},
  year      = {2026},
  url       = {https://project-carbox.github.io/}
}
```

## Related Repositories

- Core Engine: [`project-carbox/carbox`](https://github.com/project-carbox/carbox)
- Documentation: [https://project-carbox.readthedocs.io/en/latest/](https://project-carbox.readthedocs.io/en/latest/)
- 3D Workbench: [`carboxmol/carboxmol`](https://github.com/carboxmol/carboxmol)
- Project Organization: [`project-carbox`](https://github.com/project-carbox)
