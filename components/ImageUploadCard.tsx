import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ImageUploadCardProps {
  image: File | null;
  setImage: (file: File | null) => void;
  setText: (text: string) => void;
  setError: (error: string) => void;
  setPreview: (url: string | null) => void;
  loading: boolean;
  error: string;
  handleSubmit: (e: React.FormEvent) => void;
  preview: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3 text-primary"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
);

const ImageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle mr-1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
);

const ImageUploadCard: React.FC<ImageUploadCardProps> = ({
  image,
  setImage,
  setText,
  setError,
  setPreview,
  loading,
  error,
  handleSubmit,
  preview,
  handleFileChange,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragleave" || e.type === "dragover") {
      setDragActive(e.type !== "dragleave");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
      setText("");
      setError("");
      setPreview(URL.createObjectURL(e.dataTransfer.files[0]));
    }
  };

  const handleRemove = () => {
    setImage(null);
    setPreview(null);
    setText("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Card className="flex-1 flex flex-col justify-between min-h-[450px]  ">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <ImageIcon />
          بارگذاری تصویر
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 flex-1">
        <div className="relative w-full flex-1" style={{ minHeight: 280 }}>
          {!preview ? (
            <label
              htmlFor="file-upload"
              className={`flex flex-col items-center justify-center border-2 border-dashed transition-all duration-300 cursor-pointer rounded-none p-8 w-full h-full bg-card/60 hover:bg-accent/30 focus-within:bg-accent/30 outline-none ${dragActive ? "border-primary bg-accent/30 scale-[0.99]" : "border-border"}`}
              tabIndex={0}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <UploadIcon />
              <span className="text-primary text-lg font-medium mb-1">تصویر را اینجا بکشید و رها کنید</span>
              <span className="text-muted-foreground text-sm">یا برای انتخاب کلیک کنید</span>
              <div className="mt-4 text-xs text-muted-foreground">
                فرمت‌های پشتیبانی شده: JPG,  PDF
              </div>
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={inputRef}
                className="hidden rounded-none"
              />
            </label>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full relative bg-card/30 rounded-none p-4">
              <img
                src={preview}
                alt="پیش‌نمایش"
                className="object-contain max-h-[250px] max-w-full rounded-none shadow-md transition-all duration-500 hover:scale-[1.02]"
                style={{ animation: "fadein 0.5s" }}
              />
              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                  {image?.name}
                </span>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="flex items-center gap-1 px-2 py-1"
                  onClick={handleRemove}
                >
                  <TrashIcon />
                  حذف
                </Button>
              </div>
            </div>
          )}
        </div>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!image || loading}
          className="w-full text-lg py-6 mt-auto transition-all duration-300 hover:scale-[1.01] rounded-none"
          size="lg"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-primary-foreground" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
              در حال استخراج...
            </span>
          ) : "استخراج متن"}
        </Button>
        {error && (
          <div className="text-destructive text-sm mt-2 bg-destructive/10 p-2 rounded-none border border-destructive/20 flex items-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            {error}
          </div>
        )}
      </CardContent>
   
    </Card>
  );
};

export default ImageUploadCard; 