"use client";

import { useActionState } from "react";
import { addUser } from "@/app/add-user/actions";
import type { FormState } from "@/types";

export default function AddUserForm() {
  const [state, action, isPending] = useActionState<FormState, FormData>(
    addUser,
    {
      message: "",
      success: false,
    }
  );

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Voeg een nieuwe gebruiker toe</h1>
      <form action={action} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Naam:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-2 px-4 rounded-md text-white ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isPending ? "Bezig met opslaan..." : "Opslaan"}
        </button>
      </form>
      {state.message && (
        <p
          className={`mt-4 text-center ${
            state.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </div>
  );
}
