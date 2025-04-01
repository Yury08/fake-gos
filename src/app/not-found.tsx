'use client'

import { ArrowLeft, Server } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // Записываем ошибку в аналитику или логи
    console.error('Запрос на страницу:', window.location.pathname)
  }, [])

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
            <Server className="error-page__icon" style={{ color: '#dc2626' }} />
          </div>
          
          <h1 className="error-page__title">Технические работы</h1>
          
          <p className="error-page__message">
            В данный момент на сервере проводятся технические работы.
            Попробуйте повторить запрос позже или вернитесь на главную страницу.
          </p>
          
          <div className="error-page__code">
            <span>Ошибка 500</span>
          </div>
          
          <div className="error-page__actions">
            <button 
              onClick={() => router.back()} 
              className="error-page__button error-page__button--secondary"
            >
              Вернуться назад
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