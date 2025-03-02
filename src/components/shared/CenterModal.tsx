import { useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CenterModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerBtn?: ReactNode;
  title?: string | ReactNode;
  className?: string;
  children: ReactNode;
}

const CenterModal = ({ open, setOpen, triggerBtn, title, className, children }: CenterModalProps) => {
  // console.log({open})
  // Close modal when ESC key is pressed
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, setOpen]);

  return (
    <>
      {triggerBtn && (
        <div onClick={() => setOpen(true)} className="inline-block cursor-pointer">
          {triggerBtn}
        </div>
      )}

      {/* Modal Wrapper */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          {/* Modal Container */}
          <div
            className={cn(
              "bg-white p-6 border rounded-lg shadow-xl w-full max-w-md transition-transform duration-300 transform scale-100",
              className
            )}
          >
            {/* Close Modal on Click Outside */}
            <div onClick={() => setOpen(false)} className="absolute inset-0 z-0" />

            {/* Modal Content */}
            <div className="relative z-10">
              {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
              {children}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CenterModal;
