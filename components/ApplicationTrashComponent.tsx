import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { apiFetch } from "@/lib/functions/apiFetch";

type ApplicationTrashComponentProps = {
  applicationId: string;
  onDelete: (id: string) => void;
};
const ApplicationTrashComponent = ({
  applicationId,
  onDelete,
}: ApplicationTrashComponentProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    console.log("trash button works");
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const result = await apiFetch(`/applications/${applicationId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!result.success) {
        return;
      }

      onDelete(applicationId);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Button
      type="button"
      variant="ghost"
      disabled={isDeleting}
      onClick={handleDelete}
    >
      {isDeleting ? (
        <Loader2 />
      ) : (
        <Trash size={20} className="text-destructive" />
      )}
    </Button>
  );
};

export default ApplicationTrashComponent;
