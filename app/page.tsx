"use client"
import ChatBubble from "@/components/ChatBubble";
import Loader from "@/components/Loader";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Recommendations from "@/components/Recommendations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useChat } from "@ai-sdk/react";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";


interface Tool {
  tool: string;
  description: string;
}

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, status, append } = useChat({});
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // Ref for scrolling to bottom of chat
  const bottomRef = useRef<HTMLDivElement>(null);

  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    if (messages.length === 0) {
      append({
        role: 'user',
        content: 'Hello, Who are you?',
      });
      fetch("/api/chat")
        .then((res) => res.json())
        .then((data) => setTools(data));
    }
  }, []);

  // Auto-scroll when messages update (on streaming or finished)
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, status]);

  useEffect(() => {
    if (inputRef.current && status === 'ready') {
      inputRef.current.focus();
    }
  }, [status]);


  const handleRecommendation = (value: string) => {
    const msg = `His ${value}?`;
    append({
      role: 'user',
      content: msg
    });
  };

  return (
    // Use min-h-[88vh] instead of h-[88vh] to allow content to grow if needed
    <div className='flex justify-center items-end min-h-[88vh] w-full'>
      <MaxWidthWrapper>
        {/* Main content container */}
        <div className='flex flex-col w-full h-full justify-center items-center'>
          {
            <ScrollArea
              className='flex flex-col justify-start md:max-h-[59vh] max-h-[64vh] overflow-y-auto w-full md:w-4/5 md:px-3 rounded-md mb-4'
            >
              {/* Render messages */}
              {messages.map((chatMessage) => (
                <ChatBubble
                  key={chatMessage.id}
                  message={chatMessage}
                  isUser={chatMessage.role === 'user'}
                />
              ))}
              {/* Dummy div to scroll into view */}
              <div ref={bottomRef} />
            </ScrollArea>
          }
          {/* Input area card */}
          <Card className="shadow-2xl gap-0 flex flex-col md:w-4/5 w-full items-center justify-center py-2 px-2 space-x-0 space-y-0">
            <div className="flex space-x-2 items-center justify-start w-full px-3">
              {
                tools.length > 0 && (
                  <>
                    <p className="text-xs">Tools available:</p>
                    <div className="flex space-x-2 text-xs">
                      {tools.map((tool: Tool) => (
                        <TooltipProvider key={tool.tool}>
                          <Tooltip>
                            <TooltipTrigger className="flex items-center justify-center border rounded-md px-2 py-1 space-x-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <div className="text-xs text-muted-foreground">
                                {tool.tool}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">{tool.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </>
                )
              }
        </div>
        {/* Text input area */}
        <Textarea
          placeholder="Ask anything about Vijay"
          value={input}
          disabled={status === 'streaming' || status === 'submitted'}
          onChange={handleInputChange}
          ref={inputRef}
          onKeyDown={(e) => {
            // Submit on Enter unless Shift is pressed
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault(); // Prevent newline
              if (input.trim()) {
                handleSubmit();
              }
            }
          }}
          rows={1}
          className="max-h-[20vh] m-0 w-full dark:bg-transparent bg-transparent shadow-none border-none resize-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base p-3"
        />
        {/* Submit button */}
        <div className='flex w-full items-center md:justify-between justify-end'>
          {/* Recommendation chips (hidden on small screens) */}
          <div className='w-full overflow-x-auto p-3 hidden md:block'>
            {/* Make recommendations scrollable horizontally if they overflow */}
            <div className="flex space-x-2 whitespace-nowrap">
              <Recommendations handleRecommendation={handleRecommendation} />
            </div>
          </div>
          {/* Use form association for the button if Textarea is inside a form */}
          <Button
            type="submit"
            className='disabled:opacity-50 cursor-pointer'
            disabled={!input.trim() || status === 'streaming' || status === 'submitted'}
            onClick={() => {
              if (input.trim()) {
                handleSubmit();
              }
            }}
          >
            {status === 'streaming' || status === 'submitted' ? <Loader /> : <ArrowUp className='w-5 h-5' />}
          </Button>
        </div>
      </Card>
    </div>
      </MaxWidthWrapper >
    </div >
  );
}
