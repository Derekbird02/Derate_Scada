<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Form Email</title>

  <style>
    body {
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
      padding: 0;
      margin: 0;
    }

    .container {
      width: 600px;
      background-color: #ffffff;
      margin: 20px auto;
      border-radius: 8px;
      overflow: hidden;
    }

    .header {
      background-color: #025d60;
      padding: 20px;
      color: #ffffff;
    }

    .header img {
      width: 100px;
      height: auto;
      filter: brightness(0) invert(1);
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
      color: #ffffff;
    }

    .header p {
      margin: 5px 0 0;
      color: #ffffff;
    }

    .content {
      padding: 30px;
    }

    .content h2 {
      margin-top: 0;
    }

    .content p {
      font-size: 16px;
      line-height: 1.5;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    .data-table th,
    .data-table td {
      padding: 10px;
      border-bottom: 1px solid #eeeeee;
      text-align: left;
    }

    .data-table th {
      background-color: #f0f0f0;
      border-bottom: 2px solid #cccccc;
    }

    .footer {
      background-color: #eaeaea;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #555555;
    }
  </style>
</head>

<body>

  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" bgcolor="#f4f4f4">

        <!-- Container -->
        <table class="container" cellpadding="0" cellspacing="0" border="0">
          
          <!-- Header -->
          <tr>
            <td class="header">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle" style="width: 60px;">
                    <img src="logo.svg" alt="Company Logo" />
                  </td>
                  <td style="padding-left: 15px;">
                    <h1>Balance of Plant Form</h1>
                    <p>Form Submission Summary</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="content">
              <h2>Hello [Recipient],</h2>
              <p>Below is a summary of the form submission details:</p>

              <!-- Data Table -->
              <table class="data-table">
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>John Doe</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>john.doe@example.com</td>
                </tr>
                <tr>
                  <td>Subject</td>
                  <td>Request for Information</td>
                </tr>
                <tr>
                  <td>Message</td>
                  <td>I would like more details about your services.</td>
                </tr>
              </table>

              <p style="margin-top: 30px;">
                You can follow up or review this submission at your earliest convenience.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              &copy; 2025. All rights reserved.<br/><br/>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>
