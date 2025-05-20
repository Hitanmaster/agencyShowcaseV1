"use client"

import { useState, useEffect, useRef } from "react"
import data from "../data/pentagram-data.json"
import { motion, AnimatePresence } from "framer-motion"

const ITEMS_PER_PAGE = 10

export default function PaginatedGallery() {
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [projectsData, setProjectsData] = useState([...data])
  const paginationRef = useRef(null)

  const totalPages = Math.ceil(projectsData.length / ITEMS_PER_PAGE)
  const currentItems = projectsData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  // Simulate loading state and scroll to pagination
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)

      // Add a small delay before scrolling to ensure content is rendered
      setTimeout(() => {
        if (paginationRef.current) {
          paginationRef.current.scrollIntoView({ behavior: "smooth" })
        }
        console.log("Scrolling to pagination", paginationRef.current)
      }, 100)
    }, 600)

    return () => clearTimeout(timer)
  }, [page, projectsData]) // Add projectsData as dependency to trigger on randomize

  // Function to randomize projects
  const randomizeProjects = () => {
    setIsLoading(true)
    // Create a shuffled copy of the data
    const shuffled = [...data].sort(() => Math.random() - 0.5)

    // Use setTimeout to simulate loading and ensure UI updates
    setTimeout(() => {
      setProjectsData(shuffled)
      setPage(1)
      setIsLoading(false)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <div className="max-w-6xl mx-auto p-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center sm:text-left text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500"
          >
            Pentagram Projects
          </motion.h1>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={randomizeProjects}
            className="mt-4 sm:mt-0 px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium transition-colors duration-300 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2 animate-spin-slow"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.734 4.266a.75.75 0 0 1 0 1.06l-2.475 2.475h.991A8.25 8.25 0 1 1 10 3.75a.75.75 0 0 1 0 1.5 6.75 6.75 0 1 0 6.75 6.75h-1.232l2.475 2.475a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z"
                fill="currentColor"
              />
            </svg>
            Randomize Projects
          </motion.button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="loader">
              <div className="h-16 w-16 rounded-full border-t-4 border-teal-400 border-opacity-50 animate-spin"></div>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={page + projectsData.length} // Change key when data changes
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            >
              {currentItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg hover:shadow-teal-900/20 transition-all duration-300"
                >
                  <a
                    href={item.project_page_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative overflow-hidden aspect-video group"
                  >
                    <img
                      src={item.media_url[0] || "/placeholder.svg"}
                      alt={item.title}
                      width="400"
                      height="300"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white font-medium px-4 py-2 rounded-lg bg-teal-600/80 backdrop-blur-sm">
                        View Project
                      </span>
                    </div>
                  </a>
                  <div className="p-5">
                    <h2 className="text-xl font-semibold mb-2 text-teal-300">{item.title}</h2>
                    <p className="text-sm text-slate-300 line-clamp-3">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Pagination */}
        <motion.div
          ref={paginationRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center items-center mt-12 space-x-4"
        >
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1 || isLoading}
            className="px-5 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:hover:bg-slate-700 transition-colors duration-300 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Previous
          </button>

          <div className="flex items-center space-x-1 overflow-x-auto max-w-[50vw] pb-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                disabled={isLoading}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  page === i + 1 ? "bg-teal-600 text-white" : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages || isLoading}
            className="px-5 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:hover:bg-slate-700 transition-colors duration-300 flex items-center"
          >
            Next
            <svg
              className="w-5 h-5 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
