# CarboxMol Modelləşdirmə Mühiti — Əmrlər, Kodlar və Makrolar

**CarboxMol** universal 3D makromolekulyar kristallografiya iş masası, həqiqi fəza həndəsi dəqiqləşdirmə mühərriki və bio-qeyri-üzvi modelləşdirmə platformasıdır. Bu sənəd bütün terminal əmrlərini, arqumentləri, terminal çıxışlarını, Python modelləşdirmə API-lərini və `.CXL` makro avtomatlaşdırma skriptlərini təqdim edir.

---

## 1. CarboxMol Əmr Sətiri İnterfeysi (CLI)

Əsas istifadə sintaksisi:

```bash
$ carboxmol [alt-əmr | PDB_KODU | fayl.cif] [seçimlər]
```

### Cəld Əmrlər
```bash
# 1. 3D İş Masasını brauzerdə aç (port 8050)
$ carboxmol

# 2. Xüsusi PDB strukturu ilə birbaşa aç
$ carboxmol 4LGN

# 3. Fərdi portda işə sal
$ carboxmol server --port 8080

# 4. Stereokimyəvi və həndəsi yoxlama (validasiya)
$ carboxmol validate 4LGN.pdb

# 5. Həqiqi fəzada həndəsi dəqiqləşdirmə
$ carboxmol refine 4LGN.pdb -o refined.pdb --cycles 50

# 6. Keçid metallarının koordinasiya poliedrlərini təyin et (4-qat & 6-qat)
$ carboxmol metal 4LGN.pdb

# 7. Qeyri-kovalent qarşılıqlı təsirlərin təhlili (duz körpüləri, pi-stacking, LBHB)
$ carboxmol pli 4LGN.pdb

# 8. .CXL makro skriptini icra et
$ carboxmol script pipeline.cxl
```

---

## 2. Əmr: `carboxmol validate`

Makromolekulyar struktur üzərində Ramachandran bucaqları, yan zəncir rotamerləri, sterik toqquşmalar və anomal karboksilat təmaslarını yoxlayır:

```bash
$ carboxmol validate 4LGN.pdb
```

#### Terminal Çıxış Loqu:
```text
======================================================================
  CarboxMol Stereochemical Validation Report
  Target: 4LGN (Atoms: 1,642, Residues: 198)
======================================================================

[1] Ramachandran Onurğa Bucağı (phi / psi):
    - Üstünlük verilən bölgələr: 97.4% (193 qalıq)
    - İcazə verilən bölgələr   : 2.6% (5 qalıq)
    - Kənarlaşmalar (Outliers)  : 0.0% (0 qalıq)
    - Status                   : PASS (Yüksək keyfiyyət)

[2] Yan Zəncir Rotamerləri:
    - Normal Rotamerlər        : 96.1%
    - Qeyri-sabit Rotamerlər    : 3.9%

[3] Sterik Toqquşma Balı (Clashscore):
    - Cəmi Toqquşmalar         : 0 (Clashscore = 0.00 / 1000 atom)

[4] Carbox Anomal Təmas Auditi:
    - Asp25 (A) ··· Asp25 (B)  : d = 2.452 Å (KRİTİK: Aşağı Maneəli Hidrogen Rabitəsi)
    - Yaradılan Məhdudiyyət    : exte dist first resi 25 chain A atom OD2 second resi 25 chain B atom OD2 value 2.450 sigma 0.02

======================================================================
[+] Ümumi Stereokimyəvi Qiymətləndirmə: ƏLA (Bal: 98.6 / 100)
```

---

## 3. Əmr: `carboxmol metal`

$3.10\,\text{Å}$ radiusunda keçid metallarını ($\text{Zn}^{2+}, \text{Mg}^{2+}, \text{Ca}^{2+}, \text{Fe}^{2+}, \text{Mn}^{2+}, \text{Cu}^{2+}$) təhlil edir, 4-qat (tetrahedral, kvadrat planar) və 6-qat (oktahedral) həndəsələri müəyyənləşdirir:

```bash
$ carboxmol metal 1CA2.pdb --cutoff 3.10
```

