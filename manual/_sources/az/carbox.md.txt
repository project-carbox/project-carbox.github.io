# Carbox Elmi Kitabxanası — Əmrlər, Kodlar və API Təlimatı

**Carbox** makromolekulyar kristal strukturlarında protonlaşma halları və hidrogen rabitələrini tədqiq edən yüksək məhsuldarlıqlı elmi hesablama biologiyası mühərrikidir. Bu sənəd bütün terminal əmrlərini, parametrləri, terminal çıxışlarını, Python kodlarını və riyazi düsturları tam şəkildə təqdim edir.

---

## 1. Əmr Sətiri İnterfeysi (CLI)

Əsas istifadə sintaksisi:

```bash
$ carbox <əmr> [seçimlər]
```

Dəstəklənən bütün alt-əmrlərə və ya hər hansı bir əmrin köməyinə baxmaq üçün:

```bash
$ carbox --help
$ carbox <əmr> -h
```

### Dəstəklənən Əsas Əmrlər
- **`analyze`**: Tək PDB kodu / mmCIF faylının analizi və ya minlərlə PDB strukturu üzərində kütləvi skrining.
- **`validate`**: Şübhəli atomların auditi və Carbox Refinement xarici məhdudiyyətlərinin çıxarılması.
- **`refine`**: Anomal karboksil təmaslarının həndəsi nizamlanması və dəqiqləşdirilməsi.
- **`ligands`**: HETATM liqand karboksilatlarının Asp/Glu ilə qarşılıqlı təsir analizi.
- **`plot`**: 300 DPI çap keyfiyyətli paylanma qrafiklərinin yaradılması.
- **`pdblist`**: RCSB API-dən yüksək ayırdetməli PDB siyahısının çəkilməsi.
- **`density`**: 2Fo-Fc / Fo-Fc elektron sıxlığı nümunələnməsi və proton piklərinin təhlili.
- **`macro`**: CarboxMol üçün `.CXL` makro skriptinin generasiyası.
- **`serve`**: Lokal CarboxMol WebGL Studiya və API serverinin işə salınması.

---

## 2. Əmr: `carbox analyze`

Tək PDB strukturunu və ya verilənlər bazası üzrə kütləvi skriningi icra edir.

### Nümunə: Tək Struktur Analizi
```bash
$ carbox analyze -p 4LGN --max-distance 3.20 --water-burial 3.00 --verbose
```

#### Terminal Çıxış Loqu (Terminal Output):
```text
==============================================================
  Carbox – Anomalous Carboxyl Contact Analysis
  Version 0.4.5
  Mode: Single PDB Analysis | Target: 4LGN
==============================================================

[*] mmCIF koordinat faylı yüklənir: 4LGN
[+] Struktur uğurla oxundu:
    - Makromolekul : HIV-1 Proteaz
    - Ayırdetmə   : 1.45 Å
    - Fəza Qrupu   : P 21 21 21
    - Zəncir Sayı  : 2 (A, B)
    - Cəmi Atomlar : 1,642

[*] Asp və Glu karboksil oksigenləri taranır (OD1, OD2, OE1, OE2)...
[*] KD-Tree fəza indeksi başladıldı (Hədd d_OO ≤ 3.20 Å)...

[+] 1 anomal karboksil təması aşkar edildi:
----------------------------------------------------------------------
  Cüt İndeksi       : 4LGN_A25_B25
  Qalıq 1           : Zəncir A | ASP 25 (OD2)
  Qalıq 2           : Zəncir B | ASP 25' (OD2)
  Məsafə (d_OO)     : 2.452 Å
  Su Basdırılması   : 4.120 Å (Katalitik nüvədə tam basdırılıb)
  Lokal Dielektrik  : eps_eff = 2.65
  pKa Dəyişməsi     : Delta pKa = +4.85 (Hesablanan pKa: 8.75)
  Qərar (Verdict)   : BURIED_LBHB (Aşağı Maneəli Hidrogen Rabitəsi)
  Proton Təyini     : Asimmetrik tək proton (ASH 25 / ASP 25')
  Carbox Metrikası: Delta(C-O) = 0.082 Å (Protonlaşmış hidroksili təsdiqləyir)
  Kvant PES Maneəsi : 0.78 kcal/mol (ZPE = 3.35 kcal/mol-dan aşağı düşür)
----------------------------------------------------------------------

[+] Carbox Refinement üçün Məsləhət Görülən Məhdudiyyət:
    exte dist first resi 25 chain A atom OD2 second resi 25 chain B atom OD2 value 2.452 sigma 0.02

[+] İcra müddəti: 0.042 saniyə.
```

