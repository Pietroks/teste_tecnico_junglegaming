import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSocket } from "@/hooks/useSocket";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Radio, Send, Wifi, WifiOff, MessageSquare, Bot } from "lucide-react";

export const Route = createFileRoute("/realtime")({
  component: RealtimeComponent,
});

function RealtimeComponent() {
  const { isConnected, messages, sendMessage } = useSocket();
  const [text, setText] = useState("");
  const [username, setUsername] = useState("Dev Frontend");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    sendMessage(text.trim(), username);
    setText("");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Radio className="size-6 text-primary" />
            Comunicação em Tempo Real com Socket.IO
          </h1>
          <p className="text-sm text-muted-foreground">
            Integração cliente Socket.IO orientada a eventos para mensageria e
            dados reativos.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 gap-1.5 py-1 px-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Wifi className="size-3.5" /> Conectado ao Socket
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-amber-600 dark:text-amber-400 border-amber-500/30 gap-1.5 py-1 px-3"
            >
              <WifiOff className="size-3.5" />
              Modo Demonstração (Sem Servidor Socket Remoto)
            </Badge>
          )}
        </div>
      </div>

      {/* Realtime Chat Card */}
      <Card className="flex flex-col h-130">
        <CardHeader className="border-b border-border pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="size-4" />
              Feed de Eventos e Mensagens
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Nome:</span>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-7 w-32 text-xs"
              />
            </div>
          </div>
        </CardHeader>

        {/* Messages Feed */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-sm gap-2">
              <Bot className="size-8 text-muted-foreground/60" />
              <p>Nenhuma mensagem enviada ainda.</p>
              <p className="text-xs">
                Digite uma mensagem abaixo para disparar um evento via
                Socket.IO.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-xl max-w-[80%] text-sm ${
                  msg.user === username
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "mr-auto bg-muted border border-border text-foreground"
                }`}
              >
                <div className="flex items-center justify-between gap-3 text-[10px] opacity-75 mb-1">
                  <span className="font-semibold">{msg.user}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <p className="wrap-break-word">{msg.text}</p>
              </div>
            ))
          )}
        </CardContent>

        {/* Input Footer */}
        <CardFooter className="border-t border-border p-3">
          <form onSubmit={handleSend} className="flex gap-2 w-full">
            <Input
              id="socket-message-input"
              placeholder="Digite uma mensagem em tempo real..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={!text.trim()} className="gap-2">
              <Send className="size-4" />
              Enviar
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
