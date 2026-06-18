# ✍️ Advanced Multi-Author Blogging Platform

A scalable, high-performance, and feature-rich multi-author blogging platform built using the latest web technologies. This platform is designed to provide a seamless writing experience for creators and an interactive, secure community environment for readers.

## 🛠️ Tech Stack & Architecture
- **Framework:** Next.js 15 (App Router & Async Params optimization)
- **Data Fetching & Mutations:** Next.js 14/15 Server Actions (Zero traditional API routes)
- **Database:** MongoDB Atlas
- **ORM:** Mongoose (Optimized Connection Pooling & Indexing)
- **Authentication:** NextAuth.js (Role-Based Access Control)
- **Styling:** Pure CSS (Modular and Scalable architectures)

## ✨ Core Features
- **🔑 Role-Based Access Control (RBAC):** Three distinct user roles: `READER`, `AUTHOR`, and `ADMIN` with tailored permissions.
- **📝 Pro Creator Tools:** Integrated with **Tiptap Editor** supporting rich text, media embeddings, and Git-like **Post Versioning/Edit History** with 1-click rollback.
- **💬 Engagement Systems:** socialmedia-style multi-level nested comment architecture utilizing recursive MongoDB queries.
- **👥 Social & Privacy Toggles:** Advanced Follow/Follower system with Public (Instant) and Private (Request/Approval) account toggles.
- **🛡️ Community Moderation:** Dynamic user reporting pipeline with a robust **Admin Dashboard** to restrict, ban, or soft-delete accounts and toxic content.