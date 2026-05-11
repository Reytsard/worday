import words from "@/data/words.json";
import { getTodaysWord, fetchWordEntry, getFormattedDate } from "@/lib/wordOfDay";
import WordCard from "@/components/WordCard";
import { cacheLife } from "next/cache";

export default async function Page() {
  'use cache'
  cacheLife('days')

  const word = getTodaysWord(words);
  const entry = await fetchWordEntry(word);
  const date = getFormattedDate();

  return (
    <main className="min-h-screen" style={{ background: "var(--brutal-bg)" }}>
      <header className="brutal-header">
        WORD OF THE DAY — {date}
      </header>

      <div className="max-w-[720px] mx-auto px-6 py-12">
        <WordCard entry={entry} />
      </div>
    </main>
  );
}
