"use client";

import React, { useState } from 'react';
import { MessageCircle, Search, Clock, CheckCircle, Send, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
  id: string;
  product: string;
  text: string;
  time: string;
  status: 'pending' | 'answered';
  replyText?: string;
}

const mockQuestions: Question[] = [
  {
    id: 'Q1029',
    product: 'Kit Fixação Painel Solar Telhado Metálico',
    text: 'Bom dia, esse kit serve para telhado de zinco trapezoidal? Tem pronta entrega?',
    time: 'Há 5 min',
    status: 'pending'
  },
  {
    id: 'Q1030',
    product: 'Suporte Perfil Guia Alumínio 2,40m',
    text: 'Quantos perfis vem nessa compra? Consigo instalar 2 painéis de 550w?',
    time: 'Há 12 min',
    status: 'pending'
  },
  {
    id: 'Q1025',
    product: 'Grampo End Clamp Fixador Final',
    text: 'Qual a espessura do painel que esse grampo suporta? 35mm ou 40mm?',
    time: 'Há 2 horas',
    status: 'answered',
    replyText: 'Olá! Este grampo é universal e ajustável, servindo perfeitamente tanto para painéis de 35mm quanto de 40mm. Aguardamos sua compra!'
  }
];

export default function PerguntasPage() {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [replyInput, setReplyInput] = useState<Record<string, string>>({});

  const handleReplyChange = (id: string, text: string) => {
    setReplyInput(prev => ({ ...prev, [id]: text }));
  };

  const handleSendReply = (id: string) => {
    if (!replyInput[id] || replyInput[id].trim() === '') return;

    setQuestions(prev => prev.map(q => {
      if (q.id === id) {
        return { ...q, status: 'answered', replyText: replyInput[id] };
      }
      return q;
    }));
    
    // Clear input after sending
    setReplyInput(prev => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  const pendingCount = questions.filter(q => q.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-4 md:p-8 font-sans">
      <div className="max-w-[1200px] mx-auto space-y-8 animate-in fade-in duration-700">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-[var(--card-border)]">
          <div className="flex items-center gap-3">
            <div style={{ color: 'var(--ml-yellow)' }}>
              <MessageCircle className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--ml-yellow)' }}>Perguntas do Mercado Livre</h1>
              <p className="text-xs font-medium text-gray-400">Tempo Real</p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Buscar pergunta..." 
                className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--ml-yellow)] transition-colors w-full md:w-64"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Cards for Questions Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {/* Not explicitly a MetricCard because we want specialized styles, but let's build small info cards */}
           <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-4 flex items-center gap-4">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-yellow-500/10 text-[var(--ml-yellow)]">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Pendentes</p>
                <p className="text-2xl font-bold text-white">{pendingCount}</p>
              </div>
           </div>
           
           <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-4 flex items-center gap-4">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-500/10 text-[var(--solar-green)]">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Respondidas Hoje</p>
                <p className="text-2xl font-bold text-white">{questions.filter(q => q.status === 'answered').length}</p>
              </div>
           </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <div className="w-1 h-5 rounded-sm" style={{ backgroundColor: 'var(--ml-yellow)' }}></div>
            Fila de Atendimento
          </h2>
          
          {questions.map((question) => (
            <div 
              key={question.id} 
              className={cn(
                "bg-[var(--card-bg)] border rounded-xl p-5 md:p-6 transition-all duration-300 shadow-sm",
                question.status === 'pending' ? "border-[var(--ml-yellow)] shadow-yellow-500/5" : "border-[var(--card-border)] opacity-80"
              )}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Product Info */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                    <Package className="h-4 w-4" />
                    <span>{question.product}</span>
                    <span className="text-gray-600">•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {question.time}
                    </span>
                  </div>
                  
                  {/* Question Text */}
                  <p className="text-base font-medium text-white">
                    <span className="text-[var(--solar-orange)] font-bold mr-2">Q:</span>
                    {question.text}
                  </p>

                  {/* Answers & Inputs */}
                  {question.status === 'pending' ? (
                    <div className="mt-4 pt-4 border-t border-[var(--card-border)]">
                      <div className="flex gap-2">
                        <textarea 
                          value={replyInput[question.id] || ''}
                          onChange={(e) => handleReplyChange(question.id, e.target.value)}
                          placeholder="Digite sua resposta aqui..."
                          className="flex-1 bg-black/50 border border-[var(--card-border)] rounded-lg p-3 text-sm text-white resize-none focus:outline-none focus:border-[var(--ml-yellow)] transition-colors min-h-[80px]"
                        />
                        <button 
                          onClick={() => handleSendReply(question.id)}
                          disabled={!replyInput[question.id]}
                          className="flex flex-col items-center justify-center gap-1 px-4 py-2 bg-[var(--ml-yellow)] text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-28"
                        >
                          <Send className="h-5 w-5" />
                          <span className="text-xs">Enviar</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 pt-4 border-t border-[var(--card-border)] bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                      <p className="text-sm text-gray-300">
                        <span className="text-[var(--solar-green)] font-bold mr-2">R:</span>
                        {question.replyText}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-[10px] uppercase tracking-wider text-[var(--solar-green)] font-bold">
                        <CheckCircle className="h-3 w-3" /> Respondido
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
