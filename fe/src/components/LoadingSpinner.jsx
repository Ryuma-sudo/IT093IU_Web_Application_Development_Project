import React from 'react'

const LoadingSpinner = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-nf-bg gap-4'>
            <div className='relative'>
                <div className='w-16 h-16 border-nf-border border-2 rounded-full' />
                <div className='w-16 h-16 border-nf-accent border-t-2 animate-spin rounded-full absolute left-0 top-0' />
            </div>
            <span className="text-nf-text-muted text-sm">Loading...</span>
        </div>
    )
}

export default LoadingSpinner
