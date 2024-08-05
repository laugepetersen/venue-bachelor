"use server";

import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib//prisma";
import { redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { loginSchema } from "./validationSchemas";
import jwt from "jsonwebtoken";

function log(message: unknown) {
  console.log("\n");
  console.log("\n");
  console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀");
  console.log(message);
  console.log("\n");
  console.log("\n");
}

function generateToken() {
  return jwt.sign(
    { tokenType: "app" },
    "sk_test_KrQodmrgQwaOCo2vBHwQlvZBV1x2Jwi1",
    {
      issuer: "tm2MXkLG",
      expiresIn: "30s",
    }
  );
}

export async function signUp(formData: FormData) {
  const supabase = createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm_password");

  if (password !== confirmPassword) {
    return redirect("/register?message=Passwords do not match");
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({ email, password });

  if (error) {
    log(error);
    return redirect("/register?message=Could not create user");
  }

  const create_user_api_endpoint = `https://api.talkjs.com/v1/tm2MXkLG/users/${
    user!.id
  }`;

  const res = await fetch(create_user_api_endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${generateToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "User#" + user!.id,
    }),
  }).then((res) => res.json());

  console.log("talkJS user created", res);

  return redirect("/account/profile");
}

export async function signInWithGoogle() {
  const supabase = createClient();
  // const { data, error } = await supabase.auth.signInWithOAuth({
  //   provider: "google",
  // });
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (data.url) return redirect(data.url);
}

export async function signIn(email: string, password: string) {
  try {
    const supabase = createClient();

    const validationState = loginSchema.safeParse({ email, password });

    if (!validationState.success) {
      return { error: "Oplysningerne er ikke gyldige" };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { error: "Brugeren findes ikke" };

    revalidatePath("/", "layout");
  } catch (err) {
    return { error: "Der skete en fejl, prøv igen" };
  }
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) return redirect("/account/profile?message=Could not sign out");
  revalidatePath("/", "layout");
  return redirect("/");
}

export async function deleteAccount() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return redirect("/account/profile?message=Could not find user");
  }

  try {
    await prisma.user.delete({
      where: {
        id: data.user.id,
      },
    });
  } catch (e) {
    return redirect("/account/profile?message=Could not delete user");
  }

  revalidatePath("/", "layout");
  return redirect("/");
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (e) {
    log(e);
    return [];
  }
}

export async function currentUser() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) return null;

  if (!data.user.id) return null;

  try {
    const res = await prisma.user.findUnique({
      where: {
        id: data.user.id,
      },
    });
    revalidatePath("/", "layout");
    return res;
  } catch (e) {
    log(e);
    return null;
  }
}

export async function updateUser(formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as Role;
  if (!name || (role !== "USER" && role !== "LANDLORD")) {
    return redirect("/account/profile?message=Please fill in all fields");
  }

  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return redirect("/account/profile?message=Could not find user");
  if (data.user) {
    try {
      const res = await prisma.user.update({
        where: { id: data.user.id },
        data: {
          name: name,
          role: role,
        },
      });

      const update_talkjs_user_endpoint = `https://api.talkjs.com/v1/tm2MXkLG/users/${data.user.id}`;

      const talkJSRes = await fetch(update_talkjs_user_endpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${generateToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      }).then((res) => res.json());

      console.log("updated talkjs username to" + name, talkJSRes);

      revalidatePath("/", "layout");
    } catch (e) {
      return redirect("/account/profile?message=Could not update user");
    }
  } else {
    return redirect("/account/profile?message=Could not update user2");
  }
}

export async function createVenue(formData: FormData) {
  const name = formData.get("name") as string;
  const propertyType = formData.get("propertyType") as string;
  const minCapacity = parseInt(formData.get("minCapacity") as string);
  const maxCapacity = parseInt(formData.get("maxCapacity") as string);
  const minPrice = parseInt(formData.get("minPrice") as string);
  const address = formData.get("address") as string;
  if (
    !name ||
    !propertyType ||
    !minCapacity ||
    !maxCapacity ||
    !minPrice ||
    !address
  ) {
    return redirect("/account/venues/new?message=Please fill in all fields");
  }
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return redirect("/account/venues/new?message=Could not find user");
  try {
    const res = await prisma.venue.create({
      data: {
        name,
        propertyType,
        minCapacity,
        maxCapacity,
        minPrice,
        address,
        user: {
          connect: {
            id: data.user.id,
          },
        },
      },
    });
    revalidatePath("/account/venues", "page");
  } catch (e) {
    log(e);
    return redirect("/account/venues/new?message=Could not create venue");
  }
  redirect("/account/venues");
}

