import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Gunakan Service Role untuk bypass RLS
)

export async function uploadBerkas(file: File, folder: string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `${folder}/${fileName}`

  const { data, error } = await supabase.storage
    .from('berkas-magang') // Pastikan Bucket ini dibuat di Supabase
    .upload(filePath, file)

  if (error) throw error

  // Ambil URL Publiknya
  const { data: { publicUrl } } = supabase.storage
    .from('berkas-magang')
    .getPublicUrl(filePath)

  return publicUrl
}