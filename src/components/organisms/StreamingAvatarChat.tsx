'use client'
import React, { useState, useEffect, useRef } from 'react'
import StreamingAvatar, { 
  AvatarQuality, 
  StreamingEvents, 
  TaskType, 
  TaskMode,
  VoiceEmotion,
  STTProvider,
  VoiceChatTransport
} from '@heygen/streaming-avatar'
import { Button } from '../atoms/button'
// import { Input } from '../atoms/input' // Removed due to form context dependency
import { Card, CardContent, CardHeader, CardTitle } from '../molecules/card'
import { Mic, MicOff, Send, Power, PowerOff, Volume2, VolumeX, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface StreamingAvatarChatProps {
  className?: string
  lessonContent?: string
  lessonTitle?: string
}

const StreamingAvatarChat: React.FC<StreamingAvatarChatProps> = ({ className, lessonContent, lessonTitle }) => {
  const t = useTranslations('streamingAvatar')
  const videoRef = useRef<HTMLVideoElement>(null)
  const [streamingAvatar, setStreamingAvatar] = useState<StreamingAvatar | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVoiceChatActive, setIsVoiceChatActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Array<{
    type: 'user' | 'avatar'
    text: string
    timestamp: Date
  }>>([])
  const [error, setError] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [hasStartedLesson, setHasStartedLesson] = useState(false)

  // Configuration - These should ideally come from environment variables or props
  const config = {
    token: process.env.NEXT_PUBLIC_HEYGEN_TOKEN || 'YOUR_ACCESS_TOKEN_HERE',
    avatarId: process.env.NEXT_PUBLIC_HEYGEN_AVATAR_ID || 'default_avatar_id',
    voiceId: process.env.NEXT_PUBLIC_HEYGEN_VOICE_ID || 'default_voice_id',
    knowledgeId: process.env.NEXT_PUBLIC_HEYGEN_KNOWLEDGE_ID || ''
  }

  const startAvatar = async () => {
    try {
      setIsLoading(true)
      setIsConnecting(true)
      setError(null)

      if (!config.token || config.token === 'YOUR_ACCESS_TOKEN_HERE') {
        throw new Error(t('errorConfigureToken'))
      }

      if (!config.avatarId || config.avatarId === 'default_avatar_id') {
        throw new Error('Please configure your avatar ID in environment variables')
      }

      const avatar = new StreamingAvatar({ token: config.token })
      console.log('StreamingAvatar instance created')

      // Set up event listeners
      avatar.on(StreamingEvents.AVATAR_START_TALKING, (e) => {
        console.log('Avatar started talking:', e)
      })

      avatar.on(StreamingEvents.AVATAR_STOP_TALKING, (e) => {
        console.log('Avatar stopped talking:', e)
      })

      avatar.on(StreamingEvents.STREAM_DISCONNECTED, () => {
        console.log('Stream disconnected')
        setIsConnected(false)
        setIsVoiceChatActive(false)
      })

      avatar.on(StreamingEvents.STREAM_READY, (event) => {
        console.log('Stream ready:', event)
        console.log('Event detail:', event.detail)
        console.log('Event detail type:', typeof event.detail)
        console.log('Event detail is MediaStream:', event.detail instanceof MediaStream)
        startLessonContent()
        // Try multiple ways to get the stream
        let stream = null
        
        if (event.detail instanceof MediaStream) {
          stream = event.detail
          console.log('Stream found in event.detail directly')
        } else if (event.detail?.stream) {
          stream = event.detail.stream
          console.log('Stream found in event.detail.stream')
        } else if (event.stream) {
          stream = event.stream
          console.log('Stream found in event.stream')
        }
        
        console.log('Final extracted stream:', stream)
        console.log('Stream is MediaStream:', stream instanceof MediaStream)
        
        // Only set connected if we have both video ref and stream
        if (videoRef.current && stream instanceof MediaStream) {
          console.log('Setting video srcObject with stream:', stream)
          videoRef.current.srcObject = stream
          setIsConnected(true) // Only set connected when we have video stream
          setIsConnecting(false) // Clear connecting state
          
          // Force video to play
          videoRef.current.play().then(() => {
            console.log('Video started playing successfully')
            
            // Auto-start lesson content after video is ready
            setTimeout(() => {
              startLessonContent()
            }, 1000) // Wait 1 second for avatar to be fully ready
          }).catch(e => {
            console.error('Error playing video:', e)
          })
        } else {
          console.warn('Video ref or stream not available:', {
            videoRef: !!videoRef.current,
            stream: !!stream,
            streamIsMediaStream: stream instanceof MediaStream,
            eventDetail: event.detail,
            eventDetailType: typeof event.detail,
            fullEvent: event
          })
          setError('Video stream not available. Please check your avatar configuration.')
          setIsConnecting(false)
        }
      })

      avatar.on(StreamingEvents.USER_START, () => {
        console.log('User started speaking')
      })

      avatar.on(StreamingEvents.USER_STOP, () => {
        console.log('User stopped speaking')
      })

      // Add additional event listeners for debugging
      avatar.on('error', (error) => {
        console.error('Avatar error:', error)
        setError(`Avatar error: ${error.message || error}`)
      })

      // Create streaming avatar session
      console.log('Creating avatar session with config:', {
        avatarName: config.avatarId,
        voiceId: config.voiceId,
        knowledgeId: config.knowledgeId
      })

      const sessionInfo = await avatar.createStartAvatar({
        quality: AvatarQuality.Low,
        avatarName: 'Pedro_Chair_Sitting_public',//config.avatarId,
        knowledgeBase: lessonContent,
        voice: {
          voiceId: "61a4359785664d01a59664ceb87ce6d4",
          //voiceId: config.voiceId,
          rate: 1.0,
          emotion: VoiceEmotion.FRIENDLY,
        },
        sttSettings: {
          provider: STTProvider.GLADIA,
          confidence: 0.55,
        },
        language: 'Arabic',
        voiceChatTransport: VoiceChatTransport.WEBSOCKET,
        activityIdleTimeout: 300, // 5 minutes
      })

      console.log('Avatar session created successfully:', sessionInfo)
      setStreamingAvatar(avatar)
      
      // Add welcome message
      setMessages(prev => [...prev, {
        type: 'avatar',
        text: t('welcomeMessage'),
        timestamp: new Date()
      }])

      // Session info typically doesn't contain the stream directly
      // The stream will come through the STREAM_READY event
      console.log('Waiting for STREAM_READY event...')

      // Set a timeout to handle cases where stream never becomes ready
      setTimeout(() => {
        if (isConnecting && !isConnected) {
          setError('Avatar connection timeout. Please check your configuration and try again.')
          setIsConnecting(false)
        }
      }, 15000) // 15 second timeout

    } catch (error) {
      console.error('Error starting avatar:', error)
      setError(error instanceof Error ? error.message : t('errorStartAvatar'))
      setIsConnecting(false)
    } finally {
      setIsLoading(false)
    }
  }

  const stopAvatar = async () => {  
    try {
      if (streamingAvatar) {
        if (isVoiceChatActive) {
          await streamingAvatar.closeVoiceChat()
          setIsVoiceChatActive(false)
        }
        await streamingAvatar.stopAvatar()
        setStreamingAvatar(null)
        setIsConnected(false)
        setHasStartedLesson(false) // Reset lesson state
        
        // Clear video source
        if (videoRef.current) {
          videoRef.current.srcObject = null
        }
      }
    } catch (error) {
      console.error('Error stopping avatar:', error)
      setError(error instanceof Error ? error.message : 'Failed to stop avatar')
    }
  }

  const startVoiceChat = async () => {
    try {
      if (streamingAvatar && isConnected) {
        await streamingAvatar.startVoiceChat({
          isInputAudioMuted: isMuted,
        })
        setIsVoiceChatActive(true)
        
        setMessages(prev => [...prev, {
          type: 'avatar',
          text: t('voiceChatActivated'),
          timestamp: new Date()
        }])
      }
    } catch (error) {
      console.error('Error starting voice chat:', error)
      setError(error instanceof Error ? error.message : 'Failed to start voice chat')
    }
  }

  const stopVoiceChat = async () => {
    try {
      if (streamingAvatar && isVoiceChatActive) {
        await streamingAvatar.closeVoiceChat()
        setIsVoiceChatActive(false)
        
        setMessages(prev => [...prev, {
          type: 'avatar',
          text: t('voiceChatDeactivated'),
          timestamp: new Date()
        }])
      }
    } catch (error) {
      console.error('Error stopping voice chat:', error)
      setError(error instanceof Error ? error.message : 'Failed to stop voice chat')
    }
  }

  const toggleMute = async () => {
    try {
      if (streamingAvatar && isVoiceChatActive) {
        if (isMuted) {
          await streamingAvatar.unmuteInputAudio()
        } else {
          await streamingAvatar.muteInputAudio()
        }
        setIsMuted(!isMuted)
      }
    } catch (error) {
      console.error('Error toggling mute:', error)
      setError(error instanceof Error ? error.message : 'Failed to toggle mute')
    }
  }

  const sendMessage = async () => {
    if (!message.trim() || !streamingAvatar || !isConnected) return

    try {
      // Add user message to chat
      setMessages(prev => [...prev, {
        type: 'user',
        text: message,
        timestamp: new Date()
      }])

      // Send message to avatar with conversational context in Arabic
      const conversationalPrompt = lessonTitle ? 
        `الطالب يقول: "${message}". كمدرس مفيد، أجب بناءً على درس ${lessonTitle}. قدم إجابة تعليمية مفيدة ومناسبة.` :
        `الطالب يقول: "${message}". كمدرس مفيد، أجب بناءً على المحتوى التعليمي. قدم إجابة تعليمية مفيدة ومناسبة.`
      
      await streamingAvatar.speak({
        text: conversationalPrompt,
        task_type: TaskType.TALK,
        taskMode: TaskMode.SYNC
      })

      // Clear input
      setMessage('')

    } catch (error) {
      console.error('Error sending message:', error)
      setError(error instanceof Error ? error.message : 'Failed to send message')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const startLessonContent = async () => {
    try {
      if (streamingAvatar && isConnected && !hasStartedLesson) {
        setHasStartedLesson(true)
        
        const welcomeMessage = lessonTitle && lessonContent ? 
          `أهلاً وسهلاً! أنا مساعدك التعليمي الذكي. سأبدأ بشرح درس ${lessonTitle}. ${lessonContent}... `:
          `أهلاً وسهلاً! أنا مساعدك التعليمي الذكي. سأبدأ بشرح الدرس. دعني أوضح لك المحتوى خطوة بخطوة. هل تريد أن نتعلم معاً؟`

        await streamingAvatar.speak({
          text: welcomeMessage,
          task_type: TaskType.TALK,
          taskMode: TaskMode.SYNC
        })

        // Add the auto-message to chat history
        setMessages(prev => [...prev, {
          type: 'avatar',
          text: welcomeMessage,
          timestamp: new Date()
        }])
      }
    } catch (error) {
      console.error('Error starting lesson content:', error)
    }
  }

  const keepAlive = async () => {
    try {
      if (streamingAvatar && isConnected) {
        await streamingAvatar.keepAlive()
        console.log('Session kept alive')
      }
    } catch (error) {
      console.error('Error keeping session alive:', error)
    }
  }

  // Keep session alive every 2 minutes
  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(keepAlive, 120000) // 2 minutes
      return () => clearInterval(interval)
    }
  }, [isConnected])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamingAvatar) {
        stopAvatar()
      }
    }
  }, [])

  return (
    <div className={cn("h-full flex flex-col", className)}>
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            {/* <span>{t('title')}</span> */}
            <div className="flex gap-2">
              {!isConnected ? (
                <Button
                  onClick={startAvatar}
                  disabled={isLoading}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Power className="w-4 h-4 mr-2" />
                  {isLoading ? t('starting') : t('startAvatar')}
                </Button>
              ) : (
                <Button
                  onClick={stopAvatar}
                  size="sm"
                  variant="destructive"
                >
                  <PowerOff className="w-4 h-4 mr-2" />
                  {t('stopAvatar')}
                </Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col gap-4">
          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
              <button 
                onClick={() => setError(null)}
                className="float-right text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          )}

          {/* Video Display */}
          <div className="relative bg-gray-900 rounded-lg overflow-hidden flex-1">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted={false}
              controls={false}
              className="w-full h-full object-cover"
              onLoadedMetadata={() => console.log('Video metadata loaded')}
              onCanPlay={() => console.log('Video can play')}
              onPlay={() => console.log('Video started playing')}
              onError={(e) => console.error('Video error:', e)}
            />
            {!isConnected && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
                <div className="text-center text-white">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                    <Power className="w-8 h-8" />
                  </div>
                  <p>{t('avatarNotConnected')}</p>
                  <p className="text-sm text-gray-400">{t('clickToStart')}</p>
                </div>
              </div>
            )}
            {(isConnecting || (isConnected && !videoRef.current?.srcObject)) && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
                <div className="text-center text-white">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-700 rounded-full flex items-center justify-center animate-pulse">
                    <Power className="w-8 h-8" />
                  </div>
                  <p>Loading avatar stream...</p>
                  <p className="text-sm text-gray-400">Please wait while we connect</p>
                  {isConnecting && (
                    <div className="mt-2">
                      <div className="w-32 h-1 bg-gray-600 rounded mx-auto">
                        <div className="h-1 bg-blue-400 rounded animate-pulse"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Voice Chat and Lesson Controls */}
          {isConnected && (
            <div className="flex gap-2 justify-center flex-wrap">
              {/* Lesson Control */}
              {!hasStartedLesson && (
                <Button
                  onClick={startLessonContent}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                 {t('startLesson')}
                </Button>
              )}
              
              {/* Voice Chat Controls */}
              {!isVoiceChatActive ? (
                <Button
                  onClick={startVoiceChat}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  {t('startVoiceChat')}
                </Button>
              ) : (
                <>
                  <Button
                    onClick={stopVoiceChat}
                    size="sm"
                    variant="outline"
                  >
                    <MicOff className="w-4 h-4 mr-2" />
                    {t('stopVoiceChat')}
                  </Button>
                  <Button
                    onClick={toggleMute}
                    size="sm"
                    variant={isMuted ? "destructive" : "outline"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 mr-2" />
                    ) : (
                      <Volume2 className="w-4 h-4 mr-2" />
                    )}
                    {isMuted ? t('unmute') : t('mute')}
                  </Button>
                </>
              )}
            </div>
          )}

          {/* Chat Messages */}
       

          {/* Message Input */}
        

          {/* Status and Debug Info */}
       
        </CardContent>
      </Card>
    </div>
  )
}

export default StreamingAvatarChat
