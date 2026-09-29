import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const masini = [
  {
    id: 1,
    numar: 'B · 511 · ADE',
    model: 'Dacia Logan 2019',
    status: 'ok',
    acte: [
      { nume: 'ITP', exp: 'aug 2026', status: 'ok' },
      { nume: 'RCA', exp: 'oct 2026', status: 'ok' },
      { nume: 'CASCO', exp: 'oct 2026', status: 'ok' },
      { nume: 'Rovinieta', exp: 'dec 2026', status: 'ok' },
    ],
  },
  {
    id: 2,
    numar: 'B · 360 · ADE',
    model: 'Volkswagen Golf 2021',
    status: 'warn',
    acte: [
      { nume: 'ITP', exp: 'mar 2027', status: 'ok' },
      { nume: 'RCA', exp: '5 zile!', status: 'warn' },
      { nume: 'CASCO', exp: 'feb 2027', status: 'ok' },
      { nume: 'Rovinieta', exp: 'ian 2027', status: 'ok' },
    ],
  },
  {
    id: 3,
    numar: 'IF · 45 · EDA',
    model: 'Renault Clio 2017',
    status: 'bad',
    acte: [
      { nume: 'ITP', exp: 'Expirat!', status: 'bad' },
      { nume: 'RCA', exp: 'sep 2026', status: 'ok' },
      { nume: 'CASCO', exp: 'sep 2026', status: 'ok' },
      { nume: 'Rovinieta', exp: '12 zile', status: 'warn' },
    ],
  },
];

const statusConfig = {
  ok: { color: '#22C55E', bg: '#DCFCE7', label: 'Tot OK' },
  warn: { color: '#F59E0B', bg: '#FEF3C7', label: 'Atenție' },
  bad: { color: '#EF4444', bg: '#FEE2E2', label: 'Expirat' },
};

export default function MasiniScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.logo}>evita<Text style={styles.logoLight}>amenzi</Text>.ro</Text>
          <View style={styles.avatar}><Text style={styles.avatarText}>TC</Text></View>
        </View>
        <Text style={styles.greeting}>Bună ziua,</Text>
        <Text style={styles.name}>Trandafir Călinescu</Text>
        <View style={styles.statsRow}>
          <View style={styles.statPill}>
            <Text style={styles.statNum}>3</Text>
            <Text style={styles.statLabel}>Mașini</Text>
          </View>
          <View style={styles.statPill}>
            <Text style={styles.statNum}>9</Text>
            <Text style={styles.statLabel}>Acte active</Text>
          </View>
          <View style={styles.statPill}>
            <Text style={[styles.statNum, { color: '#FCD34D' }]}>2</Text>
            <Text style={styles.statLabel}>Expiră curând</Text>
          </View>
          <View style={styles.statPill}>
            <Text style={[styles.statNum, { color: '#FCA5A5' }]}>1</Text>
            <Text style={styles.statLabel}>Expirat!</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.alertBanner}>
          <Text style={styles.alertIcon}>⚠️</Text>
          <Text style={styles.alertText}>
            <Text style={{ fontWeight: '700' }}>RCA-ul lui B·360·ADE</Text> expiră în 5 zile. Reînnoiește acum!
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mașinile mele</Text>
          <TouchableOpacity style={styles.addBtn}>
            <Text style={styles.addBtnText}>+ Adaugă</Text>
          </TouchableOpacity>
        </View>

        {masini.map((masina) => (
          <View key={masina.id} style={styles.carCard}>
            <View style={styles.carHeader}>
              <View>
                <View style={styles.plate}>
                  <Text style={styles.plateEU}>RO</Text>
                  <Text style={styles.plateText}>{masina.numar}</Text>
                </View>
                <Text style={styles.carModel}>{masina.model}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: statusConfig[masina.status].bg }]}>
                <Text style={[styles.statusText, { color: statusConfig[masina.status].color }]}>
                  ● {statusConfig[masina.status].label}
                </Text>
              </View>
            </View>
            <View style={styles.docsRow}>
              {masina.acte.map((act) => (
                <View key={act.nume} style={[styles.docPill, { backgroundColor: statusConfig[act.status].bg }]}>
                  <Text style={[styles.docName, { color: statusConfig[act.status].color }]}>{act.nume}</Text>
                  <Text style={[styles.docExp, { color: statusConfig[act.status].color }]}>{act.exp}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.donateBanner}>
          <Text style={styles.donateTitle}>Aplicație 100% gratuită ❤️</Text>
          <Text style={styles.donateSub}>Susținută de Asociația Copilărie în Siguranță.</Text>
          <TouchableOpacity style={styles.donateBtn}>
            <Text style={styles.donateBtnText}>Donează acum</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },
  header: { backgroundColor: '#1D6FF2', paddingTop: 55, paddingBottom: 24, paddingHorizontal: 20 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  logo: { fontSize: 16, fontWeight: '800', color: 'white' },
  logoLight: { fontWeight: '400', opacity: 0.8 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: 'white', fontWeight: '700', fontSize: 13 },
  greeting: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
  name: { color: 'white', fontSize: 20, fontWeight: '800', marginBottom: 16 },
  statsRow: { flexDirection: 'row', gap: 8 },
  statPill: { flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 10, alignItems: 'center' },
  statNum: { color: 'white', fontSize: 20, fontWeight: '800' },
  statLabel: { color: 'rgba(255,255,255,0.75)', fontSize: 9, marginTop: 2, textAlign: 'center' },
  content: { flex: 1, paddingHorizontal: 16 },
  alertBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', borderRadius: 14, padding: 14, marginTop: 16, marginBottom: 4, borderLeftWidth: 4, borderLeftColor: '#F59E0B', gap: 10 },
  alertIcon: { fontSize: 22 },
  alertText: { flex: 1, fontSize: 13, color: '#78350F', lineHeight: 18 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  addBtn: { backgroundColor: '#EEF4FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  addBtnText: { color: '#1D6FF2', fontWeight: '600', fontSize: 13 },
  carCard: { backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 10, elevation: 2 },
  carHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  plate: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0F172A', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, gap: 6 },
  plateEU: { color: '#1D6FF2', fontSize: 9, fontWeight: '700', backgroundColor: 'white', paddingHorizontal: 3, borderRadius: 3 },
  plateText: { color: 'white', fontWeight: '800', fontSize: 14, letterSpacing: 1 },
  carModel: { color: '#64748B', fontSize: 12, marginTop: 5 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusText: { fontSize: 12, fontWeight: '600' },
  docsRow: { flexDirection: 'row', gap: 6 },
  docPill: { flex: 1, borderRadius: 10, padding: 8, alignItems: 'center' },
  docName: { fontSize: 10, fontWeight: '700' },
  docExp: { fontSize: 9, marginTop: 2 },
  donateBanner: { backgroundColor: '#1D6FF2', borderRadius: 16, padding: 18, marginTop: 8 },
  donateTitle: { color: 'white', fontSize: 15, fontWeight: '800', marginBottom: 4 },
  donateSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 14 },
  donateBtn: { backgroundColor: 'white', borderRadius: 20, paddingHorizontal: 18, paddingVertical: 8, alignSelf: 'flex-start' },
  donateBtnText: { color: '#1D6FF2', fontWeight: '700', fontSize: 13 },
});