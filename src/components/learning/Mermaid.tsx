import { useEffect, useRef, useState } from 'react';

interface MermaidProps {
  chart: string;
}

let idCounter = 0;

export default function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    idCounter += 1;
    const renderId = `mermaid-${idCounter}`;
    import('mermaid').then(({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'strict' });
      mermaid
        .render(renderId, chart)
        .then(({ svg: out }) => {
          if (!cancelled) setSvg(out);
        })
        .catch(() => {
          if (!cancelled) setSvg('');
        });
    });
    return () => {
      cancelled = true;
    };
  }, [chart]);

  return (
    <div
      ref={ref}
      className="mermaid-diagram"
      style={{ margin: '1.5rem 0', textAlign: 'center' }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
