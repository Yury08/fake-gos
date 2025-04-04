import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const {password, email} = await req.json()
    if (!password || !email) {
        return NextResponse.json({ message: "All fields are required" }, {status: 400});
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return NextResponse.json({ message: "Invalid credentials" }, {status: 400});

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return NextResponse.json({ message: "Invalid credentials" }, {status: 400});

        return NextResponse.json({ 
            user: { 
                id: user.id, 
                firstName: user.firstName, 
                lastName: user.lastName, 
                patronymic: user.patronymic,
                dateOfBirth: user.dateOfBirth,
                dateIssueOfPassport: user.dateIssueOfPassport,
                email: user.email 
            } 
        }, {status: 200});

    } catch (e) {
        console.error("Login error:", e);
        return NextResponse.json({ message: "Internal server error" }, {status: 500});
    }
}