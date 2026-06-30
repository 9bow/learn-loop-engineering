interface RefObject {
  title: string;
  url: string;
  accessed?: string;
}

type RefItem = string | RefObject;

interface ReferencesProps {
  items: RefItem[];
  heading?: string;
}

export default function References({ items, heading = '참고 자료' }: ReferencesProps) {
  if (!items || items.length === 0) return null;
  return (
    <section className="references">
      <h2>{heading}</h2>
      <ul>
        {items.map((item, i) => {
          if (typeof item === 'string') {
            return (
              <li key={i}>
                <a href={item} target="_blank" rel="noopener noreferrer">
                  {item}
                </a>
              </li>
            );
          }
          return (
            <li key={i}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
              {item.accessed ? <span style={{ color: 'var(--sl-color-gray-3)' }}> — accessed {item.accessed}</span> : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
