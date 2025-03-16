# Project Management Tool Backend (ClickUp Clone) with AI-based Task Moderation

Live API URL
https://clickupclone.onrender.com


This is a fully functional backend API for a Project Management Tool, inspired by ClickUp, built with modern technologies. It supports role-based task management, real-time collaboration, AI moderation, and subscription handling, designed for scalability, security, and performance.



## Tech Stack

- Node.js	JavaScript runtime
- Express.js	Web framework
- Prisma ORM	Database ORM and schema management
- PostgreSQL	Relational database
- JWT	Authentication
- Socket.IO (optional)	Real-time updates
- Render	Deployment platform
- OpenAI API	AI content moderation & task suggestions



## Installation & Setup
1. Clone the Repository

> git clone https://github.com/Zain-Masroor/clickupclone.git

2. Install Dependencies
>npm install

3. Configure Environment Variables

>Create a .env file in root:

>DATABASE_URL=postgresql://username:password@localhost:5432/mydb

>JWT_SECRET=your_jwt_secret

>OPENAI_API_KEY=your_openai_key


4. Run Database Migrations
>npx prisma migrate dev --name init


5. Run the Server
>npm run dev

## API Endpoints Overview

>/api/projects	CRUD	Manage projects	

>/api/tasks	CRUD	Manage tasks	

>/api/comments	CRUD	Task collaboration through comments	

>/api/notifications	GET	Fetch user notifications	

>/api/favorites	CRUD	Manage favorites	

>/api/history	GET	User history	

>/api/subscription	POST	Mock payment system for subscriptions	

>/api/ai/moderate	POST	AI-based task moderation	

>/api/ai/recommend	GET	AI-based task recommendations	


## Project Structure

├── config/    

├── controllers/   

├── models/         

├── routes/         

├── middlewares/   

├── services/      

├── prisma/
  ├── migrations/

├── utils/         

└── app.js          


## Contact

Name: Zain Masroor

LinkedIn: https://www.linkedin.com/in/zain-masroor-627a74182

Email: zmasroor99@gmail.com

GitHub: https://github.com/Zain-Masroor

