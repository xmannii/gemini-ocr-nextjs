import { generateObject } from 'ai';
import { z } from 'zod';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return Response.json({ error: 'تصویری ارسال نشده است' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(image.type)) {
      return Response.json({ error: 'فرمت فایل پشتیبانی نمی‌شود. لطفا از فرمت‌های JPG یا PNG استفاده کنید' }, { status: 400 });
    }

    // Convert the image to base64
    const imageBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');

    const { object } = await generateObject({
      model: google('gemini-2.5-flash'),
      temperature: 0.2,
      output: 'no-schema',
      system: [
        "You are an OCR agent designed to extract text from images.",
        "Your primary function is to accurately identify and transcribe text, regardless of the language, font, or image quality.",
        "You will receive an image as input and must return ONLY the extracted text, with no additional commentary or formatting.",
        "Return the result in markdown if Needed too",
        "The variable you should put the text in is text_content."
      ].join(" "),
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', image: base64Image }
          ]
        }
      ]
    });

    return Response.json(object);
  } catch (error) {
    console.error('Error analyzing image:', error);
    return Response.json({ error: 'خطا در استخراج متن' }, { status: 500 });
  }
} 