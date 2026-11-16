# Carbox Sənədləşmə Portalı

**Yüksək Ayırdetməli Makromolekulyar Kristal Strukturlarında Anomal Karboksil Protonlaşma Hallarının, Aşağı Maneəli Hidrogen Rabitələrinin (LBHB) və Mikro-mühit Dielektrik Ekranlaşmasının Struktur İdentifikasiyası**

**Müəlliflər:** Süleyman M. Hacızadə və Qərib N. Mürşüdov  
*Versiya:* 0.4.5  
*Platforma:* Carbox Hesablama Strukturlu Biologiya Platforması  
\* *Əlaqədar müəllif:* `suleyman.hacizade1@gmail.com`

---

## İcmal

**Carbox** (`carbox`) struktur biologiyasında və makromolekulyar kristallografiyada anomal karboksilat protonlaşmasını ($-\text{COOH} \cdots ^-\text{OOC}-$) və Aşağı Maneəli Hidrogen Rabitələrini (LBHB, $d_{O\cdots O} \le 2.55\,\text{Å}$) yüksək dəqiqliklə aşkar edən elmi hesablama biologiyası kitabxanasıdır:

- **Karboksil cütlərinin fəza məsafələrinin avtomatik skrininqi** ($d_{O\cdots O} \le 3.20\,\text{Å}$).
- **Su basdırılma indeksi ($d_w$)** və mikro-mühit dielektrik ekranlaşmasının ($\varepsilon_{\text{eff}} \approx 2-4$) təyini.
- **Kvant-mexaniki 1D potensial enerji səthi (PES)** və düzünə, əksinə ("əks ağız") və ikiistiqamətli proton ötürülmə simulyasiyası.
- **Şübhəli atom auditi (`carbox.validate_atom`)** və REFMAC5, Servalcat və Phenix üçün avtomatik xarici məsafə məhdudiyyətləri (`exte dist`).
- **Sıfır asılılıqlı, doğma topoqrafik qraf mühərriki (`carbox.graph`)**.

*(Qeyd: İnteraktiv 3D WebGL elektron sıxlığı vizuallaşdırması, real-vaxt sıxlıq kəsimi və molekulyar dinamika simulyasiyası üçün ayrıca **CarboxMol** platformasına müraciət edin: [https://carboxmol.readthedocs.io/](https://carboxmol.readthedocs.io/) və ya [https://carboxmol.github.io/](https://carboxmol.github.io/)).*

---

## Quraşdırma

### Tələblər
- Python 3.9+ (Python 3.14 daxil olmaqla sınaqdan keçirilib)
- `gemmi` (kristallografik nüvə kitabxanası)
- `numpy`, `scipy`

### Mənbə Kodundan Quraşdırma
```bash
git clone https://github.com/project-carbox/carbox.git
cd carbox
pip install -e .
```

### Quraşdırmanın Yoxlanılması
```bash
python -c "import carbox; print('Carbox versiyası:', carbox.__version__)"
carbox --help
```

---

## İstinad və Ədəbiyyat (2026)

Tədqiqatlarınızda Carbox paketindən istifadə etdikdə, zəhmət olmasa aşağıdakı elmi əsərə istinad edin:

> **Suleiman M Hajizadeh & Garib N Murshudov (2026).**  
> *Carbox: Macromolecular Coordinate & Geometry Calculation Engine for Carboxyl Microenvironments and Stereochemical Validation.*  
> Molekulyar Biologiya İnstitutu, Bakı və MRC Molekulyar Biologiya Laboratoriyası, Kembric, Böyük Britaniya.

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

## Sənədləşmə Bölmələri

- **[Carbox Elmi Kitabxanası](carbox.md)**: Elmi prinsiplər, kvant proton ötürülməsi, şübhəli atom auditi və qraf mühərriki.
- **[Carbox Refinement Xarici Məhdudiyyətləri](restraints.md)**: Məhdudiyyət formatı (`exte dist`), ASH/GLH parametrləri və REFMAC5 / Servalcat icrası.
- **[İstinad və Müəlliflik](citation.md)**: Rəsmi 2026 nəşr məlumatları, BibTeX, APA və RIS formatları.
