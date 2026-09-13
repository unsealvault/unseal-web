'use client';

import { ChangeEvent, useRef } from 'react';
import {
  ImagePlus,
  Music2,
  Video,
  FileText,
  X
} from 'lucide-react';

interface MediaUploaderProps {
  attachedFiles: File[];
  onFilesChange: (files: File[]) => void;
}

type MediaType = 'image' | 'audio' | 'video' | 'file';

const MEDIA_CONFIG = {
  image: {
    label: 'Add Image',
    accept: 'image/jpeg,image/png,image/webp,image/gif',
    max: 5,
    icon: ImagePlus,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'hover:border-blue-500/40',
  },

  audio: {
    label: 'Add Audio',
    accept: 'audio/mpeg,audio/wav,audio/mp4,audio/x-m4a',
    max: 3,
    icon: Music2,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'hover:border-purple-500/40',
  },

  video: {
    label: 'Add Video',
    accept: 'video/mp4,video/quicktime,video/webm',
    max: 2,
    icon: Video,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'hover:border-red-500/40',
  },

  file: {
    label: 'Add File',
    accept: '.pdf,.doc,.docx,.txt,.zip',
    max: 5,
    icon: FileText,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'hover:border-yellow-500/40',
  },
};

function getFileType(file: File): MediaType {
  if (file.type.startsWith('image/')) {
    return 'image';
  }

  if (file.type.startsWith('audio/')) {
    return 'audio';
  }

  if (file.type.startsWith('video/')) {
    return 'video';
  }

  return 'file';
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MediaUploader({
  attachedFiles,
  onFilesChange,
}: MediaUploaderProps) {
  const inputRefs = {
    image: useRef<HTMLInputElement>(null),
    audio: useRef<HTMLInputElement>(null),
    video: useRef<HTMLInputElement>(null),
    file: useRef<HTMLInputElement>(null),
  };

  const handleSelect = (
    type: MediaType,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const config = MEDIA_CONFIG[type];

    const currentCount = attachedFiles.filter(
      (file) => getFileType(file) === type
    ).length;

    const remaining = config.max - currentCount;

    if (remaining <= 0) {
      alert(
        `${config.label.replace(
          'Add ',
          ''
        )} limit is ${config.max} files.`
      );

      event.target.value = '';
      return;
    }

    const selectedFiles = files.slice(0, remaining);

    if (files.length > remaining) {
      alert(
        `You can add maximum ${config.max} ${type} file(s).`
      );
    }

    onFilesChange([
      ...attachedFiles,
      ...selectedFiles,
    ]);

    event.target.value = '';
  };

  const removeFile = (index: number) => {
    onFilesChange(
      attachedFiles.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="-mt-7 space-y-3">
      {/* Header */}
      <div>
        <h3 className="text-sm font-semibold tracking-wide text-white">
          Add Media
        </h3>

        <p className="mt-1 text-xs text-white/45">
          Add images, audio, videos, or documents to your capsule.
        </p>
      </div>

      {/* Compact Buttons */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(
          Object.keys(MEDIA_CONFIG) as MediaType[]
        ).map((type) => {
          const config = MEDIA_CONFIG[type];
          const Icon = config.icon;

          const count = attachedFiles.filter(
            (file) => getFileType(file) === type
          ).length;

          return (
            <div key={type}>
              <input
                ref={inputRefs[type]}
                type="file"
                accept={config.accept}
                multiple
                className="hidden"
                onChange={(e) =>
                  handleSelect(type, e)
                }
              />

              <button
                type="button"
                onClick={() =>
                  inputRefs[type].current?.click()
                }
                className={`
                  group flex w-full items-center gap-2.5
                  rounded-xl border border-white/10
                  bg-white/[0.035]
                  px-3 py-2.5
                  text-left
                  transition-all duration-200
                  hover:bg-white/[0.07]
                  hover:shadow-lg
                  ${config.border}
                `}
              >
                <span
                  className={`
                    flex size-9 shrink-0
                    items-center justify-center
                    rounded-lg
                    ${config.bg}
                  `}
                >
                  <Icon
                    className={`h-4 w-4 ${config.color}`}
                  />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-normal text-white/90">
                    {config.label}
                  </span>

                  <span className="mt-0.5 block text-[10px] text-white/35">
                    {count}/{config.max}
                  </span>
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected Files */}
      {attachedFiles.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-black/20 p-2.5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
              Selected Files
            </span>

            <span className="text-[10px] text-white/30">
              {attachedFiles.length}/15
            </span>
          </div>

          <div className="space-y-1.5">
            {attachedFiles.map((file, index) => {
              const type = getFileType(file);
              const config = MEDIA_CONFIG[type];
              const Icon = config.icon;

              return (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/2.5 px-2.5 py-2"
                >
                  <span
                    className={`
                      flex h-7 w-7 shrink-0
                      items-center justify-center
                      rounded-md
                      ${config.bg}
                    `}
                  >
                    <Icon
                      className={`h-3.5 w-3.5 ${config.color}`}
                    />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs text-white/75">
                      {file.name}
                    </p>

                    <p className="text-[9px] text-white/30">
                      {formatFileSize(file.size)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeFile(index)
                    }
                    className="flex h-6 w-6 items-center justify-center rounded-md text-white/30 transition hover:bg-red-500/10 hover:text-red-400"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}