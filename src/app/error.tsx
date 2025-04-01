'use client'

import { AlertTriangle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Записываем ошибку в аналитику или логи
    console.error('Произошла ошибка:', error)
  }, [error])

  return (
    <div className="error-page">
      <div className="error-page__container">
        <div className="error-page__header">
          <Link href="/" className="back-link">
            <ArrowLeft className="back-link__icon" />
            На главную
          </Link>
        </div>
        
        <div className="error-page__content">
          <div className="error-page__icon-container" style={{ backgroundColor: '#fee2e2' }}>
            <AlertTriangle className="error-page__icon" style={{ color: '#dc2626' }} />
          </div>
          
          <h1 className="error-page__title">Что-то пошло не так</h1>
          
          <p className="error-page__message">
            Произошла непредвиденная ошибка при обработке вашего запроса.
            Наши специалисты уже работают над решением проблемы.
          </p>
          
          <div className="error-page__code">
            <span>Ошибка 500</span>
          </div>
          
          <div className="error-page__actions">
            <button 
              onClick={() => reset()} 
              className="error-page__button error-page__button--secondary"
            >
              Попробовать снова
            </button>
            <Link href="/" className="error-page__button error-page__button--primary">
              На главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 