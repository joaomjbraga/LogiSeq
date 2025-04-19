'use client'

import { useState, useEffect } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import styles from './page.module.css';

const Home: NextPage = () => {
  const [input, setInput] = useState('');
  const [proximo, setProximo] = useState<number | null>(null);
  const [erro, setErro] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Detecta o tema do sistema operacional e aplica quando o componente é montado
  useEffect(() => {
    // Verifica se o navegador prefere o tema escuro
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
    
    // Adiciona um listener para detectar mudanças no tema do sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    // Limpa o listener quando o componente é desmontado
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Aplica a classe do tema ao elemento body
  useEffect(() => {
    document.body.className = theme === 'dark' ? styles.darkTheme : styles.lightTheme;
  }, [theme]);

  const calcularProximoNumero = () => {
    const numeros = input.split(',').map(n => parseInt(n.trim()));
    if (numeros.length < 2 || numeros.some(isNaN)) {
      setErro("Insira pelo menos dois números válidos, separados por vírgula.");
      setProximo(null);
      return;
    }

    setErro('');
    let diffs: number[][] = [numeros];
    while (true) {
      const ultima = diffs[diffs.length - 1];
      const nova = ultima.slice(1).map((n, i) => n - ultima[i]);
      diffs.push(nova);
      if (nova.every(v => v === nova[0])) break;
    }

    let valor = diffs[diffs.length - 1][0];
    for (let i = diffs.length - 2; i >= 0; i--) {
      valor = diffs[i][diffs[i].length - 1] + valor;
    }

    setProximo(valor);
  };

  return (
    <div className={`${styles.container} ${theme === 'dark' ? styles.darkTheme : styles.lightTheme}`}>
      <Head>
        <title>LogiSeq</title>
        <meta
          name="description"
          content="Aplicação para identificação de padrões em sequências numéricas. Descubra o próximo número, visualize diferenças e entenda a lógica por trás de cada sequência."
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>LogiSeq</h1>
        <p className={styles.subtitle}>Digite uma sequência numérica (separada por vírgulas):</p>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ex: 1, 4, 9, 16"
          className={styles.input}
        />

        <button onClick={calcularProximoNumero} className={styles.calcButton}>
          Calcular Próximo Número
        </button>

        {erro && <p className={styles.error}>{erro}</p>}

        {proximo !== null && (
          <div className={styles.resultBox}>
            <h2 className={styles.resultLabel}>Próximo número da sequência:</h2>
            <p className={styles.resultValue}>{proximo}</p>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>© 2025 - LogiSeq desenvolvido por <a target='_blank' href="https://github.com/joaomjbraga">João M J Braga</a></p>
      </footer>
    </div>
  );
};

export default Home;
