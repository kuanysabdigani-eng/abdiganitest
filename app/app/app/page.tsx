"use client";

import React, { useState } from "react";

// --- ДАННЫЕ: БОЛЬШАЯ ВОСЬМЁРКА ВУЗОВ ---
const UNIVERSITIES = [
  { id: "kbtu", name: "KBTU", fullName: "Казахстанско-Британский Технический Университет", track: "Deep Tech & Software Architecture", slots: "12 мест" },
  { id: "sdu", name: "SDU", fullName: "Suleyman Demirel University", track: "Fullstack Engineering & EdTech", slots: "15 мест" },
  { id: "aitu", name: "AITU", fullName: "Astana IT University", track: "AI, Data Science & Cybersecurity", slots: "10 мест" },
  { id: "satbayev", name: "Satbayev University", fullName: "Satbayev University", track: "Hardware, Robotics & Energy", slots: "8 мест" },
  { id: "nu", name: "Nazarbayev University", fullName: "Nazarbayev University", track: "R&D, Quantum & High-Load Systems", slots: "5 мест" },
  { id: "kimep", name: "KIMEP", fullName: "KIMEP University", track: "FinTech & Tech Entrepreneurship", slots: "10 мест" },
  { id: "almau", name: "AlmaU", fullName: "Almaty Management University", track: "Product Management & Startups", slots: "10 мест" },
  { id: "narxoz", name: "Narxoz", fullName: "Narxoz University", track: "Digital Economy & Analytics", slots: "8 мест" },
];

export default function AbdiganiTestMVP() {
  const [activeTab, setActiveTab] = useState<"landing" | "student" | "university">("landing");

  const [studentData, setStudentData] = useState({
    fullName: "",
    email: "",
    telegram: "",
    github: "",
    demoUrl: "",
    videoUrl: "",
    selectedUnis: [] as string[],
    problemSolution: "",
    techStack: "",
    bugLesson: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicantStatus, setApplicantStatus] = useState<"pending" | "scheduled" | "granted" | "discount">("pending");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const toggleUniSelect = (uniId: string) => {
    if (studentData.selectedUnis.includes(uniId)) {
      setStudentData({
        ...studentData,
        selectedUnis: studentData.selectedUnis.filter((id) => id !== uniId),
      });
    } else {
      if (studentData.selectedUnis.length < 3) {
        setStudentData({
          ...studentData,
          selectedUnis: [...studentData.selectedUnis, uniId],
        });
      } else {
        alert("Можно выбрать максимум 3 вуза в приоритет!");
      }
    }
  };

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentData.selectedUnis.length === 0) {
      alert("Пожалуйста, выберите хотя бы 1 вуз из «Большой восьмёрки»!");
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* --- ШАПКА / НАВИГАЦИЯ --- */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div
            onClick={() => setActiveTab("landing")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-slate-950 shadow-lg shadow-cyan-500/20">
              AAS
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Абдиганитест
              </span>
              <span className="text-[10px] block font-mono text-cyan-400 -mt-1 tracking-widest uppercase">
                Proof of Work System
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("landing")}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "landing"
                  ? "bg-slate-800 text-cyan-400 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => setActiveTab("student")}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "student"
                  ? "bg-cyan-500 text-slate-950 shadow-md font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Подать заявку
            </button>
            <button
              onClick={() => setActiveTab("university")}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === "university"
                  ? "bg-blue-600 text-white shadow-md font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Кабинет Вуза
            </button>
          </nav>
        </div>
      </header>

      {/* --- КОНТЕНТ --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === "landing" && (
          <div className="space-y-16">
            <section className="text-center space-y-6 pt-6 pb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-2">
                <span>Национальная альтернатива ЕНТ от созидателей</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
                Поступи в университет по реальному{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
                  Proof of Work
                </span>
                , а не по тестам.
              </h1>
              <p className="text-slate-400 text-base sm:text-xl max-w-2xl mx-auto font-normal">
                Забудь про зубрежку бланков. Покажи задеплоенный софт, GitHub-коммиты, инженерный прототип и защити проект напрямую перед деканами «Большой восьмёрки».
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setActiveTab("student")}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-base hover:opacity-90 transition-all shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2"
                >
                  Задеплоить заявку
                </button>
                <button
                  onClick={() => setActiveTab("university")}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-base hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  Войти как Вуз-партнёр
                </button>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3">
                <h3 className="font-bold text-lg text-white">100% Практика</h3>
                <p className="text-sm text-slate-400">
                  Вместо теории оценивается работающий сайт на Vercel, архитектура приложения, чистота кода и умение фиксить баги.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3">
                <h3 className="font-bold text-lg text-white">10-мин Live-защита</h3>
                <p className="text-sm text-slate-400">
                  Никаких шпор и камер наблюдения. Прямой созвон с IT-комиссией университета: 3 минуты питча + 7 минут ответов на вопросы.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3">
                <h3 className="font-bold text-lg text-white">Прямой Грант</h3>
                <p className="text-sm text-slate-400">
                  Университеты выдают ректорские гранты и скидки напрямую в твоём личном кабинете сразу после успешной защиты.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold">Вузы «Большой Восьмёрки»</h2>
                <p className="text-slate-400 text-sm max-w-xl mx-auto">
                  Университеты, принимающие Proof of Work от абитуриентов «Абдиганитеста» на пилотный 2026/2027 год.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {UNIVERSITIES.map((uni) => (
                  <div key={uni.id} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-3 group">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xl text-white group-hover:text-cyan-400 transition-colors">{uni.name}</span>
                      <span className="text-[11px] font-mono bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full">{uni.slots}</span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{uni.fullName}</p>
                    <div className="pt-2 border-t border-slate-800/60">
                      <span className="text-[11px] text-slate-500 block">Трек отбора:</span>
                      <span className="text-xs font-medium text-slate-300">{uni.track}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "student" && (
          <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
              <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-emerald-500/30 text-center space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold">Proof of Work Успешно Задеплоен!</h2>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Твоя продуктовая записка и проект отправлены в комиссии выбранных вузов. Уведомление придет в Telegram и Email.
                </p>
                <button onClick={() => setIsSubmitted(false)} className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-sm font-semibold">
                  Редактировать заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleStudentSubmit} className="space-y-8 bg-slate-900/60 p-6 sm:p-10 rounded-3xl border border-slate-800">
                <div>
                  <h2 className="text-2xl font-bold text-white">Заявка «Абдиганитест» (AAS)</h2>
                  <p className="text-xs sm:text-sm text-slate-400">Заполняй честно и по делу. Это увидят IT-директора и деканы.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider font-mono">1. Профиль Разработчика</h3>
                  <div className="grid grid-cols
