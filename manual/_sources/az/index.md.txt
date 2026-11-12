# Carbox və CarboxMol Sənədləşmə Portalı

**Yüksək Ayırdetməli Makromolekulyar Kristal Strukturlarında Anomal Karboksil Protonlaşma Hallarının, Aşağı Maneəli Hidrogen Rabitələrinin (LBHB) və Mikro-mühit Dielektrik Ekranlaşmasının Struktur İdentifikasiyası**

**Müəlliflər:** Süleyman M. Hacızadə və Qərib N. Mürşüdov  
*Versiya:* 0.4.5  
*Platforma:* Carbox Hesablama Strukturlu Biologiya Platforması  
\* *Əlaqədar müəllif:* `suleyman.hacizade1@gmail.com`

---

## İcmal

**Carbox və CarboxMol** struktur biologiyasında ən çətin təyin olunan problemlərdən birini — anomal karboksilat protonlaşmasını ($-\text{COOH} \cdots ^-\text{OOC}-$) və Aşağı Maneəli Hidrogen Rabitələrini (LBHB, $d_{O\cdots O} \le 2.55\,\text{Å}$) avtomatlaşdırılmış şəkildə aşkar edən və dəqiqləşdirən qabaqcıl hesablama biologiyası və kristallografiya paketidir.

Sistem iki əsas platformadan ibarətdir:

1. **`Carbox` (`carbox`)** — Yüksək məhsuldarlıqlı elmi hesablama biologiyası kitabxanası:
   - Karboksil cütlərinin fəza məsafələrinin avtomatik skrininqi ($d_{O\cdots O} \le 3.20\,\text{Å}$).
   - Su basdırılma indeksi ($d_w$) və mikro-mühit dielektrik ekranlaşmasının ($\varepsilon_{\text{eff}} \approx 2-4$) təyini.
   - Kvant-mexaniki 1D potensial enerji səthi (PES) və düzünə, əksinə ("əks ağız") və ikiistiqamətli proton ötürülmə simulyasiyası.
   - Şübhəli atom auditi (`carbox.validate_atom`) və Carbox Refinement üçün avtomatik xarici məsafə məhdudiyyətləri (`exte dist`).
   - Sıfır asılılıqlı, doğma topoqrafik qraf mühərriki (`carbox.graph`).

2. **`CarboxMol` (`carboxmol`)** — 3D makromolekulyar kristallografiya mühiti və modelləşdirmə platforması:
   - Yüksək sürətli atom məlumat modeli (`Structure`, `Model`, `Chain`, `Residue`, `Atom`).
   - Keçid metallarının koordinasiya sferası analizi ($\text{Zn}^{2+}, \text{Mg}^{2+}, \text{Ca}^{2+}, \text{Fe}^{2+}/\text{Fe}^{3+}, \text{Mn}^{2+}, \text{Cu}^{2+}$) və 4-qat (tetrahedral, kvadrat planar) və 6-qat (oktahedral) həndəsə təyini.
   - Doğma Carbox Kristallografik Dili (`.CXL`) makro skript mühərriki.
   - Həqiqi fəza həndəsi nizamlanması və dəqiqləşdirilməsi (real-space refinement).
   - İnteraktiv WebGL 3D Studiya və terminal CLI proqramı.

---

## Quraşdırma

### Tələblər
- Python 3.9+ (Python 3.14 daxil olmaqla sınaqdan keçirilib)
- `gemmi` (kristallografik nüvə kitabxanası)
- `numpy`, `scipy`

### Mənbə Kodundan Quraşdırma
```bash
git clone https://github.com/project-carbox/carbox.git
cd Carbox
pip install -e .
```

### Quraşdırmanın Yoxlanılması
```bash
python -c "import carbox, carboxmol; print('Carbox versiyası:', carbox.__version__)"
carbox --help
carboxmol --help
```

---

## İstinad və Ədəbiyyat (2026)

Tədqiqatlarınızda Carbox və ya CarboxMol paketindən istifadə etdikdə, zəhmət olmasa aşağıdakı elmi əsərə istinad edin:

> **Suleiman M Hajizadeh & Garib N Murshudov (2026).**  
> *Carbox & CarboxMol: Automated Identification, Quantum Simulation, and Refinement of Anomalous Carboxyl Protonation States in Macromolecular Crystallography.*  
> Molekulyar Biologiya İnstitutu, Bakı və MRC Molekulyar Biologiya Laboratoriyası, Kembric, Böyük Britaniya.

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

## Sənədləşmə Bölmələri

- **[Carbox Elmi Kitabxanası](carbox.md)**: Elmi prinsiplər, kvant proton ötürülməsi, şübhəli atom auditi və qraf mühərriki.
- **[CarboxMol Modelləşdirmə Mühiti](carboxmol.md)**: Atom modeli, 4-qat metal koordinasiyası, CXL makroları və CLI.
- **[Carbox Refinement və Carbox Refinement Xarici Məhdudiyyətləri](restraints.md)**: Məhdudiyyət formatı (`exte dist`), ASH/GLH parametrləri və Carbox Refinement icrası.
- **[İstinad və Müəlliflik](citation.md)**: Rəsmi 2026 nəşr məlumatları, BibTeX, APA və RIS formatları.
