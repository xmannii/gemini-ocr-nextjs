import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface TextOutputCardProps {
  text: string;
}

const CopyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
);

const TextIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle mr-1"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const TextOutputCard: React.FC<TextOutputCardProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <Card className="flex-1 flex flex-col justify-between min-h-[450px] max-h-[calc(100vh-200px)]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <TextIcon />
          متن استخراج‌شده
        </CardTitle>
        <button
          onClick={handleCopy}
          className="p-2 rounded-full hover:bg-accent/50 transition-all duration-300 relative text-foreground hover:text-accent-foreground disabled:opacity-50"
          aria-label="کپی متن استخراج‌شده"
          disabled={!text}
          title="کپی متن"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-y-auto">
        <div className="relative flex-1 bg-card/30 rounded-none">
          <Textarea
            className="w-full h-full min-h-[280px] text-lg resize-none rounded-none bg-transparent border-2 border-border focus-visible:ring-0 focus-visible:ring-offset-0"
            value={text}
            readOnly
            dir="auto"
            placeholder="متن استخراج شده اینجا نمایش داده می‌شود..."
            style={{ 
              scrollbarWidth: "thin",
              scrollbarColor: "var(--border) transparent"
            }}
          />
        </div>
        
        {text && (
          <div className="mt-4 text-xs text-muted-foreground flex items-center justify-between shrink-0">
            <span>
              <span className="font-bold">{text.length.toLocaleString("fa-IR")}</span> نویسه
            </span>
            <span>
              <span className="font-bold">{text.split(/\s+/).filter(Boolean).length.toLocaleString("fa-IR")}</span> واژه
            </span>
            <span>
              <span className="font-bold">{text.split(/\n/).filter(Boolean).length.toLocaleString("fa-IR")}</span> خط
            </span>
          </div>
        )}
      </CardContent>
     
    </Card>
  );
};

export default TextOutputCard; 