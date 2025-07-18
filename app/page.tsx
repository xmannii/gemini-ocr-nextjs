"use client";

import React, { useState } from "react";
import ImageUploadCard from "@/components/ImageUploadCard";
import TextOutputCard from "@/components/TextOutputCard";
import { toast } from "sonner";
import BlurFade from "@/components/ui/blur-fade";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setText("");
      setError("");
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;
    setLoading(true);
    setError("");
    setText("");

    const toastId = toast.loading("در حال استخراج متن..."); 

    try {
      const formData = new FormData();
      formData.append("image", image);
      const res = await fetch("/api/ocr", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "خطا در استخراج متن");
      }
      const data = await res.json();
      setText(data.text_content || "متنی یافت نشد");
      toast.success("متن با موفقیت استخراج شد!", { id: toastId });
    } catch (err: any) {
      setError(err.message || "خطای ناشناخته");
      toast.error(err.message || "خطای ناشناخته", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center py-8 px-4 md:px-8 lg:px-12 bg-background overflow-hidden">
      {/* Ambient light effect */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      >
        {/* Top left glow */}
        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] rounded-full bg-indigo-400 opacity-15 blur-3xl" />
        {/* Bottom right glow */}
        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] rounded-full bg-pink-400 opacity-10 blur-3xl" />
        {/* Top right subtle glow */}
        <div className="absolute top-[-80px] right-[-80px] w-[200px] h-[200px] rounded-full bg-blue-300 opacity-10 blur-2xl" />
        {/* Bottom left subtle glow */}
        <div className="absolute bottom-[-80px] left-[-80px] w-[200px] h-[200px] rounded-full bg-yellow-200 opacity-10 blur-2xl" />
      </div>
      <div className="container mx-auto max-w-6xl flex flex-col items-center z-10 relative">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary drop-shadow-lg">استخراج متن از تصویر</h1>
        </header>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-4xl items-stretch">
          <ImageUploadCard
            image={image}
            setImage={setImage}
            setText={setText}
            setError={setError}
            setPreview={setPreview}
            loading={loading}
            error={error}
            handleSubmit={handleSubmit}
            preview={preview}
            handleFileChange={handleFileChange}
          />
          <TextOutputCard text={text} />
        </div>
      </div>
    </main>
  );
}
