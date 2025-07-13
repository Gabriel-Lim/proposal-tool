'use client';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '../app/supabaseClient';

export default function UploadArea({ projectId }: { projectId: string }) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;
      const file = acceptedFiles[0];
      const path = `${projectId}/${file.name}`;
      const { error } = await supabase.storage.from('raw-files').upload(path, file, {
        upsert: true,
      });
      if (error) alert(error.message);
      else alert('Uploaded!');
    },
    [projectId]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'text/csv': ['.csv'] } });

  return (
    <div {...getRootProps()} className="border-2 border-dashed p-8 text-center cursor-pointer">
      <input {...getInputProps()} />
      {isDragActive ? 'Drop the CSV here …' : 'Drag & drop your 12‑month CSV here, or click to select a file'}
    </div>
  );
}