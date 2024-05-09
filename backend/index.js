import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

// Use CORS middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Configure MySQL connection directly
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "juniorSEG1",
  database: "baclingodb",
});

// Handle database connection errors
try {
  console.log("Connected to MySQL");

  //Define root route
  app.get("/", (req, res) => {
    res.json("Hello, this is the backend");
  });

  // Define appointments route
  app.get("/appointments", async (req, res) => {
    const q = "SELECT * FROM appointment";

    try {
      const [data] = await db.execute(q);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Define API route
  app.get("/api", async (req, res) => {
    const q1 =
      "SELECT ct.`idCaretaker`, ct.`full name` AS CareTakerName, COUNT(a.`idAppointment`) AS NumberOfAppointments FROM DAWINI.`Caretaker` ct LEFT JOIN DAWINI.`Appointment` a ON ct.`idCaretaker` = a.`Caretaker_idCaretaker` WHERE a.`accepted/declined` = 'Accepted' GROUP BY ct.`idCaretaker`, CareTakerName ORDER BY NumberOfAppointments DESC;";

    try {
      const [data] = await db.execute(q1);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Define user route
  app.get("/user", async (req, res) => {
    const q2 = "SELECT COUNT(*) AS NumberOfUsers FROM baclingodb.`Users`;";

    try {
      const [data] = await db.execute(q2);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/users", async (req, res) => {
    const q4 = "SELECT *  FROM baclingodb.Users;";

    try {
      const [data] = await db.execute(q4);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/languages", async (req, res) => {
    const q4 = "SELECT *  FROM baclingodb.languages;";

    try {
      const [data] = await db.execute(q4);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/createUser", async (req, res) => {
    try {
      const { firstName, lastName, email, phoneNumber, password } = req.body;

      // Assuming your 'users' table has these columns, modify accordingly
      const [rows] = await db.execute(
        "INSERT INTO baclingodb.users (firstName, lastName, email, phoneNumber, password) VALUES (?, ?, ?, ?, ?)",
        [firstName, lastName, email, phoneNumber, password]
      );

      res.json({ success: true, message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  });

  // app.post('/login', (req, res) => {
  //   const { email, password } = req.body;
  //   const query = `SELECT * FROM baclingodb.users WHERE email = '${email}' AND password = '${password}'`;
  //   db.query(query, (err, results) => {
  //     if (err) throw err;
  //     if (results.length > 0) {
  //     } else {
  //       res.send('Invalid login credentials');
  //     }
  //   });
  // });

  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Assuming that the 'users' table has 'email' and 'password' columns
    const query =
      "SELECT * FROM baclingodb.users WHERE email = ? AND password = ?";

    try {
      const [results] = await db.execute(query, [email, password]);

      if (results.length > 0) {
        // User found, handle successful login
        res.json({
          success: true,
          message: "Login successful",
          user: results[0],
        });
      } else {
        // No matching user found
        res
          .status(401)
          .json({ success: false, message: "Invalid login credentials" });
      }
    } catch (err) {
      console.error("Database query error:", err);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
});


  app.post("/auth", (request, response) => {
    // Capture the input fields
    let email = request.body.email; // Corrected from username to email
    let password = request.body.password;

    // Ensure the input fields exist and are not empty
    if (email && password) {
      // Execute SQL query that'll select the account from the database based on the specified email and password
      db.query(
        "SELECT * FROM baclingodb.users WHERE email = ? AND password = ?",
        [email, password],
        function (error, results, fields) {
          // If there is an issue with the query, output the error
          if (error) {
            console.error("Database query error:", error);
            response
              .status(500)
              .json({ success: false, message: "Internal Server Error" });
            return;
          }

          // If the account exists
          if (results.length > 0) {
            // Authenticate the user
            request.session.loggedin = true;
            request.session.email = email;
            // Redirect to home page or send a success response
            response.json({
              success: true,
              message: "Authentication successful",
            });
          } else {
            // Authentication failed
            response
              .status(401)
              .json({
                success: false,
                message: "Incorrect email and/or Password!",
              });
          }

          response.end();
        }
      );
    } else {
      // Email or password is missing
      response
        .status(400)
        .json({ success: false, message: "Please enter email and Password!" });
      response.end();
    }
  });

  app.get("/user/:id", async (req, res) => {
    const id = req.params.id; // Use req.params.id to access URL parameters

    const q4 = `SELECT * FROM baclingodb.Users WHERE UserID = ${id};`;

    try {
      const [data] = await db.execute(q4);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/languages", async (req, res) => {
    const q4 = "SELECT *  FROM baclingodb.languages;";

    try {
      const [data] = await db.execute(q4);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  function removeNonNumeric(str) {
    return str.replace(/\D/g, '');
  }  
  app.get("/lessons/:LanguageID", async (req, res) => {
    try {
        // Sanitize input
        const LanguageID = req.params['LanguageID'];
        const id = removeNonNumeric(LanguageID);

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid LanguageID" });
        }
        // Use parameterized query to prevent SQL injection
        const q = "SELECT * FROM lessons WHERE LanguageID = ?";
        const [data] = await db.execute(q, [id]);
        
        // Check if data is empty
        if (data.length === 0) {
            return res.status(404).json({ error: "No lessons found for the provided LanguageID" });
        }
        
        // Send response with data
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/quiz/:LessonID", async (req, res) => {
  try {
      // Sanitize input
      const LessonID = req.params['LessonID'];
      const id = removeNonNumeric(LessonID);

      if (isNaN(id)) {
          return res.status(400).json({ error: "Invalid LessonID" });
      }
      // Use parameterized query to prevent SQL injection
      const q = "SELECT * FROM Quiz WHERE LessonID = ?";
      const [data] = await db.execute(q, [id]);
      
      // Check if data is empty
      if (data.length === 0) {
          return res.status(404).json({ error: "No lessons found for the provided LessonID" });
      }
      
      // Send response with data
      res.json(data);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

  
  app.post("/languages", async (req, res) => {
    const LanguageName = req.body.languageName;
    const DifficultyLevel = req.body.difficultyLevel;

    if (!LanguageName || !DifficultyLevel) {
      return res
        .status(400)
        .json({ error: "LanguageName and DifficultyLevel are required" });
    }

    const insertQuery =
      "INSERT INTO baclingodb.languages (LanguageName, DifficultyLevel) VALUES (?, ?)";

    try {
      // Execute the insert query
      const [result] = await db.execute(insertQuery, [
        LanguageName,
        DifficultyLevel,
      ]);

      if (result.affectedRows > 0) {
        // If affectedRows > 0, the insert was successful
        res.json({ message: "Language inserted successfully" });
      } else {
        // If affectedRows === 0, something went wrong with the insertion
        res.status(500).json({ error: "Failed to insert language" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  app.post("/createLanguage", async (req, res) => {
    try {
      const { languageName, difficultyLevel } = req.body;

      // Assuming your 'product' table has these columns, modify accordingly
      const [rows] = await db.execute(
        "INSERT INTO baclingodb.languages (LanguageName, DifficultyLevel) VALUES (?, ?)",
        [languageName, difficultyLevel]
      );

      res.json({ success: true, message: "Product created successfully" });
    } catch (error) {
      console.error("Error creating product:", error);
      res
        .status(500)
        .json({ success: false, message: "aaaaInternal Server Error" });
    }
  });

  app.post("/createLesson", async (req, res) => {
    try {
      const { languageID, lessonName, lessonContent } = req.body;

      // Assuming your 'product' table has these columns, modify accordingly
      const [rows] = await db.execute(
        `INSERT INTO baclingodb.lessons (LanguageID, LessonName, LessonContent) VALUES (${languageID}, ?, ?)`,
        [lessonName, lessonContent]
      );

      res.json({ success: true, message: "Product created successfully" });
    } catch (error) {
      console.error("Error creating product:", error);
      res
        .status(500)
        .json({ success: false, message: "aaaaInternal Server Error" });
    }
  });

  app.get("/lessons", async (req, res) => {
    const q4 = "SELECT *  FROM baclingodb.lessons;";

    try {
      const [data] = await db.execute(q4);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  app.get("/lessons/:LanguageID", async (req, res) => {
    const { LanguageID } = req.params; // Access LanguageID from the route parameters
    const q4 = `SELECT * FROM baclingodb.lessons WHERE LanguageID = ${LanguageID};`;

    try {
      const [data] = await db.execute(q4);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/lesson/:LessonID", async (req, res) => {
    const { LessonID } = req.params; // Access LanguageID from the route parameters
    const q4 = `SELECT * FROM baclingodb.lessons WHERE LessonID = ${LessonID};`;

    try {
      const [data] = await db.execute(q4);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/languages/:LanguageID", async (req, res) => {
    const { LanguageID } = req.params; // Access LanguageID from the route parameters
    const q4 = `SELECT * FROM baclingodb.languages WHERE LanguageID = ${LanguageID};`;

    try {
      const [data] = await db.execute(q4);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.delete("/languages/:languageId", async (req, res) => {
    const languageId = req.params.languageId;

    if (!languageId) {
      return res.status(400).json({ error: "Language ID is required" });
    }

    const deleteQuery = "DELETE FROM baclingodb.languages WHERE LanguageID = ?";

    try {
      // Execute the delete query
      const [result] = await db.execute(deleteQuery, [languageId]);

      if (result.affectedRows > 0) {
        // If affectedRows > 0, the delete was successful
        res.json({ message: "Language deleted successfully" });
      } else {
        // If affectedRows === 0, no matching language found
        res.status(404).json({ error: "Language not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.delete("/lessons/:LessonID", async (req, res) => {
    const lessonId = req.params.LessonID; // or parseInt(req.params.lessonId, 10);

    if (isNaN(lessonId)) {
      return res.status(400).json({ error: "Invalid Lesson ID" });
    }

    const deleteQuery = "DELETE FROM baclingodb.lessons WHERE LessonID = ?";

    try {
      // Execute the delete query
      const [result] = await db.execute(deleteQuery, [lessonId]);

      if (result.affectedRows > 0) {
        // If affectedRows > 0, the delete was successful
        res.json({ message: "Lesson deleted successfully" });
      } else {
        // If affectedRows === 0, no matching lesson found
        res.status(404).json({ error: "Lesson not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.delete("/user/:id", async (req, res) => {
    const ID = req.params.id;

    try {
      // Assuming your 'product' table has the column 'idproducts'
      const [result] = await db.execute("DELETE FROM users WHERE UserID = ?", [
        ID,
      ]);

      if (result.affectedRows > 0) {
        res.json({ success: true, message: "User deleted successfully" });
      } else {
        res.status(404).json({ success: false, message: "Product not found" });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (err) {
  console.error("Error connecting to MySQL:", err);
  process.exit(1); // Exit the process if unable to connect
}
app.get("/users", async (req, res) => {
  const q11 = "SELECT * from user";
  try {
    const [data] = await db.execute(q11);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/create-user", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    subscriptionType,
    lastLoginDate,
  } = req.body;

  const q =
    "INSERT INTO baclingodb.Users (FirstName, LastName, Email, Password, SubscriptionType, LastLoginDate) VALUES (?, ?, ?, ?, ?, ?)";

  try {
    await db.execute(q, [
      firstName,
      lastName,
      email,
      password,
      subscriptionType,
      lastLoginDate,
    ]);
    res.json({ message: "User created successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
