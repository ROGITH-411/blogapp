# Blogapp (Spring Boot backend)

This project provides a REST API for blogging with Markdown content, comments, and reporting.

Quick notes
- Default profile uses in-memory H2 database for convenience.
- Security: HTTP Basic with two in-memory users: `user`/`password` (ROLE_USER) and `admin`/`adminpass` (ROLE_ADMIN).

Switching to MySQL
1. Create a MySQL database, for example `blogdb` (run in your MySQL client):

  CREATE DATABASE blogdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

2. Edit `src/main/resources/application-mysql.properties` and set `spring.datasource.username` and `spring.datasource.password` to your MySQL credentials.

3. Run the application with the `mysql` profile active so Spring Boot picks the MySQL config. From the project folder run:

```powershell
.\mvnw.cmd package -DskipTests
java -jar target\blogapp-0.0.1-SNAPSHOT.jar --spring.profiles.active=mysql
```

When the application starts with the `mysql` profile and `spring.jpa.hibernate.ddl-auto=update`, Hibernate will create/update the required tables in `blogdb`.

4. Verify tables in MySQL (example):

  SHOW TABLES;
  DESCRIBE blogs;


Running

Build and run with Maven:

```powershell
mvnw.cmd package -DskipTests; java -jar target/blogapp-0.0.1-SNAPSHOT.jar
```

Thunder Client (VS Code) examples
Use Basic Auth for requests. Example credentials: `user`/`password` or `admin`/`adminpass`.

1) Create a blog (POST /api/blogs)
Body (JSON):

{
  "title": "My first post",
  "contentMarkdown": "# Hello\nThis is markdown content",
  "author": "Alice"
}

2) List blogs (GET /api/blogs?page=0&size=10)

3) Get blog (GET /api/blogs/{id})

4) Update blog (PUT /api/blogs/{id}) - any user

5) Delete blog (DELETE /api/blogs/{id}) - requires ADMIN

6) Add comment (POST /api/blogs/{blogId}/comments)
Body:
{
  "author": "Bob",
  "content": "Nice post!"
}

7) Report a blog (POST /api/reports/blog/{blogId})
Body:
{
  "reporter": "Charlie",
  "reason": "Spam"
}

You can create requests in Thunder Client using the above endpoints and Basic Auth credentials.
