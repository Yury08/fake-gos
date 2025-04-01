import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Маршруты, которые мы обслуживаем в нашем приложении
const validPaths = [
  '/', 
  '/auth', 
  '/api/auth/login', 
  '/api/auth/reg'
]

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  
  // Пропускаем API запросы и статические файлы
  if (url.pathname.startsWith('/api/') || 
      url.pathname.startsWith('/_next/') || 
      url.pathname.includes('.')) {
    return NextResponse.next()
  }

  // Проверяем, существует ли маршрут
  if (!validPaths.some(path => url.pathname === path)) {
    console.log(`Запрос к серверу: ${url.pathname} - временно недоступен`)
    
    // Перенаправляем на страницу с информацией о технических работах
    return NextResponse.rewrite(new URL('/not-found', request.url))
  }
  
  return NextResponse.next()
}

// Указываем, к каким маршрутам применяется middleware
export const config = {
  matcher: [
    /*
     * Соответствует всем путям, кроме:
     * 1. Путей, начинающихся с api (API-маршруты)
     * 2. Путей, начинающихся с _next/static (статические файлы)
     * 3. Путей, начинающихся с _next/image (оптимизированные изображения)
     * 4. Путей, заканчивающихся .png, .jpg, .jpeg, .gif, .ico, .svg (изображения)
     */
    '/((?!api|_next/static|_next/image|favicon|images|.*\\.(?:png|jpg|jpeg|gif|ico|svg)$).*)',
  ],
} 