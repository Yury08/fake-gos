'use client'

import { ArrowLeft, Camera, ChevronDown, Copy, Pencil, Share2, Upload } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import './Home.css'

interface User {
    id: string
    firstName: string
    lastName: string
    patronymic: string
    email: string
    dateOfBirth: string
    dateIssueOfPassport: string
}

export default function Home() {
    const [openQuestion1, setOpenQuestion1] = useState(false)
    const [openQuestion2, setOpenQuestion2] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    const router = useRouter()

    useEffect(() => {
        const userData = localStorage.getItem('user')
        console.log('Данные из localStorage:', userData)
        
        if (!userData) {
            console.log('Пользователь не найден в localStorage')
            router.push('/auth')
            return
        }

        try {
            const parsedUser = JSON.parse(userData)
            console.log('Распарсенные данные пользователя:', parsedUser)
            
            // Проверяем наличие всех необходимых полей
            const requiredFields = ['id', 'firstName', 'lastName', 'patronymic', 'email', 'dateOfBirth', 'dateIssueOfPassport']
            const missingFields = requiredFields.filter(field => !parsedUser[field])
            
            if (missingFields.length > 0) {
                console.error('Отсутствуют обязательные поля:', missingFields)
                localStorage.removeItem('user') // Удаляем некорректные данные
                router.push('/auth')
                return
            }

            setUser(parsedUser)
        } catch (error) {
            console.error('Ошибка при парсинге данных пользователя:', error)
            localStorage.removeItem('user') // Удаляем некорректные данные
            router.push('/auth')
        }
    }, [router])

    if (!user) {
        return null
    }

    return (
        <>
        <div className="container">
            <div className="container__header">
                <Link href="/" className='back-link'>
                    <ArrowLeft className='back-link__icon' />
                    Назад
                </Link>
                <h2 className='container__header-heading'>Паспорт РФ</h2>
            </div>
            <div className="buttons">
                <button className='buttons__action'>
                    <Share2 className='buttons__action-icon' />
                    <span>Поделиться</span>
                </button>
                <button className='buttons__action'>
                    <Copy className='buttons__action-icon' />
                    <span>Скопировать</span>
                </button>
            </div>
            <div className="container__inner">
                <div className='container__inner-1'>
                    <h2>
                        <span>{user.lastName.toUpperCase()} {user.firstName.toUpperCase()} {user.patronymic.toUpperCase()}</span>
                        <span className='pencil'><Pencil /></span>
                    </h2>
                    <div className='info__field-1'>
                        <label>Пол</label>
                        <p>Мужской</p>
                    </div>
                    <div className='info__field-1'>
                        <label>Дата рождения</label>
                        <p>{user.dateOfBirth}</p>
                    </div>
                    <div className='info__field-1'>
                        <label>Гажданство</label>
                        <p>РОССИЯ</p>
                    </div>
                    <div className='info__field-1'>
                        <label>Место рождения</label>
                        <p>Г.КУРГАН КУРГАНСКАЯ ОБЛ.<br/>РОССИЯ</p>
                    </div>
                </div>
                <div className='container__inner-2'>
                    <div className="info__field-2">
                        <label>Серия и номер паспорта</label>
                        <p>5764 567489</p>
                    </div>
                     <div className="info__field-2">
                        <label>Выдан</label>
                        <p>УМВД РОССИИ ПО КУРАГНСКОЙ ОБЛСТИ</p>
                    </div>
                     <div className="info__field-2">
                        <label>Дата выдачи</label>
                        <p>{user.dateIssueOfPassport}</p>
                    </div>
                     <div className="info__field-2">
                        <label>Код подразделения</label>
                        <p>002-054</p>
                    </div>
                </div>
                <div className='container__inner-3'>
                    <div className="upload-area">
                        <div className="upload-area__buttons">
                            <button className="upload-area__button">
                                <div className="upload-area__button-content">
                                    <Camera className="upload-area__icon" />
                                    <span>Сделать фото</span>
                                </div>
                            </button>
                             <button className="upload-area__button">
                                <div className="upload-area__button-content">
                                    <Upload className="upload-area__icon" />
                                    <span>Прикрепить файл</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='previous-passports'>
                <h2 className='previous-passports__heading'>Данные предыдущих паспортов</h2>
                <div className='previous-passports__content'>
                    <p>Данные не найдены 27.03.25</p>
                    <Link href="#" className='previous-passports__link'>Почему так произошло</Link>
                </div>
            </div>

            <div className='questions'>
                <h2 className='questions__heading'>Частые вопросы</h2>
                <div className='questions__list'>
                    <div className='question'>
                        <button 
                            className={`question__header ${openQuestion1 ? 'question__header--open' : ''}`}
                            onClick={() => setOpenQuestion1(!openQuestion1)}
                        >
                            <ChevronDown className='question__icon' />
                            <span>В каких случаях меняют паспорт</span>
                        </button>
                        <div className={`question__content ${openQuestion1 ? 'question__content--open' : ''}`}>
                            <p>- При достижении 20 и 45 лет</p>
                            <p>- При изменении личных данных (ФИО)</p>
                            <p>- При порче документа</p>
                            <p>- При утере паспорта</p>
                            <p>- По желанию гражданина</p>
                        </div>
                    </div>
                    <div className='question'>
                        <button 
                            className={`question__header ${openQuestion2 ? 'question__header--open' : ''}`}
                            onClick={() => setOpenQuestion2(!openQuestion2)}
                        >
                            <ChevronDown className='question__icon' />
                            <span>Почему паспорт РФ не проходит проверку МВД</span>
                        </button>
                        <div className={`question__content ${openQuestion2 ? 'question__content--open' : ''}`}>
                            <p>- Паспорт может быть недействительным</p>
                            <p>- Данные могут быть внесены с ошибками</p>
                            <p>- Технические проблемы в базе данных</p>
                            <p>- Паспорт может быть утерян или украден</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
