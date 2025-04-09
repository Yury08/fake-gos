'use client'

import { ArrowLeft, Camera, ChevronDown, Copy, Pencil, Share2, Upload } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
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
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [showCamera, setShowCamera] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const userData = localStorage.getItem('user')
        console.log('Данные из localStorage:', userData)
        
        if (!userData) {
            console.log('Пользователь не найден в localStorage')
            router.push('/auth')
            return
        }
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)

    }, [router])

    if (!user) {
        return null
    }

    const fullName = `${user.lastName || ''} ${user.firstName || ''} ${user.patronymic || ''}`.trim()

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}.${month}.${year}`
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setSelectedImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
                setShowCamera(true)
            }
        } catch (err) {
            console.error('Ошибка при доступе к камере:', err)
            alert('Не удалось получить доступ к камере')
        }
    }

    const takePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas')
            canvas.width = videoRef.current.videoWidth
            canvas.height = videoRef.current.videoHeight
            canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0)
            const photoUrl = canvas.toDataURL('image/jpeg')
            setSelectedImage(photoUrl)
            setShowCamera(false)
            // Остановка потока камеры
            const stream = videoRef.current.srcObject as MediaStream
            stream?.getTracks().forEach(track => track.stop())
        }
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
                        <span>{fullName.toUpperCase()}</span>
                        <span className='pencil'><Pencil /></span>
                    </h2>
                    <div className='info__field-1'>
                        <label>Пол</label>
                        <p>Мужской</p>
                    </div>
                    <div className='info__field-1'>
                        <label>Дата рождения</label>
                        <p>{formatDate(user.dateOfBirth)}</p>
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
                        <p>3721 897312</p>
                    </div>
                     <div className="info__field-2">
                        <label>Выдан</label>
                        <p>УМВД РОССИИ ПО КУРАГНСКОЙ ОБЛАСТИ</p>
                    </div>
                     <div className="info__field-2">
                        <label>Дата выдачи</label>
                        <p>{formatDate(user.dateIssueOfPassport)}</p>
                    </div>
                     <div className="info__field-2">
                        <label>Код подразделения</label>
                        <p>450-002</p>
                    </div>
                </div>
                <div className='container__inner-3'>
                    <div className="upload-area">
                        {showCamera && (
                            <div className="camera-container">
                                <video ref={videoRef} autoPlay playsInline />
                                <button onClick={takePhoto} className="take-photo-button">
                                    Сделать снимок
                                </button>
                                <button onClick={() => setShowCamera(false)} className="close-camera-button">
                                    Закрыть камеру
                                </button>
                            </div>
                        )}
                        {selectedImage && (
                            <div className="preview-container">
                                <img src={selectedImage} alt="Загруженное фото" className="preview-image" />
                                <button onClick={() => setSelectedImage(null)} className="remove-image-button">
                                    Удалить фото
                                </button>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        <div className="upload-area__buttons">
                            <button className="upload-area__button" onClick={startCamera}>
                                <div className="upload-area__button-content">
                                    <Camera className="upload-area__icon" />
                                    <span>Сделать фото</span>
                                </div>
                            </button>
                            <button 
                                className="upload-area__button" 
                                onClick={() => fileInputRef.current?.click()}
                            >
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
