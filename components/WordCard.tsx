import { WordEntry } from "@/lib/wordOfDay";
import TTSButton from "@/components/TTSButton";
import ShareButton from "@/components/ShareButton";

interface WordCardProps {
  entry: WordEntry;
}

export default function WordCard({ entry }: WordCardProps) {
  return (
    <div className="brutal-card">
      {/* Word and phonetic */}
      <div className="mb-6">
        <h1
          className="text-5xl md:text-6xl font-bold uppercase tracking-tight"
          style={{ color: "#0A0A0A" }}
        >
          {entry.word}
        </h1>
        {entry.phonetic && (
          <p className="text-lg mt-2" style={{ color: "#555" }}>
            {entry.phonetic}
          </p>
        )}
      </div>

      {/* Meanings */}
      {entry.meanings.map((meaning, i) => {
        const examples = meaning.definitions
          .map((d) => d.example)
          .filter((e): e is string => e !== null);

        return (
          <div key={i}>
            <div className="border-t-[3px] border-[#0A0A0A] my-6" />

            <div className="mb-4">
              <span className="brutal-badge">{meaning.partOfSpeech.toUpperCase()}</span>
            </div>

            {/* Definitions */}
            <ol className="space-y-3">
              {meaning.definitions.map((def, j) => (
                <li key={j} className="flex gap-3">
                  {meaning.definitions.length > 1 && (
                    <span
                      className="text-sm font-bold shrink-0"
                      style={{ color: "#FF2D00", minWidth: "1.25rem" }}
                    >
                      {j + 1}.
                    </span>
                  )}
                  <p className="text-base leading-relaxed">{def.definition}</p>
                </li>
              ))}
            </ol>

            {/* Examples */}
            {examples.length > 0 && (
              <div className="mt-5 p-4" style={{ background: "#F5F0E8", border: "2px solid #0A0A0A" }}>
                <p
                  className="text-xs font-bold uppercase mb-3"
                  style={{ color: "#666", letterSpacing: "0.12em" }}
                >
                  How it&rsquo;s used
                </p>
                <ul className="space-y-2">
                  {examples.map((ex, k) => (
                    <li key={k} className="flex gap-2">
                      <span style={{ color: "#FF2D00" }} className="font-bold shrink-0">—</span>
                      <p className="text-sm italic" style={{ color: "#333" }}>
                        &ldquo;{ex}&rdquo;
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {meaning.synonyms.length > 0 && (
              <p className="mt-4 text-sm">
                <span
                  className="font-bold uppercase"
                  style={{ color: "#666", letterSpacing: "0.1em" }}
                >
                  Synonyms:{" "}
                </span>
                {meaning.synonyms.join(", ")}
              </p>
            )}

            {meaning.antonyms.length > 0 && (
              <p className="mt-2 text-sm">
                <span
                  className="font-bold uppercase"
                  style={{ color: "#666", letterSpacing: "0.1em" }}
                >
                  Antonyms:{" "}
                </span>
                {meaning.antonyms.join(", ")}
              </p>
            )}
          </div>
        );
      })}

      {/* Action buttons */}
      <div className="border-t-[3px] border-[#0A0A0A] my-6" />
      <div className="flex gap-4 flex-wrap">
        <TTSButton word={entry.word} audioUrl={entry.audio} />
        <ShareButton entry={entry} />
      </div>
    </div>
  );
}
