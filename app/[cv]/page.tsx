import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'

interface PageProps {
  params: Promise<{ cv: string }>
}

export default async function CVPage({ params }: PageProps) {
  const { cv } = await params

  // Check if the PDF file exists
  const pdfPath = path.join(process.cwd(), 'public', 'cv', `${cv}.pdf`)
  const fileExists = fs.existsSync(pdfPath)

  if (!fileExists) {
    notFound()
  }

  const pdfUrl = `/cv/${cv}.pdf`

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white capitalize">
            {cv}&apos;s CV
          </h1>
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download
          </a>
        </div>
      </header>

      {/* PDF Viewer */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <iframe
            src={pdfUrl}
            className="w-full h-[85vh]"
            title={`${cv}'s CV`}
          />
        </div>
      </main>
    </div>
  )
}
