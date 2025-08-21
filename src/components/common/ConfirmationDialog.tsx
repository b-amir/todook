import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { FaExclamationTriangle } from "react-icons/fa";
import clsx from "clsx";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  severity?: "warning" | "danger";
}

export function ConfirmationDialog({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  severity = "warning",
}: ConfirmationDialogProps) {
  const isDanger = severity === "danger";

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: "!rounded-lg shadow-lg border border-gray-100 !p-2",
      }}
    >
      <DialogTitle
        className={clsx(
          "flex items-center gap-1.5 pb-1 font-semibold",
          isDanger ? "text-brpink-500" : "text-brgreen-500"
        )}
      >
        <FaExclamationTriangle size={20} />
        {title}
      </DialogTitle>

      <DialogContent className="pt-0">
        <DialogContentText className="text-brgray-300 text-[0.95rem] leading-relaxed">
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions className="px-3 pb-3 gap-1">
        <Button
          onClick={onCancel}
          variant="outlined"
          className="!border-brgray-100 !text-brgray-300 !rounded-lg !hover:border-brgray-200 !hover:bg-brgray-50"
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          className={clsx(
            "text-white !rounded-lg",
            isDanger
              ? "!bg-brpink-400 !hover:bg-brpink-600 !focus:bg-brpink-600"
              : "!bg-brgreen-500 !hover:bg-brgreen-600 !focus:bg-brgreen-600"
          )}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
