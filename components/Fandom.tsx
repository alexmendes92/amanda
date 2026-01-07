
import React, { useState } from 'react';
import { Wand2, Sparkles, Scroll, CloudRain, Heart, Moon, Sun, Ghost, Zap, HelpCircle, Check, X, Trophy, BookOpen } from 'lucide-react';
import { UserRole } from '../types';

interface FandomProps {
  currentUser: UserRole;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const Fandom: React.FC<FandomProps> = ({ currentUser }) => {
  // --- States for Harry Potter (Alex) ---
  const [currentSpell, setCurrentSpell] = useState({ name: "Lumos", desc: "Cria luz na ponta da varinha" });
  
  const spells = [
    { name: "Expecto Patronum", desc: "Conjur um Patrono guardião" },
    { name: "Wingardium Leviosa", desc: "Faz objetos levitarem" },
    { name: "Accio", desc: "Atrai objetos para você" },
    { name: "Expelliarmus", desc: "Desarma o oponente" },
    { name: "Mischief Managed", desc: "Esconde os segredos do mapa" }
  ];

  const castSpell = () => {
    const random = spells[Math.floor(Math.random() * spells.length)];
    setCurrentSpell(random);
  };

  // --- States for Twilight (Amanda) ---
  const [team, setTeam] = useState<'edward' | 'jacob'>('edward');
  const [twilightQuote, setTwilightQuote] = useState("E assim o leão se apaixonou pelo cordeiro...");

  const quotes = [
    "Você é a minha vida agora.",
    "Eu prefiro morrer do que ficar longe de você.",
    "Eu não tenho força para ficar longe de você mais.",
    "Você é como a minha marca de heroína pessoal.",
    "Eu serei o que você quiser que eu seja." // Jacob
  ];

  const generateQuote = () => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setTwilightQuote(random);
  };

  // --- QUIZ LOGIC ---
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Perguntas sobre Crepúsculo (Para o Alex responder)
  const twilightQuestions: QuizQuestion[] = [
    {
      question: "Qual fruta aparece na capa do primeiro livro?",
      options: ["Romã", "Maçã", "Pêra", "Morango"],
      correct: 1,
      explanation: "A maçã representa o fruto proibido!"
    },
    {
      question: "Como a pele de Edward reage ao sol?",
      options: ["Derrete", "Queima", "Brilha como diamante", "Fica invisível"],
      correct: 2,
      explanation: "This is the skin of a killer, Bella! ✨"
    },
    {
      question: "Qual o apelido que Jacob dá para a filha de Bella?",
      options: ["Nessie", "Bells", "Reny", "Monstrinha"],
      correct: 0,
      explanation: "Bella ficou furiosa porque é apelido do Monstro do Lago Ness."
    }
  ];

  // Perguntas sobre Harry Potter (Para a Amanda responder)
  const hpQuestions: QuizQuestion[] = [
    {
      question: "Qual é a casa de Hogwarts do Harry?",
      options: ["Sonserina", "Lufa-Lufa", "Grifinória", "Corvinal"],
      correct: 2,
      explanation: "Onde habitam os corações indômitos!"
    },
    {
      question: "Qual animal representa a lealdade no mundo bruxo?",
      options: ["Coruja", "Texugo", "Fênix", "Sapo"],
      correct: 1,
      explanation: "O texugo é o símbolo da Lufa-Lufa, a casa mais leal."
    },
    {
      question: "O que se diz para abrir o Mapa do Maroto?",
      options: ["Abracadabra", "Por favor", "Juro solenemente não fazer nada de bom", "Abre-te Sésamo"],
      correct: 2,
      explanation: "Mischief Managed! 📜"
    }
  ];

