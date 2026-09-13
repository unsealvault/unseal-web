interface CapsuleErrorProps {
  message: string | null;
}

export function CapsuleError({ message }: CapsuleErrorProps) {
  if (!message) return null;

  return (
    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg font-mono">
      {message}
    </div>
  );
}