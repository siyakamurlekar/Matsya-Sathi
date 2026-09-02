import type { Language } from './types'

type Rec = {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  onresult: ((event: { results: { 0: { 0: { transcript: string } } } }) => void) | null
  onerror: (() => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
}

function getRecognizer(): Rec | null {
  const w = window as Window & {
    SpeechRecognition?: new () => Rec
    webkitSpeechRecognition?: new () => Rec
  }
  const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition
  return Ctor ? new Ctor() : null
}

/** Konkani often has no TTS voice; Hindi (India) is the usual fallback. */
function voiceLang(language: Language) {
  return language === 'en' ? 'en-IN' : 'hi-IN'
}

export function canSpeak() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function canListen() {
  const w = window as Window & {
    SpeechRecognition?: unknown
    webkitSpeechRecognition?: unknown
  }
  return Boolean(w.SpeechRecognition ?? w.webkitSpeechRecognition)
}

export function speakText(text: string, language: Language) {
  if (!canSpeak()) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = voiceLang(language)
  utterance.rate = 0.92
  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel()
}

/**
 * Listens once, then stops.
 * Returns a stop function. If recognition is missing, calls onUnavailable.
 */
export function listenOnce(
  language: Language,
  onText: (text: string) => void,
  onUnavailable: () => void,
  onEnd?: () => void,
): () => void {
  const rec = getRecognizer()
  if (!rec) {
    onUnavailable()
    return () => {}
  }

  rec.lang = voiceLang(language)
  rec.interimResults = false
  rec.maxAlternatives = 1
  rec.onresult = (event) => {
    onText(event.results[0][0].transcript)
  }
  rec.onerror = () => {
    onEnd?.()
  }
  rec.onend = () => {
    onEnd?.()
  }

  try {
    rec.start()
  } catch {
    onUnavailable()
  }

  return () => {
    try {
      rec.stop()
    } catch {
      /* already stopped */
    }
  }
}
