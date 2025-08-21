'use client'
import React from 'react'
import StreamingAvatarChat from './StreamingAvatarChat'

// Simple test page to verify the StreamingAvatarChat component works independently
const StreamingAvatarTestPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">HeyGen Streaming Avatar Test</h1>
      <p className="mb-4 text-gray-600">
        This is a test page to verify the StreamingAvatarChat component works without form context dependencies.
      </p>
      
      <div style={{ height: '600px' }}>
        <StreamingAvatarChat />
      </div>
      
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-800">Configuration Required:</h3>
        <p className="text-yellow-700 text-sm">
          To test the avatar functionality, make sure to configure your environment variables in .env.local:
        </p>
        <ul className="text-yellow-700 text-sm mt-2 space-y-1">
          <li>• NEXT_PUBLIC_HEYGEN_TOKEN</li>
          <li>• NEXT_PUBLIC_HEYGEN_AVATAR_ID</li>
          <li>• NEXT_PUBLIC_HEYGEN_VOICE_ID</li>
          <li>• NEXT_PUBLIC_HEYGEN_KNOWLEDGE_ID</li>
        </ul>
      </div>
    </div>
  )
}

export default StreamingAvatarTestPage
