"use client"
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import MarkdownPreview from '@uiw/react-markdown-preview';
import { UIMessage } from 'ai';

type Props = {
    message: UIMessage
    isUser: boolean
}

const ChatBubble = ({ message, isUser }: Props) => {
    return (
        <div className={cn('w-full flex justify-start items-center py-2', { 'justify-end': isUser })}>
            <Card className={cn('w-fit max-w-1/2 px-3 py-2 rounded-lg shadow-none transition-all duration-300', { 'dark:bg-transparent bg-transparent max-w-full border-none': !isUser })}>
                {
                    message.parts.map((part, index) => {
                        switch (part.type) {
                            case 'text':
                                return (
                                    <MarkdownPreview key={index} style={{
                                        background: 'transparent',
                                        padding: '0',
                                        margin: '0',
                                        color: 'inherit',
                                        transition: "all 0.3s ease-in-out"
                                    }}
                                        className=''
                                        source={part.text || ""} />
                                );
                            case 'tool-invocation':
                                switch (part.toolInvocation.state) {
                                    case 'call':
                                        return (
                                            <p key={index} className='text-sm text-muted-foreground border-l-4 pl-2'
                                            >Invoking tool <span className='font-bold font-mono px-2 py-1 bg-accent rounded-sm'>{part.toolInvocation.toolName || ""}</span></p>
                                        );
                                    case 'result':
                                        return (
                                            <p key={index} className='text-sm text-muted-foreground border-l-4 pl-2'
                                            >Ok done! Data sent: <span className='font-bold font-mono px-2 py-1 bg-accent rounded-sm'>{JSON.stringify(part.toolInvocation.result) || ""}</span></p>
                                        );
                                }
                        }
                    })
                }
            </Card>
        </div>
    )
}

export default ChatBubble