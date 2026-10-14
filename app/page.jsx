"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Rocket,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Github,
  Video,
  Send,
  Building2,
  User,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Clock,
  Award,
  Bell,
  X,
} from "lucide-react";

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

  // Состояние формы школьника
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
    futureRoadmap: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Состояние Кабинета Вуза (Mock-кандидат для демонстрации комиссии)
  const [applicantStatus, setApplicantStatus] = useState<"pending" | "scheduled" | "granted" | "discount">("pending");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Выбор Top-3 вузов
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-slate-950 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
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
              Подать Proof of Work
            </button>
            <button
              onClick={() => setActiveTab("university")}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === "university"
                  ? "bg-blue-600 text-white shadow-md font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Кабинет Вуза
            </button>
          </nav>
        </div>
      </header>

      {/* --- КОНТЕНТ В ЗАВИСИМОСТИ ОТ ВКЛАДКИ --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ========================================== */}
        {/* TAB 1: ЛЕНДИНГ (МАНИФЕСТ И БОЛЬШАЯ ВОСЬМЁРКА) */}
        {/* ========================================== */}
        {activeTab === "landing" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-16"
          >
            {/* HERO SECTION */}
            <section className="text-center space-y-6 pt-6 pb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-2">
                <Sparkles className="w-3.5 h-3.5" />
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
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveTab("university")}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-base hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  Войти как Вуз-партнёр
                </button>
              </div>
            </section>

            {/* МЕТРИКИ / ПРЕИМУЩЕСТВА */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <Code className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-white">100% Практика</h3>
                <p className="text-sm text-slate-400">
                  Вместо теории оценивается работающий сайт на Vercel, архитектура приложения, чистота кода и умение фиксить баги.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Video className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-white">10-мин Live-защита</h3>
                <p className="text-sm text-slate-400">
                  Никаких шпор и камер наблюдения. Прямой созвон с IT-комиссией университета: 3 минуты питча + 7 минут ответов на вопросы.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-white">Прямой Грант</h3>
                <p className="text-sm text-slate-400">
                  Университеты выдают ректорские гранты и скидки напрямую в твоём личном кабинете сразу после успешной защиты.
                </p>
              </div>
            </section>

            {/* БОЛЬШАЯ ВОСЬМЁРКА ВУЗОВ */}
            <section className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold">Вузы «Большой Восьмёрки»</h2>
                <p className="text-slate-400 text-sm max-w-xl mx-auto">
                  Университеты, принимающие Proof of Work от абитуриентов «Абдиганитеста» на пилотный 2026/2027 год.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {UNIVERSITIES.map((uni) => (
                  <div
                    key={uni.id}
                    className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-3 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xl text-white group-hover:text-cyan-400 transition-colors">
                        {uni.name}
                      </span>
                      <span className="text-[11px] font-mono bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full">
                        {uni.slots}
                      </span>
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
          </motion.div>
        )}

        {/* ========================================== */}
        {/* TAB 2: ФОРМА ПОДАЧИ PROOF OF WORK (ШКОЛЬНИК) */}
        {/* ========================================== */}
        {activeTab === "student" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto"
          >
            {isSubmitted ? (
              <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-emerald-500/30 text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">Proof of Work Успешно Задеплоен!</h2>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Твоя продуктовая записка и проект отправлены в комиссии выбранных вузов. Уведомление о вызове на 10-мин защиту придет в твои <b>Telegram</b> и <b>Email</b>.
                </p>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2 text-xs font-mono text-slate-400">
                  <p> Status: PENDING_REVIEW</p>
                  <p> Telegram Alert: ENABLED ({studentData.telegram || "@username"})</p>
                  <p> Selected Unis: {studentData.selectedUnis.join(", ").toUpperCase()}</p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-sm font-semibold hover:bg-slate-700 transition-all"
                >
                  Редактировать заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleStudentSubmit} className="space-y-8 bg-slate-900/60 p-6 sm:p-10 rounded-3xl border border-slate-800">
                <div>
                  <h2 className="text-2xl font-bold text-white">Заявка «Абдиганитест» (AAS)</h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Заполняй честно и по делу. Это увидят IT-директора и деканы.
                  </p>
                </div>

                {/* 1. КОНТАКТНЫЕ ДАННЫЕ */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-2">
                    <User className="w-4 h-4" /> 1. Профиль Разработчика
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">ФИО *</label>
                      <input
                        required
                        type="text"
                        placeholder="Куаныш Абдигани"
                        value={studentData.fullName}
                        onChange={(e) => setStudentData({ ...studentData, fullName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Email (Для официального оффера) *</label>
                      <input
                        required
                        type="email"
                        placeholder="q@domain.kz"
                        value={studentData.email}
                        onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Telegram (@username для уведомления) *</label>
                      <input
                        required
                        type="text"
                        placeholder="@abdigani_dev"
                        value={studentData.telegram}
                        onChange={(e) => setStudentData({ ...studentData, telegram: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. PROOF OF WORK ССЫЛКИ */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-2">
                    <Code className="w-4 h-4" /> 2. Proof of Work (Артефакты)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">GitHub / Code Repository *</label>
                      <input
                        required
                        type="url"
                        placeholder="https://github.com/..."
                        value={studentData.github}
                        onChange={(e) => setStudentData({ ...studentData, github: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Live Demo / Vercel Link *</label>
                      <input
                        required
                        type="url"
                        placeholder="https://myproject.vercel.app"
                        value={studentData.demoUrl}
                        onChange={(e) => setStudentData({ ...studentData, demoUrl: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Видео-питч (Loom/YouTube 2 мин) *</label>
                      <input
                        required
                        type="url"
                        placeholder="https://youtu.be/..."
                        value={studentData.videoUrl}
                        onChange={(e) => setStudentData({ ...studentData, videoUrl: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. ВЫБОР ТОП-3 ВУЗОВ */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" /> 3. Выбор Вузов Приоритета (Top-3)
                    </h3>
                    <span className="text-xs font-mono text-slate-500">
                      Выбрано: {studentData.selectedUnis.length}/3
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {UNIVERSITIES.map((uni) => {
                      const isSelected = studentData.selectedUnis.includes(uni.id);
                      return (
                        <button
                          type="button"
                          key={uni.id}
                          onClick={() => toggleUniSelect(uni.id)}
                          className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between h-20 ${
                            isSelected
                              ? "bg-cyan-500/10 border-cyan-500 text-cyan-300 font-bold"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          <span className="font-bold text-sm text-white">{uni.name}</span>
                          <span className="text-[10px] text-slate-500 line-clamp-1">{uni.track}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. PRODUCT / TECH NOTE (ВМЕСТО ЭССЕ) */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-2">
                    <Rocket className="w-4 h-4" /> 4. Product & Tech Note (Вместо воды-эссе)
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">
                        1. Проблема и Решение: Какую реальную боль людей решает твой продукт? *
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Например: Платформа решает проблему отбора абитуриентов без зубрежки ЕНТ..."
                        value={studentData.problemSolution}
                        onChange={(e) => setStudentData({ ...studentData, problemSolution: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 mb-1">
                        2. Архитектура и Стек: Почему выбраны эти технологии/дизайн? *
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Next.js App Router + Tailwind CSS для быстрого рендеринга и Vercel CDN..."
                        value={studentData.techStack}
                        onChange={(e) => setStudentData({ ...studentData, techStack: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 mb-1">
                        3. Главный Баг и Провал: Что пошло не так при разработке и как ты это починил? *
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Падали API-руты при перегрузке, исправил через Edge Functions и кэширование..."
                        value={studentData.bugLesson}
                        onChange={(e) => setStudentData({ ...studentData, bugLesson: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Отправить заявку в «Абдиганитест»
                </button>
              </form>
            )}
          </motion.div>
        )}

        {/* ========================================== */}
        {/* TAB 3: КАБИНЕТ ВУЗА (UNIVERSITY DASHBOARD) */}
        {/* ========================================== */}
        {activeTab === "university" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* ШАПКА КАБИНЕТА КОМИССИИ */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-black text-xl">
                  KBTU
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Кабинет Приёмной Комиссии KBTU</h2>
                  <p className="text-xs text-slate-400">
                    Панель оценки кандидатов по системе «Абдиганитест» (Proof of Work)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Прием открыт (12 грантов)
                </span>
              </div>
            </div>

            {/* КАРТОЧКА КАНДИДАТА ДЛЯ КОМИССИИ */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">Куаныш Абдигани</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      Score: 96/100
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Проект: <b>Q-Air Purification Control Platform</b> | Стек: Next.js, Tailwind, C++ Edge
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all text-xs flex items-center gap-1.5"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-all text-xs flex items-center gap-1.5 font-semibold"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                </div>
              </div>

              {/* PRODUCT / TECH NOTE (ОТВЕТЫ) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                  <span className="text-slate-500 font-mono">1. Проблема и решение:</span>
                  <p className="text-slate-300 leading-relaxed">
                    «Мониторинг и управление башнями очистки воздуха в смарт-городах в реальном времени...»
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                  <span className="text-slate-500 font-mono">2. Стек и Архитектура:</span>
                  <p className="text-slate-300 leading-relaxed">
                    «Next.js App Router для высокой скорости, Tailwind CSS, Vercel Edge Network для защиты от падения...»
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                  <span className="text-slate-500 font-mono">3. Провал и Баги:</span>
                  <p className="text-slate-300 leading-relaxed">
                    «Падали веб-сокеты при перегрузке, переписали логику обработки событий через очистку буфера...»
                  </p>
                </div>
              </div>

              {/* ИНТЕРАКТИВНЫЙ КАЛЕНДАРЬ СЛОТОВ НА 10-МИН ИНТЕРВЬЮ */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" /> Выставить слот для 10-минутного Live-интервью
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Завтра, 15:00", "Завтра, 15:15", "Завтра, 15:30", "Пятница, 16:00"].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => {
                        setSelectedSlot(slot);
                        setApplicantStatus("scheduled");
                      }}
                      className={`p-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-center gap-1.5 border ${
                        selectedSlot === slot
                          ? "bg-cyan-500 text-slate-950 font-bold border-cyan-400"
                          : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* КНОПКИ ПРИНЯТИЯ РЕШЕНИЯ (ГРАНТ / СКИДКА) */}
              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span>Текущий статус:</span>
                  <span className="font-bold text-white uppercase font-mono px-2 py-0.5 rounded bg-slate-800">
                    {applicantStatus}
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setApplicantStatus("discount")}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold hover:bg-amber-500/20 transition-all"
                  >
                    Выдать Скидку 50%
                  </button>
                  <button
                    onClick={() => setApplicantStatus("granted")}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 text-xs font-bold hover:opacity-90 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5"
                  >
                    <Award className="w-4 h-4" />
                    Присудить 100% Грант Ректора
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* --- ПОДВАЛ (FOOTER) --- */}
      <footer className="border-t border-slate-800/60 py-8 mt-20 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 Abdigani Assessment System (AAS). Built by founders, for founders.</p>
          <p className="mt-1 text-slate-600">Almaty, Kazakhstan | Powered by Next.js & Vercel</p>
        </div>
      </footer>
    </div>
  );
}
