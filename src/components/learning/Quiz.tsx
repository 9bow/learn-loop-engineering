import { useEffect, useState, type ReactNode } from 'react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface QuizProps {
  section: string;
  /** 'ko' (default) loads /data/quiz/<section>.json, 'en' loads /data/quiz/en/<section>.json */
  lang?: 'ko' | 'en';
}

const STRINGS = {
  ko: {
    loading: '퀴즈를 불러오는 중…',
    empty: '이 섹션의 퀴즈가 아직 없습니다.',
    error: '퀴즈를 불러오지 못했습니다.',
    title: '이해도 점검 퀴즈',
    prev: '이전',
    next: '다음',
    restart: '다시 풀기',
    progress: (cur: number, total: number) => `${cur} / ${total} 문항`,
    score: (s: number, t: number) => `점수: ${s} / ${t}`,
    correct: '정답입니다!',
    incorrect: '오답입니다.',
  },
  en: {
    loading: 'Loading quiz…',
    empty: 'No quiz for this section yet.',
    error: 'Failed to load the quiz.',
    title: 'Knowledge Check',
    prev: 'Previous',
    next: 'Next',
    restart: 'Restart',
    progress: (cur: number, total: number) => `${cur} / ${total}`,
    score: (s: number, t: number) => `Score: ${s} / ${t}`,
    correct: 'Correct!',
    incorrect: 'Incorrect.',
  },
};

/** Minimal, safe inline renderer: handles `inline code`, **bold**, and fenced ``` blocks. */
function renderRich(text: string): ReactNode {
  // Split out fenced code blocks first.
  const parts = text.split(/```(?:[\w-]*)\n?([\s\S]*?)```/g);
  return parts.map((part, i) => {
    // Odd indices are the captured code-block contents.
    if (i % 2 === 1) {
      return (
        <pre key={i} style={{ margin: '0.5rem 0' }}>
          <code>{part.replace(/\n$/, '')}</code>
        </pre>
      );
    }
    return <span key={i}>{renderInline(part)}</span>;
  });
}

function renderInline(text: string): ReactNode {
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return tokens.map((tok, i) => {
    if (tok.startsWith('`') && tok.endsWith('`')) {
      return <code key={i}>{tok.slice(1, -1)}</code>;
    }
    if (tok.startsWith('**') && tok.endsWith('**')) {
      return <strong key={i}>{tok.slice(2, -2)}</strong>;
    }
    // Preserve line breaks within plain text.
    const lines = tok.split('\n');
    return lines.map((line, j) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < lines.length - 1 ? <br /> : null}
      </span>
    ));
  });
}

export default function Quiz({ section, lang = 'ko' }: QuizProps) {
  const t = STRINGS[lang];
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Record<string, number>>({});

  useEffect(() => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    const path = lang === 'en' ? `${base}/data/quiz/en/${section}.json` : `${base}/data/quiz/${section}.json`;
    fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data: QuizQuestion[]) => setQuestions(data))
      .catch(() => setFailed(true));
  }, [section, lang]);

  if (failed) return <div className="quiz">{t.error}</div>;
  if (!questions) return <div className="quiz">{t.loading}</div>;
  if (questions.length === 0) return <div className="quiz">{t.empty}</div>;

  const q = questions[index];
  const chosen = selected[q.id];
  const answered = chosen !== undefined;
  const score = questions.reduce((acc, item) => (selected[item.id] === item.answer ? acc + 1 : acc), 0);

  const choose = (optIdx: number) => {
    if (answered) return;
    setSelected((prev) => ({ ...prev, [q.id]: optIdx }));
  };

  return (
    <div className="quiz">
      <h3>{t.title}</h3>
      <p className="quiz-progress">{t.progress(index + 1, questions.length)}</p>
      <p>
        <strong>{renderRich(q.question)}</strong>
      </p>
      {q.options.map((opt, optIdx) => {
        let cls = 'quiz-option';
        if (answered) {
          if (optIdx === q.answer) cls += ' correct';
          else if (optIdx === chosen) cls += ' incorrect';
        }
        return (
          <button key={optIdx} className={cls} disabled={answered} onClick={() => choose(optIdx)}>
            {renderRich(opt)}
          </button>
        );
      })}
      {answered && (
        <div className="quiz-explanation">
          <strong>{chosen === q.answer ? `✅ ${t.correct}` : `❌ ${t.incorrect}`}</strong>
          <div>{renderRich(q.explanation)}</div>
        </div>
      )}
      <div className="quiz-nav">
        <button className="quiz-option" style={{ width: 'auto' }} disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
          ← {t.prev}
        </button>
        <button
          className="quiz-option"
          style={{ width: 'auto' }}
          disabled={index === questions.length - 1}
          onClick={() => setIndex((i) => i + 1)}
        >
          {t.next} →
        </button>
        <button className="quiz-option" style={{ width: 'auto' }} onClick={() => { setSelected({}); setIndex(0); }}>
          {t.restart}
        </button>
        <span className="quiz-progress">{t.score(score, questions.length)}</span>
      </div>
    </div>
  );
}
