"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormWrapper from "@/components/ui/form-template/FormWrapper";
import FormField from "@/components/ui/form-template/FormField";
import FormMessage from "@/components/ui/form-template/FormMessage";
import { updateProfile } from "@/actions/profile/profile";
import { EditIcon, XIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSchema,
  ProfileSchemaType,
} from "@/schemas/auth/profile-schemas";
import useSessionUpdater from "@/hooks/auth/auth-update";

const EditProfileForm = () => {
  const [message, setMessage] = useState<{ type: string; text: string } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const updateSession = useSessionUpdater();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const loadProfile = async () => {
      setLoadingProfile(true);

      try {
        const res = await fetch("/api/profile/get");
        const profile = await res.json();

        if (profile) {
          reset({
            username: profile.username || "",
          });
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      }

      setLoadingProfile(false);
    };

    loadProfile();
  }, [reset]);

  const onSubmit = async (data: ProfileSchemaType) => {
    setIsLoading(true);
    setMessage(null);

    const result = await updateProfile({
      username: data.username,
    });

    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({
        type: "success",
        text: result.success || "Profil erfolgreich aktualisiert!",
      });
      await updateSession();
      setIsEditing(false);
    }

    setIsLoading(false);
  };

  if (loadingProfile) {
    return <p className="text-center text-gray-500">Lade Profil...</p>;
  }

  return (
    <FormWrapper>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Öffentliches Profil bearbeiten</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-gray-700"
            title="Bearbeiten"
          >
            <EditIcon className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEditing(false);
              setMessage(null);
            }}
            className="text-gray-500 hover:text-gray-700"
            title="Abbrechen"
          >
            <XIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="Benutzername"
          type="text"
          placeholder="Benutzername eingeben"
          register={register("username")}
          error={errors.username}
          disabled={!isEditing || isLoading}
        />

        {isEditing && (
          <button
            type="submit"
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded"
            disabled={isLoading}
          >
            {isLoading ? "Wird aktualisiert..." : "Profil aktualisieren"}
          </button>
        )}

        {message && (
          <FormMessage
            message={message.text}
            type={message.type === "error" ? "error" : "success"}
          />
        )}
      </form>
    </FormWrapper>
  );
};

export default EditProfileForm;
