import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { Colors } from '@/constants/theme';

export type Visit = {
  date: string;
  year: string;
  title: string;
  clinic: string;
  icon: 'medical-services' | 'vaccines' | 'monitor-weight';
  color: string;
};

export type Pet = {
  id: string;
  name: string;
  type: string;
  detail: string;
  age: string;
  weight: string;
  breed: string;
  color: string;
  initials: string;
  visits: Visit[];
};

const lunaVisits: Visit[] = [
  { date: '12 oct', year: '2026', title: 'Revisión general', clinic: 'Clínica Vet Salud', icon: 'medical-services', color: Colors.brand.coral },
  { date: '04 ago', year: '2026', title: 'Vacuna antirrábica', clinic: 'Clínica Vet Salud', icon: 'vaccines', color: Colors.brand.blue },
  { date: '18 mar', year: '2026', title: 'Control de peso', clinic: 'Centro Animalia', icon: 'monitor-weight', color: '#65BFAE' },
];

const miloVisits: Visit[] = [
  { date: '22 sep', year: '2026', title: 'Revisión dental', clinic: 'Centro Animalia', icon: 'medical-services', color: Colors.brand.coral },
  { date: '11 jun', year: '2026', title: 'Vacuna triple felina', clinic: 'Clínica Vet Salud', icon: 'vaccines', color: Colors.brand.blue },
];

export const initialPets: Pet[] = [
  { id: 'PC-001', name: 'Luna', type: 'Perra', detail: 'Amorosa y llena de energía', age: '4 años', weight: '18.5 kg', breed: 'Golden retriever', color: Colors.brand.coral, initials: 'LU', visits: lunaVisits },
  { id: 'PC-002', name: 'Milo', type: 'Gato', detail: 'Curioso, tranquilo y dormilón', age: '2 años', weight: '4.8 kg', breed: 'Gato doméstico', color: Colors.brand.blue, initials: 'MI', visits: miloVisits },
];

type PetcareContextValue = {
  pets: Pet[];
  selectedPet: Pet;
  setSelectedPet: (pet: Pet) => void;
  addPet: (pet: Pet) => void;
  updatePet: (pet: Pet) => void;
};

const PetcareContext = createContext<PetcareContextValue | null>(null);

export function PetcareProvider({ children }: { children: ReactNode }) {
  const [pets, setPets] = useState(initialPets);
  const [selectedId, setSelectedId] = useState(initialPets[0].id);
  const selectedPet = pets.find((pet) => pet.id === selectedId) ?? pets[0];

  const value = useMemo<PetcareContextValue>(() => ({
    pets,
    selectedPet,
    setSelectedPet: (pet) => setSelectedId(pet.id),
    addPet: (pet) => {
      setPets((currentPets) => [...currentPets, pet]);
      setSelectedId(pet.id);
    },
    updatePet: (pet) => {
      setPets((currentPets) => currentPets.map((currentPet) => currentPet.id === pet.id ? pet : currentPet));
      setSelectedId(pet.id);
    },
  }), [pets, selectedPet]);

  return <PetcareContext.Provider value={value}>{children}</PetcareContext.Provider>;
}

export function usePetcare() {
  const context = useContext(PetcareContext);
  if (!context) {
    throw new Error('usePetcare must be used within PetcareProvider');
  }
  return context;
}
