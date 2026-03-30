"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X, ShoppingBag } from "lucide-react";

export type NotificationType = "ml" | "upper" | "info";

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  addNotification: (message: string, type?: NotificationType) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string, type: NotificationType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {notifications.map((notification) => (
          <Toast 
            key={notification.id} 
            notification={notification} 
            onClose={() => removeNotification(notification.id)} 
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}

// Internal Toast Component
function Toast({ notification, onClose }: { notification: Notification; onClose: () => void }) {
  const [isShowing, setIsShowing] = useState(false);

  // TEMPO DA NOTIFICAÇÃO NA TELA
  // Você pode alterar o valor a seguir (em milissegundos). Por padrão está 4000 (4 segundos).
  const DISPLAY_DURATION_MS = 4000;

  useEffect(() => {
    // Trigger slide in
    const showTimer = setTimeout(() => setIsShowing(true), 10);

    // Inicia a saída da notificação depois do tempo determinado
    const hideTimer = setTimeout(() => {
      handleClose();
    }, DISPLAY_DURATION_MS);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleClose = () => {
    setIsShowing(false); // Trigger slide out / fade out
    // Espera a animação de saída terminar (300ms) para realmente remover do DOM
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const isML = notification.type === "ml";
  const colorClass = isML ? "text-[var(--ml-yellow)]" : "text-[var(--color-solar-orange)]";
  const borderColor = isML ? "border-[var(--ml-yellow)]" : "border-[var(--color-solar-orange)]";

  return (
    <div className={cn(
      "w-72 sm:w-80 md:w-96 p-4 rounded-xl border bg-[var(--card-bg)] shadow-lg pointer-events-auto transform transition-all duration-300 ease-in-out",
      isShowing ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0",
      borderColor
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className={cn("mt-1", colorClass)}>
          {isML ? <ShoppingBag className="h-5 w-5" /> : <div className="h-5 w-5 bg-current rounded-full" />}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">Nova Venda Registrada!</p>
          <p className="text-xs text-gray-300 mt-1">{notification.message}</p>
        </div>
        <button 
          onClick={handleClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
