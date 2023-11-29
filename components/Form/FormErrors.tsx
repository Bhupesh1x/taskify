import { XCircle } from "lucide-react";

type Props = {
  id: string;
  errors?: Record<string, string[] | undefined>;
};

function FormErrors({ id, errors }: Props) {
  if (!errors) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      id={`${id}-error`}
      className="text-xs text-red-500 mt-2"
    >
      {errors?.[id]?.map((error) => (
        <div
          key={error}
          className="flex items-center font-medium p-2 rounded-sm bg-rose-500/10 border border-red-500"
        >
          <XCircle className="h-4 w-4 mr-2" />
          {error}
        </div>
      ))}
    </div>
  );
}

export default FormErrors;
