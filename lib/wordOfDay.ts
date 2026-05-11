import { cacheLife } from 'next/cache'

export type Meaning = {
  partOfSpeech: string;
  definitions: Array<{
    definition: string;
    example: string | null;
  }>;
  synonyms: string[];
  antonyms: string[];
};

export type WordEntry = {
  word: string;
  phonetic: string | null;
  audio: string | null;
  meanings: Meaning[];
};

export function getFormattedDate(): string {
  return new Date()
    .toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .toUpperCase()
}

function getDayIndex(): number {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  return Math.floor((now.getTime() - start.getTime()) / 86_400_000)
}

export function getTodaysWord(words: string[]): string {
  return words[getDayIndex() % words.length]
}

export async function fetchWordEntry(word: string): Promise<WordEntry> {
  'use cache'
  cacheLife('days')

  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  )

  if (!res.ok) {
    throw new Error(`Could not fetch definition for "${word}": ${res.status}`)
  }

  const data = (await res.json()) as Array<{
    phonetic?: string
    phonetics?: Array<{ text?: string; audio?: string }>
    meanings?: Array<{
      partOfSpeech?: string
      definitions?: Array<{
        definition?: string
        example?: string
        synonyms?: string[]
        antonyms?: string[]
      }>
      synonyms?: string[]
      antonyms?: string[]
    }>
  }>

  const entry = data[0]

  const phonetic =
    entry.phonetic ??
    entry.phonetics?.find((p) => p.text)?.text ??
    null

  const audio =
    entry.phonetics?.find((p) => p.audio && p.audio.length > 0)?.audio ?? null

  const meanings: Meaning[] = (entry.meanings ?? []).map((m) => ({
    partOfSpeech: m.partOfSpeech ?? '',
    definitions: (m.definitions ?? []).slice(0, 3).map((d) => ({
      definition: d.definition ?? '',
      example: d.example ?? null,
    })),
    synonyms: [
      ...(m.synonyms ?? []),
      ...(m.definitions?.flatMap((d) => d.synonyms ?? []) ?? []),
    ].slice(0, 5),
    antonyms: [
      ...(m.antonyms ?? []),
      ...(m.definitions?.flatMap((d) => d.antonyms ?? []) ?? []),
    ].slice(0, 5),
  }))

  return { word, phonetic, audio, meanings }
}
