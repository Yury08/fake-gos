'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import logo from '../../../public/logo.png'
import './Nav.css'

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <>
      <div className="nav">
        <div className="nav__left">
          <button 
            className={`nav__burger-button ${isMenuOpen ? 'nav__burger-button--open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <Image src={logo} alt="Госуслуги" width={150} height={40}/>
        </div>
    
        <div className='nav__right'>
          <div className="nav__avatar">
            <span className='nav__avatar-text'>КЮ</span>
          </div>
        </div>
      </div>

      <div className={`burger-menu ${isMenuOpen ? 'burger-menu--open' : ''}`}>
        <div className="burger-menu__content">
          <div className="burger-menu__dropdown">
            <button 
              className={`burger-menu__dropdown-button ${isDropdownOpen ? 'burger-menu__dropdown-button--open' : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Гражданам
              <span className="burger-menu__dropdown-arrow"></span>
            </button>
            <div className={`burger-menu__dropdown-content ${isDropdownOpen ? 'burger-menu__dropdown-content--open' : ''}`}>
              <Link href="/organizations" className="burger-menu__link">Организациям</Link>
              <Link href="/entrepreneurs" className="burger-menu__link">Предпринимателям</Link>
              <Link href="/foreigners" className="burger-menu__link">Иностранцам</Link>
            </div>
          </div>
          
          <nav className="burger-menu__nav">
            <h2>ЮРИЙ К.</h2>
            <Link href="/profile" className="burger-menu__link">
              <span className="burger-menu__icon profile-icon"></span>
              Профиль
            </Link>
            <Link href="/notifications" className="burger-menu__link">
              <span className="burger-menu__icon notifications-icon"></span>
              Уведомления
            </Link>
            <Link href="/services" className="burger-menu__link">
              <span className="burger-menu__icon services-icon"></span>
              Услуги
            </Link>
            <Link href="/documents" className="burger-menu__link">
              <span className="burger-menu__icon documents-icon"></span>
              Документы
            </Link>
            <Link href="/applications" className="burger-menu__link">
              <span className="burger-menu__icon applications-icon"></span>
              Заявления
            </Link>
            <Link href="/payments" className="burger-menu__link">
              <span className="burger-menu__icon payments-icon"></span>
              Платежи
            </Link>
            <Link href="/help" className="burger-menu__link">
              <span className="burger-menu__icon help-icon"></span>
              Помощь
            </Link>
          </nav>

          <div className="burger-menu__footer">
            <Link href="/organizations" className="burger-menu__footer-link">Все организации и роли</Link>
            <Link href="/logout" className="burger-menu__footer-link">Выйти</Link>
          </div>
        </div>
      </div>
    </>
  )
}
