"use server";

import { query } from "@/lib/db";

interface FormState {
  message: string;
  success: boolean;
}

export async function addUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  try {
    const existingUsers = await query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (existingUsers.length > 0) {
      return {
        message: "Email bestaat al!",
        success: false,
      };
    }

    await query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);

    return {
      message: "Gebruiker succesvol toegevoegd!",
      success: true,
    };
  } catch (error) {
    console.error("Fout bij het toevoegen van gebruiker:", error);
    return {
      message: "Er ging iets mis bij het opslaan.",
      success: false,
    };
  }
}
