module.exports = {
    scheduleReminder: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { 
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-radius: 5px;
          }
          .content {
            padding: 20px;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Schedule Reminder</h2>
          </div>
          <div class="content">
            <p>Hello {{name}},</p>
            <p>This is a reminder for your upcoming schedule:</p>
            <p><strong>Date:</strong> {{date}}</p>
            <p><strong>Time:</strong> {{time}}</p>
            <p><strong>Description:</strong> {{description}}</p>
            <p>
              <a href="{{viewLink}}" class="button">View Schedule</a>
            </p>
            <p>Best regards,<br>Your Scheduling App</p>
          </div>
        </div>
      </body>
      </html>
    `,
  
    welcomeEmail: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { 
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-radius: 5px;
          }
          .content {
            padding: 20px;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Welcome to Our Scheduling App!</h2>
          </div>
          <div class="content">
            <p>Hello {{name}},</p>
            <p>Welcome to our scheduling application! We're excited to have you on board.</p>
            <p>With our app, you can:</p>
            <ul>
              <li>Create and manage schedules</li>
              <li>Set up reminders</li>
              <li>Collaborate with others</li>
            </ul>
            <p>
              <a href="{{loginLink}}" class="button">Get Started</a>
            </p>
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <p>Best regards,<br>Your Scheduling App Team</p>
          </div>
        </div>
      </body>
      </html>
    `
  };