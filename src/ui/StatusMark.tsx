type SafetyStatus = 'safe' | 'caution' | 'emergency'

const words = {
  safe: { kn: 'सुरक्षित', en: 'SAFE', icon: '🟢' },
  caution: { kn: 'सावधान', en: 'CAUTION', icon: '🟡' },
  emergency: { kn: 'आपत्काल', en: 'EMERGENCY', icon: '🔴' },
}

type Props = {
  status: SafetyStatus
  language: 'kn' | 'en'
}

/** Always icon + word + colour. Never colour alone. */
export function StatusMark({ status, language }: Props) {
 const item = words[status as keyof typeof words]
  return (
    <span className="status-mark" data-status={status}>
      <span aria-hidden="true">{item.icon}</span>
      <span>{language === 'en' ? item.en : item.kn}</span>
    </span>
  )
}
