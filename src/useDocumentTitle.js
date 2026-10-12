import { useEffect } from 'react';

// Every route gets its own page title (WCAG 2.4.2 Page Titled), e.g. "Reserve a table · Little Lemon".
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Little Lemon` : 'Little Lemon';
  }, [title]);
}
