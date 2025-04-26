'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconBrain,
  IconSparkles,
  IconVariable,
} from '@tabler/icons-react';

const translations = {
  pt: {
    title: '✨ LogiSeq',
    subtitle: 'Análise Inteligente de Sequências Numéricas',
    inputLabel: 'Digite os números da sequência separados por vírgula:',
    inputPlaceholder: 'Exemplo: 2, 4, 8, 10, 15',
    buttonCalcular: '🔮 Descobrir Próximo Número',
    buttonLimpar: '🔄 Recomeçar',
    errorInvalido: '❌ Por favor, insira uma sequência de números válidos.',
    errorPadrao: '🤔 Não foi possível identificar um padrão na sequência.',
    resultado: 'O próximo número da sequência é:',
    resultadoDetalhado: 'Análise detalhada:',
    diferencas: 'Padrão encontrado:',
    media: 'Constante identificada:',
    rodape: 'Desenvolvido com 💜 por',
  },
  en: {
    title: '✨ LogiSeq',
    subtitle: 'Intelligent Numerical Sequence Analysis',
    inputLabel: 'Enter the sequence numbers separated by commas:',
    inputPlaceholder: 'Example: 2, 4, 8, 10, 15',
    buttonCalcular: '🔮 Discover Next Number',
    buttonLimpar: '🔄 Start Over',
    errorInvalido: '❌ Please enter a valid number sequence.',
    errorPadrao: '🤔 Could not identify a pattern in the sequence.',
    resultado: 'The next number in the sequence is:',
    resultadoDetalhado: 'Detailed analysis:',
    diferencas: 'Pattern found:',
    media: 'Identified constant:',
    rodape: 'Developed with 💜 by',
  },
};

const Home = () => {
  const [numeros, setNumeros] = useState<string>('');
  const [proximoNumero, setProximoNumero] = useState<number | null>(null);
  const [media, setMedia] = useState<number | null>(null);
  const [diferencas, setDiferencas] = useState<number[]>([]);
  const [erro, setErro] = useState<string>('');
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const t = translations[lang];

  const calcularProximo = () => {
    if (proximoNumero !== null) {
      setNumeros('');
      setProximoNumero(null);
      setMedia(null);
      setDiferencas([]);
      setErro('');
      return;
    }

    const numerosArray = numeros.split(',').map(n => parseFloat(n.trim()));
    
    if (numerosArray.some(isNaN)) {
      setErro(t.errorInvalido);
      return;
    }

    // Lógica para calcular o próximo número
    const diferenca = numerosArray[1] - numerosArray[0];
    const mediaCalc = numerosArray.reduce((a, b) => a + b, 0) / numerosArray.length;
    
    setMedia(mediaCalc);
    setDiferencas([diferenca]);
    setProximoNumero(numerosArray[numerosArray.length - 1] + diferenca);
  };

  const detalharCalculo = () => {
    if (!proximoNumero) return '';
    
    const numerosArray = numeros.split(',').map(n => parseFloat(n.trim()));
    const diferenca = diferencas[0];
    
    return `Sequência original: ${numerosArray.join(', ')}
Diferença constante: ${diferenca}
Próximo número: ${numerosArray[numerosArray.length - 1]} + ${diferenca} = ${proximoNumero}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-950 flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 relative"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
        className="absolute top-4 right-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all"
        aria-label="Change language"
      >
        {lang === 'pt' ? '🌎 EN' : '🌎 PT'}
      </motion.button>

      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-full max-w-xl mb-12 flex flex-col items-center justify-center gap-8"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 mb-6"
        >
          <IconBrain size={48} className="text-purple-300" />
          <IconSparkles size={48} className="text-indigo-300" />
          <IconVariable size={48} className="text-violet-300" />
        </motion.div>
        
        <motion.h1
          className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300 text-4xl sm:text-5xl font-bold text-center mb-4"
        >
          {t.title}
        </motion.h1>
        <motion.h2 className="text-purple-200 text-xl sm:text-2xl text-center mb-8 font-light">
          {t.subtitle}
        </motion.h2>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-xl backdrop-blur-md bg-white/5 p-6 rounded-2xl shadow-xl"
      >
        <div className="mb-6">
          <label className="text-purple-200 text-lg font-medium block mb-2" htmlFor="numeros">
            {t.inputLabel}
          </label>
          <input
            type="text"
            id="numeros"
            value={numeros}
            onChange={(e) => setNumeros(e.target.value)}
            placeholder={t.inputPlaceholder}
            className="w-full p-4 bg-white/10 border border-purple-300/30 rounded-xl text-white placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            aria-label="Sequence input"
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={calcularProximo}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium text-lg hover:opacity-90 transition-all shadow-lg"
        >
          {proximoNumero === null ? t.buttonCalcular : t.buttonLimpar}
        </motion.button>

        <AnimatePresence>
          {proximoNumero !== null && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 text-white bg-white/5 p-6 rounded-xl"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-center mb-6"
              >
                <h3 className="text-2xl font-bold text-purple-300 mb-2">{t.resultado}</h3>
                <motion.span
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-indigo-300 text-transparent bg-clip-text"
                >
                  {proximoNumero}
                </motion.span>
              </motion.div>
              
              <div className="space-y-4 text-purple-200">
                <p className="font-medium">{t.resultadoDetalhado}</p>
                <pre className="whitespace-pre-wrap bg-white/5 p-4 rounded-lg text-sm">
                  {detalharCalculo()}
                </pre>
                <p className="font-medium">{t.diferencas} 
                  <span className="text-indigo-300"> {diferencas.join(', ')}</span>
                </p>
                <p className="font-medium">{t.media} 
                  <span className="text-indigo-300"> {media}</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {erro && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 mt-4 p-4 bg-red-900/20 rounded-xl text-center"
          >
            {erro}
          </motion.p>
        )}
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-purple-300/70 text-sm"
      >
            <a 
             href="https://github.com/joaomjbraga" 
             target="_blank" 
             rel="noopener noreferrer"
             className="hover:text-purple-300 transition-colors duration-300 flex items-center justify-center gap-2"
             aria-label="Link para o GitHub de João M J Braga"
           >
             {t.rodape} João M J Braga 
             <motion.span
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
               transition={{ type: "spring", stiffness: 400, damping: 17 }}
             >
               🚀
             </motion.span>
           </a>
           </motion.footer>    </motion.div>
  );
};

export default Home;