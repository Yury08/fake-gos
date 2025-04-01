import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
    const {password, email, firstName, lastName, patronymic, dateOfBirth, dateIssueOfPassport} = await req.json()
    if (!lastName || !firstName|| !password || !patronymic || !dateOfBirth || !dateIssueOfPassport || !email) {
        return NextResponse.json({ message: "All fields are required" }, {status: 400});
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, {status: 400});
        }

        // Валидация и преобразование дат
        const birthDate = new Date(dateOfBirth);
        const passportDate = new Date(dateIssueOfPassport);

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                password: hashedPassword, 
                email, 
                firstName, 
                lastName, 
                patronymic, 
                dateOfBirth: birthDate, 
                dateIssueOfPassport: passportDate
            }
        })
        return NextResponse.json({ 
            id: user.id, 
            firstName: user.firstName, 
            email: user.email, 
            dateOfBirth: user.dateOfBirth 
        }, {status: 201});

    } catch (e) {
        console.error("Registration error:", e);
        return NextResponse.json({ message: "Internal server error" }, {status: 500});
    }
}