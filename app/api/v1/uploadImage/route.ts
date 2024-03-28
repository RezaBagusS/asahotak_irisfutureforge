import { NextResponse } from 'next/server';

export async function POST(request: Request, response: Response) {
  console.log('Request:', request);

  try {
    const formData = await request.formData();

    if (!formData.has('upload')) {
      NextResponse.json({
        error: true,
        message: 'No file uploaded!',
      }, { status: 400 }
      );
    }

    const uploadedFile = formData.get('upload');

    // Validate file type (optional):
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Add more types as needed
    if (!allowedTypes.includes((uploadedFile as File)?.type)) {
      NextResponse.json({
        error: true,
        message: 'Invalid file type! Please upload an image or PDF file.',
      }, { status: 400 
      });
    }

    console.log('Form data:', formData);
    console.log("Uploaded file data:", uploadedFile);

    // Asynchronous file reading (recommended):
    const blob = await (uploadedFile as File)?.arrayBuffer();
    const url = uploadedFile ? URL.createObjectURL(new Blob([blob], { type: (uploadedFile as File)?.type })) : '';

    console.log('File data URL:', url); 

    return NextResponse.json({
      error: false,
      message: 'File uploaded successfully!',
      data: {
        name: (uploadedFile as File)?.name,
        type: (uploadedFile as File)?.type,
        size: (uploadedFile as File)?.size,
        url,
      },
    });

  } catch (error: any) {
    console.error('Error:', error.message);

    return NextResponse.json({
      error: true,
      message: error.message || 'File upload failed!', // Provide a more informative message
    }, { status: 500 });
  }
}