#### Terminal Çıxış Loqu:
```text
======================================================================
  CarboxMol Bioinorganic Metal Coordination Engine
  Target: 1CA2 (Karbonik Anhidraz II)
======================================================================

[*] Keçid metalları taranır...
[+] 1 katalitik metal mərkəzi aşkar edildi:

----------------------------------------------------------------------
Metal Mərkəzi #1: ZN 301 (Zəncir A)
  - Element             : Sink (Zn II)
  - Koordinasiya Sayı   : 4
  - Həndəsə Tipi        : FOUR_FOLD_TETRAHEDRAL
  - Koordinasiya Balı   : 0.985 (İdeal tetrahedral simmetriya)
  - Bucaq RMSD          : 3.2° (İdeal 109.47° nisbətində)
  - Orta Məsafə         : 2.048 Å

  Koordinasiya Liqandları:
    1. Zəncir A | HIS 94  (NE2) : d = 2.035 Å  [Koordinasiya rabitəsi]
    2. Zəncir A | HIS 96  (NE2) : d = 2.051 Å  [Koordinasiya rabitəsi]
    3. Zəncir A | HIS 119 (ND1) : d = 2.042 Å  [Koordinasiya rabitəsi]
    4. Zəncir A | HOH 401 (O)   : d = 2.064 Å  [Katalitik su/hidroksid]

  Carbox Refinement / Carbox Refinement Məhdudiyyətləri:
    exte dist first resi 301 chain A atom ZN second resi 94  chain A atom NE2 value 2.035 sigma 0.02
    exte dist first resi 301 chain A atom ZN second resi 96  chain A atom NE2 value 2.051 sigma 0.02
    exte dist first resi 301 chain A atom ZN second resi 119 chain A atom ND1 value 2.042 sigma 0.02
    exte dist first resi 301 chain A atom ZN second resi 401 chain A atom O   value 2.064 sigma 0.03
----------------------------------------------------------------------

[+] Təyin Olunan Rənglər:
    - Elementə görə   : #818cf8 (Sink - Bənövşəyi-Mavi)
    - Həndəsəyə görə  : #c084fc (Tetrahedral - Açıq Bənövşəyi)
```

---

## 4. Əmr: `carboxmol refine`

Lokal koordinat faylı üzərində həqiqi fəzada həndəsi dəqiqləşdirmə aparır:

```bash
$ carboxmol refine 4LGN.pdb --target-dist 2.45 --cycles 50 --out 4LGN_regularized.pdb
```

---

## 5. Python API: Atom Obyektindən Carbox Auditi

Hər bir `Atom` obyekti birbaşa Carbox kitabxana funksiyasını işə sala bilir:

```python
from carboxmol.core.structure import Structure
from carboxmol.modeling.metal import find_all_metal_coordination_sites

# Modeli yüklə
st = Structure.from_file("4LGN.cif")

# 1. Konkret atomu audit et
atom = st.get_atom(chain_id="A", resi=25, atom_name="OD2")
audit = atom.audit_with_carbox(st)

print("Atom:", atom.name, "Qalıq:", atom.resi)
print("Vəziyyət:", audit.severity)
print("Diaqnoz:", audit.diagnoses)
for r in audit.suggested_restraints:
    print("Carbox Refinement Məhdudiyyəti:", r)

# 2. Metal koordinasiya analizi
sites = find_all_metal_coordination_sites(st, cutoff=3.10)
for site in sites:
    print(f"Metal: {site.element} ({site.chain}:{site.resi})")
    print(f"Koordinasiya Sayı: {site.coordination_number} ({site.geometry})")
```

---

## 6. CXL Makro Skript Mühərriki

```cxl
# ======================================================================
# Aktiv Mərkəz və Protonlaşma Skripti (.CXL)
# ======================================================================

# 1. Koordinat faylını yüklə
LOAD "4LGN.cif"

# 2. Katalitik karboksil cütünü seç
SELECT :25.A.OD2, :25.B.OD2 AS active_dyad

# 3. Həndəsi audit
MEASURE DISTANCE active_dyad
AUDIT active_dyad

# 4. LBHB xarici məhdudiyyətini təyin et
RESTRAIN DISTANCE active_dyad VALUE 2.450 SIGMA 0.02

# 5. Əks istiqamətdə proton ötürülməsi simulyasiyası ("Əks Ağız")
SIMULATE PROTON active_dyad DIRECTION reverse STEPS 50

# 6. Həqiqi fəzada həndəsi dəqiqləşdirmə
REFINE SELECTION active_dyad METHOD conjugate_gradient CYCLES 100

# 7. Nəticəni saxla
SAVE "4LGN_carbox_refined.cif"
EXPORT RESTRAINTS "4LGN_refmac.txt"
```
