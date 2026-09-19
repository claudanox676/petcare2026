import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts } from '@/constants/theme';

type Pet = {
  id: string;
  name: string;
  type: string;
  detail: string;
  age: string;
  weight: string;
  breed: string;
  color: string;
  initials: string;
};

const initialPets: Pet[] = [
  {
    id: 'PC-001',
    name: 'Luna',
    type: 'Perra',
    detail: 'Amorosa y llena de energía',
    age: '4 años',
    weight: '18.5 kg',
    breed: 'Golden retriever',
    color: Colors.brand.coral,
    initials: 'LU',
  },
  {
    id: 'PC-002',
    name: 'Milo',
    type: 'Gato',
    detail: 'Curioso, tranquilo y dormilón',
    age: '2 años',
    weight: '4.8 kg',
    breed: 'Gato doméstico',
    color: Colors.brand.blue,
    initials: 'MI',
  },
];

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const [pets, setPets] = useState(initialPets);
  const [selectedPet, setSelectedPet] = useState<Pet>(initialPets[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isVetOpen, setIsVetOpen] = useState(false);
  const [draft, setDraft] = useState(selectedPet);

  const openEditor = () => {
    setDraft(selectedPet);
    setIsAdding(false);
    setIsEditing(true);
  };

  const savePet = () => {
    const normalizedDraft = {
      ...draft,
      name: draft.name.trim() || 'Nueva mascota',
      detail: draft.detail.trim() || 'Añade un detalle sobre su personalidad',
    };

    if (isAdding) {
      setPets((currentPets) => [...currentPets, normalizedDraft]);
      setSelectedPet(normalizedDraft);
    } else {
      setPets((currentPets) =>
        currentPets.map((pet) => (pet.id === normalizedDraft.id ? normalizedDraft : pet)),
      );
      setSelectedPet(normalizedDraft);
    }
    setIsEditing(false);
  };

  const openAddPet = () => {
    const id = `PC-${String(pets.length + 1).padStart(3, '0')}`;
    setDraft({
      id,
      name: '',
      type: 'Perra',
      detail: '',
      age: '',
      weight: '',
      breed: 'Sin raza indicada',
      color: pets.length % 2 === 0 ? Colors.brand.coral : Colors.brand.blue,
      initials: '??',
    });
    setIsAdding(true);
    setIsEditing(true);
  };

  const updateDraft = (changes: Partial<Pet>) => {
    const nextDraft = { ...draft, ...changes };
    if (changes.name !== undefined) {
      nextDraft.initials = changes.name.trim().slice(0, 2).toUpperCase() || '??';
    }
    setDraft(nextDraft);
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={[styles.content, width >= 900 && styles.contentWide]} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <View>
            <ThemedText style={styles.eyebrow}>PETCARE CLUB</ThemedText>
            <ThemedText type="title" style={styles.heading}>
              Hola, Claudia <ThemedText style={styles.wave}>✦</ThemedText>
            </ThemedText>
          </View>
          <Pressable accessibilityLabel="Notificaciones" style={styles.iconButton}>
            <MaterialIcons name="notifications-none" size={23} color={Colors.brand.ink} />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <ThemedText style={styles.heroKicker}>TU CLUB, SIEMPRE CERCA</ThemedText>
            <ThemedText style={styles.heroTitle}>Cuida cada momento juntos.</ThemedText>
            <ThemedText style={styles.heroDescription}>
              Guarda su información y mantén su bienestar al día.
            </ThemedText>
          </View>
          <View style={styles.heroIcon}>
            <ThemedText style={styles.heroPaw}>🐾</ThemedText>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Mis mascotas
            </ThemedText>
            <ThemedText style={styles.sectionCaption}>{pets.length} compañeros registrados</ThemedText>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Agregar mascota" onPress={openAddPet} style={styles.addButton}>
            <MaterialIcons name="add" size={21} color={Colors.brand.white} />
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.petList}>
          {pets.map((pet) => (
            <Pressable
              key={pet.id}
              onPress={() => setSelectedPet(pet)}
              style={[styles.petCard, selectedPet.id === pet.id && styles.petCardSelected]}>
              <View style={[styles.avatar, { backgroundColor: pet.color }]}>
                <ThemedText style={styles.avatarText}>{pet.initials}</ThemedText>
              </View>
              <ThemedText type="subtitle" style={styles.petName}>{pet.name}</ThemedText>
              <ThemedText style={styles.petType}>{pet.type} · {pet.id}</ThemedText>
              <ThemedText numberOfLines={1} style={styles.petDetail}>{pet.detail}</ThemedText>
              {selectedPet.id === pet.id && <View style={styles.selectedMark}><MaterialIcons name="check" size={13} color={Colors.brand.white} /></View>}
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <View>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Ficha de {selectedPet.name}</ThemedText>
            <ThemedText style={styles.sectionCaption}>Información para su cuidado diario</ThemedText>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel={`Editar ficha de ${selectedPet.name}`} onPress={openEditor} style={styles.editButton}>
            <MaterialIcons name="edit" size={17} color={Colors.brand.blue} />
            <ThemedText style={styles.editLabel}>Editar</ThemedText>
          </Pressable>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoTop}>
            <View style={[styles.miniAvatar, { backgroundColor: selectedPet.color }]}>
              <ThemedText style={styles.miniAvatarText}>{selectedPet.initials}</ThemedText>
            </View>
            <View style={styles.infoName}>
              <ThemedText type="subtitle" style={styles.infoTitle}>{selectedPet.name}</ThemedText>
              <ThemedText style={styles.infoSubtitle}>{selectedPet.breed}</ThemedText>
            </View>
            <View style={styles.idPill}><ThemedText style={styles.idText}>{selectedPet.id}</ThemedText></View>
          </View>
          <View style={styles.statsRow}>
            <Stat icon="cake" label="Edad" value={selectedPet.age} />
            <Stat icon="monitor-weight" label="Peso" value={selectedPet.weight} />
            <Stat icon="pets" label="Tipo" value={selectedPet.type} />
          </View>
        </View>

        <Pressable accessibilityRole="button" onPress={() => setIsVetOpen(true)} style={styles.vetCard}>
          <View style={styles.vetIcon}><MaterialIcons name="medical-services" size={22} color={Colors.brand.coral} /></View>
          <View style={styles.vetCopy}>
            <ThemedText type="defaultSemiBold" style={styles.vetTitle}>Ficha veterinaria</ThemedText>
            <ThemedText style={styles.vetDescription}>Próxima revisión · 12 oct 2026</ThemedText>
          </View>
          <MaterialIcons name="chevron-right" size={22} color={Colors.brand.muted} />
        </Pressable>
      </ScrollView>

      <Modal animationType="slide" transparent visible={isEditing} onRequestClose={() => setIsEditing(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View>
                <ThemedText type="subtitle" style={styles.modalTitle}>{isAdding ? 'Agregar mascota' : 'Editar ficha'}</ThemedText>
                <ThemedText style={styles.sectionCaption}>{isAdding ? 'Completa los datos para registrarla' : `Actualiza los datos de ${selectedPet.name}`}</ThemedText>
              </View>
              <Pressable onPress={() => setIsEditing(false)}><MaterialIcons name="close" size={23} color={Colors.brand.ink} /></Pressable>
            </View>
            <Field label="Nombre" value={draft.name} onChangeText={(name) => updateDraft({ name })} />
            <Field label="Detalle" value={draft.detail} onChangeText={(detail) => updateDraft({ detail })} />
            <View style={styles.fieldRow}>
              <View style={styles.halfField}><Field label="Edad" value={draft.age} onChangeText={(age) => updateDraft({ age })} /></View>
              <View style={styles.halfField}><Field label="Peso" value={draft.weight} onChangeText={(weight) => updateDraft({ weight })} /></View>
            </View>
            <Pressable onPress={savePet} style={styles.saveButton}>
              <ThemedText style={styles.saveText}>{isAdding ? 'Agregar mascota' : 'Guardar cambios'}</ThemedText>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={isVetOpen} onRequestClose={() => setIsVetOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.vetModalCard}>
            <View style={styles.vetModalIcon}><MaterialIcons name="medical-services" size={27} color={Colors.brand.coral} /></View>
            <ThemedText type="subtitle" style={styles.modalTitle}>Ficha veterinaria</ThemedText>
            <ThemedText style={styles.vetModalPet}>{selectedPet.name} · {selectedPet.id}</ThemedText>
            <View style={styles.vetDetailRow}><ThemedText style={styles.vetDetailLabel}>Clínica</ThemedText><ThemedText style={styles.vetDetailValue}>Clínica Vet Salud</ThemedText></View>
            <View style={styles.vetDetailRow}><ThemedText style={styles.vetDetailLabel}>Próxima revisión</ThemedText><ThemedText style={styles.vetDetailValue}>12 oct 2026 · 10:30</ThemedText></View>
            <View style={styles.vetDetailRow}><ThemedText style={styles.vetDetailLabel}>Veterinaria</ThemedText><ThemedText style={styles.vetDetailValue}>Dra. Ana Torres</ThemedText></View>
            <Pressable onPress={() => setIsVetOpen(false)} style={styles.saveButton}><ThemedText style={styles.saveText}>Cerrar</ThemedText></Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function Stat({ icon, label, value }: { icon: keyof typeof MaterialIcons.glyphMap; label: string; value: string }) {
  return <View style={styles.stat}><MaterialIcons name={icon} size={18} color={Colors.brand.coral} /><ThemedText style={styles.statLabel}>{label}</ThemedText><ThemedText type="defaultSemiBold" style={styles.statValue}>{value}</ThemedText></View>;
}

function Field({ label, value, onChangeText }: { label: string; value: string; onChangeText: (value: string) => void }) {
  return <View style={styles.field}><ThemedText style={styles.fieldLabel}>{label}</ThemedText><TextInput value={value} onChangeText={onChangeText} style={styles.input} placeholderTextColor={Colors.brand.muted} /></View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.brand.background },
  content: { padding: 24, paddingTop: 62, paddingBottom: 32 },
  contentWide: { width: '100%', maxWidth: 980, alignSelf: 'center' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  eyebrow: { color: Colors.brand.coral, fontSize: 11, letterSpacing: 2, fontWeight: '800', marginBottom: 7 },
  heading: { color: Colors.brand.ink, fontSize: 28, lineHeight: 34 },
  wave: { color: Colors.brand.coral, fontSize: 24 },
  iconButton: { backgroundColor: Colors.brand.white, borderRadius: 14, padding: 12, shadowColor: Colors.brand.ink, shadowOpacity: 0.06, shadowRadius: 12, elevation: 2 },
  notificationDot: { position: 'absolute', right: 10, top: 9, width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.brand.coral },
  hero: { backgroundColor: Colors.brand.blue, borderRadius: 24, padding: 22, minHeight: 150, flexDirection: 'row', overflow: 'hidden', marginBottom: 29 },
  heroCopy: { flex: 1, paddingRight: 8 },
  heroKicker: { color: '#B7E9E1', fontSize: 10, letterSpacing: 1.4, fontWeight: '800', marginBottom: 10 },
  heroTitle: { color: Colors.brand.white, fontFamily: Fonts.rounded, fontSize: 25, lineHeight: 29, fontWeight: '800', marginBottom: 9 },
  heroDescription: { color: '#D5F1ED', fontSize: 13, lineHeight: 19 },
  heroIcon: { width: 76, height: 76, borderRadius: 38, backgroundColor: '#2D8B8D', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' },
  heroPaw: { fontSize: 37 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  sectionTitle: { color: Colors.brand.ink, fontSize: 20 },
  sectionCaption: { color: Colors.brand.muted, fontSize: 12, marginTop: 3 },
  addButton: { backgroundColor: Colors.brand.coral, borderRadius: 12, padding: 9 },
  petList: { gap: 12, paddingBottom: 28 },
  petCard: { width: 178, backgroundColor: Colors.brand.white, borderRadius: 18, padding: 16, borderWidth: 1.5, borderColor: 'transparent', shadowColor: Colors.brand.ink, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  petCardSelected: { borderColor: Colors.brand.coral },
  avatar: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 13 },
  avatarText: { color: Colors.brand.white, fontSize: 15, fontWeight: '800' },
  petName: { color: Colors.brand.ink, fontSize: 18, marginBottom: 2 },
  petType: { color: Colors.brand.blue, fontSize: 11, fontWeight: '700', marginBottom: 9 },
  petDetail: { color: Colors.brand.muted, fontSize: 12 },
  selectedMark: { position: 'absolute', right: 12, top: 12, backgroundColor: Colors.brand.coral, width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  editButton: { flexDirection: 'row', alignItems: 'center', gap: 5, padding: 5 },
  editLabel: { color: Colors.brand.blue, fontSize: 13, fontWeight: '700' },
  infoCard: { backgroundColor: Colors.brand.white, borderRadius: 20, padding: 18, marginBottom: 14, shadowColor: Colors.brand.ink, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  infoTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  miniAvatar: { width: 48, height: 48, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  miniAvatarText: { color: Colors.brand.white, fontWeight: '800' },
  infoName: { flex: 1, marginLeft: 12 },
  infoTitle: { color: Colors.brand.ink, fontSize: 18 },
  infoSubtitle: { color: Colors.brand.muted, fontSize: 12, marginTop: 3 },
  idPill: { backgroundColor: Colors.brand.softBlue, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 5 },
  idText: { color: Colors.brand.blue, fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  statsRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: Colors.brand.line, paddingTop: 15 },
  stat: { flex: 1, borderRightWidth: 1, borderRightColor: Colors.brand.line, paddingLeft: 3 },
  statLabel: { color: Colors.brand.muted, fontSize: 10, marginTop: 5 },
  statValue: { color: Colors.brand.ink, fontSize: 12, marginTop: 2 },
  vetCard: { backgroundColor: Colors.brand.softCoral, borderRadius: 18, padding: 16, flexDirection: 'row', alignItems: 'center' },
  vetIcon: { width: 42, height: 42, borderRadius: 13, backgroundColor: Colors.brand.white, justifyContent: 'center', alignItems: 'center' },
  vetCopy: { flex: 1, marginLeft: 12 },
  vetTitle: { color: Colors.brand.ink, fontSize: 14 },
  vetDescription: { color: Colors.brand.muted, fontSize: 12, marginTop: 4 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(20, 47, 57, 0.42)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: Colors.brand.background, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 34 },
  vetModalCard: { backgroundColor: Colors.brand.background, borderRadius: 24, margin: 24, padding: 24 },
  vetModalIcon: { width: 52, height: 52, borderRadius: 16, backgroundColor: Colors.brand.softCoral, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  vetModalPet: { color: Colors.brand.muted, fontSize: 13, marginTop: 4, marginBottom: 20 },
  vetDetailRow: { borderTopWidth: 1, borderTopColor: Colors.brand.line, paddingVertical: 13, flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  vetDetailLabel: { color: Colors.brand.muted, fontSize: 12 },
  vetDetailValue: { color: Colors.brand.ink, fontSize: 12, fontWeight: '700', textAlign: 'right' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 },
  modalTitle: { color: Colors.brand.ink, fontSize: 22 },
  field: { marginBottom: 15 },
  fieldLabel: { color: Colors.brand.muted, fontSize: 12, fontWeight: '700', marginBottom: 7 },
  input: { backgroundColor: Colors.brand.white, borderRadius: 12, borderWidth: 1, borderColor: Colors.brand.line, paddingHorizontal: 14, paddingVertical: 11, color: Colors.brand.ink, fontSize: 15 },
  fieldRow: { flexDirection: 'row', gap: 12 },
  halfField: { flex: 1 },
  saveButton: { backgroundColor: Colors.brand.coral, borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginTop: 3 },
  saveText: { color: Colors.brand.white, fontWeight: '800', fontSize: 15 },
});
