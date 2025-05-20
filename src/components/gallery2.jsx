import React, { useState } from 'react';
import data from '../../data/pentagram-data.json';

const ITEMS_PER_PAGE = 10;

export default function PaginatedGallery() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const currentItems = data.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Pentagram Projects</h1>

      {/* 2-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {currentItems.map((item, index) => (
          <div key={index} className="rounded-md overflow-hidden bg-white shadow">
            {/* Image with fixed aspect ratio */}
            <div className="aspect-video bg-gray-200">
              <img
                src={item.media_url[0]}
                alt={item.title}
                loading="lazy"
                width="400"
                height="225"
                className="w-full h-full object-cover rounded-t-md"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-1">{item.title}</h2>
              <p className="text-sm text-gray-700">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
