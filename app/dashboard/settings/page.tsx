"use client";

import React from "react";
import { useNotification } from "@/components/ui/NotificationContext";
import { Settings, ShoppingBag, Sun, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const { addNotification } = useNotification();

  const handleSimulateML = () => {
    // Generate a random value
    const valor = (Math.random() * 500 + 50).toFixed(2).replace('.', ',');
    addNotification(`Valor da compra: R$ ${valor} no Mercado Livre.`, "ml");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
        
        {/* Header */}
        <header className="flex items-center justify-between pb-4 border-b border-[var(--card-border)]">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-gray-400 hover:text-[var(--color-solar-orange)] mr-2 transition-colors">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div style={{ color: 'var(--solar-orange)' }}>
              <Sun className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--solar-orange)' }}>Configurações</h1>
              <p className="text-xs font-medium text-gray-400">Gerenciamento e Integrações</p>
            </div>
          </div>
          
          <div className="text-gray-500">
            <Settings className="h-6 w-6" />
          </div>
        </header>

        <section className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <div className="w-1 h-5 rounded-sm" style={{ backgroundColor: 'var(--solar-orange)' }}></div>
            Testar Integrações
          </h2>
          
          <p className="text-sm text-gray-400 mb-6 max-w-xl">
            Clique no botão abaixo para simular o recebimento de uma venda real via Webhook do Mercado Livre. Uma notificação será exibida no canto superior direito para conferência visual.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleSimulateML}
              className="flex items-center justify-center gap-2 text-black font-bold py-3 px-6 rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: 'var(--ml-yellow)' }}
            >
              <ShoppingBag className="h-5 w-5" />
              Simular Compra - Mercado Livre
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