  // Seleciona as perguntas baseadas em QUEM vai responder (Oposto do tema atual)
  // Se sou Alex, respondo sobre Twilight. Se sou Amanda, respondo sobre HP.
  const currentQuestions = currentUser === 'alex' ? twilightQuestions : hpQuestions;
  const currentQuestion = currentQuestions[quizIndex];

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === currentQuestion.correct) {
      setQuizScore(prev => prev + 10);
    }
  };

  const nextQuestion = () => {
    if (quizIndex < currentQuestions.length - 1) {
      setQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  // --- HARRY POTTER THEME (ALEX) ---
  if (currentUser === 'alex') {
    return (
      <div className="min-h-full bg-slate-900 text-amber-50 p-6 space-y-6 pb-24 relative overflow-hidden">
        {/* Background Stars */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
           <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
           <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-75"></div>
           <div className="absolute bottom-20 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse delay-150"></div>
        </div>

        {/* Header */}
        <div className="text-center border-b border-slate-700 pb-6 relative z-10">
          <div className="flex justify-center mb-2">
             <div className="bg-slate-800 p-3 rounded-full border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
               <Zap className="w-8 h-8 text-amber-500" />
             </div>
          </div>
          <h2 className="text-3xl font-serif font-bold text-amber-500 tracking-wider">Hogwarts Legacy</h2>
          <p className="text-slate-400 text-sm mt-1 italic">"Juro solenemente não fazer nada de bom"</p>
        </div>

        {/* Quiz de Afinidade (Cross-Fandom) */}
        <div className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-6 shadow-xl relative overflow-hidden">
           <div className="flex items-center gap-2 mb-4 text-emerald-400">
             <HelpCircle className="w-5 h-5" />
             <h3 className="font-bold uppercase tracking-wider text-xs">Desafio do Universo Dela</h3>
           </div>
           
           {!showResult ? (
             <div>
               <p className="text-lg font-medium text-slate-200 mb-4">{currentQuestion.question}</p>
               <div className="space-y-2">
                 {currentQuestion.options.map((option, idx) => (
                   <button
                     key={idx}
                     onClick={() => handleAnswer(idx)}
                     disabled={isAnswered}
                     className={`w-full p-3 rounded-lg text-left transition-all text-sm font-medium ${
                       isAnswered 
                         ? idx === currentQuestion.correct 
                            ? 'bg-emerald-900/50 border border-emerald-500 text-emerald-200'
                            : idx === selectedOption 
                              ? 'bg-red-900/50 border border-red-500 text-red-200'
                              : 'bg-slate-700/30 text-slate-500'
                         : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                     }`}
                   >
                     <div className="flex justify-between items-center">
                       {option}
                       {isAnswered && idx === currentQuestion.correct && <Check className="w-4 h-4 text-emerald-400" />}
                       {isAnswered && idx === selectedOption && idx !== currentQuestion.correct && <X className="w-4 h-4 text-red-400" />}
                     </div>
                   </button>
                 ))}
               </div>
               
               {isAnswered && (
                 <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                   <p className="text-xs text-amber-200 italic mb-3">💡 {currentQuestion.explanation}</p>
                   <button 
                     onClick={nextQuestion}
                     className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold text-sm"
                   >
                     {quizIndex < currentQuestions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}
                   </button>
                 </div>
               )}
             </div>
           ) : (
             <div className="text-center py-4">
               <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
               <h3 className="text-xl font-bold text-white mb-1">Pontuação: {quizScore}</h3>
               <p className="text-slate-400 text-sm mb-4">
                 {quizScore === 30 ? "Você sabe tudo sobre o mundo dela! ❤️" : "Bom esforço! Ela vai te ensinar mais."}
               </p>
               <button onClick={resetQuiz} className="text-xs text-amber-500 hover:text-amber-400 underline">Jogar Novamente</button>
             </div>
           )}
        </div>

        {/* Spell Caster */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-xl relative backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <Wand2 className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-amber-100">Praticar Feitiços</h3>
          </div>
          
          <div className="text-center py-6 bg-slate-900/50 rounded-xl border border-slate-700 mb-4">
            <p className="text-2xl font-serif font-bold text-amber-400 mb-2">{currentSpell.name}</p>
            <p className="text-slate-400 text-sm">{currentSpell.desc}</p>
          </div>

          <button 
            onClick={castSpell}
            className="w-full bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Lançar Novo Feitiço
          </button>
        </div>

        {/* House Card */}
        <div className="bg-gradient-to-br from-red-900 to-red-950 rounded-2xl p-6 border-2 border-amber-600/30 shadow-2xl relative overflow-hidden">
           <div className="absolute -right-4 -bottom-4 opacity-20">
              <Ghost className="w-32 h-32 text-amber-500" />
           </div>
           <h3 className="text-xl font-serif font-bold text-amber-500 mb-2">Gryffindor</h3>
           <p className="text-red-100/80 text-sm leading-relaxed max-w-[80%]">
             Onde habitam os corações indômitos. Ousadia, sangue-frio e nobreza destacam os alunos da Grifinória.
           </p>
        </div>
      </div>
    );
  }

  // --- TWILIGHT THEME (AMANDA) ---
  return (
    <div className="min-h-full bg-slate-800 text-slate-100 p-6 space-y-6 pb-24 relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-emerald-950 opacity-90 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

      {/* Header */}
      <div className="text-center relative z-10 pt-4">
        <h2 className="text-3xl font-serif tracking-widest font-light text-slate-200 drop-shadow-md">
          THE TWILIGHT SAGA
        </h2>
        <div className="flex justify-center items-center gap-2 mt-2 text-emerald-400 text-xs uppercase tracking-[0.3em]">
          <CloudRain className="w-3 h-3" />
          Forks, Washington
        </div>
      </div>

      {/* Quiz de Afinidade (Cross-Fandom) */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/10">
           <div className="flex items-center gap-2 mb-4 text-amber-200">
             <BookOpen className="w-5 h-5" />
             <h3 className="font-bold uppercase tracking-wider text-xs font-serif">N.O.M.s (Mundo Dele)</h3>
           </div>
           
           {!showResult ? (
             <div>
               <p className="text-lg font-serif italic text-white/90 mb-4">{currentQuestion.question}</p>
               <div className="space-y-2">
                 {currentQuestion.options.map((option, idx) => (
                   <button
                     key={idx}
                     onClick={() => handleAnswer(idx)}
                     disabled={isAnswered}
                     className={`w-full p-3 rounded-lg text-left transition-all text-sm font-medium ${
                       isAnswered 
                         ? idx === currentQuestion.correct 
                            ? 'bg-emerald-900/70 border border-emerald-400 text-emerald-100'
                            : idx === selectedOption 
                              ? 'bg-red-900/70 border border-red-400 text-red-100'
                              : 'bg-slate-900/30 text-slate-400'
                         : 'bg-slate-900/40 hover:bg-slate-900/60 text-slate-200 border border-white/5'
                     }`}
                   >
                     <div className="flex justify-between items-center">
                       {option}
                       {isAnswered && idx === currentQuestion.correct && <Check className="w-4 h-4 text-emerald-400" />}
                       {isAnswered && idx === selectedOption && idx !== currentQuestion.correct && <X className="w-4 h-4 text-red-400" />}
                     </div>
                   </button>
                 ))}
               </div>
               
               {isAnswered && (
                 <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                   <p className="text-xs text-emerald-200 font-serif italic mb-3">✨ {currentQuestion.explanation}</p>
                   <button 
                     onClick={nextQuestion}
                     className="w-full py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg font-bold text-sm uppercase tracking-widest"
                   >
                     {quizIndex < currentQuestions.length - 1 ? 'Próxima' : 'Resultado'}
                   </button>
                 </div>
               )}
             </div>
           ) : (
             <div className="text-center py-4">
               <Trophy className="w-12 h-12 text-amber-300 mx-auto mb-3" />
               <h3 className="text-xl font-serif font-bold text-white mb-1">Pontuação: {quizScore}</h3>
               <p className="text-slate-300 text-sm font-serif mb-4">
                 {quizScore === 30 ? "10 pontos para a Amanda! 🧙‍♀️" : "Precisa maratonar os filmes com ele!"}
               </p>
               <button onClick={resetQuiz} className="text-xs text-emerald-400 hover:text-emerald-300 underline uppercase tracking-widest">Jogar Novamente</button>
             </div>
           )}
      </div>

      {/* Quote Card */}
      <div className="relative z-10 bg-slate-900/40 backdrop-blur-md border border-white/10 p-8 rounded-tr-3xl rounded-bl-3xl shadow-2xl">
        <div className="absolute -top-3 -left-2 text-5xl font-serif text-white/20">"</div>
        <p className="text-center font-serif text-lg text-white/90 italic leading-relaxed">
          {twilightQuote}
        </p>
        <div className="absolute -bottom-6 -right-2 text-5xl font-serif text-white/20">"</div>
        
        <button 
           onClick={generateQuote}
           className="mt-6 mx-auto block text-xs text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-widest border-b border-emerald-400/30 pb-1"
        >
          Nova Citação
        </button>
      </div>

      {/* Team Selector */}
      <div className="relative z-10 bg-white/5 rounded-2xl p-1 flex items-center justify-between border border-white/10">
         <button 
           onClick={() => setTeam('edward')}
           className={`flex-1 py-3 rounded-xl flex flex-col items-center gap-1 transition-all duration-500 ${
             team === 'edward' ? 'bg-slate-200 text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'
           }`}
         >
           <span className="font-serif text-xs uppercase tracking-widest font-bold">Team Edward</span>
           <div className={`w-2 h-2 rounded-full ${team === 'edward' ? 'bg-amber-400' : 'bg-transparent'}`}></div>
         </button>
         
         <button 
           onClick={() => setTeam('jacob')}
           className={`flex-1 py-3 rounded-xl flex flex-col items-center gap-1 transition-all duration-500 ${
             team === 'jacob' ? 'bg-amber-900 text-amber-100 shadow-lg' : 'text-slate-400 hover:text-white'
           }`}
         >
           <span className="font-serif text-xs uppercase tracking-widest font-bold">Team Jacob</span>
           <div className={`w-2 h-2 rounded-full ${team === 'jacob' ? 'bg-red-500' : 'bg-transparent'}`}></div>
         </button>
      </div>

      {/* Character Mood */}
      <div className="relative z-10 transition-all duration-700">
        {team === 'edward' ? (
          <div className="bg-gradient-to-r from-slate-300 to-slate-100 text-slate-900 rounded-2xl p-6 shadow-xl border border-white/50">
             <div className="flex justify-between items-start mb-2">
               <h3 className="font-serif font-bold text-xl">O Vampiro</h3>
               <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
             </div>
             <p className="text-sm font-serif italic opacity-80 mb-4">
               "Você é a única razão pela qual eu estou vivo... se é que isso é estar vivo."
             </p>
             <div className="h-1 w-full bg-slate-300 rounded-full overflow-hidden">
               <div className="h-full bg-slate-900 w-[90%]"></div>
             </div>
             <p className="text-[10px] uppercase mt-2 tracking-wider text-slate-500">Nível de Proteção: 90%</p>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-amber-900 to-amber-950 text-amber-100 rounded-2xl p-6 shadow-xl border border-amber-900/50">
             <div className="flex justify-between items-start mb-2">
               <h3 className="font-serif font-bold text-xl">O Lobisomem</h3>
               <Moon className="w-5 h-5 text-red-400" />
             </div>
             <p className="text-sm font-serif italic opacity-80 mb-4">
               "É uma coisa de lobo. Nós não escolhemos quem amamos."
             </p>
             <div className="h-1 w-full bg-amber-900/50 rounded-full overflow-hidden">
               <div className="h-full bg-red-600 w-[95%]"></div>
             </div>
             <p className="text-[10px] uppercase mt-2 tracking-wider text-amber-400/60">Nível de Calor: 95%</p>
          </div>
        )}
      </div>

      {/* Romantic Gesture */}
      <div className="relative z-10 text-center pt-8">
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-red-600/20 border border-red-500/30 animate-pulse">
           <Heart className="w-8 h-8 text-red-500 fill-red-500" />
        </div>
        <p className="mt-4 text-xs font-serif text-slate-400 tracking-widest uppercase">
          Eternamente
        </p>
      </div>

    </div>
  );
};

export default Fandom;
