"use client";

import { useForm } from "@tanstack/react-form";
import { forwardRef, useId, useImperativeHandle, useRef } from "react";
import z from "zod";

import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

const AddCollectionDialog = forwardRef<HTMLDialogElement>((_, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formId = useId();

  useImperativeHandle(ref, () => dialogRef.current!, []);

  const utils = api.useUtils();

  const createMutation = api.collection.create.useMutation({
    onSuccess: async () => {
      form.reset();
      dialogRef.current?.close();
      await utils.collection.list.invalidate();
    },
    onError: (error) => {
      // TODO: show toast
      console.error("Failed to create collection:", error);
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: z.object({
        name: z.string().min(1),
      }),
    },
    onSubmit: async ({ value }) => {
      await createMutation.mutateAsync(value);
    },
  });

  const isLoading = form.state.isSubmitting || createMutation.isPending;

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        <h2 className="text-xl leading-tight font-semibold tracking-tight">Add Collection</h2>
        <p className="text-base-content/80 leading-relaxed">Create a new collection.</p>
        <form
          id={formId}
          className="mt-4"
          onSubmit={async (event) => {
            event.preventDefault();
            event.stopPropagation();
            await form.handleSubmit();
          }}>
          <form.Field name="name">
            {(field) => (
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  name={field.name}
                  value={field.state.value}
                  placeholder="e.g. Design Inspiration"
                  className={cn("input w-full", !field.state.meta.isValid && "input-error")}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              </fieldset>
            )}
          </form.Field>
        </form>
        <div className="modal-action">
          <form method="dialog">
            <button type="submit" className="btn">
              Cancel
            </button>
          </form>
          <button type="submit" form={formId} disabled={!form.state.canSubmit || isLoading} className="btn btn-primary">
            {isLoading && <span className="loading loading-spinner loading-sm"></span>}
            {isLoading ? "Creating..." : "Create collection"}
          </button>
        </div>
      </div>
    </dialog>
  );
});

AddCollectionDialog.displayName = "AddCollectionDialog";

export default AddCollectionDialog;
