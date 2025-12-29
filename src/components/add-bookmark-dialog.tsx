"use client";

import { useForm } from "@tanstack/react-form";
import { forwardRef, useId, useImperativeHandle, useRef } from "react";
import z from "zod";

import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

const AddBookmarkDialog = forwardRef<HTMLDialogElement>((_, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formId = useId();

  useImperativeHandle(ref, () => dialogRef.current!, []);

  const { data: collections = [] } = api.collection.list.useQuery();

  const utils = api.useUtils();

  const extractMutation = api.metadata.extract.useMutation({
    onError: (error) => {
      // TODO: show toast
      console.error("Failed to extract metadata:", error);
    },
  });

  const createMutation = api.bookmark.create.useMutation({
    onSuccess: async () => {
      form.reset();
      dialogRef.current?.close();
      await utils.bookmark.list.invalidate();
    },
    onError: (error) => {
      // TODO: show toast
      console.error("Failed to create bookmark:", error);
    },
  });

  const form = useForm({
    defaultValues: {
      url: "",
      collectionId: null as number | null,
    },
    validators: {
      onSubmit: z.object({
        url: z.string().url(),
        collectionId: z.number().nullable(),
      }),
    },
    onSubmit: async ({ value }) => {
      const metadata = await extractMutation.mutateAsync({ url: value.url });

      await createMutation.mutateAsync({
        collectionId: value.collectionId,
        url: value.url,
        title: metadata.title,
        description: metadata.description,
        favicon: metadata.favicon,
      });
    },
  });

  const isLoading = form.state.isSubmitting || createMutation.isPending;

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        <h2 className="text-xl leading-tight font-semibold tracking-tight">Add Bookmark</h2>
        <p className="text-base-content/80 leading-relaxed">Save a new link.</p>
        <form
          id={formId}
          className="mt-4"
          onSubmit={async (event) => {
            event.preventDefault();
            event.stopPropagation();
            await form.handleSubmit();
          }}>
          <form.Field name="url">
            {(field) => (
              <fieldset className="fieldset">
                <label htmlFor={field.name} className="label">
                  URL
                </label>
                <input
                  type="url"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="e.g. https://example.com"
                  className={cn("input w-full", !field.state.meta.isValid && "input-error")}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              </fieldset>
            )}
          </form.Field>
          <form.Field name="collectionId">
            {(field) => (
              <fieldset className="fieldset">
                <label htmlFor={field.name} className="label">
                  Collection
                </label>
                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value ?? "unsorted"}
                  className={cn("select w-full", !field.state.meta.isValid && "select-error")}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    const value = event.target.value;

                    field.handleChange(value === "unsorted" ? null : Number(value));
                  }}>
                  <option value="unsorted">Unsorted</option>
                  {collections.map((collection, idx) => (
                    <option key={idx} value={collection.id}>
                      {collection.name}
                    </option>
                  ))}
                </select>
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
            {isLoading ? "Saving..." : "Save bookmark"}
          </button>
        </div>
      </div>
    </dialog>
  );
});

AddBookmarkDialog.displayName = "AddBookmarkDialog";

export default AddBookmarkDialog;
