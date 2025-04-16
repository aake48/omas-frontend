"use client";

import { Button } from "@/components/ui/Button";
import React from "react";

interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onConfirm,
  onCancel,
  message,
  confirmText = "Kyllä",
  cancelText = "Ei",
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[350px] text-center">
        <h2 className="text-lg font-semibold mb-2">{message}</h2>
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            className="bg-green-600 text-white hover:bg-green-700 border-black w-20"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
          <Button 
            variant="outline"
            className="bg-red-500 text-white hover:bg-red-700 border-black w-20"
            onClick={onCancel}>
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