### Parametrlər Cədvəli
| Seçim | Tip | Standart | Təsvir |
| :--- | :--- | :--- | :--- |
| `-p`, `--pdb` | `str` | `None` | 4 simvollu PDB kodu (məs. `4LGN`) və ya lokal `.cif` / `.pdb` faylı. |
| `--limit` | `int` | `None` | RCSB-dən avtomatik çəkiləcək struktur sayı. |
| `--resolution` | `float` | `2.00` | Maksimum kristal ayırdetmə həddi ($\text{Å}$). |
| `--max-distance` | `float` | `3.20` | Maksimum oksigen-oksigen məsafəsi $d_{O\cdots O}$ ($\text{Å}$). |
| `--water-burial` | `float` | `3.00` | Ən yaxın kristal suyuna olan məsafə həddi ($d_w$). |
| `--min-occupancy`| `float` | `1.00` | Natamam doluluğu olan atomları kənarlaşdırmaq üçün minimum doluluq. |
| `--exclude-metals`| `flag`| `True` | Metal koordinasiyasında olan yalançı pozitivləri süzgəcdən keçirir. |
| `-o`, `--output` | `str` | `None` | Nəticə CSV və ya JSON faylının yolu. |

---

## 3. Əmr: `carbox validate`

Struktur daxilindəki konkret atomu yoxlayır, sterik toqquşmaları, B-faktor kənarlaşmalarını analiz edir və Carbox Refinement məhdudiyyətlərini çıxarır:

```bash
$ carbox validate -p 4LGN.cif --atom "A:25:OD2" --clash-cutoff 2.40 --out-restraints restraints.txt
```

---

## 4. Kvant Proton Ötürülməsi: `simulate_proton_transfer`

Carbox donor və akseptor oksigenləri arasında 1D kvant proton ötürülməsini qoşalaşmış Morse potensialı ilə simulyasiya edir:

### Python Kodu: Düzünə, Əksinə ("Əks Ağız") və İkiistiqamətli Simulyasiya

```python
import numpy as np
from carbox.simulation.proton_transfer import simulate_proton_transfer

# Karboksil oksigenlərinin koordinatları
coord_donor = (10.12, 14.50, 22.30)     # Asp25 OD2
coord_acceptor = (10.12, 14.50, 24.75)  # Glu102 OE2 (d = 2.45 Å)

# 1. Düzünə simulyasiya (Asp25 -> Glu102)
res_fwd = simulate_proton_transfer(
    coord1=coord_donor,
    coord2=coord_acceptor,
    donor_label="Asp25:OD2",
    acceptor_label="Glu102:OE2",
    direction="forward",
    num_steps=50
)
print("Düzünə Maneə :", res_fwd.barrier_height_kcal, "kcal/mol")
print("Rejim        :", res_fwd.hbond_regime)

# 2. Əks simulyasiya ("Əks Ağız": Glu102 -> Asp25)
# Ağızları dinamik dəyişir və əks maneəni yenidən hesablayır
res_rev = simulate_proton_transfer(
    coord1=coord_donor,
    coord2=coord_acceptor,
    donor_label="Asp25:OD2",
    acceptor_label="Glu102:OE2",
    direction="reverse",
    num_steps=50
)
print("Əks Maneə    :", res_rev.barrier_height_kcal, "kcal/mol")
print("Tunelləmə    :", res_rev.tunneling_probability)

# 3. İkiistiqamətli tam dövrə simulyasiyası
res_bidi = simulate_proton_transfer(
    coord1=coord_donor,
    coord2=coord_acceptor,
    direction="bidirectional",
    num_steps=40
)
print("Trayektoriya Nöqtələri:", len(res_bidi.trajectory))
```

---

## 5. Doğma Topoloji Qraf Mühərriki: `carbox.graph`

Heç bir xarici asılılıq olmadan, 100% təmiz daxili qraf alqoritmləri:

```python
import carbox.graph as cg

# Qeyri-istiqamətli molekulyar əlaqə qrafı yarat
G = cg.MolecularGraph()

# Qovşaqlar əlavə et
G.add_node("Asp25", resn="ASP", chain="A", pka=8.75)
G.add_node("Asp25_prime", resn="ASP", chain="B", pka=3.90)
G.add_node("Thr26", resn="THR", chain="A")
G.add_node("Wat501", resn="HOH", chain="A")

# Çəkili tillər əlavə et
G.add_edge("Asp25", "Asp25_prime", weight=2.45, interaction="LBHB")
G.add_edge("Asp25", "Thr26", weight=2.85, interaction="H-bond")
G.add_edge("Thr26", "Wat501", weight=2.72, interaction="Solvation")

# 1. Ən qısa yol (Deykstra)
path = cg.shortest_path(G, "Asp25_prime", "Wat501", weight="weight")
print("Proton xətti yolu:", path)

# 2. Mərkəzilik dərəcəsi
deg_cent = cg.degree_centrality(G)
print("Dərəcə Mərkəziliyi:", deg_cent)

# 3. Minimum tsikl bazisi
cycles = cg.cycle_basis(G)
print("Aşkar edilən halqalar:", cycles)

# 4. Fruchterman-Reingold 2D yay düzülüşü
layout_coords = cg.spring_layout(G, iterations=50, seed=42)
for node, (x, y) in layout_coords.items():
    print(f"Qovşaq {node:12s} -> 2D Koordinat: ({x:+.3f}, {y:+.3f})")
```

---

## 6. Carbox Refinement və Carbox Refinement İnteqrasiyası

```bash
$ carbox refine \
    --model model.cif \
    --hklin data.mtz \
    --restraints carbox_restraints.txt \
    --hydrogen all \
    --ncycle 10 \
    -o refined_carbox
```
