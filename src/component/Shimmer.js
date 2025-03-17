import React from 'react'

const Shimmer = () => {
  return (
    <div className="tw-flex tw-justify-center tw-items-center tw-bg-black tw-p-8">
      <div className="tw-w-64 tw-rounded-md tw-overflow-hidden tw-shadow-xl tw-bg-gray-900 tw-animate-pulse">
        {/* Shimmer Image */}
        <div className="tw-relative tw-bg-gray-800 tw-h-56">
          <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-gray-800 tw-via-gray-700 tw-to-gray-800 tw-animate-shimmer"></div>
        </div>

        {/* Shimmer Content */}
        <div className="tw-p-3">
          {/* Title */}
          <div className="tw-w-3/4 tw-h-4 tw-bg-gray-700 tw-rounded-md tw-mb-2"></div>

          {/* Rating */}
          <div className="tw-w-10 tw-h-4 tw-bg-gray-700 tw-rounded-md tw-mb-3"></div>

          {/* Date & Runtime */}
          <div className="tw-flex tw-justify-between tw-mb-2">
            <div className="tw-w-16 tw-h-4 tw-bg-gray-700 tw-rounded-md"></div>
            <div className="tw-w-20 tw-h-4 tw-bg-gray-700 tw-rounded-md"></div>
          </div>

          {/* Genres */}
          <div className="tw-w-3/5 tw-h-4 tw-bg-gray-700 tw-rounded-md tw-mb-2"></div>

          {/* Overview */}
          <div className="tw-space-y-2">
            <div className="tw-w-full tw-h-4 tw-bg-gray-700 tw-rounded-md"></div>
            <div className="tw-w-5/6 tw-h-4 tw-bg-gray-700 tw-rounded-md"></div>
            <div className="tw-w-2/3 tw-h-4 tw-bg-gray-700 tw-rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shimmer