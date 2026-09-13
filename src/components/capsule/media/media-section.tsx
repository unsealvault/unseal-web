'use client';

import AudioField from "./audio-field";
import FileField from "./file-field";
import ImageField from "./image-field";
import VideoField from "./video-field";

interface MediaSectionProps {
  images: File[];
  audio: File[];
  videos: File[];
  files: File[];

  onImagesChange: (files: File[]) => void;
  onAudioChange: (files: File[]) => void;
  onVideosChange: (files: File[]) => void;
  onFilesChange: (files: File[]) => void;
}

export default function MediaSection({
  images,
  audio,
  videos,
  files,
  onImagesChange,
  onAudioChange,
  onVideosChange,
  onFilesChange,
}: MediaSectionProps) {
  return (
    <section className="space-y-5">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Add Media
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Add images, music, videos, or documents to your capsule.
        </p>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ImageField
          files={images}
          onChange={onImagesChange}
        />

        <AudioField
          files={audio}
          onChange={onAudioChange}
        />

        <VideoField
          files={videos}
          onChange={onVideosChange}
        />

        <FileField
          files={files}
          onChange={onFilesChange}
        />
      </div>
    </section>
  );
}