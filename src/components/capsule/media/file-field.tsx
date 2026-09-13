'use client';

import React, { useRef } from 'react';
import { FileText, X } from 'lucide-react';

interface FileFieldProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
}

export default function FileField({
  files,
  onChange,
  maxFiles = 5,
}: FileFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    if (files.length + selectedFiles.length > maxFiles) {
      alert(`You can add a maximum of ${maxFiles} files.`);
      return;
    }

    onChange([...files, ...selectedFiles]);

    e.target.value = '';
  };

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
          <FileText className="h-5 w-5 text-amber-600" />
        </div>

        <div>
          <h4 className="font-medium text-gray-900">
            Add File
          </h4>

          <p className="text-xs text-gray-500">
            PDF, DOC, TXT, ZIP • Max {maxFiles}
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleSelect}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full rounded-lg border border-dashed border-gray-300 px-4 py-5 text-sm text-gray-600 transition hover:border-amber-400 hover:bg-amber-50/50"
      >
        + Choose Files
      </button>

      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
            >
              <div className="min-w-0">
                <p className="truncate text-sm text-gray-700">
                  {file.name}
                </p>

                <p className="text-xs text-gray-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeFile(index)}
                className="ml-3 rounded-md p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}