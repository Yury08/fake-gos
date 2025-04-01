import { MapPin, MessageCircle, Share2, Users, Video } from 'lucide-react'
import Link from 'next/link'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
        <div className="footer__inner">
            <div className="footer__links">
                <Link href="#" className="footer__link">Личный кабинет</Link>
                <Link href="#" className="footer__link">Регистрация</Link>
                <Link href="#" className="footer__link">Помощь</Link>
                <Link href="#" className="footer__link">Как найти услугу</Link>
                <Link href="#" className="footer__link">Карта центров обслуживания</Link>
                <Link href="#" className="footer__link">Партнерам</Link>
                <div className="footer__location">
                    <MapPin className="footer__location-icon" />
                    <span>г Москва</span>
                </div>
            </div>
            <div className="footer__icons">
                <Link href="#" className="footer__icon-link">
                    <MessageCircle className="footer__icon" />
                </Link>
                <Link href="#" className="footer__icon-link">
                    <Share2 className="footer__icon" />
                </Link>
                <Link href="#" className="footer__icon-link">
                    <Users className="footer__icon" />
                </Link>
                <Link href="#" className="footer__icon-link">
                    <Video className="footer__icon" />
                </Link>
            </div>
        </div>
    </footer>
  )
}
