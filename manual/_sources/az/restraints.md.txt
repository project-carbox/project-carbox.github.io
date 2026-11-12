# Carbox Refinement və Carbox Refinement Xarici Məhdudiyyətləri İnteqrasiyası

**Carbox və CarboxMol** paketinin başlıca elmi məqsədi dünya standartı olan **Carbox Refinement** və **Carbox Refinement** proqramları ilə birbaşa və maneəsiz inteqrasiyadır.

---

## 1. Xarici Məsafə Məhdudiyyətləri Sintaksisi

Carbox anomal qısa kontakt ($d_{O\cdots O} \le 3.20\,\text{Å}$) və ya Aşağı Maneəli Hidrogen Rabitəsi (LBHB, $d \le 2.55\,\text{Å}$) aşkar etdikdə, CCP4 Carbox Refinement sintaksisinə uyğun qeydlər generasiya edir:

```text
exte dist first resi <resi_1> chain <chain_1> atom <atom_1> second resi <resi_2> chain <chain_2> atom <atom_2> value <dist> sigma <sigma>
```

### Parametr Təlimatları
- **`value`**: Hədəf atomlararası məsafə ($\text{Å}$). Standart neytral-anion rabitələri üçün $2.60\,\text{Å}$, ultra-qısa LBHB üçün $2.42 - 2.48\,\text{Å}$.
- **`sigma`**: Çəki / standart kənarlaşma. Yüksək ayırdetməli məlumatlar üçün $\sigma = 0.02\,\text{Å}$, zəif ayırdetmə üçün $\sigma = 0.05\,\text{Å}$.

---

## 2. Aşkar Protonlaşma: ASH və GLH Parametrləri

- **`ASP` / `GLU`**: Tamamilə deprotonlaşmış anionlar.
- **`ASH`**: Aşkar hidrogeni olan neytral Aspartat ($\text{O}\delta_2$ atomuna birləşmiş $\text{H}\delta_2$).
- **`GLH`**: Aşkar hidrogeni olan neytral Qlutamat ($\text{O}\varepsilon_2$ atomuna birləşmiş $\text{H}\varepsilon_2$).

Carbox dəqiqləşdirmədən əvvəl mmCIF axınında proton daşıyan qrupun adını avtomatik olaraq `ASH` və ya `GLH`-ə dəyişə bilir.

---

## 3. Carbox Refinement ilə İcra

```bash
carbox refine \
  --model model.cif \
  --hklin data.mtz \
  --restraints carbox_restraints.txt \
  --output refined_carbox \
  --ncycle 10
```
