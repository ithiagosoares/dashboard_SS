"use client";

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';

export interface FaturamentoMensal {
  id: string; // The month ID, e.g., "2026-03"
  mes: string;
  totalFaturado: number;
  totalPedidos: number;
  comparacaoMesAnterior: number;
}

export function useFaturamento() {
  const [faturamentoData, setFaturamentoData] = useState<FaturamentoMensal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'faturamento_mensal'),
      orderBy('mes', 'desc'),
      limit(12) // Limits to last 12 months for dashboard overview
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: FaturamentoMensal[] = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as FaturamentoMensal);
        });
        setFaturamentoData(data);
        setLoading(false);
      },
      (err) => {
        console.error('Erro ao escutar coleção faturamento_mensal:', err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return { faturamentoData, loading, error };
}
