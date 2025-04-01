'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Auth() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false)
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    gender: '',
    birthDate: '',
    passportDate: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/reg'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          isLogin 
            ? { email: formData.email, password: formData.password }
            : {
                ...formData,
                patronymic: formData.middleName,
                dateOfBirth: formData.birthDate,
                dateIssueOfPassport: formData.passportDate
              }
        ),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `Ошибка при ${isLogin ? 'авторизации' : 'регистрации'}`)
      }

      // Сохраняем данные пользователя в localStorage
      const userData = isLogin ? data.user : {
        id: data.id,
        firstName: data.firstName,
        lastName: formData.lastName,
        patronymic: formData.middleName,
        email: data.email,
        dateOfBirth: formData.birthDate,
        dateIssueOfPassport: formData.passportDate
      }
      
      console.log('Сохранение данных пользователя:', userData)
      localStorage.setItem('user', JSON.stringify(userData))
      
      // После успешной авторизации/регистрации перенаправляем на главную страницу
      router.push('/')
    } catch (err) {
      console.error('Ошибка при сохранении данных:', err)
      setError(err instanceof Error ? err.message : `Произошла ошибка при ${isLogin ? 'авторизации' : 'регистрации'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError('')
  }

  return (
    <div className="auth">
      <div className="auth__header">
        <Link href="/" className="back-link">
          <ArrowLeft className="back-link__icon" />
          Назад
        </Link>
        <h1 className="auth__title">{isLogin ? 'Вход' : 'Регистрация'}</h1>
      </div>

      {error && <div className="auth__error">{error}</div>}

      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="form__label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form__input"
            required
          />
        </div>

        <div className="form__group">
          <label className="form__label">Пароль</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form__input"
            required
            minLength={6}
          />
        </div>

        {!isLogin && (
          <>
            <div className="form__group">
              <label className="form__label">Фамилия</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form__input"
                required
              />
            </div>

            <div className="form__group">
              <label className="form__label">Имя</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form__input"
                required
              />
            </div>

            <div className="form__group">
              <label className="form__label">Отчество</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="form__input"
                required
              />
            </div>

            <div className="form__group">
              <label className="form__label">Пол</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form__select"
                required
              >
                <option value="">Выберите пол</option>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
              </select>
            </div>

            <div className="form__group">
              <label className="form__label">Дата рождения</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="form__input"
                required
              />
            </div>

            <div className="form__group">
              <label className="form__label">Дата выдачи паспорта</label>
              <input
                type="date"
                name="passportDate"
                value={formData.passportDate}
                onChange={handleChange}
                className="form__input"
                required
              />
            </div>
          </>
        )}

        <button 
          type="submit" 
          className="form__submit"
          disabled={isLoading}
        >
          {isLoading ? (isLogin ? 'Вход...' : 'Регистрация...') : (isLogin ? 'Войти' : 'Продолжить')}
        </button>

        <button 
          type="button" 
          className="form__toggle"
          onClick={toggleMode}
        >
          {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
        </button>
      </form>
    </div>
  )
}
