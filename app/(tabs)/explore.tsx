import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';

const visits = [
  { date: '12 oct', year: '2026', title: 'Revisión general', clinic: 'Clínica Vet Salud', icon: 'medical-services' as const, color: Colors.brand.coral },
  { date: '04 ago', year: '2026', title: 'Vacuna antirrábica', clinic: 'Clínica Vet Salud', icon: 'vaccines' as const, color: Colors.brand.blue },
  { date: '18 mar', year: '2026', title: 'Control de peso', clinic: 'Centro Animalia', icon: 'monitor-weight' as const, color: '#65BFAE' },
];

export default function HistoryScreen() {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.eyebrow}>BIENESTAR Y SALUD</ThemedText>
        <ThemedText type="title" style={styles.heading}>Historial</ThemedText>
        <ThemedText style={styles.subtitle}>Todo lo importante de tus mascotas, en un solo lugar.</ThemedText>

        <View style={styles.filterRow}>
          <View style={styles.filterActive}><ThemedText style={styles.filterActiveText}>Luna</ThemedText><MaterialIcons name="keyboard-arrow-down" size={17} color={Colors.brand.white} /></View>
          <View style={styles.filter}><ThemedText style={styles.filterText}>2026</ThemedText><MaterialIcons name="keyboard-arrow-down" size={17} color={Colors.brand.blue} /></View>
        </View>

        <View style={styles.nextCard}>
          <View style={styles.nextIcon}><MaterialIcons name="event" size={23} color={Colors.brand.coral} /></View>
          <View style={styles.nextCopy}><ThemedText style={styles.nextLabel}>PRÓXIMO EVENTO</ThemedText><ThemedText type="defaultSemiBold" style={styles.nextTitle}>Revisión general</ThemedText><ThemedText style={styles.nextDate}>12 de octubre de 2026 · 10:30</ThemedText></View>
          <MaterialIcons name="chevron-right" size={22} color={Colors.brand.muted} />
        </View>

        <ThemedText type="subtitle" style={styles.sectionTitle}>Actividad reciente</ThemedText>
        <View style={styles.timeline}>
          {visits.map((visit, index) => (
            <View key={visit.title} style={styles.visitRow}>
              <View style={styles.date}><ThemedText style={styles.dateDay}>{visit.date}</ThemedText><ThemedText style={styles.dateYear}>{visit.year}</ThemedText></View>
              <View style={styles.lineWrap}><View style={[styles.visitIcon, { backgroundColor: visit.color }]}><MaterialIcons name={visit.icon} size={17} color={Colors.brand.white} /></View>{index < visits.length - 1 && <View style={styles.line} />}</View>
              <View style={styles.visitCopy}><ThemedText type="defaultSemiBold" style={styles.visitTitle}>{visit.title}</ThemedText><ThemedText style={styles.visitClinic}>{visit.clinic}</ThemedText></View>
            </View>
          ))}
        </View>

        <View style={styles.tip}><MaterialIcons name="lightbulb-outline" size={20} color={Colors.brand.coral} /><ThemedText style={styles.tipText}>Mantener sus vacunas al día ayuda a que vivan más y mejor.</ThemedText></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.brand.background },
  content: { padding: 24, paddingTop: 64, paddingBottom: 36 },
  eyebrow: { color: Colors.brand.coral, fontSize: 11, letterSpacing: 1.7, fontWeight: '800', marginBottom: 7 },
  heading: { color: Colors.brand.ink, fontSize: 30, lineHeight: 36 },
  subtitle: { color: Colors.brand.muted, fontSize: 14, lineHeight: 21, marginTop: 7, maxWidth: 290 },
  filterRow: { flexDirection: 'row', gap: 10, marginTop: 25, marginBottom: 24 },
  filterActive: { backgroundColor: Colors.brand.blue, borderRadius: 11, paddingHorizontal: 14, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 6 },
  filterActiveText: { color: Colors.brand.white, fontSize: 13, fontWeight: '700' },
  filter: { backgroundColor: Colors.brand.white, borderRadius: 11, paddingHorizontal: 14, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderColor: Colors.brand.line },
  filterText: { color: Colors.brand.blue, fontSize: 13, fontWeight: '700' },
  nextCard: { backgroundColor: Colors.brand.softCoral, borderRadius: 18, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 31 },
  nextIcon: { width: 43, height: 43, borderRadius: 13, backgroundColor: Colors.brand.white, justifyContent: 'center', alignItems: 'center' },
  nextCopy: { flex: 1, marginLeft: 12 },
  nextLabel: { color: Colors.brand.coral, fontSize: 9, letterSpacing: 1.2, fontWeight: '800' },
  nextTitle: { color: Colors.brand.ink, fontSize: 14, marginTop: 4 },
  nextDate: { color: Colors.brand.muted, fontSize: 11, marginTop: 3 },
  sectionTitle: { color: Colors.brand.ink, fontSize: 20, marginBottom: 19 },
  timeline: { backgroundColor: Colors.brand.white, borderRadius: 20, padding: 18, paddingBottom: 5 },
  visitRow: { flexDirection: 'row', minHeight: 75 },
  date: { width: 51, paddingTop: 2 },
  dateDay: { color: Colors.brand.ink, fontSize: 12, fontWeight: '800' },
  dateYear: { color: Colors.brand.muted, fontSize: 11, marginTop: 3 },
  lineWrap: { width: 32, alignItems: 'center' },
  visitIcon: { width: 32, height: 32, borderRadius: 11, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  line: { position: 'absolute', top: 31, bottom: 0, width: 1, backgroundColor: Colors.brand.line },
  visitCopy: { flex: 1, paddingLeft: 12, paddingTop: 1 },
  visitTitle: { color: Colors.brand.ink, fontSize: 14 },
  visitClinic: { color: Colors.brand.muted, fontSize: 12, marginTop: 5 },
  tip: { marginTop: 18, backgroundColor: Colors.brand.softBlue, borderRadius: 15, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  tipText: { flex: 1, color: Colors.brand.blue, fontSize: 12, lineHeight: 18 },
});
