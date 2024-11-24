import { Button } from "@/components/ui/button"
import { PlusCircle, Video } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Video className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">MeetShare</h1>
        </div>
        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Create Meet
        </Button>
      </div>
    </header>
  )
}

