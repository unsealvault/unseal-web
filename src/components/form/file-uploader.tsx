// components/file-uploader.tsx
import { Sparkles, Paperclip, FileCheck, X } from 'lucide-react';

interface FileUploaderProps {
  attachedFiles: File[];
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
}

export function FileUploader({ attachedFiles, onFileSelect, onRemoveFile }: FileUploaderProps) {
  return (
    <div className="rounded-xl border border-dashed border-[#991b1b]/30 bg-[#991b1b]/5 p-3.5 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-[#991b1b]/10 text-[#991b1b] shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-foreground">Attach Media & Documents</span>
              <span className="text-[10px] uppercase tracking-wider font-mono font-bold bg-[#991b1b] text-white px-1.5 py-0.5 rounded">
                Free for 2 Years
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
              Add images, voice memos, short videos, or files (Max 5 items).
            </p>
          </div>
        </div>

        <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-foreground transition-all shrink-0">
          <Paperclip className="w-3.5 h-3.5 text-muted-foreground" />
          <span>Add File</span>
          <input
            type="file"
            multiple
            className="hidden"
            accept="image/*,video/*,audio/*,.pdf,.zip"
            onChange={onFileSelect}
          />
        </label>
      </div>

      {attachedFiles.length > 0 && (
        <div className="space-y-1.5 pt-1">
          {attachedFiles.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-background/80 px-2.5 py-1.5 rounded-md border border-border/60 text-xs"
            >
              <div className="flex items-center gap-2 truncate text-foreground font-mono text-[11px]">
                <FileCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate">{file.name}</span>
                <span className="text-muted-foreground text-[10px]">
                  ({(file.size / (1024 * 1024)).toFixed(1)} MB)
                </span>
              </div>
              <button
                type="button"
                onClick={() => onRemoveFile(idx)}
                className="text-muted-foreground hover:text-rose-500 ml-2 cursor-pointer shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}