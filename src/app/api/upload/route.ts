import { writeFile } from "fs/promises";
import { join } from 'path'
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log('chegou a req')
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false})
  }
  console.log('entrei aqui')
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const path = join('./', 'public/tmp', file.name)
  await writeFile(path, buffer)

  return NextResponse.json({success: true, msg: `open /tmp/${file.name} to see the uploaded file`})

}