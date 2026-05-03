import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { trpc } from "@/providers/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader2,
} from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBot() {
  const { language, dir } = useLanguage();
  const T = translations[language];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: T.chatWelcome },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.chat.sendMessage.useMutation();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || chatMutation.isPending) return;

    const userMsg: ChatMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const allMessages = [...messages, userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const result = await chatMutation.mutateAsync({
        messages: allMessages,
        language,
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            language === "ar"
              ? "عذراً، حدث خطأ. حاول مرة أخرى."
              : "Désolé, une erreur s'est produite. Veuillez réessayer.",
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" dir={dir}>
      {/* Chat window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 overflow-hidden flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{T.chatTitle}</p>
                <p className="text-emerald-100 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  {language === "fr" ? "En ligne" : "متصل"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                      msg.role === "user"
                        ? "bg-emerald-500/20"
                        : "bg-teal-500/20"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-teal-400" />
                    )}
                  </div>
                  <div
                    className={`px-3 py-2 rounded-xl text-sm max-w-[85%] ${
                      msg.role === "user"
                        ? "bg-emerald-500/15 text-emerald-100 border border-emerald-500/20"
                        : "bg-slate-800 text-slate-200 border border-white/10"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {chatMutation.isPending && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-teal-500/20 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-teal-400" />
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-slate-800 border border-white/10">
                    <Loader2 className="w-4 h-4 text-teal-400 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-3 border-t border-white/10 bg-slate-950">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={T.chatPlaceholder}
                className="bg-slate-800 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-emerald-500/50"
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={chatMutation.isPending || !input.trim()}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shrink-0"
              >
                {chatMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-xl shadow-emerald-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen
            ? "bg-slate-800 text-white border border-white/20"
            : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
