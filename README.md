#  Support Ticket System (Node.js + Express)

A complete ticket support system built with **Node.js**, **Express**, **EJS**, and **MongoDB**. The app allows users to create support tickets, reply to them, and manage ticket assignments with admin and agent panels.

---

## Features

- User authentication (Login/Register)
- Create and manage support tickets
- Reply to tickets
- Role-based access for:
  - Customers
  - Agents
  - Admins
- Admin dashboard to manage tickets and agents
- EJS-based views and layout
- MongoDB database connection

---

## 📁 Folder Structure
```bash
root-folder
    │
    ├──controllers
          ├── adminController
          ├── agentController
          ├── authController
          ├── replyController
          ├── ticketController
  
    ├──middlware
        ├──authMiddleware
    ├──models
        ├──replyModel
        ├──ticketModel
        ├──userModel
    ├── routes
        ├──adminRoutes
        ├──agentRoutes
        ├──authRoutes
        ├──replyRoutes
        ├──ticketRoutes
    ├──utils
        ├──dbConnect
        ├──githubApi
    ├──views
        ├──auth
            ├──register.ejs
            ├──login.ejs
        ├──admin-dashboard.ejs
        ├──admin-tickets.ejs
        ├──agent-assigned-tickets.ejs
        ├──agent-ticket.ejs
        ├──create-ticket.ejs
        ├──ticket-details.ejs

    ├── index.js
         





```
## 📬 API Routes Overview

| **Endpoint**         | **Method** | **Description**                                |
|----------------------|------------|------------------------------------------------|
| `/auth/register`     | `POST`     | Register a new user                            |
| `/auth/login`        | `POST`     | Login and receive auth token                   |
| `/auth/logout`       | `GET`      | Logout user and clear session/cookie           |
| `/ticket/create`     | `POST`     | Create a new support ticket                    |
| `/ticket/my-tickets` | `GET`      | Get all tickets (role-based filtering)         |
| `/ticket/my-tickets/:id`| `GET`   | Get ticket details by ID                       |
| `/reply/:ticketId`   | `POST`     | Add a reply to a specific ticket               |
| `/admin/tickets`     | `GET`    | Get all Tickets Data into Table format (admin only)          |
| `/admin/assign/:id`  | `POST`  | assign Tickets (admin only)            |
| `/admin/dashboard`   | `GET`      | Get Admin Dashboard Details                     |
  

## Future Implementations
The following features are planned to be implemented in upcoming versions:

 Pagination Support

Implement pagination in ticket and reply listings.

Improve performance and user experience when handling large datasets.

Role-Based Navbar

Dynamic navbar showing the logged-in user's name and role (e.g., Admin, Agent, Customer).

Customize navigation links based on the user’s role:

Admin: Dashboard, Manage Agents, View All Tickets

Agent: Assigned Tickets, Reply Panel

Customer: Create Ticket, My Tickets