export async function updateVenue(formData: FormData) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return redirect("/account/venues/new?message=Could not find user");
  const id = parseInt(formData.get("id") as string);
  const name = formData.get("name") as string;
  const propertyType = formData.get("propertyType") as string;
  const minCapacity = parseInt(formData.get("minCapacity") as string);
  const maxCapacity = parseInt(formData.get("maxCapacity") as string);
  const minPrice = parseInt(formData.get("minPrice") as string);
  const address = formData.get("address") as string;
  if (
    !name ||
    !propertyType ||
    !minCapacity ||
    !maxCapacity ||
    !minPrice ||
    !address
  ) {
    return redirect("/account/venues/edit?message=Please fill in all fields");
  }

  try {
    const res = await prisma.venue.update({
      where: {
        id: id,
        userId: data.user.id,
      },
      data: {
        name,
        propertyType,
        minCapacity,
        maxCapacity,
        minPrice,
        address,
      },
    });
    revalidatePath("/account/venues", "page");
  } catch (e) {
    log(e);
    return redirect("/account/venues/edit?message=Could not update venue");
  }
  redirect("/account/venues");
}

export async function deleteVenue(venueId: number) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return redirect("/account/venues/new?message=Could not find user");

  try {
    await prisma.venue.delete({
      where: {
        id: venueId,
        userId: data.user.id,
      },
    });
  } catch (e) {
    log(e);
    return redirect("/account/venues/edit?message=Could not delete venue");
  }

  revalidatePath("/account/venues", "page");
  redirect("/account/venues");
}

export async function getUserVenues() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return [];
  const venues = await prisma.venue.findMany({
    where: {
      userId: data.user.id,
    },
  });
  return venues;
}

export async function getVenues() {
  try {
    const venues = await prisma.venue.findMany();
    return venues;
  } catch (e) {
    log(e);
    return [];
  }
}

export async function getVenue(venueId: number) {
  if (isNaN(venueId)) return null;
  try {
    const venue = await prisma.venue.findUnique({
      where: {
        id: venueId,
      },
      include: {
        user: true,
      },
    });
    return venue;
  } catch (e) {
    log(e);
    return null;
  }
}

export async function saveVenue(venueId: number) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return { error: "Could not find user" };
  try {
    await prisma.savedVenue.create({
      data: {
        venueId: venueId,
        userId: data.user.id,
      },
    });
    return { success: true };
  } catch (e) {
    log(e);
    return { error: "Could not save venue" };
  }
}

export async function unsaveVenue(venueId: number) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return { error: "Could not find user" };
  try {
    await prisma.savedVenue.delete({
      where: {
        userId_venueId: {
          userId: data.user.id,
          venueId: venueId,
        },
      },
    });
    return { success: true };
  } catch (e) {
    log(e);
    return { error: "Could not unsave venue" };
  }
}

export async function getSaved() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return [];
  try {
    return await prisma.savedVenue.findMany({
      where: {
        userId: data.user.id,
      },
    });
  } catch (e) {
    log(e);
    return [];
  }
}

export async function getSavedVenueById(venueId: number) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  try {
    return await prisma.savedVenue.findUnique({
      where: {
        userId_venueId: {
          userId: data.user.id,
          venueId: venueId,
        },
      },
    });
  } catch (e) {
    log(e);
    return null;
  }
}

export async function sendMessage(req: {
  recipientId: string;
  venueId: number;
  message: string;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error("Could not find user");
  const user = data.user;

  const recipient = await prisma.user.findUnique({
    where: {
      id: req.recipientId,
    },
  });
  if (!recipient) throw new Error("Recipient not found");

  const conversation = await prisma.conversation.findFirst({
    where: {
      users: {
        every: {
          id: {
            in: [user.id, recipient.id],
          },
        },
      },
    },
  });

  let conversationId: number;

  if (!conversation) {
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [{ id: user.id }, { id: recipient.id }],
        },
        venueId: req.venueId,
      },
    });

    conversationId = newConversation.id;
    const talkJSres = await fetch(
      `https://api.talkjs.com/v1/tm2MXkLG/conversations/${conversationId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${generateToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          participants: [user.id, recipient.id],
        }),
      }
    ).then((res) => res.json());

    console.log("talkJS conversation created", talkJSres);

    const talkJSres2 = await fetch(
      `https://api.talkjs.com/v1/tm2MXkLG/conversations/${conversationId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${generateToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            sender: user.id,
            text: req.message,
            type: "UserMessage",
          },
        ]),
      }
    ).then((res) => res.json());

    console.log("talkJS message send", talkJSres2);
  } else {
    conversationId = conversation.id;
  }

  await prisma.message.create({
    data: {
      text: req.message,
      recipientId: req.recipientId,
      createdById: user.id,
      conversationId: conversationId,
    },
  });

  return { conversationId };
}
