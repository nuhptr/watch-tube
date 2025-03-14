import { Webhook } from "svix"
import { headers } from "next/headers"
import { WebhookEvent } from "@clerk/nextjs/server"

// call db to save user to databases
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET

    if (!SIGNING_SECRET) {
        throw new Error("Please add signing secret from clerk dashboard to .env / .env.local file")
    }

    // create new svix instance with secret
    const wh = new Webhook(SIGNING_SECRET)

    // get headers
    const headerPayload = await headers()

    const svix_id = headerPayload.get("svix-id")
    const svix_timestamp = headerPayload.get("svix-timestamp")
    const svix_signature = headerPayload.get("svix-signature")

    // if there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error: Missing Svix Headers", { status: 400 })
    }

    // Get body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    let evt: WebhookEvent

    // verify payload with headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (error) {
        console.error("Error: Could not verify webhook:", error)
        return new Response("Error: Verification error", {
            status: 400,
        })
    }

    // Do something with payload
    // For this guide, log payload to console
    const eventType = evt.type

    if (eventType === "user.created") {
        const { data } = evt
        await db.insert(users).values({
            clerkId: data.id,
            name: `${data.first_name} ${data.last_name}`,
            imageUrl: data.image_url,
        })
    }

    if (eventType === "user.deleted") {
        const { data } = evt

        if (!data.id) return new Response("Missing user id", { status: 400 })

        await db.delete(users).where(eq(users.clerkId, data.id))
    }

    if (eventType === "user.updated") {
        const { data } = evt

        await db
            .update(users)
            .set({
                name: `${data.first_name} ${data.last_name}`,
                imageUrl: data.image_url,
            })
            .where(eq(users.clerkId, data.id))
    }

    return new Response("Webhook received", { status: 200 })
}
